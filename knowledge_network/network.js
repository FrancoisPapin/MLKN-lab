// network.js
// Global variables for D3.js visualization
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
    dataUrl = './data/full_hierarchy.json';
} else {
    dataUrl = '/MLKN-lab/knowledge_network/data/full_hierarchy.json';
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
    const g = svg.append("g");

    // Zoom/pan behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => { g.attr("transform", event.transform); });
    svg.call(zoom);

    // Load data
    loadData();
}

// Load data from JSON (handles "edges" instead of "links" and fixes "unknown" IDs)
function loadData() {
    console.log('Fetching data from:', dataUrl);

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
            document.getElementById('progress-bar').style.width = '100%';

            // Handle your JSON structure: { nodes: [...], edges: [...] }
            if (data.nodes && data.edges) {
                // Assign unique IDs to nodes (fixes "unknown" duplicates)
                nodes = data.nodes.map((node, index) => ({
                    ...node,
                    id: node.id === "unknown" ? `node_${index}` : node.id
                }));

                // Remap edges to use the new node IDs
                links = data.edges.map(edge => {
                    const sourceNode = data.nodes.find(n => n.name === edge.source || n.Node === edge.source);
                    const targetNode = data.nodes.find(n => n.name === edge.target || n.Node === edge.target);
                    return {
                        ...edge,
                        source: sourceNode ? (sourceNode.id === "unknown" ? `node_${data.nodes.indexOf(sourceNode)}` : sourceNode.id) : edge.source,
                        target: targetNode ? (targetNode.id === "unknown" ? `node_${data.nodes.indexOf(targetNode)}` : targetNode.id) : edge.target
                    };
                });

                // Log the first node and edge for debugging
                console.log("First node (after ID fix):", nodes[0]);
                console.log("First edge (after ID fix):", links[0]);
                console.log("Total nodes:", nodes.length);
                console.log("Total edges:", links.length);

                filterByLayer();
                startSimulation();
            } else {
                throw new Error('Invalid data format: expected { nodes, edges }');
            }
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
                    <strong>Note:</strong> Your JSON uses "edges" instead of "links".
                </p>
            `;
        });
}

// Filter nodes/links by current layer (handles string/number layer values)
function filterByLayer() {
    if (currentLayer === 'all') {
        return;  // Show all nodes/links
    }

    // Convert currentLayer to string for comparison
    const layerStr = String(currentLayer);

    // Filter nodes by layer (using string comparison)
    const layerNodes = new Set(nodes.filter(node => String(node.layer) === layerStr).map(node => node.id));
    nodes = nodes.filter(node => String(node.layer) === layerStr);
    links = links.filter(link => layerNodes.has(link.source) && layerNodes.has(link.target));

    // Debug: Log filtered data
    console.log("Filtered nodes (count):", nodes.length);
    console.log("Filtered links (count):", links.length);
}

// Start the force simulation
function startSimulation() {
    // Clear previous elements
    if (nodeElements) nodeElements.remove();
    if (linkElements) linkElements.remove();

    // Adjust force parameters for large networks
    const nodeSize = window.innerWidth < 768 ? 5 : 10;
    const chargeStrength = window.innerWidth < 768 ? -100 : -150;

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(15))
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

    // Add circles to nodes (use "size" or fallback to default)
    nodeElements.append("circle")
        .attr("r", d => Math.max(3, Math.min(15, d.size ? d.size / 100 : nodeSize)))
        .attr("fill", d => layerColors[d.layer] || "#ccc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

    // Add labels (hidden on mobile for performance)
    if (window.innerWidth > 768) {
        nodeElements.append("text")
            .text(d => d.name || d.Node || d.id)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("dy", 20);
    }

    // Enhanced tooltips with all metadata
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
                <strong>${d.name || d.Node || d.id}</strong><br>
                Layer: ${d.layer || d.Layer || 'N/A'}<br>
                Domain: ${d.domain || d['Core Domain'] || 'N/A'}<br>
                Size: ${d.size || 'N/A'}<br>
                Description: ${d.description || 'N/A'}
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
    if (currentLayer !== '1') return;
    const domainNodes = new Set(nodes.filter(node => node.domain === domain || node['Core Domain'] === domain).map(node => node.id));
    nodeElements.style("opacity", d => domainNodes.has(d.id) ? 1 : 0.2);
    linkElements.style("opacity", d => domainNodes.has(d.source) && domainNodes.has(d.target) ? 1 : 0.2);
}

// Load disciplinary network
function loadDisciplinaryNetworkInJS(discipline) {
    currentNetworkType = 'disciplinary';
    const dataUrl = `/MLKN-lab/knowledge_network/data/${discipline}.json`;

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
            if (data.nodes && data.edges) {
                // Apply the same ID fixes for disciplinary networks
                nodes = data.nodes.map((node, index) => ({
                    ...node,
                    id: node.id === "unknown" ? `node_${index}` : node.id
                }));
                links = data.edges.map(edge => {
                    const sourceNode = data.nodes.find(n => n.name === edge.source || n.Node === edge.source);
                    const targetNode = data.nodes.find(n => n.name === edge.target || n.Node === edge.target);
                    return {
                        ...edge,
                        source: sourceNode ? (sourceNode.id === "unknown" ? `node_${data.nodes.indexOf(sourceNode)}` : sourceNode.id) : edge.source,
                        target: targetNode ? (targetNode.id === "unknown" ? `node_${data.nodes.indexOf(targetNode)}` : targetNode.id) : edge.target
                    };
                });
            } else {
                throw new Error('Invalid data format: expected { nodes, edges }');
            }
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
