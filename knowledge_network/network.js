// Global variables for D3.js visualization
let simulation, nodes, links, originalNodes, originalLinks, canvas, ctx, currentLayer = 'all', zoom;
let tickCount = 0;
let isMobile = false;
let focusedNode = null; // For focus mode

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

        // Set Canvas dimensions (fill container)
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

        // Initialize zoom with broader range
        zoom = d3.zoom()
            .scaleExtent([0.01, 10])  // Allow 100x zoom-out
            .on("zoom", () => {
                drawCanvas();
            });
        networkContainer.call(zoom);
        networkContainer.call(zoom.transform, d3.zoomIdentity); // Reset zoom to 1x

        // Handle window resize
        window.addEventListener('resize', () => {
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
                fitToViewport(); // Re-fit on resize
            }
        });

        // Initialize click event AFTER canvas is created
        canvas.on("click", handleNodeClick);

        // Add tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = 'node-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.display = 'none';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#FFFFFF';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        tooltip.style.maxWidth = '300px';
        tooltip.style.fontFamily = 'var(--mono)';
        tooltip.style.fontSize = '12px';
        document.getElementById('network-container').appendChild(tooltip);

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

// Helper function to check if a node is a neighbor of the focused node
function isNeighbor(nodeId, focusedNodeId) {
    if (!focusedNodeId) return true; // No focus mode: show all
    return links.some(link =>
        (link.source === nodeId && link.target === focusedNodeId) ||
        (link.source === focusedNodeId && link.target === nodeId)
    );
}

// Function to calculate node radius based on layer and degree
function getNodeRadius(d) {
    const baseSize = d.size ? d.size / 100 : 12;
    const layer = d.Layer;
    const degree = d.degree || 0;

    // Hierarchical sizing: Layer 1 = largest, Layer 5 = smallest
    const layerSizeMultiplier = {
        'Core Domain': 2.0,          // Layer 1: 2x larger
        'Academic Discipline': 1.5,  // Layer 2: 1.5x larger
        'Academic Subdiscipline': 1.2, // Layer 3: 1.2x larger
        'Core Thematic Domain': 1.0, // Layer 4: default
        'Main Concept': 0.8          // Layer 5: 0.8x smaller
    };
    const multiplier = layerSizeMultiplier[layer] || 1.0;

    // Degree-based sizing: nodes with more connections are larger
    const degreeMultiplier = 1 + (degree / 50); // Scale by degree (adjust divisor as needed)
    const radius = Math.max(6, Math.min(20, baseSize * multiplier * degreeMultiplier)) * transform.k;

    return radius;
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

    // Adjust padding based on node count (smaller networks need more padding)
    const nodeCount = nodes.length;
    const padding = nodeCount < 100 ? Math.max(dx, dy) * 0.5 : Math.max(dx, dy) * 0.3;

    // Calculate scale to fit the network with padding
    const scale = Math.min(
        canvas.node().width / (dx + padding),
        canvas.node().height / (dy + padding)
    );

    // Center the network in the Canvas
    const transform = d3.zoomIdentity
        .translate(canvas.node().width / 2, canvas.node().height / 2)
        .scale(Math.max(scale, 0.01))  // Ensure minimum scale
        .translate(-centerX, -centerY);

    d3.select("#network-container").call(zoom.transform, transform);
}

// Function to draw nodes and edges on Canvas
function drawCanvas() {
    if (!ctx || !nodes || nodes.length === 0 || !canvas) return;

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
            // In focus mode, only draw edges connected to the focused node
            if (focusedNode && d.source !== focusedNode.id && d.target !== focusedNode.id) {
                return; // Skip this edge
            }
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
            // In focus mode, only draw the focused node and its neighbors
            if (focusedNode && d.id !== focusedNode.id && !isNeighbor(d.id, focusedNode.id)) {
                return; // Skip this node
            }

            const radius = getNodeRadius(d);
            ctx.beginPath();
            ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);

            // Highlight focused node
            if (focusedNode && d.id === focusedNode.id) {
                ctx.shadowColor = '#FFFFFF';
                ctx.shadowBlur = 20;
            }

            ctx.fillStyle = layerColors[d.Layer] || "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 1.5 * transform.k;
            ctx.stroke();

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;

            // Draw labels (if zoomed in)
            if (transform.k > 0.5 && (!isMobile || transform.k > 1.0)) {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${Math.max(12, 14 * transform.k)}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                // Add text shadow for readability
                ctx.shadowColor = '#000000';
                ctx.shadowBlur = 3;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.fillText(d.Node || d.id, d.x, d.y);
                // Reset shadow
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
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

        // Compute degree for each node
        const degreeMap = {};
        edgesData.edges.forEach(link => {
            degreeMap[link.source] = (degreeMap[link.source] || 0) + 1;
            degreeMap[link.target] = (degreeMap[link.target] || 0) + 1;
        });
        originalNodes.forEach(node => {
            node.degree = degreeMap[node.id] || 0; // Add degree to node
        });

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
    if (!simulation) return;
    simulation.stop();

    const layerName = layerMap[currentLayer] || currentLayer;
    console.log(`Filtering to layer: ${currentLayer} (${layerName})`);

    if (currentLayer === 'all') {
        // Reset to full dataset
        nodes = originalNodes;
        links = originalLinks;
        focusedNode = null; // Exit focus mode
    } else {
        // Filter from ORIGINAL data (not global nodes/links)
        const filteredNodes = originalNodes.filter(node => node.Layer === layerName);
        const layerNodes = new Set(filteredNodes.map(node => node.id));
        nodes = filteredNodes;
        links = originalLinks.filter(link =>
            layerNodes.has(link.source) && layerNodes.has(link.target)
        );
        console.log(`Filtered to ${nodes.length} nodes and ${links.length} edges.`);
        console.log("Sample nodes:", nodes.slice(0, 3).map(n => n.Node || n.id));
        focusedNode = null; // Exit focus mode on layer change
    }

    // Restart simulation with NEW data
    if (simulation) simulation.stop();
    simulation = startSimulation();
    setTimeout(() => {
        fitToViewport(); // Fit after simulation starts
        drawCanvas(); // Force a redraw immediately
    }, 100);
}

// Start the force simulation
function startSimulation() {
    if (!canvas) return;
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
            fitToViewport(); // Fit AFTER stabilization
            console.log("Simulation stabilized and fitted to viewport.");
        }
    });
    simulation.force("link").links(links);
    simulation.alpha(1).restart(); // Restart with alpha=1

    // Force a redraw immediately for small networks
    if (nodes.length < 100) {
        setTimeout(drawCanvas, 100);
    }
}

// Handle node clicks (defined after canvas is created)
function handleNodeClick(event) {
    if (!nodes || nodes.length === 0) return;
    const transform = d3.zoomTransform(canvas.node());
    const [x, y] = d3.pointer(event);

    const clickedNode = nodes.find(node => {
        if (!node.x || !node.y) return false;
        const nodeX = node.x * transform.k + transform.x;
        const nodeY = node.y * transform.k + transform.y;
        const radius = getNodeRadius(node) * transform.k;
        const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
        return distance <= radius;
    });

    if (clickedNode) {
        // Toggle focus mode
        if (focusedNode && focusedNode.id === clickedNode.id) {
            focusedNode = null; // Click again to exit focus mode
        } else {
            focusedNode = clickedNode;
        }

        // Show tooltip
        const tooltip = document.getElementById('node-tooltip');
        tooltip.innerHTML = `
            <h3 style="margin: 0 0 5px; color: ${layerColors[clickedNode.Layer]};">
                ${clickedNode.Node || clickedNode.id}
            </h3>
            <p><strong>Layer:</strong> ${clickedNode.Layer}</p>
            <p><strong>Domain:</strong> ${clickedNode['Core Domain'] || 'N/A'}</p>
            <p><strong>Degree:</strong> ${clickedNode.degree || 0}</p>
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;

        // Hide tooltip on mouseout
        canvas.on('mousemove', () => {
            tooltip.style.display = 'none';
        });
    }
    drawCanvas();
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

// Initialize the network when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initNetwork);
