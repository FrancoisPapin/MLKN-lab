// =============================================
// MLKN.lab - Network Links Generator (Hybrid Solution)
// Auteur: François Papin (adapté par Le Chat)
// =============================================

// =============================================
// CONFIGURATION PAR DISCIPLINE
// =============================================
const DISCIPLINE_CONFIG = {
  // --- ANTHROPOLOGY ---
  "Anthropology": {
    clusters: ["CULTURAL", "BIOANTH", "LINGAUTH", "ARCHAEO", "MEDICAL", "ECOANTH", "POLITANH", "APPLIED"],
    clusterConnections: {
      "CULTURAL": ["LINGAUTH", "MEDICAL", "POLITANH"],
      "BIOANTH": ["ARCHAEO", "MEDICAL"],
      "LINGAUTH": ["CULTURAL", "POLITANH"],
      "ARCHAEO": ["BIOANTH", "ECOANTH"],
      "MEDICAL": ["CULTURAL", "ECOANTH"],
      "ECOANTH": ["ARCHAEO", "MEDICAL", "POLITANH"],
      "POLITANH": ["CULTURAL", "LINGAUTH", "ECOANTH"],
      "APPLIED": ["CULTURAL", "MEDICAL", "POLITANH"]
    },
    expertLinks: [
      ["Ethnography", "Language & Culture", 4],
      ["Cultural Relativism", "Ethnolinguistics", 3],
      ["Human Evolution", "Cultural Ecology", 3],
      ["Medical Pluralism", "Political Ecology", 3],
      ["Power & Hegemony", "Discourse & Power", 4],
      ["Social Structure", "State & Governance", 3]
    ],
    conceptKeywords: {
      "Ethnography": ["fieldwork", "culture", "observation", "qualitative"],
      "Kinship & Marriage": ["family", "social structure", "marriage", "relationships"],
      "Cultural Relativism": ["diversity", "values", "perspective", "culture"],
      "Global Health": ["health", "global", "disease", "policy"],
      "Power & Hegemony": ["power", "control", "domination", "authority"],
      "Discourse & Power": ["language", "power", "ideology", "communication"]
    }
  },

  // --- NEUROSCIENCE (Exemple) ---
  "Neuroscience": {
    clusters: ["COGNITIVE", "MOLECULAR", "CLINICAL", "COMPUTATIONAL"],
    clusterConnections: {
      "COGNITIVE": ["MOLECULAR", "CLINICAL", "COMPUTATIONAL"],
      "MOLECULAR": ["COGNITIVE", "CLINICAL"],
      "CLINICAL": ["COGNITIVE", "MOLECULAR"],
      "COMPUTATIONAL": ["COGNITIVE", "MOLECULAR"]
    },
    expertLinks: [
      ["Neural Coding", "Prefrontal Cortex", 5],
      ["Synaptic Plasticity", "Working Memory", 4],
      ["Brain Oscillations", "Default Mode Network", 4]
    ],
    conceptKeywords: {
      "Neural Coding": ["neurons", "signals", "brain", "encoding"],
      "Prefrontal Cortex": ["brain", "cognition", "executive function", "decision"],
      "Synaptic Plasticity": ["synapse", "learning", "memory", "neurotransmission"]
    }
  },

  // --- INTERDISCIPLINARY (Exemple) ---
  "Interdisciplinary": {
    clusters: [
      "Philosophy", "Education Science", "Human Rights",
      "Environmental Science", "Computer Science", "Neuroscience",
      "Cognitive Psychology", "Language Science", "Anthropology", "Systems Science"
    ],
    clusterConnections: {
      "Philosophy": ["Neuroscience", "Cognitive Psychology", "Language Science", "Education Science"],
      "Neuroscience": ["Philosophy", "Cognitive Psychology", "Computer Science", "Systems Science"],
      "Computer Science": ["Neuroscience", "Systems Science", "Education Science"],
      "Anthropology": ["Philosophy", "Education Science", "Human Rights", "Environmental Science"],
      // Ajoutez toutes les connexions inter-disciplines ici
    },
    expertLinks: [
      ["Epistemology", "Neural Coding", 4],
      ["Pedagogy", "Machine Learning", 3],
      ["Human Rights", "Environmental Policy", 3],
      ["Systems Thinking", "Network Theory", 5]
    ],
    conceptKeywords: {
      "Epistemology": ["knowledge", "theory", "science", "truth"],
      "Neural Coding": ["brain", "neurons", "signals", "information"],
      "Machine Learning": ["AI", "algorithms", "data", "models"],
      "Human Rights": ["justice", "equality", "law", "ethics"]
    }
  }
  // --- AJOUTEZ LES AUTRES DISCIPLINES ICI ---
  // Exemple pour Philosophy, Education Science, etc.
};

// =============================================
// FONCTIONS COMMUNES
// =============================================
function generateLinksForDiscipline(disciplineName) {
  // Trouver la configuration pour cette discipline
  const config = DISCIPLINE_CONFIG[disciplineName];
  if (!config) {
    console.warn(`[MLKN.lab] Configuration non trouvée pour ${disciplineName}. Utilisation des paramètres par défaut.`);
    // Retourner sans rien faire (ou utiliser une config par défaut)
    return;
  }

  // Vérifier que window.MAP_DATA existe
  if (!window.MAP_DATA) {
    console.error(`[MLKN.lab] window.MAP_DATA non défini pour ${disciplineName}.`);
    return;
  }

  const { nodes, links } = window.MAP_DATA;
  const existingLinks = new Set();

  // Enregistrer les liens existants pour éviter les doublons
  links.forEach(link => {
    existingLinks.add(`${link.source}-${link.target}`);
    existingLinks.add(`${link.target}-${link.source}`);
  });

  // Fonction pour ajouter un lien si inexistant
  function addLink(source, target, weight) {
    const key1 = `${source}-${target}`;
    const key2 = `${target}-${source}`;
    if (!existingLinks.has(key1) && !existingLinks.has(key2)) {
      links.push({ source, target, weight });
      existingLinks.add(key1);
      existingLinks.add(key2);
    }
  }

  // 1. Liens intra-cluster (tous les nœuds d'un même cluster sont connectés)
  const nodesByCluster = {};
  nodes.forEach(node => {
    if (!nodesByCluster[node.cluster]) {
      nodesByCluster[node.cluster] = [];
    }
    nodesByCluster[node.cluster].push(node);
  });

  // Connecter tous les nœuds au sein de chaque cluster
  Object.values(nodesByCluster).forEach(clusterNodes => {
    for (let i = 0; i < clusterNodes.length; i++) {
      for (let j = i + 1; j < clusterNodes.length; j++) {
        const node1 = clusterNodes[i].id;
        const node2 = clusterNodes[j].id;
        // Poids basé sur la taille moyenne des nœuds (ajusté pour vos données)
        const avgSize = (clusterNodes[i].size + clusterNodes[j].size) / 2;
        let weight = Math.min(5, Math.max(3, Math.floor(avgSize / 8)));
        addLink(node1, node2, weight);
      }
    }
  });

  // 2. Liens inter-clusters (basés sur config.clusterConnections)
  if (config.clusterConnections) {
    Object.entries(config.clusterConnections).forEach(([cluster1, connectedClusters]) => {
      const cluster1Nodes = nodesByCluster[cluster1] || [];
      connectedClusters.forEach(cluster2 => {
        const cluster2Nodes = nodesByCluster[cluster2] || [];
        cluster1Nodes.forEach(node1 => {
          cluster2Nodes.forEach(node2 => {
            addLink(node1.id, node2.id, 3); // Poids fixe pour les liens inter-clusters
          });
        });
      });
    });
  }

  // 3. Liens spécifiques (experts)
  if (config.expertLinks) {
    config.expertLinks.forEach(([source, target, weight]) => {
      addLink(source, target, weight);
    });
  }

  // 4. Liens sémantiques (basés sur config.conceptKeywords)
  if (config.conceptKeywords) {
    Object.keys(config.conceptKeywords).forEach(concept1 => {
      Object.keys(config.conceptKeywords).forEach(concept2 => {
        if (concept1 === concept2) return;
        const keywords1 = config.conceptKeywords[concept1] || [];
        const keywords2 = config.conceptKeywords[concept2] || [];
        const commonKeywords = keywords1.filter(kw => keywords2.includes(kw));
        if (commonKeywords.length >= 2) { // Seuil : 2 mots-clés en commun
          const weight = Math.min(5, 3 + commonKeywords.length);
          addLink(concept1, concept2, weight);
        }
      });
    });
  }

  // Log pour vérification
  console.log(`[MLKN.lab] ${disciplineName}: ${links.length} liens générés.`);
}

// =============================================
// EXÉCUTION AUTOMATIQUE
// =============================================
// Détecter la discipline actuelle à partir du titre de window.MAP_DATA
if (window.MAP_DATA && window.MAP_DATA.title) {
  const discipline = window.MAP_DATA.title;
  generateLinksForDiscipline(discipline);
} else {
  console.error("[MLKN.lab] Impossible de détecter la discipline. Vérifiez window.MAP_DATA.title.");
}
