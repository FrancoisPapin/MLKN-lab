// Global variables for D3.js visualization
let svg, simulation, nodes, links, nodeElements, linkElements, g, currentLayer = 'all';

// Colorblind-friendly palettes
const layerColors = {
    '1': '#0173B2', // Core Domains (Blue)
    '2': '#029E73', // Disciplines (Green)
    '3': '#D55E00', // Subdisciplines (Orange)
    '4': '#CC78BC', // Thematic Domains (Purple)
    '5': '#CA9161', // Concepts (Brown)
    'all': '#949494', // All Layers (Gray)
    'Core Domain': '#0173B2',
    'Academic Discipline': '#029E73',
    'Academic Subdiscipline': '#D55E00',
    'Core Thematic Domain': '#CC78BC',
    'Main Concept': '#CA9161'
};

const edgeTypeColors = {
    'CoreDomain_to_AcademicDiscipline': '#0173B2', // Blue
    'AcademicDiscipline_to_Subdiscipline': '#029E73', // Green
    'Subdiscipline_to_Topic': '#D55E00', // Orange
    'Topic_to_Concept': '#CC78BC', // Purple
    'connection': '#FFFFFF' // White for dark mode
};

// Map layer numbers to layer names
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
    if (!window.d3) {
        document.getElementById('network-error').style.display = 'block';
        document.querySelector('#network-placeholder i').style.display = 'none';
        return;
    }

    svg = d3.select("#network-svg");
    svg.selectAll("*").remove();
    g = svg.append("g");

    // Zoom/pan behavior with LoD for edges
    const zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
            const k = event.transform.k;
            if (linkElements) {
                linkElements.style("display", k > 0.3 ? "block" : "none");
            }
        });
    svg.call(zoom);

    // Load data
    loadData();
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

    // Debug node_0 and node_1421
    const node0 = nodes.find(n => n.id === 'node_0');
    const node1421 = nodes.find(n => n.id === 'node_1421');
    console.log("DEBUG: node_0:", {
      id: node0?.id,
      name: node0?.name,
      Layer: node0?.Layer,
      layer: node0?.layer
    });
    console.log("DEBUG: node_1421:", {
      id: node1421?.id,
      name: node1421?.name,
      Layer: node1421?.Layer,
      layer: node1421?.layer
    });

    if (currentLayer === 'all') {
        simulation = startSimulation();
        return;
    }

    const layerNodes = new Set(
        nodes.filter(node => (node.Layer || node.layer) === layerName)
             .map(node => node.id)
    );
    console.log("DEBUG: Nodes in layer", layerName, ":", layerNodes.size);

    const filteredNodes = nodes.filter(node => (node.Layer || node.layer) === layerName);
    const filteredLinks = links.filter(link => layerNodes.has(link.source) && layerNodes.has(link.target));

    nodes = filteredNodes;
    links = filteredLinks;

    console.log(`Filtered to layer ${currentLayer} (${layerName}): ${nodes.length} nodes, ${links.length} edges.`);
    simulation = startSimulation();
}

// Start the force simulation
function startSimulation() {
    // Clear previous elements
    if (nodeElements) nodeElements.remove();
    if (linkElements) linkElements.remove();

    // Adjust force parameters for large networks
    const nodeSize = window.innerWidth < 768 ? 6 : 12;
    const chargeStrength = window.innerWidth < 768 ? -800 : -1000;
    const linkDistance = window.innerWidth < 768 ? 50 : 100;
    const collisionRadius = window.innerWidth < 768 ? 15 : 20;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(svg.node().width / 2, svg.node().height / 2))
        .force("collision", d3.forceCollide().radius(collisionRadius))
        .alphaDecay(0.01)  // Very slow cooling for stability
        .velocityDecay(0.8);  // Higher velocity decay

    // Draw links with edge type colors
    linkElements = g.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "#FF0000")  // Bright red for debugging
        .attr("stroke-opacity", 1.0)
        .attr("stroke-width", 3)  // Thick edges for visibility
        .style("display", "block");  // Show all edges

    // Draw nodes
    nodeElements = g.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Add circles to nodes
    nodeElements.append("circle")
        .attr("r", d => Math.max(6, Math.min(20, d.size ? d.size / 50 : nodeSize)))
        .attr("fill", d => {
            const layer = d.Layer || d.layer;
            return layerColors[layer] || "#FFFFFF";
        })
        .attr("stroke", "#000000")
        .attr("stroke-width", 2);

    // Add labels (hidden on mobile for performance)
    if (window.innerWidth > 768) {
        nodeElements.append("text")
            .text(d => d.name || d.Node || d.id)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("dy", 20)
            .attr("fill", "#FFFFFF");  // White text for dark mode
    }

    // Enhanced tooltips
    nodeElements.on("mouseover", function(event, d) {
        nodeElements.style("opacity", 0.2);
        linkElements.style("opacity", 0.2);
        d3.select(this).style("opacity", 1);
        linkElements
            .filter(l => l.source.id === d.id || l.target.id === d.id)
            .style("opacity", 1)
            .style("display", "block");
        nodeElements
            .filter(n => n.id === d.id ||
                        links.some(l => l.source.id === n.id || l.target.id === n.id))
            .style("opacity", 1);
    })
    .on("mouseout", function() {
        nodeElements.style("opacity", 1);
        linkElements.style("opacity", 1);
        d3.select(".tooltip").remove();
    });

    // Update positions on each tick
    simulation.on("tick", () => {
        linkElements
            .attr("x1", d => d.source.x || 0)
            .attr("y1", d => d.source.y || 0)
            .attr("x2", d => d.target.x || 0)
            .attr("y2", d => d.target.y || 0);

        nodeElements
            .attr("transform", d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Hide placeholder
    document.getElementById('network-placeholder').style.display = 'none';
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
        nodes.filter(node => (node.Domain || node.domain) === domain || node['Core Domain'] === domain)
             .map(node => node.id)
    );
    nodeElements.style("opacity", d => domainNodes.has(d.id) ? 1 : 0.2);
    linkElements.style("opacity", d => domainNodes.has(d.source) && domainNodes.has(d.target) ? 1 : 0.2)
              .style("display", d => domainNodes.has(d.source) && domainNodes.has(d.target) ? "block" : "none");
}

// Initialize the network when the page loads
window.onload = initNetwork;

// Debug check for Loaddata
.then(([nodesData, edgesData]) => {
    nodes = nodesData.nodes;
    links = edgesData.edges;

    // Debug: Check for invalid edges
    const validNodeIds = new Set(nodes.map(n => n.id));
    const invalidEdges = links.filter(link =>
        !validNodeIds.has(link.source) || !validNodeIds.has(link.target)
    );
    console.log("DEBUG: Invalid edges:", invalidEdges.length);
    if (invalidEdges.length > 0) {
        console.log("Sample invalid edge:", invalidEdges[0]);
    }

    // Debug: Check edges for node_0 and node_1421
    const edgesNode0 = links.filter(link => link.source === 'node_0' || link.target === 'node_0');
    const edgesNode1421 = links.filter(link => link.source === 'node_1421' || link.target === 'node_1421');
    console.log("DEBUG: Edges for node_0:", edgesNode0.length, edgesNode0);
    console.log("DEBUG: Edges for node_1421:", edgesNode1421.length, edgesNode1421);

    // Rest of the code...
    currentLayer = 'all';
    filterByLayer();
    startSimulation();
})
