// Global variables for D3.js visualization
let simulation, nodes, links, canvas, ctx, currentLayer = 'all';
let tickCount = 0; // Added for throttling

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
    'connection': '#FFFFFF' // White for dark mode
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
    try {
        if (!window.d3) {
            document.getElementById('network-error').style.display = 'block';
            document.querySelector('#network-placeholder i').style.display = 'none';
            return;
        }

        // Remove SVG and use only Canvas
        const networkContainer = d3.select("#network-container");
        networkContainer.select("svg").remove(); // Remove SVG to avoid conflicts

        // Create Canvas for rendering
        canvas = networkContainer.append("canvas")
            .attr("width", networkContainer.node().offsetWidth)
            .attr("height", networkContainer.node().offsetHeight)
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);
        ctx = canvas.node().getContext("2d");

        // Zoom/pan behavior
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                drawCanvas(); // Redraw Canvas on zoom/pan
            });
        networkContainer.call(zoom); // Apply zoom to the container

        // Load data
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

// Function to draw nodes and edges on Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.node().width, canvas.node().height);

    // Save context state
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
            ctx.strokeStyle = edgeTypeColors[d.type] || "#FFFFFF";
            ctx.lineWidth = Math.max(0.5, d.weight / 10) * transform.k;
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
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1.5 * transform.k;
            ctx.stroke();
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

        // Debug: Log all Layer values in nodes
        console.log("DEBUG: All Layer values in nodes:", [...new Set(nodes.map(n => n.Layer))]);

        // Initialize layer filter
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
    console.log("DEBUG: Current layer:", currentLayer, "→ Layer name:", layerName);

    // Debug: Log the first 5 Layer values in nodes
    console.log("DEBUG: Sample Layer values:", nodes.slice(0, 5).map(n => n.Layer));

    if (currentLayer === 'all') {
        simulation = startSimulation();
        return;
    }

    // Filter nodes by Layer
    const filteredNodes = nodes.filter(node => node.Layer === layerName);
    const layerNodes = new Set(filteredNodes.map(node => node.id));

    // Filter links where BOTH source and target are in the filtered nodes
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

// Start the force simulation
function startSimulation() {
    // Clear previous simulation
    if (simulation) simulation.stop();

    // Get container dimensions
    const networkContainer = d3.select("#network-container");
    const width = networkContainer.node().offsetWidth;
    const height = networkContainer.node().offsetHeight;

    // Balanced parameters for 31,590 nodes
    const chargeStrength = -1000;  // Weaker repulsion
    const linkDistance = 100;       // Shorter links
    const collisionRadius = 20;    // Smaller collision radius

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.02)  // Slower cooling for stability
        .velocityDecay(0.7);  // Higher velocity decay

    // Restart simulation with initial positions
    tickCount = 0; // Reset tick count
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        // Redraw every 3 ticks (throttle for performance)
        if (tickCount % 3 === 0) {
            drawCanvas();
        }
        // Stop simulation when stabilized (lower alpha threshold)
        if (simulation.alpha() < 0.001) {
            simulation.stop();
            console.log("Simulation stabilized. Alpha:", simulation.alpha());
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
}

// Initialize the network when the page loads
window.onload = initNetwork;
