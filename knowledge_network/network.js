// Global variables for D3.js visualization
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

// Colorblind-friendly palettes (aligned with your cleaned data)
const layerColors = {
    '1': '#0173B2', // Core Domains (Blue)
    '2': '#029E73', // Academic Disciplines (Green)
    '3': '#D55E00', // Academic Subdisciplines (Orange)
    '4': '#CC78BC', // Core Thematic Domains (Purple)
    '5': '#CA9161', // Main Concepts (Brown)
    'all': '#949494', // All Layers (Gray)
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
    'connection': '#FF00FF' // Magenta for dark mode visibility
};

// Map layer numbers to EXACT layer names in your JSON
const layerMap = {
    '1': 'Core Domain',
    '2': 'Academic Discipline',
    '3': 'Academic Subdiscipline',
    '4': 'Core Thematic Domain',
    '5': 'Main Concept'
};

// Determine the correct data URL based on the environment
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
    detectMobile();
    try {
        if (!window.d3) {
            document.getElementById('network-error').style.display = 'block';
            document.querySelector('#network-placeholder i').style.display = 'none';
            return;
        }

        const networkContainer = d3.select("#network-container");
        networkContainer.select("svg").remove(); // Remove SVG to avoid conflicts

        // Adaptive Canvas size (smaller for mobile)
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
            .scaleExtent([0.01, 10])  // Allow 100x zoom-out
            .on("zoom", () => {
                clearTimeout(zoomTimeout);
                zoomTimeout = setTimeout(drawCanvas, 50);  // Debounce zoom
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity); // Reset zoom to 1x

        loadData();
    } catch (error) {
        console.error("Error in initNetwork:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error initializing network.</p>
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                ${error.message}
            </p>
        `;
    }
}

// Fit the network to the viewport
function fitToViewport() {
    if (!nodes || nodes.length === 0) return;

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
    const scale = Math.min(
        canvas.node().width / (dx + 200),  // Add padding
        canvas.node().height / (dy + 200)
    ) * 0.9;  // Zoom out 10% more

    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.max(scale, 0.01))  // Ensure minimum scale
        .translate(-(bounds.x1 + bounds.x2) / 2, -(bounds.y1 + bounds.y2) / 2);

    d3.select("#network-container").call(zoom.transform, transform);
}

// Function to draw nodes and edges on Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.node().width, canvas.node().height);
    ctx.save();

    // Apply zoom transform
    const transform = d3.zoomTransform(canvas.node());
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    // Draw edges first (behind nodes)
    ctx.globalCompositeOperation = 'destination-over';
    links.forEach(d => {
        if (d.source?.x && d.source?.y && d.target?.x && d.target?.y) {
            ctx.beginPath();
            ctx.moveTo(d.source.x, d.source.y);
            ctx.lineTo(d.target.x, d.target.y);
            ctx.strokeStyle = edgeTypeColors[d.type] || "#FF00FF"; // Magenta for dark mode
            ctx.lineWidth = Math.max(1, d.weight / 10 * transform.k); // Minimum 1px width
            ctx.stroke();
        }
    });

    // Draw nodes on top
    ctx.globalCompositeOperation = 'source-over';
    nodes.forEach(d => {
        if (d.x && d.y) {
            const radius = Math.max(4, Math.min(15, d.size ? d.size / 100 : 12)) * transform.k;
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = layerColors[d.Layer] || "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF"; // White stroke for dark mode
            ctx.lineWidth = 1.5 * transform.k;
            ctx.stroke();

            // Only show labels on desktop and when zoomed in (>0.5x)
            if (transform.k > 0.5 && !isMobile) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${Math.max(8, 10 * transform.k)}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(d.Node || d.id, d.x, d.y);
            }
        }
    });

    // Restore context
    ctx.restore();
}

// Load data from split JSON files
function loadData() {
    console.log('Fetching nodes and edges from split files...');
    document.getElementById('network-placeholder').innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Loading knowledge network...</p>
        <div style="width: 100%; background: #333; border-radius: 4px; margin-top: 10px;">
            <div id="progress-bar" style="width: 20%; height: 4px; background: #1ABC9C; border-radius: 4px;"></div>
        </div>
    `;

    // Animate progress bar
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
        originalNodes = nodesData.nodes;  // Store original data
        originalLinks = edgesData.edges;
        nodes = originalNodes;
        links = originalLinks;
        console.log(`Loaded ${nodes.length} nodes and ${links.length} edges.`);

        // Initialize with all layers
        currentLayer = 'all';
        filterByLayer();
        startSimulation();
    })
    .catch(error => {
        console.error("Error loading data:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error loading network data.</p>
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                ${error.message}
            </p>
        `;
    });
}

// Filter nodes/links by current layer
function filterByLayer() {
    if (simulation) simulation.stop();

    const layerName = layerMap[currentLayer] || currentLayer;

    if (currentLayer === 'all') {
        // Reset to full dataset
        nodes = originalNodes;
        links = originalLinks;
        simulation = startSimulation();
        setTimeout(fitToViewport, 100); // Fit to viewport after filtering
        return;
    }

    // Filter nodes by exact Layer match
    const filteredNodes = nodes.filter(node => node.Layer === layerName);
    const layerNodes = new Set(filteredNodes.map(node => node.id));

    // Filter links where both source and target are in the filtered nodes
    const filteredLinks = links.filter(link =>
        layerNodes.has(link.source) && layerNodes.has(link.target)
    );

    // Update global arrays
    nodes = filteredNodes;
    links = filteredLinks;

    console.log(`Filtered to layer ${currentLayer} (${layerName}): ${nodes.length} nodes, ${links.length} edges.`);
    simulation = startSimulation();
    setTimeout(fitToViewport, 100); // Fit to viewport after filtering
}

// Start the force simulation
function startSimulation() {
    // Clear previous simulation
    if (simulation) simulation.stop();

    // Get container dimensions
    const width = canvas.node().width;
    const height = canvas.node().height;

    // Adaptive force parameters (weaker for mobile)
    const chargeStrength = isMobile ? -500 : -2000;
    const linkDistance = 150;
    const collisionRadius = isMobile ? 10 : 30;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1.0))
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.1) // Faster cooling
        .velocityDecay(0.8);

    // Reset tick count and set up tick handler
    tickCount = 0;
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        // Throttle redrawing (every 5 ticks for performance)
        if (tickCount % 5 === 0) {
            drawCanvas();
        }
        // Stop simulation when stabilized
        if (simulation.alpha() < 0.001) {
            simulation.stop();
            console.log("Simulation stabilized.");
        }
    });
    simulation.force("link").links(links);
    simulation.alpha(1).restart(); // Restart with alpha=1
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

// Update network based on current layer
function updateNetwork() {
    filterByLayer();
    startSimulation();
}

// Filter by domain (for Layer 1)
function filterNetworkByDomain(domain) {
    if (currentLayer !== '1') return;
    const domainNodes = new Set(
        nodes.filter(node => node['Core Domain'] === domain)
             .map(node => node.id)
    );
    console.log(`Filtered by domain: ${domain}, nodes: ${domainNodes.size}`);
    // For Canvas, we don't update opacity here since we redraw everything
}

// Initialize the network when the page loads
window.onload = initNetwork;

// Add click event to Canvas for node details
canvas.on("click", (event) => {
    const transform = d3.zoomTransform(canvas.node());
    const [x, y] = d3.pointer(event);

    // Find the clicked node
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
