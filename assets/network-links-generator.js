// =============================================
// MLKN.lab - Network Links Generator (Hybrid Solution)
// Auteur: François Papin (adapté par Le Chat)
// =============================================

// =============================================
// CONFIGURATION PAR DISCIPLINE
// =============================================
const DISCIPLINE_CONFIG = {
  "Anthropology": {
    clusters: [
      "CULTURAL",
      "BIOANTH",
      "LINGAUTH",
      "ARCHAEO",
      "MEDICAL",
      "ECOANTH",
      "POLITANH",
      "APPLIED"
    ],
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
      ["Social Structure", "State & Governance", 3],
      ["Behavioral Ecology", "Human Evolution", 3],
      ["Ethnomedicine", "Global Health", 4],
      ["Settlement Patterns", "Landscape Archaeology", 3],
      ["Colonialism & Decolonization", "Race & Ethnicity", 4]
    ],
    conceptKeywords: {
      // Cultural Anthropology
      "Ethnography": ["fieldwork", "culture", "observation", "qualitative", "ethnographic"],
      "Kinship & Marriage": ["family", "social-structure", "marriage", "relationships", "kinship"],
      "Ritual & Symbolism": ["ritual", "symbolism", "ceremony", "meaning", "religion"],
      "Cultural Relativism": ["diversity", "values", "perspective", "culture", "relativism"],
      "Social Structure": ["society", "hierarchy", "organization", "roles", "institutions"],
      "Myth & Narrative": ["myth", "story", "narrative", "folklore", "tradition"],
      "Material Culture": ["artifacts", "objects", "technology", "materials", "crafts"],

      // Biological Anthropology
      "Human Evolution": ["evolution", "hominids", "fossils", "adaptation", "natural-selection"],
      "Primatology": ["primates", "apes", "monkeys", "behavior", "ecology"],
      "Osteology": ["bones", "skeleton", "fossils", "anatomy", "paleopathology"],
      "Paleoanthropology": ["fossils", "human-ancestors", "prehistory", "excavation"],
      "Human Genetics": ["DNA", "genes", "heredity", "population", "variation"],
      "Forensic Anthropology": ["forensics", "skeletons", "identification", "crime", "legal"],

      // Linguistic Anthropology
      "Language & Culture": ["language", "communication", "culture", "symbols", "meaning"],
      "Ethnolinguistics": ["language", "culture", "dialects", "linguistic-diversity"],
      "Discourse & Power": ["language", "power", "ideology", "communication", "authority"],
      "Language Ideologies": ["beliefs", "language", "values", "attitudes"],
      "Communicative Practices": ["communication", "interaction", "speech", "gestures"],
      "Language Endangerment (A)": ["endangered-languages", "preservation", "revitalization"],

      // Archaeology
      "Stratigraphy": ["layers", "soil", "excavation", "chronology"],
      "Lithic Analysis": ["stone-tools", "artifacts", "technology", "flint"],
      "Settlement Patterns": ["villages", "cities", "architecture", "urbanism"],
      "Mortuary Archaeology": ["burials", "graves", "funerary-practices", "afterlife"],
      "Landscape Archaeology": ["landscape", "environment", "monuments", "geography"],
      "Historical Archaeology": ["history", "artifacts", "colonialism", "industrialization"],

      // Medical Anthropology
      "Medical Pluralism": ["health", "traditional-medicine", "modern-medicine", "pluralism"],
      "Ethnomedicine": ["traditional-healing", "herbs", "rituals", "health-beliefs"],
      "Illness Narratives": ["disease", "sickness", "stories", "experience"],
      "Global Health": ["health", "global", "epidemics", "policy", "inequality"],
      "Body & Embodiment": ["body", "perception", "identity", "experience"],

      // Ecological Anthropology
      "Cultural Ecology": ["environment", "adaptation", "subsistence", "ecosystem"],
      "Political Ecology": ["environment", "power", "resources", "conflict"],
      "Human-Environment Rel.": ["human", "environment", "interaction", "sustainability"],
      "Ethnoecology": ["knowledge", "nature", "indigenous", "biodiversity"],
      "Food & Subsistence": ["food", "agriculture", "hunting", "gathering"],
      "Climate Anthropology": ["climate", "adaptation", "change", "resilience"],

      // Political Anthropology
      "Power & Hegemony": ["power", "control", "domination", "authority", "hegemony"],
      "State & Governance": ["state", "government", "laws", "institutions"],
      "Social Movements": ["protest", "activism", "change", "resistance"],
      "Colonialism & Decolonization": ["colonialism", "imperialism", "independence", "postcolonial"],
      "Race & Ethnicity": ["race", "ethnicity", "identity", "discrimination"],
      "Violence & Conflict": ["war", "conflict", "peace", "resolution"],

      // Applied Anthropology
      "Development Anthropology": ["development", "projects", "NGOs", "sustainability"],
      "Action Research": ["research", "participatory", "community", "change"],
      "Advocacy Anthropology": ["advocacy", "rights", "justice", "policy"],
      "Heritage Management": ["heritage", "conservation", "museums", "tourism"],
      "Corporate Ethnography": ["business", "consumer", "marketing", "workplace"],
      "Policy Anthropology": ["policy", "government", "recommendations", "impact"]
    }
  }
  
  "Cognitive Psychology": {
  clusters: [
    "PERCEPT",   // Perception
    "MEMORY",    // Mémoire
    "LANGUAGE",  // Langage
    "EXEC",      // Fonctions exécutives
    "EMOTION",   // Émotion
    "SOCIAL",    // Cognition sociale
    "JUDGMENT",  // Jugement et prise de décision
    "METHODS"    // Méthodes
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "PERCEPT": ["MEMORY", "LANGUAGE", "EXEC", "METHODS"],  // La perception influence la mémoire, le langage, les fonctions exécutives et utilise des méthodes
    "MEMORY": ["PERCEPT", "LANGUAGE", "EXEC", "EMOTION"],    // La mémoire est liée à la perception, au langage, aux fonctions exécutives et aux émotions
    "LANGUAGE": ["PERCEPT", "MEMORY", "EXEC", "SOCIAL"],    // Le langage dépend de la perception, de la mémoire, des fonctions exécutives et a un rôle social
    "EXEC": ["PERCEPT", "MEMORY", "LANGUAGE", "JUDGMENT", "EMOTION", "SOCIAL"], // Les fonctions exécutives coordonnent plusieurs processus
    "EMOTION": ["MEMORY", "EXEC", "SOCIAL", "JUDGMENT"],     // Les émotions influencent la mémoire, les fonctions exécutives, la cognition sociale et le jugement
    "SOCIAL": ["LANGUAGE", "EXEC", "EMOTION", "JUDGMENT"],  // La cognition sociale implique le langage, les fonctions exécutives, les émotions et le jugement
    "JUDGMENT": ["EXEC", "EMOTION", "SOCIAL", "METHODS"],    // Le jugement dépend des fonctions exécutives, des émotions, de la cognition sociale et utilise des méthodes
    "METHODS": ["PERCEPT", "MEMORY", "EXEC", "JUDGMENT"]    // Les méthodes sont appliquées à la perception, la mémoire, les fonctions exécutives et le jugement
  },
  expertLinks: [
    // Liens forts entre concepts clés
    ["Visual Attention", "Object Recognition", 4],
    ["Working Memory Model", "Episodic Memory", 4],
    ["Language Comprehension", "Sentence Processing", 4],
    ["Cognitive Control", "Inhibitory Control", 4],
    ["Theory of Mind (Psy)", "Perspective Taking", 4],
    ["Heuristics & Biases", "Dual-Process Theory", 4],
    ["Prospect Theory", "Risk Perception", 4],

    // Liens moyens
    ["Selective Attention", "Perceptual Load Theory", 3],
    ["Semantic Memory", "Mental Lexicon", 3],
    ["Planning & Problem Solving", "Goal-Directed Behavior", 3],
    ["Emotional Appraisal", "Mood & Cognition", 3],
    ["Attribution Theory", "Stereotypes & Schemas", 3],
    ["Framing Effects", "Anchoring Effect", 3],

    // Liens entre clusters
    ["Multisensory Integration", "Object Recognition", 3],
    ["Memory Consolidation", "Episodic Memory", 3],
    ["Language Production", "Mental Lexicon", 3],
    ["Task Switching", "Cognitive Flexibility", 3],
    ["Self-Regulation", "Intrinsic Motivation", 3],
    ["Stress & Cognition", "Working Memory Model", 3],
    ["Moral Psychology", "Theory of Mind (Psy)", 3],
    ["Signal Detection Theory", "Reaction Time Paradigms", 3]
  ],
  conceptKeywords: {
    // Perception
    "Visual Attention": ["attention", "visual", "focus", "selective", "gaze"],
    "Selective Attention": ["attention", "selection", "filtering", "focus"],
    "Sustained Attention": ["attention", "vigilance", "sustained", "concentration"],
    "Perceptual Load Theory": ["perception", "load", "attention", "capacity", "theory"],
    "Change Blindness": ["perception", "change", "blindness", "attention", "visual"],
    "Object Recognition": ["recognition", "objects", "visual", "perception", "identification"],
    "Multisensory Integration": ["perception", "senses", "integration", "multimodal", "brain"],
    "Top-Down Processing": ["perception", "top-down", "expectations", "knowledge", "cognition"],

    // Mémoire
    "Working Memory Model": ["memory", "working", "short-term", "baddeley", "hitch"],
    "Episodic Memory": ["memory", "episodic", "events", "personal", "autobiographical"],
    "Semantic Memory": ["memory", "semantic", "knowledge", "facts", "general"],
    "Procedural Memory": ["memory", "procedural", "skills", "habits", "automatic"],
    "Encoding & Retrieval": ["memory", "encoding", "retrieval", "storage", "processes"],
    "False Memories": ["memory", "false", "distortion", "misinformation", "reconstruction"],
    "Memory Consolidation": ["memory", "consolidation", "sleep", "long-term", "stabilization"],

    // Langage
    "Mental Lexicon": ["language", "lexicon", "mental", "words", "vocabulary"],
    "Sentence Processing": ["language", "sentence", "processing", "parsing", "comprehension"],
    "Language Comprehension": ["language", "comprehension", "understanding", "meaning", "semantics"],
    "Language Production": ["language", "production", "speech", "writing", "expression"],
    "Reading Processes": ["language", "reading", "decoding", "comprehension", "literacy"],
    "Linguistic Relativity": ["language", "relativity", "sapir-whorf", "thought", "culture"],

    // Fonctions exécutives
    "Mental Models": ["cognition", "mental-models", "representation", "reasoning", "problem-solving"],
    "Cognitive Flexibility": ["executive", "flexibility", "adaptation", "switching", "cognition"],
    "Inhibitory Control": ["executive", "inhibition", "control", "suppression", "self-regulation"],
    "Planning & Problem Solving": ["executive", "planning", "problem-solving", "strategy", "goals"],
    "Task Switching": ["executive", "switching", "multitasking", "cognitive-control", "flexibility"],
    "Cognitive Control": ["executive", "control", "regulation", "attention", "monitoring"],
    "Goal-Directed Behavior": ["executive", "goals", "behavior", "motivation", "planning"],

    // Émotion
    "Emotional Appraisal": ["emotion", "appraisal", "evaluation", "cognition", "stimulus"],
    "Mood & Cognition": ["emotion", "mood", "cognition", "affect", "thinking"],
    "Intrinsic Motivation": ["emotion", "motivation", "intrinsic", "drive", "interest"],
    "Self-Regulation": ["emotion", "regulation", "self-control", "management", "coping"],
    "Stress & Cognition": ["emotion", "stress", "cognition", "performance", "anxiety"],

    // Cognition sociale
    "Theory of Mind (Psy)": ["social", "theory-of-mind", "empathy", "perspective", "beliefs"],
    "Attribution Theory": ["social", "attribution", "causality", "explanation", "bias"],
    "Stereotypes & Schemas": ["social", "stereotypes", "schemas", "categorization", "bias"],
    "Moral Psychology": ["social", "morality", "ethics", "judgment", "values"],
    "Perspective Taking": ["social", "perspective", "empathy", "understanding", "others"],
    "Dual-Process Theory": ["social", "dual-process", "intuition", "reasoning", "cognition"],

    // Jugement et prise de décision
    "Heuristics & Biases": ["judgment", "heuristics", "biases", "decision-making", "cognitive"],
    "Prospect Theory": ["judgment", "prospect-theory", "risk", "decision", "kahneman"],
    "Risk Perception": ["judgment", "risk", "perception", "danger", "uncertainty"],
    "Framing Effects": ["judgment", "framing", "bias", "decision", "presentation"],
    "Anchoring Effect": ["judgment", "anchoring", "bias", "decision", "reference"],

    // Méthodes
    "Reaction Time Paradigms": ["methods", "reaction-time", "speed", "processing", "cognition"],
    "Eye-Tracking": ["methods", "eye-tracking", "gaze", "attention", "visual"],
    "Priming Paradigms": ["methods", "priming", "activation", "implicit", "memory"],
    "Stroop Task": ["methods", "stroop", "interference", "attention", "control"],
    "N-Back Task": ["methods", "n-back", "working-memory", "updating", "cognition"],
    "Signal Detection Theory": ["methods", "signal-detection", "sensitivity", "bias", "perception"]
  }
}

// Ajoutez ici les autres disciplines (Neuroscience, Philosophy, etc.)
};

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
