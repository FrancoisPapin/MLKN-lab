// Global variables
let simulation, nodes, links, originalNodes, originalLinks, canvas, ctx, currentLayer = 'all', zoom;
let tickCount = 0;
let isMobile = false;

// Initialize mobile detection
function detectMobile() {
    isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        console.warn("Mobile device detected. Simplifying network for performance.");
    }
}

// Color and layer mappings (unchanged)
const layerColors = { /* ... */ };
const edgeTypeColors = { /* ... */ };
const layerMap = { /* ... */ };

// Data URLs (unchanged)
let nodesUrl, edgesUrl;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    nodesUrl = './data/full_hierarchy_nodes.json';
    edgesUrl = './data/full_hierarchy_edges.json';
} else {
    nodesUrl = '/MLKN-lab/knowledge_network/data/full_hierarchy_nodes.json';
    edgesUrl = '/MLKN-lab/knowledge_network/data/full_hierarchy_edges.json';
}

// Initialize network
function initNetwork() {
    detectMobile();
    try {
        if (!window.d3) {
            document.getElementById('network-error').style.display = 'block';
            return;
        }

        const networkContainer = d3.select("#network-container");
        networkContainer.select("svg").remove();

        // Adaptive Canvas size
        const canvasWidth = window.innerWidth * 0.9;
        const canvasHeight = isMobile ? 500 : 700;
        canvas = networkContainer.append("canvas")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("width", `${canvasWidth}px`)
            .style("height", `${canvasHeight}px`)
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);
        ctx = canvas.node().getContext("2d");

        // Initialize zoom with debounce
        let zoomTimeout;
        zoom = d3.zoom()
            .scaleExtent([0.01, 10])  // Allow more zoom-out
            .on("zoom", () => {
                clearTimeout(zoomTimeout);
                zoomTimeout = setTimeout(drawCanvas, 50);  // Debounce zoom
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity);

        loadData();
    } catch (error) {
        console.error("Error in initNetwork:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error initializing network.</p>
        `;
    }
}

// Fit network to viewport
function fitToViewport() {
    if (!nodes || nodes.length === 0) return;

    const bounds = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
    nodes.forEach(d => {
        bounds.x1 = Math.min(bounds.x1, d.x);
        bounds.y1 = Math.min(bounds.y1, d.y);
        bounds.x2 = Math.max(bounds.x2, d.x);
        bounds.y2 = Math.max(bounds.y2, d.y);
    });

    const dx = bounds.x2 - bounds.x1;
    const dy = bounds.y2 - bounds.y1;
    const scale = Math.min(
        canvas.node().width / (dx + 200),  // More padding
        canvas.node().height / (dy + 200)
    ) * 0.9;  // Zoom out 10% more

    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.max(scale, 0.01))  // Ensure minimum scale
        .translate(-(bounds.x1 + bounds.x2) / 2, -(bounds.y1 + bounds.y2) / 2);

    d3.select("#network-container").call(zoom.transform, transform);
}

// Draw Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0) return;

    ctx.clearRect(0, 0, canvas.node().width, canvas.node().height);
    ctx.save();

    const transform = d3.zoomTransform(canvas.node());
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    // Draw edges
    ctx.globalCompositeOperation = 'destination-over';
    links.forEach(d => {
        if (d.source?.x && d.source?.y && d.target?.x && d.target?.y) {
            ctx.beginPath();
            ctx.moveTo(d.source.x, d.source.y);
            ctx.lineTo(d.target.x, d.target.y);
            ctx.strokeStyle = edgeTypeColors[d.type] || "#FF00FF";
            ctx.lineWidth = Math.max(1, d.weight / 10 * transform.k);
            ctx.stroke();
        }
    });

    // Draw nodes
    ctx.globalCompositeOperation = 'source-over';
    nodes.forEach(d => {
        if (d.x && d.y) {
            const radius = Math.max(4, Math.min(15, d.size ? d.size / 100 : 12)) * transform.k;
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = layerColors[d.Layer] || "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 1.5 * transform.k;
            ctx.stroke();

            // Only show labels on desktop and when zoomed in
            if (transform.k > 0.5 && !isMobile) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${Math.max(8, 10 * transform.k)}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(d.Node || d.id, d.x, d.y);
            }
        }
    });

    ctx.restore();
}

// Load data
function loadData() {
    document.getElementById('network-placeholder').innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Loading knowledge network...</p>
    `;

    Promise.all([
        fetch(nodesUrl).then(res => res.json()),
        fetch(edgesUrl).then(res => res.json())
    ])
    .then(([nodesData, edgesData]) => {
        originalNodes = nodesData.nodes;  // Store original
        originalLinks = edgesData.edges;
        nodes = originalNodes;
        links = originalLinks;
        console.log(`Loaded ${nodes.length} nodes and ${links.length} edges.`);
        currentLayer = 'all';
        filterByLayer();
        startSimulation();
    })
    .catch(error => {
        console.error("Error loading data:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error loading network data.</p>
        `;
    });
}

// Filter by layer
function filterByLayer() {
    if (simulation) simulation.stop();

    const layerName = layerMap[currentLayer] || currentLayer;
    if (currentLayer === 'all') {
        nodes = originalNodes;
        links = originalLinks;
        simulation = startSimulation();
        setTimeout(fitToViewport, 100);
        return;
    }

    const filteredNodes = nodes.filter(node => node.Layer === layerName);
    const layerNodes = new Set(filteredNodes.map(node => node.id));
    const filteredLinks = links.filter(link =>
        layerNodes.has(link.source) && layerNodes.has(link.target)
    );

    nodes = filteredNodes;
    links = filteredLinks;
    console.log(`Filtered to layer ${currentLayer}: ${nodes.length} nodes, ${links.length} edges.`);
    simulation = startSimulation();
    setTimeout(fitToViewport, 100);
}

// Start simulation
function startSimulation() {
    if (simulation) simulation.stop();

    const width = canvas.node().width;
    const height = canvas.node().height;

    // Adaptive force parameters
    const chargeStrength = isMobile ? -500 : -2000;
    const collisionRadius = isMobile ? 10 : 30;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1.0))
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.1)
        .velocityDecay(0.8);

    tickCount = 0;
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        if (tickCount % 5 === 0) drawCanvas();  // Throttle to every 5 ticks
        if (simulation.alpha() < 0.001) {
            simulation.stop();
            console.log("Simulation stabilized.");
        }
    });
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
}

// Drag functions (unchanged)
function dragstarted(event, d) { /* ... */ }
function dragged(event, d) { /* ... */ }
function dragended(event, d) { /* ... */ }

// Update network
function updateNetwork() {
    filterByLayer();
    startSimulation();
}

// Filter by domain (unchanged)
function filterNetworkByDomain(domain) { /* ... */ }

// Click event for node details
canvas.on("click", (event) => {
    const transform = d3.zoomTransform(canvas.node());
    const [x, y] = d3.pointer(event);

    const clickedNode = nodes.find(node => {
        const nodeX = node.x * transform.k + transform.x;
        const nodeY = node.y * transform.k + transform.y;
        const radius = Math.max(4, Math.min(15, node.size ? node.size / 100 : 12)) * transform.k;
        const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
        return distance <= radius;
    });

    if (clickedNode) {
        alert(`Node: ${clickedNode.Node || clickedNode.id}\nLayer: ${clickedNode.Layer}\nDomain: ${clickedNode['Core Domain'] || 'N/A'}`);
    }
});

// Initialize
window.onload = initNetwork;
