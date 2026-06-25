// network.js
let svg, simulation, nodes, links, nodeElements, linkElements;
let currentLayer = 'all';
let currentNetworkType = 'interdisciplinary';

const layerColors = {
    '1': '#FF6347', // Core Domains
    '2': '#2ECC71', // Disciplines
    '3': '#50C878', // Subdisciplines
    '4': '#F39C12', // Thematic Domains
    '5': '#9B59B6', // Concepts
    'all': '#1ABC9C'
};

// Initialize the network
function initNetwork() {
    svg = d3.select("#network-svg");
    svg.selectAll("*").remove();
    const g = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => { g.attr("transform", event.transform); });
    svg.call(zoom);

    loadData();
}

// Load data
function loadData() {
    const dataUrl = '../knowledge_network/data/full_hierarchy.json';
    d3.json(dataUrl).then(data => {
        nodes = data.nodes || [];
        links = data.links || [];

        if (currentLayer !== 'all') {
            nodes = nodes.filter(node => node.layer == currentLayer);
            links = links.filter(link =>
                nodes.some(node => node.id === link.source) &&
                nodes.some(node => node.id === link.target)
            );
        }
        startSimulation();
    }).catch(error => {
        console.error("Error loading data:", error);
        document.getElementById('network-placeholder').innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error loading network data.</p>
        `;
    });
}

// Start simulation
function startSimulation() {
    if (nodeElements) nodeElements.remove();
    if (linkElements) linkElements.remove();

    simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(svg.node().width / 2, svg.node().height / 2))
        .force("collision", d3.forceCollide().radius(20));

    linkElements = g.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1);

    nodeElements = g.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    nodeElements.append("circle")
        .attr("r", d => Math.max(5, Math.min(20, d.size ? d.size / 100 : 10)))
        .attr("fill", d => layerColors[d.layer] || "#ccc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

    nodeElements.append("text")
        .text(d => d.name || d.id)
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("dy", 30);

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

    simulation.on("tick", () => {
        linkElements
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        nodeElements
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

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

// Update network
function updateNetwork() {
    if (!nodes || !links) return;
    startSimulation();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initNetwork);
