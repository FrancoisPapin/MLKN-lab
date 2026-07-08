// Global variables for D3.js visualization
let simulation, nodes, links, canvas, ctx, currentLayer = 'all', zoom;
let tickCount = 0; // For throttling

// Colorblind-friendly palettes
const layerColors = {
    '1': '#0173B2', '2': '#029E73', '3': '#D55E00', '4': '#CC78BC', '5': '#CA9161',
    'all': '#949494',
    'Core Domain': '#0173B2',
    'Academic Discipline': '#029E73',
    'Academic Subdiscipline': '#D55E00',
    'Core Thematic Domain': '#CC78BC',
    'Main Concept': '#CA9161'
};

const edgeTypeColors = {
    'CoreDomain_to_AcademicDiscipline': '#0173B2',
    'AcademicDiscipline_to_Subdiscipline': '#029E73',
    'Subdiscipline_to_Topic': '#D55E00',
    'Topic_to_Concept': '#CC78BC',
    'connection': '#FF00FF' // Magenta for dark mode
};

const layerMap = {
    '1': 'Core Domain',
    '2': 'Academic Discipline',
    '3': 'Academic Subdiscipline',
    '4': 'Core Thematic Domain',
    '5': 'Main Concept'
};

// Determine data URLs
let nodesUrl, edgesUrl;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    nodesUrl = './data/full_hierarchy_nodes.json';
    edgesUrl = './data/full_hierarchy_edges.json';
} else {
    nodesUrl = '/MLKN-lab/knowledge_network/data/full_hierarchy_nodes.json';
    edgesUrl = '/MLKN-lab/knowledge_network/data/full_hierarchy_edges.json';
}

// Initialize the network
function initNetwork() {
    try {
        if (!window.d3) {
            document.getElementById('network-error').style.display = 'block';
            document.querySelector('#network-placeholder i').style.display = 'none';
            return;
        }

        const networkContainer = d3.select("#network-container");
        networkContainer.select("svg").remove();

        // Set fixed Canvas size
        const canvasWidth = window.innerWidth * 0.9;
        const canvasHeight = 700;
        canvas = networkContainer.append("canvas")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("width", `${canvasWidth}px`)
            .style("height", `${canvasHeight}px`)
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);
        ctx = canvas.node().getContext("2d");

        // Initialize zoom
        zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                drawCanvas();
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity); // Reset zoom to 1x

        loadData();
    } catch (error) {
        console.error("Error in initNetwork:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error initializing network.</p>
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">${error.message}</p>
        `;
    }
}

// Fit the network to the viewport
function fitToViewport() {
    const bounds = {
        x1: Infinity, y1: Infinity,
        x2: -Infinity, y2: -Infinity
    };
    nodes.forEach(d => {
        bounds.x1 = Math.min(bounds.x1, d.x);
        bounds.y1 = Math.min(bounds.y1, d.y);
        bounds.x2 = Math.max(bounds.x2, d.x);
        bounds.y2 = Math.max(bounds.y2, d.y);
    });
    const dx = bounds.x2 - bounds.x1;
    const dy = bounds.y2 - bounds.y1;
    const x = (bounds.x1 + bounds.x2) / 2;
    const y = (bounds.y1 + bounds.y2) / 2;
    const scale = Math.min(
        canvas.node().width / (dx + 100),
        canvas.node().height / (dy + 100)
    );
    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.min(scale, 1))
        .translate(-x, -y);
    d3.select("#network-container").call(zoom.transform, transform);
}

// Draw nodes and edges on Canvas
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
            ctx.lineWidth = Math.max(0.5, d.weight / 10) * transform.k;
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

            // Add node label (for zoom > 0.5x)
            if (transform.k > 0.5) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${10 * transform.k}px Arial`;
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
    console.log('Fetching nodes and edges...');
    document.getElementById('network-placeholder').innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Loading knowledge network...</p>
        <div style="width: 100%; background: #333; border-radius: 4px; margin-top: 10px;">
            <div id="progress-bar" style="width: 20%; height: 4px; background: #1ABC9C; border-radius: 4px;"></div>
        </div>
    `;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = '50%';
    setTimeout(() => { progressBar.style.width = '100%'; }, 500);

    Promise.all([
        fetch(nodesUrl).then(res => {
            if (!res.ok) throw new Error(`Nodes HTTP error! status: ${res.status}`);
            return res.json();
        }),
        fetch(edgesUrl).then(res => {
            if (!res.ok) throw new Error(`Edges HTTP error! status: ${res.status}`);
            return res.json();
        })
    ])
    .then(([nodesData, edgesData]) => {
        nodes = nodesData.nodes;
        links = edgesData.edges;

        console.log("Loaded nodes:", nodes.length);
        console.log("Loaded edges:", links.length);
        console.log("Sample node:", nodes[0]);
        console.log("Sample edge:", links[0]);

        // Debug: Check for invalid edges
        const validNodeIds = new Set(nodes.map(n => n.id));
        const invalidEdges = links.filter(link =>
            !validNodeIds.has(link.source) || !validNodeIds.has(link.target)
        );
        console.log("DEBUG: Invalid edges:", invalidEdges.length);
        if (invalidEdges.length > 0) {
            console.log("Sample invalid edge:", invalidEdges[0]);
        }

        // Debug: Log all Layer values
        console.log("DEBUG: All Layer values in nodes:", [...new Set(nodes.map(n => n.Layer))]);

        currentLayer = 'all';
        filterByLayer();
        startSimulation();
    })
    .catch(error => {
        console.error("Error loading data:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error loading network data.</p>
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">${error.message}</p>
        `;
    });
}

// Filter by layer
function filterByLayer() {
    if (simulation) simulation.stop();

    // Reset zoom to 1x when switching layers
    d3.select("#network-container").transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity);

    const layerName = layerMap[currentLayer] || currentLayer;
    console.log("DEBUG: Current layer:", currentLayer, "→ Layer name:", layerName);

    // Debug: Log all Layer values in nodes
    console.log("DEBUG: All Layer values in nodes:", [...new Set(nodes.map(n => n.Layer))]);

    if (currentLayer === 'all') {
        simulation = startSimulation();
        return;
    }

    // Filter nodes by Layer (trim + lowercase)
    const normalizedLayerName = layerName.trim().toLowerCase();
    const filteredNodes = nodes.filter(node => {
        const nodeLayer = node.Layer?.trim().toLowerCase();
        const match = nodeLayer === normalizedLayerName;
        if (!match) console.log(`DEBUG: Mismatch - Expected: "${normalizedLayerName}", Got: "${nodeLayer}"`);
        return match;
    });

    const layerNodes = new Set(filteredNodes.map(node => node.id));
    const filteredLinks = links.filter(link =>
        layerNodes.has(link.source) && layerNodes.has(link.target)
    );

    console.log("DEBUG: Filtered nodes:", filteredNodes.length);
    console.log("DEBUG: Filtered links:", filteredLinks.length);

    nodes = filteredNodes;
    links = filteredLinks;

    console.log(`Filtered to layer ${currentLayer} (${layerName}): ${nodes.length} nodes, ${links.length} edges.`);
    simulation = startSimulation();
}

// Start simulation
function startSimulation() {
    if (simulation) simulation.stop();

    const width = canvas.node().width;
    const height = canvas.node().height;

    // Stronger forces for faster stabilization
    const chargeStrength = -2000;
    const linkDistance = 150;
    const collisionRadius = 30;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1.0))
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.1)
        .velocityDecay(0.8);

    tickCount = 0;
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        if (tickCount % 3 === 0) drawCanvas();
        if (simulation.alpha() < 0.001) {
            simulation.stop();
            fitToViewport(); // Fit to viewport after stabilization
            console.log("Simulation stabilized. Alpha:", simulation.alpha());
        }
    });
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
}

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Update network
function updateNetwork() {
    filterByLayer();
    startSimulation();
}

// Filter by domain
function filterNetworkByDomain(domain) {
    if (currentLayer !== '1') return;
    const domainNodes = new Set(
        nodes.filter(node => node['Core Domain'] === domain)
             .map(node => node.id)
    );
    console.log(`Filtered by domain: ${domain}, nodes: ${domainNodes.size}`);
}

// Initialize
window.onload = initNetwork;

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
        console.log("Clicked node:", clickedNode);
        alert(`Node: ${clickedNode.Node || clickedNode.id}\nLayer: ${clickedNode.Layer}\nDomain: ${clickedNode['Core Domain'] || 'N/A'}`);
    }
});
