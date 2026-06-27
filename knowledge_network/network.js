// network.js
// Global variables (declared in MLKN-hypergraph.html to avoid duplication)
let svg, simulation, nodes, links, nodeElements, linkElements;

// Colorblind-friendly palette (ColorBrewer)
const layerColors = {
    '1': '#0173B2', // Core Domains (Blue)
    '2': '#029E73', // Disciplines (Green)
    '3': '#D55E00', // Subdisciplines (Orange)
    '4': '#CC78BC', // Thematic Domains (Purple)
    '5': '#CA9161', // Concepts (Brown)
    'all': '#949494' // All Layers (Gray)
};

// Determine the correct data URL based on the environment
let dataUrl;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local testing
    dataUrl = './data/full_hierarchy.json';
} else {
    // GitHub Pages
    dataUrl = '/knowledge_network/data/full_hierarchy.json';
}

// Initialize the network
function initNetwork() {
    // Check if D3.js is loaded
    if (!window.d3) {
        document.getElementById('network-error').style.display = 'block';
        document.querySelector('#network-placeholder i').style.display = 'none';
        return;
    }

    svg = d3.select("#network-svg");
    svg.selectAll("*").remove();
    const g = svg.append("g");

    // Zoom/pan behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => { g.attr("transform", event.transform); });
    svg.call(zoom);

    // Load data
    loadData();
}

// Load data from JSON
function loadData() {
    console.log('Fetching data from:', dataUrl);  // Debug: Log the URL

    // Show loading progress
    document.getElementById('network-placeholder').innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Loading knowledge network...</p>
        <div style="width: 100%; background: #333; border-radius: 4px; margin-top: 10px;">
            <div id="progress-bar" style="width: 20%; height: 4px; background: #1ABC9C; border-radius: 4px;"></div>
        </div>
        <p style="font-size: 0.9em; color: var(--text2); margin-top: 10px;">
            Testing URL: <a href="${dataUrl}" target="_blank" style="color: var(--link);">${dataUrl}</a>
        </p>
    `;

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update progress bar
            document.getElementById('progress-bar').style.width = '100%';

            if (!data || !data.nodes || !data.links) {
                throw new Error('Invalid data format: expected { nodes, links }');
            }
            nodes = data.nodes;
            links = data.links;
            filterByLayer();
            startSimulation();
        })
        .catch(error => {
            console.error("Error loading data:", error);
            document.getElementById('network-placeholder').innerHTML = `
                <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
                <p>Error loading network data.</p>
                <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                    URL: <a href="${dataUrl}" target="_blank" style="color: var(--link);">${dataUrl}</a><br>
                    ${error.message}
                </p>
                <p style="font-size: 0.8em; color: var(--text2); margin-top: 10px;">
                    <strong>Note:</strong> Click the URL above to test it directly.
                </p>
            `;
        });
}

// Filter nodes/links by current layer
function filterByLayer() {
    if (currentLayer === 'all') return;

    const layerNodes = new Set(nodes.filter(node => node.layer == currentLayer).map(node => node.id));
    nodes = nodes.filter(node => node.layer == currentLayer);
    links = links.filter(link => layerNodes.has(link.source) && layerNodes.has(link.target));
}

// Start the force simulation
function startSimulation() {
    // Clear previous elements
    if (nodeElements) nodeElements.remove();
    if (linkElements) linkElements.remove();

    // Adjust force parameters for large networks
    const nodeSize = window.innerWidth < 768 ? 5 : 10;
    const chargeStrength = window.innerWidth < 768 ? -100 : -200;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(30))
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(svg.node().width / 2, svg.node().height / 2))
        .force("collision", d3.forceCollide().radius(nodeSize * 2));

    // Draw links
    linkElements = g.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1);

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
        .attr("r", d => Math.max(3, Math.min(15, d.size ? d.size / 100 : nodeSize)))
        .attr("fill", d => layerColors[d.layer] || "#ccc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

    // Add labels (hidden on mobile for performance)
    if (window.innerWidth > 768) {
        nodeElements.append("text")
            .text(d => d.name || d.id)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("dy", 20);
    }

    // Tooltips
    nodeElements.on("mouseover", function(event, d) {
        const tooltip = d3.select("#network-container")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
            .html(`
                <strong>${d.name || d.id}</strong><br>
                Layer: ${d.layer || 'N/A'}<br>
                Size: ${d.size || 'N/A'}
            `);
    }).on("mouseout", function() {
        d3.select(".tooltip").remove();
    });

    // Update positions on each tick
    simulation.on("tick", () => {
        linkElements
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        nodeElements
            .attr("transform", d => `translate(${d.x},${d.y})`);
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
    if (currentLayer !== '1') return; // Only for Layer 1
    const domainNodes = new Set(nodes.filter(node => node.domain === domain).map(node => node.id));
    nodeElements.style("opacity", d => domainNodes.has(d.id) ? 1 : 0.2);
    linkElements.style("opacity", d => domainNodes.has(d.source) && domainNodes.has(d.target) ? 1 : 0.2);
}

// Load disciplinary network
function loadDisciplinaryNetworkInJS(discipline) {
    currentNetworkType = 'disciplinary';
    const dataUrl = `/knowledge_network/data/${discipline}.json`;

    document.getElementById('network-container').style.display = 'block';
    document.getElementById('disciplinary-networks-section').style.display = 'none';

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.nodes || !data.links) {
                throw new Error('Invalid data format: expected { nodes, links }');
            }
            nodes = data.nodes;
            links = data.links;
            startSimulation();
        })
        .catch(error => {
            console.error(`Error loading ${discipline} network:`, error);
            document.getElementById('network-placeholder').innerHTML = `
                <i class="fas fa-exclamation-triangle" style="color: #FF6347; font-size: 24px;"></i>
                <p>Error loading ${discipline} network.</p>
                <p style="font-size: 0.9em; margin-top: 10px; color: var(--text2);">
                    URL: <a href="${dataUrl}" target="_blank" style="color: var(--link);">${dataUrl}</a><br>
                    ${error.message}
                </p>
            `;
        });
}
