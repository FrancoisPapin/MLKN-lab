/* MLKN.lab — Shared Utilities (5-Layer Support) | MIT License | François Papin | May 2026
   https://www.linkedin.com/in/francoispapin/ | https://github.com/FrancoisPapin */
'use strict';

var MLKN = (function() {
  var META = {
    name: 'MLKN.lab',
    fullName: 'MultiLayer Knowledge Network — Ideas Laboratory',
    author: 'François Papin',
    date: 'May 2026',
    license: 'MIT License',
    linkedin: 'https://www.linkedin.com/in/francoispapin/',
    github: 'https://github.com/FrancoisPapin',
    description: '5 Core Discipline Domains · 26 Disciplines · 5 Knowledge Layers · 4 Meta-Layers'
  };

  /* Detect document-relative root from current page depth */
  function root() {
    return window.location.pathname.indexOf('/networks/') !== -1 ? '../' : './';
  }

  /* Build top nav */
  function renderNav(isHome) {
    var el = document.getElementById('topnav');
    if (!el) return;

    var r = root();
    var iconHome = '<svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M8 1.5L1 7h2v7.5h4V10h2v4.5h4V7h2z"/></svg>';
    var iconNet = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" width="13" height="13"><circle cx="8" cy="3" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="13" cy="12" r="1.5"/><line x1="8" y1="3" x2="3" y2="12"/><line x1="8" y1="3" x2="13" y2="12"/><line x1="3" y1="12" x2="13" y2="12"/></svg>';
    var iconLI = '<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
    var iconGH = '<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

    // Add navigation for 5 Core Discipline Domains
    var domainNav = '';
    if (!isHome) {
      domainNav = '<div class="domain-nav" style="margin-left: 10px;">' +
        '<a href="' + r + 'networks/interdisciplinary.html" class="nav-link" style="font-weight: bold;">Interdisciplinary</a>' +
        '<a href="' + r + 'networks/formal-sciences.html" class="nav-link">Formal Sciences</a>' +
        '<a href="' + r + 'networks/natural-sciences.html" class="nav-link">Natural Sciences</a>' +
        '<a href="' + r + 'networks/health-sciences.html" class="nav-link">Health Sciences</a>' +
        '<a href="' + r + 'networks/social-sciences.html" class="nav-link">Social Sciences</a>' +
        '<a href="' + r + 'networks/humanities.html" class="nav-link">Humanities</a>' +
        '<a href="' + r + 'networks/applied-sciences.html" class="nav-link">Applied Sciences</a>' +
        '</div>';
    }

    el.innerHTML = '<div class="topnav-inner">' +
      '<a href="' + r + 'index.html" class="topnav-logo" aria-label="MLKN.lab Home">' +
        '<div class="logo-mark">ML</div>' +
        '<span class="logo-text">MLKN.lab</span>' +
      '</a>' +
      '<nav class="nav-links" role="navigation" aria-label="Main navigation">' +
        (isHome ? '' : '<a href="' + r + 'index.html" class="nav-link">' + iconHome + '<span>Home</span></a>') +
        '<a href="' + r + 'networks/interdisciplinary.html" class="nav-link">' + iconNet + '<span>Interdisciplinary</span></a>' +
        '<a href="' + META.linkedin + '" class="nav-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' + iconLI + '<span>LinkedIn</span></a>' +
        '<a href="' + META.github + '" class="nav-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">' + iconGH + '<span>GitHub</span></a>' +
        domainNav +
      '</nav>' +
    '</div>';
  }

  function renderFooterWatermark(id) {
    var el = document.getElementById(id || 'map-footer');
    if (!el) return;
    el.innerHTML = '© ' + META.author + ' · ' + META.date + ' · ' +
      '<a href="' + META.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
      ' · <a href="' + META.github + '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      ' · ' + META.license + ' · ' + META.name + ' · ' + META.description;
  }

  /* ── D3 Force Graph Engine (5-Layer Support) ── */
  function createGraph(cfg) {
    var svgEl = document.getElementById(cfg.svgId);
    var wrap = svgEl ? svgEl.parentElement : document.getElementById(cfg.mountId);
    if (!wrap) {
      console.error('MLKN: mount not found');
      return null;
    }

    var W = wrap.clientWidth, H = wrap.clientHeight;
    var nodes = cfg.nodes, links = cfg.links, clusters = cfg.clusters, coreDomains = cfg.coreDomains;

    /* Build SVG */
    var svg = d3.select(wrap).append('svg')
      .attr('width', W).attr('height', H)
      .attr('role', 'img').attr('aria-label', 'Knowledge network graph')
      .style('position', 'absolute').style('inset', '0').style('display', 'block');

    /* Defs: glow filters and gradients */
    var defs = svg.append('defs');

    // Background gradient
    var rg = defs.append('radialGradient').attr('id', 'bg-grad').attr('cx', '50%').attr('cy', '50%').attr('r', '60%');
    rg.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', '.5');
    rg.append('stop').attr('offset', '100%').attr('stop-color', '#fff').attr('stop-opacity', '0');

    // Core Domain gradients (for layer 1)
    if (coreDomains) {
      Object.keys(coreDomains).forEach(function(domainKey) {
        var domain = coreDomains[domainKey];
        var gradId = 'domain-grad-' + domainKey;
        var grad = defs.append('radialGradient').attr('id', gradId).attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
        grad.append('stop').attr('offset', '0%').attr('stop-color', domain.color || '#888');
        grad.append('stop').attr('offset', '100%').attr('stop-color', domain.light || '#eee');
      });
    }

    // Cluster glow filters (for disciplines)
    Object.keys(clusters || {}).forEach(function(k) {
      var f = defs.append('filter').attr('id', 'glow-' + k)
        .attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      f.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'b');
      var m = f.append('feMerge');
      m.append('feMergeNode').attr('in', 'b');
      m.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Layer-specific glow filters (for layers 1-5)
    for (var layer = 1; layer <= 5; layer++) {
      var layerColor = getLayerColor(layer);
      var f = defs.append('filter').attr('id', 'layer-glow-' + layer)
        .attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
      f.append('feGaussianBlur').attr('stdDeviation', '2').attr('result', 'b');
      var m = f.append('feMerge');
      m.append('feMergeNode').attr('in', 'b');
      m.append('feMergeNode').attr('in', 'SourceGraphic');
    }

    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#FAFAF8');
    svg.append('rect').attr('width', W).attr('height', H)
      .attr('fill', 'url(#bg-grad)').attr('pointer-events', 'none');

    var g = svg.append('g');
    var zoom = d3.zoom().scaleExtent([0.1, 5]).on('zoom', function(e) { g.attr('transform', e.transform); });
    svg.call(zoom).on('dblclick.zoom', null);

    /* Clone data with visibility support */
    var simNodes = nodes.map(function(d) {
      return Object.assign({}, d, {
        visible: d.visible !== undefined ? d.visible : true
      });
    });
    var simLinks = links.map(function(d) {
      return Object.assign({}, d, {
        visible: d.visible !== undefined ? d.visible : true
      });
    });

    /* Cluster centres (for disciplines) */
    var cx = W / 2, cy = H / 2;
    var ks = Object.keys(clusters || {}), cc = {};
    var rx = Math.min(W, H) * 0.30, ry = Math.min(W, H) * 0.25;
    ks.forEach(function(k, i) {
      var a = (i / ks.length) * 2 * Math.PI - Math.PI / 2;
      cc[k] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
    });

    /* Core Domain centres (for layer 1) */
    var coreDomainCenters = {};
    if (coreDomains) {
      var coreKeys = Object.keys(coreDomains);
      var coreRx = Math.min(W, H) * 0.40; // Larger radius for core domains
      coreKeys.forEach(function(domainKey, i) {
        var a = (i / coreKeys.length) * 2 * Math.PI - Math.PI / 2;
        coreDomainCenters[domainKey] = {
          x: cx + coreRx * Math.cos(a),
          y: cy + coreRx * Math.sin(a)
        };
      });
    }

    /* Simulation with layer-based forces */
    var sim = d3.forceSimulation(simNodes)
      .force('link', d3.forceLink(simLinks).id(function(d) { return d.id; })
        .distance(function(d) {
          // Adjust distance based on layer
          var sourceLayer = (typeof d.source === 'object' ? d.source.layer : (d.source.layer || 2));
          var targetLayer = (typeof d.target === 'object' ? d.target.layer : (d.target.layer || 2));
          var layerDistanceFactor = 1;

          // If both nodes are in the same layer, use layer-specific distance
          if (sourceLayer === targetLayer) {
            layerDistanceFactor = getLayerDistanceFactor(sourceLayer);
          }
          // If nodes are in different layers, use average distance
          else {
            layerDistanceFactor = (getLayerDistanceFactor(sourceLayer) + getLayerDistanceFactor(targetLayer)) / 2;
          }

          // Base distance adjusted by weight
          var baseDistance = d.source.cluster === d.target.cluster ?
            60 + (5 - (d.weight || 1)) * 8 :
            130 + (5 - (d.weight || 1)) * 18;

          return baseDistance * layerDistanceFactor;
        })
        .strength(function(d) {
          return (d.weight || 1) * (d.inter ? 0.04 : 0.06);
        }))
      .force('charge', d3.forceManyBody().strength(function(d) {
        // Stronger repulsion for higher layers (more nodes)
        return d.layer === 1 ? -300 : d.layer === 2 ? -280 : d.layer === 3 ? -240 : d.layer === 4 ? -200 : -160;
      }))
      .force('center', d3.forceCenter(cx, cy).strength(0.015))
      .force('collide', d3.forceCollide().radius(function(d) {
        return (d.size || 12) + (d.layer === 1 ? 10 : d.layer === 2 ? 8 : d.layer === 3 ? 6 : d.layer === 4 ? 4 : 2);
      }))
      .force('cluster', function() {
        // Pull nodes toward their cluster center (for disciplines)
        simNodes.forEach(function(n) {
          var c = cc[n.cluster];
          if (c) {
            n.vx = (n.vx || 0) + (c.x - n.x) * 0.012;
            n.vy = (n.vy || 0) + (c.y - n.y) * 0.012;
          }
        });
      })
      .force('coreDomain', function() {
        // Pull layer 1 nodes toward their core domain center
        if (coreDomains) {
          simNodes.forEach(function(n) {
            if (n.layer === 1 && n.domain && coreDomainCenters[n.domain]) {
              var c = coreDomainCenters[n.domain];
              n.vx = (n.vx || 0) + (c.x - n.x) * 0.015;
              n.vy = (n.vy || 0) + (c.y - n.y) * 0.015;
            }
          });
        }
      })
      .force('layerHierarchy', function() {
        // Pull child nodes toward their parent nodes (for progressive disclosure)
        simNodes.forEach(function(n) {
          if (n.layer >= 2) {
            // Find parent node (for layers 2-5)
            var parentId;
            if (n.layer === 2 && n.domain) {
              // Layer 2 nodes are pulled toward their core domain (Layer 1)
              parentId = Object.keys(coreDomains || {}).find(function(domainKey) {
                return coreDomains[domainKey].label === n.domain;
              });
            } else if (n.layer === 3 && n.parent_field) {
              // Layer 3 nodes are pulled toward their parent discipline (Layer 2)
              parentId = n.parent_field;
            } else if (n.layer === 4 && n.subdiscipline) {
              // Layer 4 nodes are pulled toward their parent subdiscipline (Layer 3)
              parentId = n.subdiscipline;
            } else if (n.layer === 5 && n.thematic_domain) {
              // Layer 5 nodes are pulled toward their parent thematic domain (Layer 4)
              parentId = n.thematic_domain;
            }

            if (parentId) {
              var parent = simNodes.find(function(node) { return node.id === parentId; });
              if (parent) {
                n.vx = (n.vx || 0) + (parent.x - n.x) * 0.02;
                n.vy = (n.vy || 0) + (parent.y - n.y) * 0.02;
              }
            }
          }
        });
      });

    /* Link selection with visibility support */
    var linkSel = g.append('g').selectAll('line').data(simLinks).enter().append('line')
      .attr('class', 'lk')
      .attr('stroke', function(d) {
        var sid = typeof d.source === 'object' ? d.source.id : d.source;
        var n = nodes.find(function(x) { return x.id === sid; });
        if (n && n.layer) {
          return getLayerColor(n.layer) + '28';
        }
        return (clusters[n ? n.cluster : ''] || { color: '#333' }).color + '28';
      })
      .attr('stroke-width', function(d) {
        return Math.max(0.6, (d.weight || 1) * 0.5);
      })
      .attr('stroke-linecap', 'round')
      .style('opacity', function(d) {
        return d.visible ? 1 : 0;
      })
      .style('display', function(d) {
        return d.visible ? 'inline' : 'none';
      });

    /* Node groups with layer-specific styling */
    var nodeSel = g.append('g').selectAll('g').data(simNodes).enter().append('g')
      .attr('class', 'nd')
      .attr('role', 'button')
      .attr('tabindex', '0')
      .attr('aria-label', function(d) {
        var layerInfo = d.layer ? ' (Layer ' + d.layer + ': ' + getLayerName(d.layer) + ')' : '';
        var domainInfo = d.domain ? ' [' + getDomainName(d.domain) + ']' : '';
        return 'Concept: ' + (d.label || d.id) + layerInfo + domainInfo;
      })
      .style('cursor', 'pointer')
      .style('opacity', function(d) {
        return d.visible ? 1 : 0;
      })
      .style('display', function(d) {
        return d.visible ? 'inline' : 'none';
      })
      .call(d3.drag()
        .on('start', function(e, d) {
          if (!e.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', function(e, d) {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on('end', function(e, d) {
          if (!e.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Layer-specific node styling
    nodeSel.append('circle').attr('class', 'sh')
      .attr('r', function(d) {
        return (d.size || 12) + (d.layer === 1 ? 8 : d.layer === 2 ? 5 : d.layer === 3 ? 4 : d.layer === 4 ? 3 : 2);
      })
      .attr('fill', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color + '12';
        }
        return (clusters[d.cluster] || { color: '#333' }).color + '12';
      });

    nodeSel.append('circle').attr('class', 'ri')
      .attr('r', function(d) {
        return (d.size || 12) + (d.layer === 1 ? 6 : d.layer === 2 ? 3 : d.layer === 3 ? 2 : d.layer === 4 ? 1.5 : 1);
      })
      .attr('fill', 'none')
      .attr('stroke', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color + '44';
        }
        return (clusters[d.cluster] || { color: '#333' }).color + '44';
      })
      .attr('stroke-width', 1);

    nodeSel.append('circle').attr('class', 'mn')
      .attr('r', function(d) {
        return d.size || (d.layer === 1 ? 15 : d.layer === 2 ? 12 : d.layer === 3 ? 10 : d.layer === 4 ? 8 : 6);
      })
      .attr('fill', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].light || '#eee';
        }
        return (clusters[d.cluster] || { color: '#eee', light: '#eee' }).light;
      })
      .attr('stroke', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color;
        }
        return (clusters[d.cluster] || { color: '#333' }).color;
      })
      .attr('stroke-width', function(d) {
        return d.layer === 1 ? 3 : d.layer === 2 ? 2 : 1.5;
      })
      .attr('filter', function(d) {
        if (d.layer) {
          return 'url(#layer-glow-' + d.layer + ')';
        }
        return 'url(#glow-' + d.cluster + ')';
      });

    nodeSel.append('circle').attr('class', 'ac')
      .attr('r', function(d) {
        return Math.max(2, (d.size || 12) * (d.layer === 1 ? 0.4 : d.layer === 2 ? 0.3 : d.layer === 3 ? 0.25 : d.layer === 4 ? 0.2 : 0.15));
      })
      .attr('fill', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color;
        }
        return (clusters[d.cluster] || { color: '#333' }).color;
      })
      .attr('opacity', 0.85);

    // Layer indicator (for layers 3-5)
    nodeSel.each(function(d) {
      if (d.layer && d.layer >= 3) {
        const layerColor = getLayerColor(d.layer);
        const sz = d.size || 12;
        d3.select(this).append('rect')
          .attr('width', 6)
          .attr('height', 6)
          .attr('x', sz * 0.7)
          .attr('y', -sz * 1.1)
          .attr('fill', layerColor)
          .attr('rx', 1.5)
          .attr('opacity', 0.9);
      }
    });

    // Domain indicator (for layer 1)
    nodeSel.each(function(d) {
      if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
        const domainColor = coreDomains[d.domain].color;
        const sz = d.size || 15;
        d3.select(this).append('rect')
          .attr('width', 8)
          .attr('height', 8)
          .attr('x', sz * 0.8)
          .attr('y', -sz * 1.2)
          .attr('fill', domainColor)
          .attr('rx', 2)
          .attr('opacity', 0.9);
      }
    });

    // Label
    nodeSel.append('text')
      .text(function(d) {
        // For higher layers, show shorter labels
        if (d.layer >= 4) {
          return (d.label || d.id).length > 12 ? (d.label || d.id).substring(0, 10) + '…' : (d.label || d.id);
        }
        return d.label || d.id;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', function(d) {
        return (d.size || 12) + (d.layer === 1 ? 18 : d.layer === 2 ? 16 : d.layer === 3 ? 14 : d.layer === 4 ? 12 : 10);
      })
      .attr('font-family', "'Outfit', sans-serif")
      .attr('font-size', function(d) {
        const baseSize = Math.max(7.5, Math.min(11, (d.size || 12) * 0.43));
        return d.layer >= 4 ? baseSize * 0.8 : baseSize;
      })
      .attr('font-weight', '500')
      .attr('fill', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color;
        }
        return (clusters[d.cluster] || { color: '#333' }).color;
      })
      .attr('pointer-events', 'none');

    // Cluster label (for layers 1-2)
    nodeSel.append('text')
      .text(function(d) {
        if (d.layer > 2) return ''; // Don't show for subdisciplines and below
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].label.substring(0, 3);
        }
        var cluster = clusters[d.cluster];
        return cluster ? cluster.label.split(' ')[0] : '';
      })
      .attr('text-anchor', 'middle')
      .attr('dy', function(d) {
        return (d.size || 12) + (d.layer === 1 ? 28 : d.layer === 2 ? 26 : 0);
      })
      .attr('font-family', "'Space Mono', monospace")
      .attr('font-size', function(d) {
        return d.layer === 1 ? 7 : 6.5;
      })
      .attr('fill', function(d) {
        if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
          return coreDomains[d.domain].color + '77';
        }
        return (clusters[d.cluster] || { color: '#333' }).color + '77';
      })
      .attr('pointer-events', 'none');

    // Layer indicator text (for layer view)
    nodeSel.append('text')
      .text(function(d) {
        if (!d.layer) return '';
        return 'L' + d.layer;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', function(d) {
        return (d.size || 12) + (d.layer === 1 ? 35 : d.layer === 2 ? 30 : d.layer === 3 ? 25 : d.layer === 4 ? 20 : 15);
      })
      .attr('font-family', "'Space Mono', monospace")
      .attr('font-size', 6)
      .attr('fill', '#666')
      .attr('pointer-events', 'none');

    /* Hover helpers with layer/domain support */
    function highlightNeighbors(d, on) {
      if (on) {
        var cl = d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain] ?
          coreDomains[d.domain].color :
          (clusters[d.cluster] || { color: '#333' }).color;

        linkSel.attr('stroke', function(l) {
          var s = typeof l.source === 'object' ? l.source.id : l.source;
          var t = typeof l.target === 'object' ? l.target.id : l.target;
          if (!l.visible) return '#33333310';
          return (s === d.id || t === d.id) ? cl + 'cc' : '#33333310';
        }).attr('stroke-width', function(l) {
          var s = typeof l.source === 'object' ? l.source.id : l.source;
          var t = typeof l.target === 'object' ? l.target.id : l.target;
          return (s === d.id || t === d.id) ? Math.max(1.5, (l.weight || 1) * 1.5) : 0.4;
        });
      } else {
        linkSel.attr('stroke', function(l) {
          if (!l.visible) return '#33333310';
          var sid = typeof l.source === 'object' ? l.source.id : l.source;
          var n = nodes.find(function(x) { return x.id === sid; });
          if (n && n.layer) {
            return getLayerColor(n.layer) + '28';
          }
          return (clusters[n ? n.cluster : ''] || { color: '#333' }).color + '28';
        }).attr('stroke-width', function(l) {
          return Math.max(0.6, (l.weight || 1) * 0.5);
        });
      }
    }

    nodeSel
      .on('mouseover', function(e, d) {
        highlightNeighbors(d, true);
        var cl = d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain] ?
          coreDomains[d.domain].color :
          (clusters[d.cluster] || { color: '#333' }).color;

        d3.select(this).select('.mn')
          .attr('fill', cl + '22')
          .attr('stroke-width', function() {
            return d.layer === 1 ? 4 : d.layer === 2 ? 3 : 2;
          });

        d3.select(this).select('.ri')
          .attr('stroke', cl + 'aa')
          .attr('r', function() {
            return (d.size || 12) + (d.layer === 1 ? 8 : d.layer === 2 ? 6 : d.layer === 3 ? 4 : d.layer === 4 ? 3 : 2);
          });

        if (cfg.onHover) cfg.onHover(d, e);
      })
      .on('mouseout', function(e, d) {
        highlightNeighbors(d, false);
        var cl = d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain] ?
          coreDomains[d.domain].color :
          (clusters[d.cluster] || { color: '#333' }).color;

        d3.select(this).select('.mn')
          .attr('fill', function() {
            if (d.layer === 1 && d.domain && coreDomains && coreDomains[d.domain]) {
              return coreDomains[d.domain].light || '#eee';
            }
            return (clusters[d.cluster] || { color: '#eee', light: '#eee' }).light;
          })
          .attr('stroke-width', function() {
            return d.layer === 1 ? 3 : d.layer === 2 ? 2 : 1.5;
          });

        d3.select(this).select('.ri')
          .attr('stroke', cl + '44')
          .attr('r', function() {
            return (d.size || 12) + (d.layer === 1 ? 6 : d.layer === 2 ? 3 : d.layer === 3 ? 2 : d.layer === 4 ? 1.5 : 1);
          });

        if (cfg.onHoverOut) cfg.onHoverOut(d);
      })
      .on('click', function(e, d) {
        e.stopPropagation();
        if (cfg.onClick) cfg.onClick(d);
      })
      .on('keydown', function(e, d) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (cfg.onClick) cfg.onClick(d);
        }
      });

    svg.on('click', function() {
      if (cfg.onClickBg) cfg.onClickBg();
    });

    /* Tick with visibility support */
    sim.on('tick', function() {
      linkSel
        .attr('x1', function(d) {
          var s = typeof d.source === 'object' ? d.source : simNodes.find(n => n.id === d.source);
          return s ? s.x : 0;
        })
        .attr('y1', function(d) {
          var s = typeof d.source === 'object' ? d.source : simNodes.find(n => n.id === d.source);
          return s ? s.y : 0;
        })
        .attr('x2', function(d) {
          var t = typeof d.target === 'object' ? d.target : simNodes.find(n => n.id === d.target);
          return t ? t.x : 0;
        })
        .attr('y2', function(d) {
          var t = typeof d.target === 'object' ? d.target : simNodes.find(n => n.id === d.target);
          return t ? t.y : 0;
        });

      nodeSel.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    });

    /* Resize */
    var ro = new ResizeObserver(function() {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      svg.attr('width', W).attr('height', H);
      sim.force('center', d3.forceCenter(W / 2, H / 2));
      sim.alpha(0.3).restart();
    });
    ro.observe(wrap);

    /* Helper functions for layer/domain support */
    function getLayerColor(layer) {
      var layerColors = {
        1: '#808080', // Core Domains
        2: '#4A90E2', // Disciplines
        3: '#50C878', // Subdisciplines
        4: '#FFD700', // Thematic Domains
        5: '#E0FFFF'  // Main Thematics
      };
      return layerColors[layer] || '#999';
    }

    function getLayerName(layer) {
      var layerNames = {
        1: 'Core Domain',
        2: 'Discipline',
        3: 'Subdiscipline',
        4: 'Thematic Domain',
        5: 'Main Thematic'
      };
      return layerNames[layer] || 'Unknown Layer';
    }

    function getDomainName(domain) {
      var domainNames = {
        FORMAL: 'Formal Sciences',
        NATURAL: 'Natural Sciences',
        HEALTH: 'Health Sciences',
        SOCIAL: 'Social Sciences',
        HUMANITIES: 'Humanities',
        APPLIED: 'Applied Sciences',
        INTERDISC: 'Interdisciplinary'
      };
      return domainNames[domain] || domain || 'Unknown Domain';
    }

    function getLayerDistanceFactor(layer) {
      var layerDistanceFactors = {
        1: 1.5, // Core Domains (larger spacing)
        2: 1.0, // Disciplines
        3: 0.8, // Subdisciplines
        4: 0.6, // Thematic Domains
        5: 0.4  // Main Thematics
      };
      return layerDistanceFactors[layer] || 1.0;
    }

    /* Public API with layer/domain support */
    return {
      sim: sim,
      svg: svg,
      filterCluster: function(k) {
        svg.selectAll('.nd').style('opacity', function(d) {
          return (!k || d.cluster === k) ? 1 : 0.06;
        });
        svg.selectAll('.lk').style('opacity', function(d) {
          var sid = typeof d.source === 'object' ? d.source.id : d.source;
          var tid = typeof d.target === 'object' ? d.target.id : d.target;
          var ns = nodes.find(function(n) { return n.id === sid; });
          var nt = nodes.find(function(n) { return n.id === tid; });
          if (!k) return 1;
          return (ns && ns.cluster === k) || (nt && nt.cluster === k) ? 1 : 0.04;
        });
      },
      filterLayer: function(layer) {
        svg.selectAll('.nd').style('opacity', function(d) {
          return (!layer || d.layer === layer) ? 1 : 0.06;
        });
        svg.selectAll('.lk').style('opacity', function(d) {
          var sid = typeof d.source === 'object' ? d.source.id : d.source;
          var tid = typeof d.target === 'object' ? d.target.id : d.target;
          var ns = nodes.find(function(n) { return n.id === sid; });
          var nt = nodes.find(function(n) { return n.id === tid; });
          if (!layer) return 1;
          return (ns && ns.layer === layer) || (nt && nt.layer === layer) ? 1 : 0.04;
        });
      },
      filterDomain: function(domain) {
        svg.selectAll('.nd').style('opacity', function(d) {
          return (!domain || d.domain === domain) ? 1 : 0.06;
        });
        svg.selectAll('.lk').style('opacity', function(d) {
          var sid = typeof d.source === 'object' ? d.source.id : d.source;
          var tid = typeof d.target === 'object' ? d.target.id : d.target;
          var ns = nodes.find(function(n) { return n.id === sid; });
          var nt = nodes.find(function(n) { return n.id === tid; });
          if (!domain) return 1;
          return (ns && ns.domain === domain) || (nt && nt.domain === domain) ? 1 : 0.04;
        });
      },
      filterSearch: function(q) {
        svg.selectAll('.nd').style('opacity', function(d) {
          return (!q || (d.label || d.id).toLowerCase().indexOf(q.toLowerCase()) !== -1) ? 1 : 0.06;
        });
      },
      highlightHubs: function(active, hubs) {
        if (!active) {
          svg.selectAll('.nd').style('opacity', 1).select('.mn').attr('stroke-width', function(d) {
            return d.layer === 1 ? 3 : d.layer === 2 ? 2 : 1.5;
          });
          return;
        }
        var hubIds = hubs.map(function(h) { return h.id; });
        svg.selectAll('.nd').style('opacity', function(d) {
          return hubIds.indexOf(d.id) !== -1 ? 1 : 0.12;
        });
        svg.selectAll('.nd').filter(function(d) {
          return hubIds.indexOf(d.id) !== -1;
        }).select('.mn').attr('stroke-width', 4);
      },
      zoomIn: function() {
        svg.transition().call(zoom.scaleBy, 1.4);
      },
      zoomOut: function() {
        svg.transition().call(zoom.scaleBy, 0.7);
      },
      zoomReset: function() {
        svg.transition().call(zoom.transform, d3.zoomIdentity);
      },
      updateVisibility: function() {
        svg.selectAll('.nd')
          .style('opacity', function(d) { return d.visible ? 1 : 0; })
          .style('display', function(d) { return d.visible ? 'inline' : 'none'; });

        svg.selectAll('.lk')
          .style('opacity', function(d) { return d.visible ? 1 : 0; })
          .style('display', function(d) { return d.visible ? 'inline' : 'none'; });
      },
      destroy: function() {
        sim.stop();
        ro.disconnect();
      },
      getLayerColor: getLayerColor,
      getLayerName: getLayerName,
      getDomainName: getDomainName
    };
  }

  return {
    META: META,
    root: root,
    renderNav: renderNav,
    renderFooterWatermark: renderFooterWatermark,
    createGraph: createGraph
  };
})();
