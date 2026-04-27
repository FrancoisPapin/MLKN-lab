// MLKN.lab — Interdisciplinary Network Renderer
// 10 Disciplines (Cognitive Science removed)
// 3 Analytical Layers: Disciplines · Epistemic Roles · Analysis Levels
// Major bridges (weight≥4): thick solid blended-colour lines
// Minor bridges (weight 2–3): thin dashed lines
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/ | https://github.com/FrancoisPapin
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  if (!window.MLKN) { console.error('mlkn.js not loaded'); return; }
  MLKN.renderNav(false);
  MLKN.renderFooterWatermark('map-footer');

  var data = window.MAP_DATA;
  if (!data) {
    document.getElementById('loading').innerHTML =
      '<p style="color:#C0392B;font-family:monospace">interdisciplinary-data.js failed to load.</p>';
    return;
  }

  // ── Accent bar gradient (all 10 discipline colours) ──────────
  var discColors = Object.values(data.disciplines).map(function (d) { return d.color; });
  document.getElementById('abar').style.background =
    'linear-gradient(180deg,' + discColors.join(',') + ')';

  var totalBridges = data.interLinks ? data.interLinks.length : 0;
  var totalNodes   = data.nodes.length;
  document.getElementById('mh-stats').textContent =
    totalNodes + ' concepts · ' + totalBridges + ' bridges';

  // ── Colour helper ─────────────────────────────────────────────
  function blendHex(c1, c2) {
    var p = function (c) { return parseInt(c.slice(1), 16); };
    var r1=(p(c1)>>16)&255, g1=(p(c1)>>8)&255, b1=p(c1)&255;
    var r2=(p(c2)>>16)&255, g2=(p(c2)>>8)&255, b2=p(c2)&255;
    var r=Math.round((r1+r2)/2), g=Math.round((g1+g2)/2), b=Math.round((b1+b2)/2);
    return '#'+[r,g,b].map(function(x){return x.toString(16).padStart(2,'0');}).join('');
  }

  // ── State ─────────────────────────────────────────────────────
  var activeLayer  = 'disc';   // 'disc' | 'epist' | 'level'
  var bridgesOnly  = false;
  var activeFilter = null;     // cluster/role/level key
  var hubsOn       = false;
  var statsVisible = true;
  var graph        = null;

  // Node colour per layer
  function nodeColor(d) {
    if (activeLayer === 'epist' && d.epistemicRole) {
      return (data.epistemic[d.epistemicRole] || { color: '#999' }).color;
    }
    if (activeLayer === 'level' && d.analysisLevel) {
      return (data.analysisLevels[d.analysisLevel] || { color: '#999' }).color;
    }
    return (data.disciplines[d.disc] || { color: '#999' }).color;
  }
  function nodeLight(d) {
    if (activeLayer === 'epist' && d.epistemicRole) {
      var c = (data.epistemic[d.epistemicRole] || { color: '#999' }).color;
      return c + '22';
    }
    if (activeLayer === 'level' && d.analysisLevel) {
      var c2 = (data.analysisLevels[d.analysisLevel] || { color: '#999' }).color;
      return c2 + '22';
    }
    return (data.disciplines[d.disc] || { color: '#eee', light: '#eee' }).light;
  }

  // ── Build D3 graph ────────────────────────────────────────────
  var mount = document.getElementById('sigma-mount');
  var W = mount.clientWidth, H = mount.clientHeight;

  var svg = d3.select(mount).append('svg')
    .attr('width', W).attr('height', H)
    .attr('role', 'img')
    .attr('aria-label', 'Interdisciplinary knowledge network graph')
    .style('position', 'absolute').style('inset', '0').style('display', 'block');

  var defs = svg.append('defs');
  // Background gradient
  var rg = defs.append('radialGradient').attr('id', 'bg-id').attr('cx', '50%').attr('cy', '50%').attr('r', '60%');
  rg.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', '.4');
  rg.append('stop').attr('offset', '100%').attr('stop-color', '#fff').attr('stop-opacity', '0');
  // Glow filters per discipline
  Object.keys(data.disciplines).forEach(function (k) {
    var f = defs.append('filter').attr('id', 'gid-' + k)
      .attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    f.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'b');
    var m = f.append('feMerge');
    m.append('feMergeNode').attr('in', 'b');
    m.append('feMergeNode').attr('in', 'SourceGraphic');
  });

  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#FAFAF8');
  svg.append('rect').attr('width', W).attr('height', H)
    .attr('fill', 'url(#bg-id)').attr('pointer-events', 'none');

  var g = svg.append('g');
  var zoom = d3.zoom().scaleExtent([0.08, 5])
    .on('zoom', function (e) { g.attr('transform', e.transform); });
  svg.call(zoom).on('dblclick.zoom', null);

  // Clone nodes/links
  var simNodes = data.nodes.map(function (d) { return Object.assign({}, d); });
  var intraRaw = data.intraLinks || [];
  var interRaw = data.interLinks || [];
  var simLinks = intraRaw.map(function (l) {
    return { source: l.source, target: l.target, weight: l.weight, inter: false };
  }).concat(interRaw.map(function (l) {
    return { source: l.source, target: l.target, weight: l.weight, inter: true, pair: l.pair };
  }));

  // Discipline cluster centres in a circle
  var cx = W / 2, cy = H / 2;
  var R  = Math.min(W, H) * 0.30;
  var dKeys = Object.keys(data.disciplines), dc = {};
  dKeys.forEach(function (k, i) {
    var a = (i / dKeys.length) * 2 * Math.PI - Math.PI / 2;
    dc[k] = { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });

  // Force simulation
  var sim = d3.forceSimulation(simNodes)
    .force('link', d3.forceLink(simLinks).id(function (d) { return d.id; })
      .distance(function (d) {
        return d.inter
          ? 200 + (5 - (d.weight || 1)) * 25
          :  70 + (5 - (d.weight || 1)) * 8;
      })
      .strength(function (d) { return d.inter ? (d.weight || 1) * 0.03 : (d.weight || 1) * 0.07; }))
    .force('charge', d3.forceManyBody().strength(-260))
    .force('center', d3.forceCenter(cx, cy).strength(0.01))
    .force('collide', d3.forceCollide().radius(function (d) { return (d.size || 12) + 9; }))
    .force('disc', function () {
      simNodes.forEach(function (n) {
        var c = dc[n.disc];
        if (c) {
          n.vx = (n.vx || 0) + (c.x - n.x) * 0.014;
          n.vy = (n.vy || 0) + (c.y - n.y) * 0.014;
        }
      });
    });
  
  // Intra-links
    intraSel.style('opacity', function (d) {
      if (bridgesOnly) return 0.03;
      if (!activeFilter) return 1;
      var sid = typeof d.source === 'object' ? d.source.id : d.source;
      var tid = typeof d.target === 'object' ? d.target.id : d.target;
      var ns = data.nodes.find(function (n) { return n.id === sid; });
      var nt = data.nodes.find(function (n) { return n.id === tid; });
      if (activeLayer === 'disc') {
        return (ns && ns.disc === activeFilter) || (nt && nt.disc === activeFilter) ? 1 : 0.03;
      }
      return 1;
    });

    // Inter-links
    interSel.style('opacity', function (d) {
      if (!activeFilter) return 1;
      var sid = typeof d.source === 'object' ? d.source.id : d.source;
      var tid = typeof d.target === 'object' ? d.target.id : d.target;
      var ns = data.nodes.find(function (n) { return n.id === sid; });
      var nt = data.nodes.find(function (n) { return n.id === tid; });
      if (activeLayer === 'disc') {
        return (ns && ns.disc === activeFilter) || (nt && nt.disc === activeFilter) ? 1 : 0.03;
      }
      return 1;
    }).style('stroke-width', function (d) {
      var base = (d.weight || 1) >= 4 ? Math.max(1.5, (d.weight || 1) * 0.9) : Math.max(0.7, (d.weight || 1) * 0.5);
      return bridgesOnly ? base * 1.4 : base;
    });

  // ── Node groups ───────────────────────────────────────────────
  var nodeG = g.append('g');
  var nodeSel = nodeG.selectAll('g').data(simNodes).enter().append('g')
    .attr('class', 'nd').attr('role', 'button').attr('tabindex', '0')
    .attr('aria-label', function (d) { return 'Concept: ' + d.id; })
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', function (e, d) { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag',  function (e, d) { d.fx = e.x; d.fy = e.y; })
      .on('end',   function (e, d) { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  nodeSel.append('circle').attr('class', 'sh')
    .attr('r', function (d) { return (d.size || 12) + 5; })
    .attr('fill', function (d) { return nodeColor(d) + '12'; });
  nodeSel.append('circle').attr('class', 'ri')
    .attr('r', function (d) { return (d.size || 12) + 2; })
    .attr('fill', 'none')
    .attr('stroke', function (d) { return nodeColor(d) + '44'; })
    .attr('stroke-width', 1);
  nodeSel.append('circle').attr('class', 'mn')
    .attr('r', function (d) { return d.size || 12; })
    .attr('fill', function (d) { return nodeLight(d); })
    .attr('stroke', function (d) { return nodeColor(d); })
    .attr('stroke-width', 2)
    .attr('filter', function (d) { return 'url(#gid-' + d.disc + ')'; });
  nodeSel.append('circle').attr('class', 'ac')
    .attr('r', function (d) { return Math.max(2, (d.size || 12) * 0.3); })
    .attr('fill', function (d) { return nodeColor(d); })
    .attr('opacity', 0.85);
  // Epistemic role ring (outer dotted)
  nodeSel.append('circle').attr('class', 'epi-ring')
    .attr('r', function (d) { return (d.size || 12) + 7; })
    .attr('fill', 'none')
    .attr('stroke', function (d) {
      if (!d.epistemicRole || !data.epistemic) return 'transparent';
      return (data.epistemic[d.epistemicRole] || { color: '#999' }).color + '55';
    })
    .attr('stroke-width', 1.5)
    .attr('stroke-dasharray', '3 2');
  // Analysis level square indicator
  nodeSel.each(function (d) {
    if (d.analysisLevel && data.analysisLevels && data.analysisLevels[d.analysisLevel]) {
      var lv = data.analysisLevels[d.analysisLevel];
      var sz = d.size || 12;
      d3.select(this).append('rect')
        .attr('width', 6).attr('height', 6)
        .attr('x', sz * 0.6).attr('y', -sz * 0.95)
        .attr('fill', lv.color).attr('rx', 1.5).attr('opacity', 0.9);
    }
  });
  // Label
  nodeSel.append('text')
    .text(function (d) { return d.id; })
    .attr('text-anchor', 'middle')
    .attr('dy', function (d) { return (d.size || 12) + 14; })
    .attr('font-family', "'Outfit', sans-serif")
    .attr('font-size', function (d) { return Math.max(7.5, Math.min(10.5, (d.size || 12) * 0.43)); })
    .attr('font-weight', '500')
    .attr('fill', function (d) { return nodeColor(d); })
    .attr('pointer-events', 'none');
  // Discipline sub-label
  nodeSel.append('text')
    .text(function (d) {
      var disc = data.disciplines[d.disc];
      return disc ? disc.label.split(' ')[0] : '';
    })
    .attr('text-anchor', 'middle')
    .attr('dy', function (d) { return (d.size || 12) + 24; })
    .attr('font-family', "'Space Mono', monospace")
    .attr('font-size', 6.5)
    .attr('fill', function (d) { return nodeColor(d) + '77'; })
    .attr('pointer-events', 'none');

  // ── Events ───────────────────────────────────────────────────
  var tip = document.getElementById('tip');
  var detail = document.getElementById('detail');

  function getInterCount(id) {
    return (data.interLinks || []).filter(function (l) {
      return l.source === id || l.target === id;
    }).length;
  }

  nodeSel
    .on('mouseover', function (e, d) {
      // Highlight connected edges
      var col = nodeColor(d);
      intraSel.attr('stroke', function (l) {
        var s = typeof l.source === 'object' ? l.source.id : l.source;
        var t = typeof l.target === 'object' ? l.target.id : l.target;
        return (s === d.id || t === d.id) ? col + 'cc' : col + '10';
      }).attr('stroke-width', function (l) {
        var s = typeof l.source === 'object' ? l.source.id : l.source;
        var t = typeof l.target === 'object' ? l.target.id : l.target;
        return (s === d.id || t === d.id) ? Math.max(1.2, (l.weight || 1) * 1.3) : 0.3;
      });
      interSel.attr('stroke', function (l) {
        var s = typeof l.source === 'object' ? l.source.id : l.source;
        var t = typeof l.target === 'object' ? l.target.id : l.target;
        if (s !== d.id && t !== d.id) return '#33333318';
        if (!l.pair || l.pair.length < 2) return col + 'cc';
        return blendHex(
          (data.disciplines[l.pair[0]] || { color: '#888' }).color,
          (data.disciplines[l.pair[1]] || { color: '#888' }).color
        ) + 'ee';
      }).attr('stroke-width', function (l) {
        var s = typeof l.source === 'object' ? l.source.id : l.source;
        var t = typeof l.target === 'object' ? l.target.id : l.target;
        return (s === d.id || t === d.id) ? Math.max(2, (l.weight || 1) * 1.6) : 0.3;
      });
      d3.select(this).select('.mn').attr('fill', col + '22').attr('stroke-width', 3);
      d3.select(this).select('.ri').attr('stroke', col + 'aa').attr('r', (d.size || 12) + 6);
      // Tooltip
      tip.textContent = d.id + ' (' + (data.disciplines[d.disc] || { label: '' }).label + ')';
      tip.style.display = 'block';
      tip.style.left = e.clientX + 'px';
      tip.style.top  = e.clientY + 'px';
    })
    .on('mouseout', function (e, d) {
      resetLinkStyles();
      d3.select(this).select('.mn').attr('fill', nodeLight(d)).attr('stroke-width', 2);
      d3.select(this).select('.ri').attr('stroke', nodeColor(d) + '44').attr('r', (d.size || 12) + 2);
      tip.style.display = 'none';
    })
    .on('click', function (e, d) {
      e.stopPropagation();
      showDetail(d);
    })
    .on('keydown', function (e, d) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(d); }
    });

  svg.on('click', function () {
    detail.style.display = 'none';
    tip.style.display = 'none';
  });

  function resetLinkStyles() {
    intraSel
      .attr('stroke', function (l) {
        var sid = typeof l.source === 'object' ? l.source.id : l.source;
        var nd = data.nodes.find(function (n) { return n.id === sid; });
        return nd ? (data.disciplines[nd.disc] || { color: '#999' }).color + '28' : '#99999928';
      })
      .attr('stroke-width', function (l) { return Math.max(0.5, (l.weight || 1) * 0.45); });
    interSel
      .attr('stroke', function (l) {
        if (!l.pair || l.pair.length < 2) return '#1A6BAA55';
        var c1 = (data.disciplines[l.pair[0]] || { color: '#888' }).color;
        var c2 = (data.disciplines[l.pair[1]] || { color: '#888' }).color;
        return blendHex(c1, c2) + ((l.weight || 1) >= 4 ? 'bb' : '66');
      })
      .attr('stroke-width', function (l) {
        return (l.weight || 1) >= 4
          ? Math.max(1.5, (l.weight || 1) * 0.9)
          : Math.max(0.7, (l.weight || 1) * 0.5);
      });
  }

  // Tick
  sim.on('tick', function () {
    intraSel.attr('x1', function (d) { return d.source.x; }).attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; }).attr('y2', function (d) { return d.target.y; });
    interSel.attr('x1', function (d) { return d.source.x; }).attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; }).attr('y2', function (d) { return d.target.y; });
    nodeSel.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
  });

  document.getElementById('loading').style.display = 'none';

  // ── Resize ────────────────────────────────────────────────────
  var ro = new ResizeObserver(function () {
    W = mount.clientWidth; H = mount.clientHeight;
    svg.attr('width', W).attr('height', H);
    sim.force('center', d3.forceCenter(W / 2, H / 2));
    sim.alpha(0.3).restart();
  });
  ro.observe(mount);

  // ── Legend ────────────────────────────────────────────────────
  function buildLegend() {
    var leg = document.getElementById('legend');
    leg.innerHTML = '';

    var map, titleText;
    if (activeLayer === 'disc') {
      map = data.disciplines;
      titleText = 'Disciplines';
    } else if (activeLayer === 'epist') {
      map = data.epistemic;
      titleText = 'Epistemic Roles';
    } else {
      map = data.analysisLevels;
      titleText = 'Analysis Levels';
    }

    var title = document.createElement('div');
    title.className = 'legend-title';
    title.textContent = titleText;
    leg.appendChild(title);

    // Link type legend
    var typeDiv = document.createElement('div');
    typeDiv.innerHTML =
      '<div style="font-family:var(--mono);font-size:8px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;margin:6px 0 4px">Bridge Types</div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;font-family:var(--mono);font-size:9px;color:var(--text2)">'+
        '<div style="width:22px;height:2.5px;background:#1A6BAA;border-radius:2px"></div>Major (≥4)'+
      '</div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-family:var(--mono);font-size:9px;color:var(--text2)">'+
        '<div style="width:22px;height:1.5px;border-top:1.5px dashed #888"></div>Minor (2–3)'+
      '</div>'+
      '<div style="height:1px;background:var(--border);margin-bottom:6px"></div>';
    leg.appendChild(typeDiv);

    var clearBtn = document.createElement('div');
    clearBtn.className = 'legend-clear';
    clearBtn.textContent = '[ show all ]';
    clearBtn.style.display = 'none';
    clearBtn.addEventListener('click', function () {
      activeFilter = null;
      applyFilters();
      leg.querySelectorAll('.legend-item').forEach(function (el) {
        el.classList.remove('active');
        el.style.background = 'transparent';
        el.style.borderColor = 'transparent';
      });
      clearBtn.style.display = 'none';
    });

    Object.keys(map).forEach(function (k) {
      var entry = map[k];
      var color = entry.color;
      var label = entry.label || entry.icon + ' ' + entry.label;
      var item = document.createElement('div');
      item.className = 'legend-item';
      item.setAttribute('role', 'button'); item.setAttribute('tabindex', '0');
      item.innerHTML =
        '<div class="legend-dot" style="background:' + color + ';box-shadow:0 0 0 2px ' + color + '33"></div>' +
        '<span class="legend-label" style="color:var(--text2)">' + (entry.icon ? entry.icon + ' ' : '') + entry.label + '</span>';

      var toggle = function () {
        var was = activeFilter === k;
        activeFilter = was ? null : k;
        leg.querySelectorAll('.legend-item').forEach(function (el) {
          el.classList.remove('active');
          el.style.background = 'transparent'; el.style.borderColor = 'transparent';
        });
        clearBtn.style.display = 'none';
        if (!was) {
          item.classList.add('active');
          item.style.background = color + '14'; item.style.borderColor = color + '55';
          clearBtn.style.display = 'block';
        }
        applyFilters();
      };
      item.addEventListener('click', toggle);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      leg.appendChild(item);
    });
    leg.appendChild(clearBtn);
  }

  buildLegend();

  // ── Filter logic ──────────────────────────────────────────────
  function applyFilters() {
    // Nodes
    nodeSel.style('opacity', function (d) {
      if (bridgesOnly) {
        var hasInter = (data.interLinks || []).some(function (l) {
          return l.source === d.id || l.target === d.id;
        });
        if (!hasInter) return 0.06;
      }
      if (!activeFilter) return 1;
      if (activeLayer === 'disc')  return d.disc === activeFilter ? 1 : 0.06;
      if (activeLayer === 'epist') return d.epistemicRole === activeFilter ? 1 : 0.06;
      if (activeLayer === 'level') return d.analysisLevel === activeFilter ? 1 : 0.06;
      return 1;
    });

    // Intra-links (Dans function applyFilters)
intraSel.style('opacity', function (d) {
  if (bridgesOnly) return 0.03;
  if (!activeFilter) return 1;
  var sid = typeof d.source === 'object' ? d.source.id : d.source;
  var tid = typeof d.target === 'object' ? d.target.id : d.target;
  var ns = data.nodes.find(function (n) { return n.id === sid; });
  var nt = data.nodes.find(function (n) { return n.id === tid; });
  
  if (activeLayer === 'disc') {
    // SOLUTION : On utilise && (ET) pour ne garder que les liens internes
    return (ns && ns.disc === activeFilter) && (nt && nt.disc === activeFilter) ? 1 : 0;
  }
  return 1;
});

    // Inter-links (Dans function applyFilters)
interSel.style('opacity', function (d) {
  if (!activeFilter) return 1;
  if (activeLayer === 'disc') {
    // SOLUTION : On met l'opacité à 0 pour cacher tous les ponts inter-disciplines
    // dès qu'un filtre par discipline est actif.
    return 0; 
  }
  return 1;
});
    

    // Restyle node colours per layer
    nodeSel.select('.mn').attr('fill', nodeLight).attr('stroke', nodeColor);
    nodeSel.select('.ac').attr('fill', nodeColor);
    nodeSel.select('.sh').attr('fill', function (d) { return nodeColor(d) + '12'; });
    nodeSel.select('.ri').attr('stroke', function (d) { return nodeColor(d) + '44'; });
    nodeSel.select('text').attr('fill', nodeColor);
  }

  // ── Layer tabs ────────────────────────────────────────────────
  function setLayer(layer) {
    activeLayer = layer;
    activeFilter = null;
    buildLegend();
    applyFilters();
    ['tab-disc', 'tab-epist', 'tab-level'].forEach(function (id) {
      var el = document.getElementById(id);
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    });
    var tabMap = { disc: 'tab-disc', epist: 'tab-epist', level: 'tab-level' };
    var activeTab = document.getElementById(tabMap[layer]);
    if (activeTab) { activeTab.classList.add('active'); activeTab.setAttribute('aria-pressed', 'true'); }
  }

  document.getElementById('tab-disc').addEventListener('click',  function () { setLayer('disc'); });
  document.getElementById('tab-epist').addEventListener('click', function () { setLayer('epist'); });
  document.getElementById('tab-level').addEventListener('click', function () { setLayer('level'); });

  document.getElementById('tab-bridges').addEventListener('click', function () {
    bridgesOnly = !bridgesOnly;
    this.classList.toggle('active', bridgesOnly);
    this.setAttribute('aria-pressed', String(bridgesOnly));
    this.textContent = bridgesOnly ? '⇄ All Links' : '⇄ Bridges Only';
    applyFilters();
  });

  // ── Toolbar ───────────────────────────────────────────────────
  document.getElementById('tb-zi').addEventListener('click', function () {
    svg.transition().call(zoom.scaleBy, 1.4);
  });
  document.getElementById('tb-zo').addEventListener('click', function () {
    svg.transition().call(zoom.scaleBy, 0.7);
  });
  document.getElementById('tb-reset').addEventListener('click', function () {
    svg.transition().call(zoom.transform, d3.zoomIdentity);
  });
  document.getElementById('tb-hubs').addEventListener('click', function () {
    hubsOn = !hubsOn;
    this.classList.toggle('active', hubsOn);
    if (hubsOn) {
      var st = GraphStats.networkStats(data.nodes, simLinks);
      var hubIds = st.hubs.map(function (h) { return h.id; });
      nodeSel.style('opacity', function (d) { return hubIds.indexOf(d.id) !== -1 ? 1 : 0.1; });
      nodeSel.filter(function (d) { return hubIds.indexOf(d.id) !== -1; })
        .select('.mn').attr('stroke-width', 5);
    } else {
      applyFilters();
      nodeSel.select('.mn').attr('stroke-width', 2);
    }
  });
  document.getElementById('tb-stats').addEventListener('click', function () {
    statsVisible = !statsVisible;
    this.classList.toggle('active', statsVisible);
    document.getElementById('stats-panel').style.display = statsVisible ? '' : 'none';
  });

  // ── Statistics panel ──────────────────────────────────────────
  var allStats = GraphStats.networkStats(data.nodes, simLinks);
  var sp = document.getElementById('stats-panel');
  GraphStats.renderStats(sp, allStats);
  // Append bridge count info
  var bridgeInfo = document.createElement('div');
  bridgeInfo.innerHTML =
    '<div class="stats-title" style="margin-top:8px">Interdisciplinary Bridges</div>' +
    '<div class="stat-row"><span class="stat-lbl">Major (wt≥4)</span>' +
    '<span class="stat-val">' + (data.interLinks || []).filter(function (l) { return l.weight >= 4; }).length + '</span></div>' +
    '<div class="stat-row"><span class="stat-lbl">Minor (wt 2–3)</span>' +
    '<span class="stat-val">' + (data.interLinks || []).filter(function (l) { return l.weight < 4; }).length + '</span></div>' +
    '<div class="stat-row"><span class="stat-lbl">Disciplines</span>' +
    '<span class="stat-val">10</span></div>';
  sp.appendChild(bridgeInfo);

  // ── Detail panel ──────────────────────────────────────────────
  function showDetail(d) {
    var disc = data.disciplines[d.disc] || { label: '', color: '#333' };
    var ns = GraphStats.nodeStats(d.id, data.nodes, simLinks);
    var interCount = getInterCount(d.id);
    var epRole = d.epistemicRole && data.epistemic ? (data.epistemic[d.epistemicRole] || {}) : {};
    var anLevel = d.analysisLevel && data.analysisLevels ? (data.analysisLevels[d.analysisLevel] || {}) : {};

    // Neighbour tags
    var nbrs = new Set();
    simLinks.forEach(function (l) {
      var s = typeof l.source === 'object' ? l.source.id : l.source;
      var t = typeof l.target === 'object' ? l.target.id : l.target;
      if (s === d.id) nbrs.add({ id: t, inter: l.inter });
      if (t === d.id) nbrs.add({ id: s, inter: l.inter });
    });
    // de-dup
    var nbrMap = {};
    simLinks.forEach(function (l) {
      var s = typeof l.source === 'object' ? l.source.id : l.source;
      var t = typeof l.target === 'object' ? l.target.id : l.target;
      if (s === d.id) nbrMap[t] = nbrMap[t] || l.inter;
      if (t === d.id) nbrMap[s] = nbrMap[s] || l.inter;
    });
    var tags = Object.keys(nbrMap).map(function (id) {
      var nd = data.nodes.find(function (n) { return n.id === id; });
      if (!nd) return '';
      var nc = (data.disciplines[nd.disc] || { color: '#333' }).color;
      var isBridge = nbrMap[id];
      return '<span class="dtag" style="color:' + nc + ';border-color:' + nc + (isBridge ? '99' : '33') + ';' +
        (isBridge ? 'font-weight:700' : '') + '">' +
        (isBridge ? '⇄ ' : '') + id + '</span>';
    }).join('');

    detail.innerHTML =
      '<div class="detail-badge">' +
        '<div class="detail-dot" style="background:' + disc.color + '"></div>' +
        '<span class="detail-cluster" style="color:' + disc.color + '">' + disc.label + '</span>' +
      '</div>' +
      '<div class="detail-name">' + d.id + '</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' +
        (epRole.label ? '<span style="font-family:var(--mono);font-size:8px;padding:3px 8px;border-radius:10px;background:' + (epRole.color || '#888') + '18;color:' + (epRole.color || '#888') + ';border:1px solid ' + (epRole.color || '#888') + '33">' + (epRole.icon || '') + ' ' + epRole.label + '</span>' : '') +
        (anLevel.label ? '<span style="font-family:var(--mono);font-size:8px;padding:3px 8px;border-radius:10px;background:' + (anLevel.color || '#888') + '18;color:' + (anLevel.color || '#888') + ';border:1px solid ' + (anLevel.color || '#888') + '33">◎ ' + anLevel.label + '</span>' : '') +
        (interCount > 0 ? '<span style="font-family:var(--mono);font-size:8px;padding:3px 8px;border-radius:10px;background:#1A6BAA18;color:#1A6BAA;border:1px solid #1A6BAA33">⇄ ' + interCount + ' bridge' + (interCount > 1 ? 's' : '') + '</span>' : '') +
      '</div>' +
      '<div class="detail-metrics">' +
        '<div class="dmet"><div class="dmet-val">' + ns.deg + '</div><div class="dmet-lbl">Degree</div></div>' +
        '<div class="dmet"><div class="dmet-val">' + GraphStats.fmt(ns.wDeg, 1) + '</div><div class="dmet-lbl">Wt. Degree</div></div>' +
        '<div class="dmet"><div class="dmet-val">' + GraphStats.fmt(ns.cc, 3) + '</div><div class="dmet-lbl">Clustering</div></div>' +
        '<div class="dmet"><div class="dmet-val">' + interCount + '</div><div class="dmet-lbl">Bridges</div></div>' +
      '</div>' +
      '<div class="detail-nbr-lbl">Connected (' + Object.keys(nbrMap).length + ') — ⇄ = inter-discipline</div>' +
      '<div class="detail-tags">' + tags + '</div>';

    detail.style.borderLeftColor = disc.color;
    detail.style.display = 'block';
  }

  // ── Search ────────────────────────────────────────────────────
  var srch = document.getElementById('srch-input'), srchT;
  srch.addEventListener('input', function () {
    clearTimeout(srchT);
    srchT = setTimeout(function () {
      var q = srch.value.trim().toLowerCase();
      nodeSel.style('opacity', function (d) {
        return !q || d.id.toLowerCase().indexOf(q) !== -1 ? 1 : 0.06;
      });
    }, 150);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { detail.style.display = 'none'; }
  });
});
