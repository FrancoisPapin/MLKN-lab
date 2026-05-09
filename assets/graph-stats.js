/* MLKN.lab — Graph Statistics (5-Layer Support) | MIT License | François Papin | May 2026 */
'use strict';

var GraphStats = (function() {
  // =============================================
  // 1. ADJACENCY LIST BUILDER (with layer support)
  // =============================================
  function buildAdj(nodes, links) {
    var adj = {}, deg = {}, wDeg = {}, layerDeg = {1:0, 2:0, 3:0, 4:0, 5:0};
    var domainDeg = {}; // Track degrees by domain (FORMAL, NATURAL, etc.)

    // Initialize adjacency list and degree counters
    nodes.forEach(function(n) {
      adj[n.id] = [];
      deg[n.id] = 0;
      wDeg[n.id] = 0;

      // Initialize layer degrees
      if (n.layer && layerDeg[n.layer] !== undefined) {
        layerDeg[n.layer]++;
      }

      // Initialize domain degrees
      if (n.domain) {
        domainDeg[n.domain] = (domainDeg[n.domain] || 0) + 1;
      }
    });

    // Populate adjacency list and degree counters
    links.forEach(function(l) {
      var s = l.source, t = l.target, w = l.weight || 1;
      if (adj[s] && adj[t]) {
        adj[s].push({node: t, w: w});
        adj[t].push({node: s, w: w});
        deg[s]++;
        deg[t]++;
        wDeg[s] += w;
        wDeg[t] += w;
      }
    });

    return {
      adj: adj,
      deg: deg,
      wDeg: wDeg,
      layerDeg: layerDeg,
      domainDeg: domainDeg
    };
  }

  // =============================================
  // 2. NETWORK-LEVEL STATISTICS (with layer support)
  // =============================================
  function networkStats(nodes, links) {
    var N = nodes.length;
    var E = links.length;
    var maxE = N * (N - 1) / 2;
    var density = maxE > 0 ? E / maxE : 0;

    var s = buildAdj(nodes, links);
    var degs = Object.values(s.deg);
    var avgDeg = degs.reduce(function(a, b) { return a + b; }, 0) / (N || 1);
    var maxDeg = degs.length ? Math.max.apply(null, degs) : 0;

    var wDegs = Object.values(s.wDeg);
    var avgWDeg = wDegs.reduce(function(a, b) { return a + b; }, 0) / (N || 1);

    // --- Layer-specific statistics ---
    var layerStats = {
      1: { count: s.layerDeg[1] || 0, deg: 0, wDeg: 0 },
      2: { count: s.layerDeg[2] || 0, deg: 0, wDeg: 0 },
      3: { count: s.layerDeg[3] || 0, deg: 0, wDeg: 0 },
      4: { count: s.layerDeg[4] || 0, deg: 0, wDeg: 0 },
      5: { count: s.layerDeg[5] || 0, deg: 0, wDeg: 0 }
    };

    // Calculate degree stats per layer
    nodes.forEach(function(n) {
      if (n.layer && layerStats[n.layer]) {
        layerStats[n.layer].deg += s.deg[n.id] || 0;
        layerStats[n.layer].wDeg += s.wDeg[n.id] || 0;
      }
    });

    // Calculate average degree per layer
    for (var layer in layerStats) {
      if (layerStats[layer].count > 0) {
        layerStats[layer].avgDeg = layerStats[layer].deg / layerStats[layer].count;
        layerStats[layer].avgWDeg = layerStats[layer].wDeg / layerStats[layer].count;
      } else {
        layerStats[layer].avgDeg = 0;
        layerStats[layer].avgWDeg = 0;
      }
    }

    // --- Domain-specific statistics ---
    var domainStats = {};
    for (var domain in s.domainDeg) {
      domainStats[domain] = {
        count: s.domainDeg[domain],
        deg: 0,
        wDeg: 0,
        nodes: []
      };
    }

    nodes.forEach(function(n) {
      if (n.domain && domainStats[n.domain]) {
        domainStats[n.domain].deg += s.deg[n.id] || 0;
        domainStats[n.domain].wDeg += s.wDeg[n.id] || 0;
        domainStats[n.domain].nodes.push(n.id);
      }
    });

    // Calculate average degree per domain
    for (var domain in domainStats) {
      if (domainStats[domain].count > 0) {
        domainStats[domain].avgDeg = domainStats[domain].deg / domainStats[domain].count;
        domainStats[domain].avgWDeg = domainStats[domain].wDeg / domainStats[domain].count;
      } else {
        domainStats[domain].avgDeg = 0;
        domainStats[domain].avgWDeg = 0;
      }
    }

    // --- Clustering coefficient ---
    var totalCC = 0;
    nodes.forEach(function(n) {
      var nb = s.adj[n.id].map(function(e) { return e.node; });
      var k = nb.length;
      if (k < 2) return;
      var tri = 0;
      for (var i = 0; i < nb.length; i++) {
        for (var j = i + 1; j < nb.length; j++) {
          if (s.adj[nb[i]] && s.adj[nb[i]].some(function(e) { return e.node === nb[j]; })) {
            tri++;
          }
        }
      }
      totalCC += (2 * tri) / (k * (k - 1));
    });
    var avgCC = totalCC / (N || 1);

    // --- Assortativity ---
    var sumj = 0, sumjk = 0, sumjj = 0, m = E || 1;
    links.forEach(function(l) {
      var dj = s.deg[l.source] || 0;
      var dk = s.deg[l.target] || 0;
      sumj += dj + dk;
      sumjk += dj * dk;
      sumjj += dj * dj + dk * dk;
    });
    var M = 2 * m;
    var r = (sumjk / m - Math.pow(sumj / M, 2)) / (sumjj / M - Math.pow(sumj / M, 2) + 1e-10);

    // --- Diameter (BFS from top-degree node) ---
    var topNode = nodes.reduce(function(a, b) {
      return (s.deg[a.id] || 0) >= (s.deg[b.id] || 0) ? a : b;
    });
    var dist = {}, q = [topNode.id];
    dist[topNode.id] = 0;
    while (q.length) {
      var cur = q.shift();
      (s.adj[cur] || []).forEach(function(e) {
        if (dist[e.node] === undefined) {
          dist[e.node] = dist[cur] + 1;
          q.push(e.node);
        }
      });
    }
    var dVals = Object.values(dist);
    var diameter = dVals.length ? Math.max.apply(null, dVals) : 0;

    // --- Hubs (top 5 by degree) ---
    var pairs = nodes.map(function(n) {
      return { id: n.id, deg: s.deg[n.id] || 0, layer: n.layer || 2, domain: n.domain || 'Unknown' };
    });
    pairs.sort(function(a, b) { return b.deg - a.deg; });
    var hubs = pairs.slice(0, 5);

    // --- Modularity estimate (by cluster) ---
    var Q = 0;
    links.forEach(function(l) {
      var ni = nodes.find(function(n) { return n.id === l.source; });
      var nj = nodes.find(function(n) { return n.id === l.target; });
      if (ni && nj && ni.cluster === nj.cluster) {
        Q += 1 - (s.deg[l.source] || 0) * (s.deg[l.target] || 0) / (2 * E);
      }
    });
    var modularity = Q / (2 * E || 1);

    // --- Degree bins ---
    var bins = {};
    degs.forEach(function(d) {
      bins[d] = (bins[d] || 0) + 1;
    });

    // --- Layer connectivity matrix ---
    // Count links between each pair of layers
    var layerConnectivity = {
      1: {1:0, 2:0, 3:0, 4:0, 5:0},
      2: {1:0, 2:0, 3:0, 4:0, 5:0},
      3: {1:0, 2:0, 3:0, 4:0, 5:0},
      4: {1:0, 2:0, 3:0, 4:0, 5:0},
      5: {1:0, 2:0, 3:0, 4:0, 5:0}
    };

    links.forEach(function(l) {
      var sourceNode = nodes.find(function(n) { return n.id === (typeof l.source === 'object' ? l.source.id : l.source); });
      var targetNode = nodes.find(function(n) { return n.id === (typeof l.target === 'object' ? l.target.id : l.target); });

      if (sourceNode && targetNode && sourceNode.layer && targetNode.layer) {
        layerConnectivity[sourceNode.layer][targetNode.layer]++;
        // Since the graph is undirected, also count the reverse
        if (sourceNode.layer !== targetNode.layer) {
          layerConnectivity[targetNode.layer][sourceNode.layer]++;
        }
      }
    });

    // --- Domain connectivity matrix ---
    var domainConnectivity = {};
    coreDomains.forEach(function(domain1) {
      domainConnectivity[domain1] = {};
      coreDomains.forEach(function(domain2) {
        domainConnectivity[domain1][domain2] = 0;
      });
    });

    links.forEach(function(l) {
      var sourceNode = nodes.find(function(n) { return n.id === (typeof l.source === 'object' ? l.source.id : l.source); });
      var targetNode = nodes.find(function(n) { return n.id === (typeof l.target === 'object' ? l.target.id : l.target); });

      if (sourceNode && targetNode && sourceNode.domain && targetNode.domain) {
        domainConnectivity[sourceNode.domain][targetNode.domain]++;
        // Since the graph is undirected, also count the reverse
        if (sourceNode.domain !== targetNode.domain) {
          domainConnectivity[targetNode.domain][sourceNode.domain]++;
        }
      }
    });

    // Get core domains from nodes (if not provided in parameters)
    var coreDomains = [];
    nodes.forEach(function(n) {
      if (n.domain && !coreDomains.includes(n.domain)) {
        coreDomains.push(n.domain);
      }
    });

    return {
      N: N,
      E: E,
      density: density,
      avgDeg: avgDeg,
      maxDeg: maxDeg,
      avgWDeg: avgWDeg,
      avgCC: avgCC,
      assortativity: r,
      diameter: diameter,
      hubs: hubs,
      modularity: modularity,
      degBins: bins,
      layerStats: layerStats,
      domainStats: domainStats,
      layerConnectivity: layerConnectivity,
      domainConnectivity: domainConnectivity,
      coreDomains: coreDomains
    };
  }

  // =============================================
  // 3. NODE-LEVEL STATISTICS (with layer support)
  // =============================================
  function nodeStats(id, nodes, links) {
    var s = buildAdj(nodes, links);
    var node = nodes.find(function(n) { return n.id === id; });
    var deg = s.deg[id] || 0;
    var wDeg = s.wDeg[id] || 0;
    var layer = node ? node.layer : undefined;
    var domain = node ? node.domain : undefined;

    var nb = (s.adj[id] || []).map(function(e) { return e.node; });
    var k = nb.length;
    var cc = 0;

    // Clustering coefficient
    if (k >= 2) {
      var tri = 0;
      for (var i = 0; i < nb.length; i++) {
        for (var j = i + 1; j < nb.length; j++) {
          if ((s.adj[nb[i]] || []).some(function(e) { return e.node === nb[j]; })) {
            tri++;
          }
        }
      }
      cc = (2 * tri) / (k * (k - 1));
    }

    // Ego network density
    var egoE = 0;
    for (var a = 0; a < nb.length; a++) {
      for (var b = a + 1; b < nb.length; b++) {
        if ((s.adj[nb[a]] || []).some(function(e) { return e.node === nb[b]; })) {
          egoE++;
        }
      }
    }
    var egoDensity = k >= 2 ? (2 * egoE) / (k * (k - 1)) : 0;

    // Approximate betweenness (20-sample BFS)
    var bc = 0;
    var sample = nodes.slice().sort(function() { return Math.random() - .5; }).slice(0, Math.min(20, nodes.length));
    sample.forEach(function(src) {
      if (src.id === id) return;
      var pred = {}, sigma = {}, dist2 = {}, q2 = [];
      nodes.forEach(function(n) { pred[n.id] = []; sigma[n.id] = 0; dist2[n.id] = -1; });
      dist2[src.id] = 0;
      sigma[src.id] = 1;
      q2.push(src.id);
      var stk = [];
      while (q2.length) {
        var v = q2.shift();
        stk.push(v);
        (s.adj[v] || []).forEach(function(e) {
          var w = e.node;
          if (dist2[w] < 0) {
            dist2[w] = dist2[v] + 1;
            q2.push(w);
          }
          if (dist2[w] === dist2[v] + 1) {
            sigma[w] += sigma[v];
            pred[w].push(v);
          }
        });
      }
      var delta = {};
      nodes.forEach(function(n) { delta[n.id] = 0; });
      while (stk.length) {
        var w2 = stk.pop();
        pred[w2].forEach(function(v2) {
          delta[v2] += (sigma[v2] / (sigma[w2] || 1)) * (1 + delta[w2]);
        });
        if (w2 === id) bc += delta[w2];
      }
    });
    bc /= sample.length || 1;

    // Layer-specific stats for this node
    var layerStats = {};
    if (layer) {
      layerStats.layer = layer;
      layerStats.layerName = getLayerName(layer);
      // Count neighbors by layer
      layerStats.neighborsByLayer = {1:0, 2:0, 3:0, 4:0, 5:0};
      nb.forEach(function(neighborId) {
        var neighbor = nodes.find(function(n) { return n.id === neighborId; });
        if (neighbor && neighbor.layer) {
          layerStats.neighborsByLayer[neighbor.layer]++;
        }
      });
    }

    // Domain-specific stats for this node
    var domainStats = {};
    if (domain) {
      domainStats.domain = domain;
      domainStats.domainName = getDomainName(domain);
      // Count neighbors by domain
      domainStats.neighborsByDomain = {};
      coreDomains.forEach(function(d) {
        domainStats.neighborsByDomain[d] = 0;
      });
      nb.forEach(function(neighborId) {
        var neighbor = nodes.find(function(n) { return n.id === neighborId; });
        if (neighbor && neighbor.domain) {
          domainStats.neighborsByDomain[neighbor.domain]++;
        }
      });
    }

    return {
      id: id,
      deg: deg,
      wDeg: wDeg,
      cc: cc,
      egoDensity: egoDensity,
      bc: bc,
      layer: layer,
      domain: domain,
      layerStats: layerStats,
      domainStats: domainStats
    };
  }

  // =============================================
  // 4. HELPER FUNCTIONS
  // =============================================
  function fmt(v, d) {
    if (v === undefined || v === null || isNaN(v)) return '—';
    return (+v).toFixed(d !== undefined ? d : 3);
  }

  function getLayerName(layer) {
    var layerNames = {
      1: "Core Domain",
      2: "Discipline",
      3: "Subdiscipline",
      4: "Thematic Domain",
      5: "Main Thematic"
    };
    return layerNames[layer] || "Unknown Layer";
  }

  function getDomainName(domain) {
    var domainNames = {
      FORMAL: "Formal Sciences",
      NATURAL: "Natural Sciences",
      HEALTH: "Health Sciences",
      SOCIAL: "Social Sciences",
      HUMANITIES: "Humanities",
      APPLIED: "Applied Sciences",
      INTERDISC: "Interdisciplinary"
    };
    return domainNames[domain] || domain || "Unknown Domain";
  }

  // =============================================
  // 5. RENDER STATISTICS (with layer and domain support)
  // =============================================
  function renderStats(el, st) {
    if (!el) return;

    function bar(v, mx) {
      var p = Math.min(100, Math.round((v / (mx || 1)) * 100));
      return '<div class="stat-bar-bg"><div class="stat-bar" style="width:' + p + '%"></div></div>';
    }

    function row(lbl, val) {
      return '<div class="stat-row"><span class="stat-lbl">' + lbl + '</span><span class="stat-val">' + val + '</span></div>';
    }

    // Basic network stats
    var html = '<div class="stats-title">Network Statistics</div>' +
      row('Nodes (N)', st.N) +
      row('Edges (E)', st.E) +
      row('Density', fmt(st.density, 4)) + bar(st.density, 0.25) +
      row('Avg Degree', fmt(st.avgDeg, 2)) +
      row('Max Degree', st.maxDeg) +
      row('Avg Clustering', fmt(st.avgCC, 3)) + bar(st.avgCC, 1) +
      row('Modularity Q', fmt(st.modularity, 3)) + bar(st.modularity, 1) +
      row('Diameter', st.diameter) +
      row('Assortativity r', fmt(st.assortativity, 3));

    // Layer statistics
    if (st.layerStats) {
      html += '<div class="stats-title" style="margin-top:12px">Layer Statistics</div>' +
        row('Layer 1 (Core Domains)', st.layerStats[1].count + ' nodes, avg deg: ' + fmt(st.layerStats[1].avgDeg, 2)) +
        row('Layer 2 (Disciplines)', st.layerStats[2].count + ' nodes, avg deg: ' + fmt(st.layerStats[2].avgDeg, 2)) +
        row('Layer 3 (Subdisciplines)', st.layerStats[3].count + ' nodes, avg deg: ' + fmt(st.layerStats[3].avgDeg, 2)) +
        row('Layer 4 (Thematic Domains)', st.layerStats[4].count + ' nodes, avg deg: ' + fmt(st.layerStats[4].avgDeg, 2)) +
        row('Layer 5 (Main Thematics)', st.layerStats[5].count + ' nodes, avg deg: ' + fmt(st.layerStats[5].avgDeg, 2));
    }

    // Domain statistics
    if (st.domainStats && st.coreDomains) {
      html += '<div class="stats-title" style="margin-top:12px">Domain Statistics</div>';
      st.coreDomains.forEach(function(domain) {
        if (st.domainStats[domain]) {
          html += row(
            getDomainName(domain),
            st.domainStats[domain].count + ' nodes, avg deg: ' + fmt(st.domainStats[domain].avgDeg, 2)
          );
        }
      });
    }

    // Layer connectivity matrix
    if (st.layerConnectivity) {
      html += '<div class="stats-title" style="margin-top:12px">Layer Connectivity</div>' +
        '<div style="font-size: 10px; margin-bottom: 5px;">(Rows = source layer, Columns = target layer)</div>' +
        '<table style="border-collapse: collapse; margin-bottom: 10px; font-size: 11px;">' +
        '<tr><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">→</th>' +
        '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L1</th>' +
        '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L2</th>' +
        '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L3</th>' +
        '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L4</th>' +
        '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L5</th></tr>';

      for (var sourceLayer = 1; sourceLayer <= 5; sourceLayer++) {
        html += '<tr><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">L' + sourceLayer + '</th>';
        for (var targetLayer = 1; targetLayer <= 5; targetLayer++) {
          html += '<td style="border: 1px solid #ddd; padding: 4px; text-align: center;">' +
            (st.layerConnectivity[sourceLayer][targetLayer] || 0) + '</td>';
        }
        html += '</tr>';
      }
      html += '</table>';
    }

    // Domain connectivity matrix
    if (st.domainConnectivity && st.coreDomains) {
      html += '<div class="stats-title" style="margin-top:12px">Domain Connectivity</div>' +
        '<div style="font-size: 10px; margin-bottom: 5px;">(Rows = source domain, Columns = target domain)</div>' +
        '<table style="border-collapse: collapse; margin-bottom: 10px; font-size: 11px;">' +
        '<tr><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">→</th>';

      st.coreDomains.forEach(function(domain) {
        html += '<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">' +
          getDomainName(domain).substring(0, 3) + '</th>';
      });
      html += '</tr>';

      st.coreDomains.forEach(function(sourceDomain) {
        html += '<tr><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">' +
          getDomainName(sourceDomain).substring(0, 3) + '</th>';
        st.coreDomains.forEach(function(targetDomain) {
          html += '<td style="border: 1px solid #ddd; padding: 4px; text-align: center;">' +
            (st.domainConnectivity[sourceDomain][targetDomain] || 0) + '</td>';
        });
        html += '</tr>';
      });
      html += '</table>';
    }

    // Top hubs
    html += '<div class="stats-title" style="margin-top:12px">Top Hubs</div>';
    st.hubs.forEach(function(h) {
      var layerInfo = h.layer ? ' (L' + h.layer + ')' : '';
      var domainInfo = h.domain ? ' [' + getDomainName(h.domain).substring(0, 3) + ']' : '';
      html += '<div class="stat-row"><span class="stat-lbl">' +
        h.id.substring(0, 20) + layerInfo + domainInfo + '</span><span class="stat-val">k=' + h.deg + '</span></div>';
    });

    el.innerHTML = html;
  }

  // =============================================
  // PUBLIC API
  // =============================================
  return {
    networkStats: networkStats,
    nodeStats: nodeStats,
    fmt: fmt,
    renderStats: renderStats,
    buildAdj: buildAdj,
    getLayerName: getLayerName,
    getDomainName: getDomainName
  };
})();
