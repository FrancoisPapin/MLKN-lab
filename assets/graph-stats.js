/* MLKN.lab — Graph Statistics | MIT License | François Papin */
'use strict';
var GraphStats=(function(){
function buildAdj(nodes,links){
  var adj={},deg={},wDeg={};
  nodes.forEach(function(n){adj[n.id]=[];deg[n.id]=0;wDeg[n.id]=0;});
  links.forEach(function(l){
    var s=l.source,t=l.target,w=l.weight||1;
    if(adj[s]&&adj[t]){
      adj[s].push({node:t,w:w});adj[t].push({node:s,w:w});
      deg[s]++;deg[t]++;wDeg[s]+=w;wDeg[t]+=w;
    }
  });
  return{adj:adj,deg:deg,wDeg:wDeg};
}
function networkStats(nodes,links){
  var N=nodes.length,E=links.length;
  var maxE=N*(N-1)/2,density=maxE>0?E/maxE:0;
  var s=buildAdj(nodes,links);
  var degs=Object.values(s.deg);
  var avgDeg=degs.reduce(function(a,b){return a+b;},0)/(N||1);
  var maxDeg=degs.length?Math.max.apply(null,degs):0;
  var wDegs=Object.values(s.wDeg);
  var avgWDeg=wDegs.reduce(function(a,b){return a+b;},0)/(N||1);
  // Clustering coefficient
  var totalCC=0;
  nodes.forEach(function(n){
    var nb=s.adj[n.id].map(function(e){return e.node;});
    var k=nb.length;if(k<2)return;
    var tri=0;
    for(var i=0;i<nb.length;i++)for(var j=i+1;j<nb.length;j++)
      if(s.adj[nb[i]]&&s.adj[nb[i]].some(function(e){return e.node===nb[j];}))tri++;
    totalCC+=(2*tri)/(k*(k-1));
  });
  var avgCC=totalCC/(N||1);
  // Assortativity
  var sumj=0,sumjk=0,sumjj=0,m=E||1;
  links.forEach(function(l){
    var dj=s.deg[l.source]||0,dk=s.deg[l.target]||0;
    sumj+=dj+dk;sumjk+=dj*dk;sumjj+=dj*dj+dk*dk;
  });
  var M=2*m;
  var r=(sumjk/m-Math.pow(sumj/M,2))/(sumjj/M-Math.pow(sumj/M,2)+1e-10);
  // Diameter (BFS from top-degree node)
  var topNode=nodes.reduce(function(a,b){return(s.deg[a.id]||0)>=(s.deg[b.id]||0)?a:b;});
  var dist={},q=[topNode.id];dist[topNode.id]=0;
  while(q.length){var cur=q.shift();(s.adj[cur]||[]).forEach(function(e){
    if(dist[e.node]===undefined){dist[e.node]=dist[cur]+1;q.push(e.node);}});}
  var dVals=Object.values(dist);
  var diameter=dVals.length?Math.max.apply(null,dVals):0;
  // Hubs
  var pairs=nodes.map(function(n){return{id:n.id,deg:s.deg[n.id]||0};});
  pairs.sort(function(a,b){return b.deg-a.deg;});
  var hubs=pairs.slice(0,5);
  // Modularity estimate
  var Q=0;
  links.forEach(function(l){
    var ni=nodes.find(function(n){return n.id===l.source;});
    var nj=nodes.find(function(n){return n.id===l.target;});
    if(ni&&nj&&ni.cluster===nj.cluster){
      Q+=1-(s.deg[l.source]||0)*(s.deg[l.target]||0)/(2*E);
    }
  });
  var modularity=Q/(2*E||1);
  // Degree bins
  var bins={};degs.forEach(function(d){bins[d]=(bins[d]||0)+1;});
  return{N:N,E:E,density:density,avgDeg:avgDeg,maxDeg:maxDeg,
    avgWDeg:avgWDeg,avgCC:avgCC,assortativity:r,diameter:diameter,
    hubs:hubs,modularity:modularity,degBins:bins};
}
function nodeStats(id,nodes,links){
  var s=buildAdj(nodes,links);
  var deg=s.deg[id]||0,wDeg=s.wDeg[id]||0;
  var nb=(s.adj[id]||[]).map(function(e){return e.node;});
  var k=nb.length,cc=0;
  if(k>=2){var tri=0;
    for(var i=0;i<nb.length;i++)for(var j=i+1;j<nb.length;j++)
      if((s.adj[nb[i]]||[]).some(function(e){return e.node===nb[j];}))tri++;
    cc=(2*tri)/(k*(k-1));
  }
  var egoE=0;
  for(var a=0;a<nb.length;a++)for(var b=a+1;b<nb.length;b++)
    if((s.adj[nb[a]]||[]).some(function(e){return e.node===nb[b];}))egoE++;
  var egoDensity=k>=2?(2*egoE)/(k*(k-1)):0;
  // Approx betweenness (20-sample BFS)
  var bc=0,sample=nodes.slice().sort(function(){return Math.random()-.5;}).slice(0,Math.min(20,nodes.length));
  sample.forEach(function(src){
    if(src.id===id)return;
    var pred={},sigma={},dist2={},q2=[];
    nodes.forEach(function(n){pred[n.id]=[];sigma[n.id]=0;dist2[n.id]=-1;});
    dist2[src.id]=0;sigma[src.id]=1;q2.push(src.id);
    var stk=[];
    while(q2.length){var v=q2.shift();stk.push(v);
      (s.adj[v]||[]).forEach(function(e){var w=e.node;
        if(dist2[w]<0){dist2[w]=dist2[v]+1;q2.push(w);}
        if(dist2[w]===dist2[v]+1){sigma[w]+=sigma[v];pred[w].push(v);}});}
    var delta={};nodes.forEach(function(n){delta[n.id]=0;});
    while(stk.length){var w2=stk.pop();
      pred[w2].forEach(function(v2){delta[v2]+=(sigma[v2]/(sigma[w2]||1))*(1+delta[w2]);});
      if(w2===id)bc+=delta[w2];}
  });
  bc/=sample.length||1;
  return{deg:deg,wDeg:wDeg,cc:cc,egoDensity:egoDensity,bc:bc};
}
function fmt(v,d){
  if(v===undefined||v===null||isNaN(v))return'—';
  return(+v).toFixed(d!==undefined?d:3);
}
function renderStats(el,st){
  if(!el)return;
  function bar(v,mx){
    var p=Math.min(100,Math.round((v/(mx||1))*100));
    return'<div class="stat-bar-bg"><div class="stat-bar" style="width:'+p+'%"></div></div>';
  }
  function row(lbl,val){
    return'<div class="stat-row"><span class="stat-lbl">'+lbl+'</span><span class="stat-val">'+val+'</span></div>';
  }
  el.innerHTML='<div class="stats-title">Network Statistics</div>'+
    row('Nodes (N)',st.N)+
    row('Edges (E)',st.E)+
    row('Density',fmt(st.density,4))+bar(st.density,0.25)+
    row('Avg Degree',fmt(st.avgDeg,2))+
    row('Max Degree',st.maxDeg)+
    row('Avg Clustering',fmt(st.avgCC,3))+bar(st.avgCC,1)+
    row('Modularity Q',fmt(st.modularity,3))+bar(st.modularity,1)+
    row('Diameter',st.diameter)+
    row('Assortativity r',fmt(st.assortativity,3))+
    '<div class="stats-title" style="margin-top:8px">Top Hubs</div>'+
    st.hubs.map(function(h){return'<div class="stat-row"><span class="stat-lbl">'+
      h.id.substring(0,18)+'</span><span class="stat-val">k='+h.deg+'</span></div>';}).join('');
}
return{networkStats:networkStats,nodeStats:nodeStats,fmt:fmt,renderStats:renderStats};
})();
