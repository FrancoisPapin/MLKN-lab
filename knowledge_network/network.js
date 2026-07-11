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
    'connection': '#FF00FF' // Magenta for visibility
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
        popup.style.background = 'rgba(0, 0, 0, 0.9)';
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
        networkContainer.select("canvas").remove(); // Remove existing canvas

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

        // Initialize zoom with narrower range for smoother control
        zoom = d3.zoom()
            .scaleExtent([0.1, 4]) // Narrower range for more precise zoom
            .on("zoom", () => {
                if (isMobile && tickCount % 5 !== 0) return; // Throttle on mobile
                drawCanvas();
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity);

        // Handle window resize (with debounce)
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
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                ${error.message}
            </p>
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

        // Position popup near the clicked node
        popup.style.left = `${event.clientX + 10}px`;
        popup.style.top = `${event.clientY + 10}px`;
        popup.style.display = 'block';
        event.stopPropagation(); // Prevent immediate closure
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

    const padding = Math.max(dx, dy) * 0.5; // Increased padding to 50%
    const scale = Math.min(
        canvas.node().width / (dx + padding),
        canvas.node().height / (dy + padding)
    );

    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.max(scale, 0.1)) // Minimum scale of 0.1
        .translate(-centerX, -centerY);

    d3.select("#network-container").call(zoom.transform, transform);
}

// Draw nodes and edges on Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0 || !canvas) return;

    // Throttle drawing on mobile to avoid crashes
    if (isMobile && tickCount % 10 !== 0) return;

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
            ctx.lineWidth = Math.max(0.5, d.weight / 10 * transform.k);
            ctx.stroke();
        }
    });

    // Draw nodes on top
    ctx.globalCompositeOperation = 'source-over';
    nodes.forEach(d => {
        if (d.x && d.y) {
            const radius = Math.max(2, Math.min(10, d.size ? d.size / 100 : 8)) * transform.k;
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = layerColors[d.Layer] || "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 1 * transform.k;
            ctx.stroke();

            // Only show labels on desktop when zoomed in (>0.5x)
            if (!isMobile && transform.k > 0.5) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${Math.max(10, 12 * transform.k)}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(d.Node || d.id, d.x, d.y);
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
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
            <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                ${error.message}
            </p>
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
        // Filter nodes by layer
        const filteredNodes = originalNodes.filter(node => node.Layer === layerName);
        const layerNodeIds = new Set(filteredNodes.map(node => node.id));

        // Filter edges where both source and target are in the filtered nodes
        links = originalLinks.filter(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            return layerNodeIds.has(sourceId) && layerNodeIds.has(targetId);
        });

        nodes = filteredNodes;
        console.log(`Filtered to ${nodes.length} nodes and ${links.length} edges.`);
    }

    // Restart simulation with filtered data
    if (simulation) simulation.stop();
    simulation = startSimulation();
    setTimeout(() => {
        fitToViewport();
        drawCanvas(); // Force a redraw
    }, 100);
}

// Start the force simulation
function startSimulation() {
    if (!canvas) return;
    if (simulation) simulation.stop();

    const width = canvas.node().width;
    const height = canvas.node().height;

    // Adaptive force parameters for mobile/desktop
    const chargeStrength = isMobile ? -100 : -300; // Weaker repulsion
    const linkDistance = isMobile ? 80 : 120; // Shorter links
    const collisionRadius = isMobile ? 15 : 30; // Larger collision radius

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1.2)) // Stronger center force
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.05) // Slower cooling for stability
        .velocityDecay(0.9); // More damping

    tickCount = 0;
    simulation.nodes(nodes).on("tick", () => {
        tickCount++;
        if (tickCount % 5 === 0) {
            drawCanvas();
        }
        if (simulation.alpha() < 0.001) {
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

// Filter by domain (for Layer 1)
function filterNetworkByDomain(domain) {
    if (currentLayer !== '1') return;
    const domainNodes = new Set(
        nodes.filter(node => node['Core Domain'] === domain)
             .map(node => node.id)
    );
    console.log(`Filtered by domain: ${domain}, nodes: ${domainNodes.size}`);
}

// Initialize the network when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initNetwork);
