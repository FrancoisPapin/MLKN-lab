// Global variables for D3.js visualization
let simulation, nodes, links, originalNodes, originalLinks, canvas, ctx, currentLayer = 'all', zoom;
let tickCount = 0;
let isMobile = false;
let popup; // Lightweight popup for node details

// Initialize mobile detection
function detectMobile() {
    isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        console.warn("Mobile device detected. Simplifying network for performance.");
    }
}

// Colorblind-friendly palettes
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
    'connection': '#FF00FF'
};

// Map layer numbers to EXACT layer names in your JSON
const layerMap = {
    '1': 'Core Domain',
    '2': 'Academic Discipline',
    '3': 'Academic Subdiscipline',
    '4': 'Core Thematic Domain',
    '5': 'Main Concept'
};

// Data URLs
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

        // Create lightweight popup (non-modal)
        popup = document.createElement('div');
        popup.id = 'node-popup';
        popup.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong id="popup-title" style="color: #1ABC9C;"></strong>
                <button id="popup-close" style="background: none; border: none; color: #FFFFFF; cursor: pointer; font-size: 16px;">Close</button>
            </div>
            <p id="popup-layer" style="margin: 5px 0;"></p>
            <p id="popup-domain" style="margin: 5px 0;"></p>
        `;
        popup.style.position = 'fixed';
        popup.style.zIndex = '10000';
        popup.style.background = 'rgba(0, 0, 0, 0.95)';
        popup.style.color = '#FFFFFF';
        popup.style.padding = '15px';
        popup.style.borderRadius = '8px';
        popup.style.fontFamily = 'var(--mono)';
        popup.style.fontSize = '12px';
        popup.style.maxWidth = '300px';
        popup.style.display = 'none';
        popup.style.pointerEvents = 'auto';
        document.body.appendChild(popup);

        // Close popup when clicking the close button
        document.getElementById('popup-close').addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (popup && !popup.contains(e.target) && e.target !== canvas.node()) {
                popup.style.display = 'none';
            }
        });

        const networkContainer = d3.select("#network-container");
        networkContainer.select("canvas").remove();

        // Set Canvas dimensions
        const containerWidth = networkContainer.node().offsetWidth;
        const containerHeight = networkContainer.node().offsetHeight;
        canvas = networkContainer.append("canvas")
            .attr("width", containerWidth)
            .attr("height", containerHeight)
            .style("width", `${containerWidth}px`)
            .style("height", `${containerHeight}px`)
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);

        ctx = canvas.node().getContext("2d");

        // Initialize zoom with narrower range and interpolation
        zoom = d3.zoom()
            .scaleExtent([0.5, 2]) // Narrower range for more precise zoom
            .interpolate(d3.interpolate) // Smooth zoom transitions
            .on("zoom", () => {
                if (isMobile && tickCount % 3 !== 0) return;
                drawCanvas();
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                detectMobile();
                const newWidth = networkContainer.node().offsetWidth;
                const newHeight = networkContainer.node().offsetHeight;
                canvas
                    .attr("width", newWidth)
                    .attr("height", newHeight)
                    .style("width", `${newWidth}px`)
                    .style("height", `${newHeight}px`);
                if (simulation) {
                    drawCanvas();
                    fitToViewport();
                }
            }, 200);
        });

        // Initialize click event for node details
        canvas.on("click", handleNodeClick);

        loadData();
    } catch (error) {
        console.error("Error in initNetwork:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
            <p>Error initializing network.</p>
        `;
    }
}

// Handle node clicks (show popup)
function handleNodeClick(event) {
    if (!nodes || nodes.length === 0) return;
    const transform = d3.zoomTransform(canvas.node());
    const [x, y] = d3.pointer(event);

    const clickedNode = nodes.find(node => {
        if (!node.x || !node.y) return false;
        const nodeX = node.x * transform.k + transform.x;
        const nodeY = node.y * transform.k + transform.y;
        const radius = Math.max(4, Math.min(15, node.size ? node.size / 100 : 12)) * transform.k;
        const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
        return distance <= radius;
    });

    if (clickedNode) {
        document.getElementById('popup-title').textContent = clickedNode.Node || clickedNode.id;
        document.getElementById('popup-layer').innerHTML = `<strong>Layer:</strong> ${clickedNode.Layer}`;
        document.getElementById('popup-domain').innerHTML = `<strong>Domain:</strong> ${clickedNode['Core Domain'] || 'N/A'}`;

        popup.style.left = `${event.clientX + 10}px`;
        popup.style.top = `${event.clientY + 10}px`;
        popup.style.display = 'block';
        event.stopPropagation();
    }
}

// Fit the network to the viewport
function fitToViewport() {
    if (!nodes || nodes.length === 0 || !canvas) return;

    const bounds = {
        x1: Infinity, y1: Infinity,
        x2: -Infinity, y2: -Infinity
    };
    nodes.forEach(d => {
        if (d.x && d.y) {
            bounds.x1 = Math.min(bounds.x1, d.x);
            bounds.y1 = Math.min(bounds.y1, d.y);
            bounds.x2 = Math.max(bounds.x2, d.x);
            bounds.y2 = Math.max(bounds.y2, d.y);
        }
    });

    const dx = bounds.x2 - bounds.x1;
    const dy = bounds.y2 - bounds.y1;
    const centerX = (bounds.x1 + bounds.x2) / 2;
    const centerY = (bounds.y1 + bounds.y2) / 2;

    const padding = Math.max(dx, dy) * (isMobile ? 0.8 : 0.5); // More padding on mobile
    const scale = Math.min(
        canvas.node().width / (dx + padding),
        canvas.node().height / (dy + padding)
    );

    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.max(scale, 0.5)) // Minimum scale of 0.5
        .translate(-centerX, -centerY);

    d3.select("#network-container").call(zoom.transform, transform);
}

// Draw nodes and edges on Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0 || !canvas) return;

    // Throttle drawing on mobile
    if (isMobile && tickCount % 5 !== 0) return;

    ctx.clearRect(0, 0, canvas.node().width, canvas.node().height);
    ctx.save();

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
            ctx.strokeStyle = edgeTypeColors[d.type] || "#FF00FF";
            ctx.lineWidth = Math.max(0.3, d.weight / 20 * transform.k); // Thinner edges
            ctx.stroke();
        }
    });

    // Draw nodes on top
    ctx.globalCompositeOperation = 'source-over';
    nodes.forEach(d => {
        if (d.x && d.y) {
            const radius = Math.max(2, Math.min(8, d.size ? d.size / 150 : 5)) * transform.k;
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = layerColors[d.Layer] || "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 0.5 * transform.k;
            ctx.stroke();

            // Only show labels when zoomed in sufficiently (>1.0x)
            if (transform.k > 1.0) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${Math.max(8, 10 * transform.k)}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 2;
                ctx.fillText(d.Node || d.id, d.x, d.y);
                ctx.shadowColor = 'transparent';
            }
        }
    });

    ctx.restore();
}

// Load data from JSON files
function loadData() {
    console.log('Fetching nodes and edges...');
    document.getElementById('network-placeholder').innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Loading knowledge network...</p>
    `;

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
        originalNodes = nodesData.nodes;
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

// Filter nodes/links by current layer
function filterByLayer() {
    if (!simulation) return;
    simulation.stop();

    const layerName = layerMap[currentLayer] || currentLayer;
    console.log(`Filtering to layer: ${currentLayer} (${layerName})`);

    if (currentLayer === 'all') {
        nodes = originalNodes;
        links = originalLinks;
    } else {
        // For individual layers, show nodes from that layer AND all connected nodes
        const layerNodeIds = new Set(originalNodes.filter(node => node.Layer === layerName).map(node => node.id));
        const connectedNodeIds = new Set();

        // Find all nodes connected to the layer nodes
        originalLinks.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            if (layerNodeIds.has(sourceId)) connectedNodeIds.add(targetId);
            if (layerNodeIds.has(targetId)) connectedNodeIds.add(sourceId);
        });

        // Combine layer nodes and connected nodes
        const allRelevantNodeIds = new Set([...layerNodeIds, ...connectedNodeIds]);
        nodes = originalNodes.filter(node => allRelevantNodeIds.has(node.id));

        // Filter edges where at least one end is in the relevant nodes
        links = originalLinks.filter(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            return allRelevantNodeIds.has(sourceId) || allRelevantNodeIds.has(targetId);
        });

        console.log(`Filtered to ${nodes.length} nodes and ${links.length} edges.`);
    }

    // Restart simulation with filtered data
    if (simulation) simulation.stop();
    simulation = startSimulation();
    setTimeout(fitToViewport, 100);
}

// Start the force simulation
function startSimulation() {
    if (!canvas) return;
    if (simulation) simulation.stop();

    const width = canvas.node().width;
    const height = canvas.node().height;

    // Adaptive force parameters
    const chargeStrength = isMobile ? -50 : -200; // Much weaker repulsion
    const linkDistance = isMobile ? 50 : 80; // Shorter links
    const collisionRadius = isMobile ? 10 : 15; // Larger collision radius

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1.5)) // Stronger center
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.1) // Faster cooling
        .velocityDecay(0.9); // More damping

    tickCount = 0;
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        if (tickCount % 3 === 0) {
            drawCanvas();
        }
        if (simulation.alpha() < 0.005) { // Higher threshold for faster stabilization
            simulation.stop();
            fitToViewport();
            console.log("Simulation stabilized and fitted to viewport.");
        }
    });
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
}

// Update network based on current layer
function updateNetwork() {
    filterByLayer();
    startSimulation();
}

// Initialize the network when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initNetwork);
