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
  },
  
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
},

"Computer Science": {
  clusters: [
    "AI",        // Intelligence Artificielle
    "THEORY",    // Théorie
    "SYSTEMS",   // Systèmes
    "DATA",      // Données
    "HCI",       // Interaction Homme-Machine
    "SECURITY",  // Sécurité
    "EMERGING",  // Technologies émergentes
    "SE"         // Génie Logiciel
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "AI": ["THEORY", "DATA", "SYSTEMS", "HCI", "EMERGING"],  // L'IA utilise la théorie, les données, les systèmes, l'interaction HCI et les technologies émergentes
    "THEORY": ["AI", "SYSTEMS", "DATA", "SECURITY"],          // La théorie sous-tend l'IA, les systèmes, les données et la sécurité
    "SYSTEMS": ["AI", "THEORY", "DATA", "SECURITY", "SE", "EMERGING"], // Les systèmes sont liés à l'IA, la théorie, les données, la sécurité, le génie logiciel et les technologies émergentes
    "DATA": ["AI", "THEORY", "SYSTEMS", "HCI", "SECURITY"],    // Les données sont centrales pour l'IA, la théorie, les systèmes, l'HCI et la sécurité
    "HCI": ["AI", "DATA", "SYSTEMS", "EMERGING"],             // L'HCI est liée à l'IA, les données, les systèmes et les technologies émergentes
    "SECURITY": ["THEORY", "SYSTEMS", "DATA", "EMERGING"],    // La sécurité dépend de la théorie, des systèmes, des données et des technologies émergentes
    "EMERGING": ["AI", "SYSTEMS", "DATA", "HCI", "SECURITY"],  // Les technologies émergentes combinent IA, systèmes, données, HCI et sécurité
    "SE": ["SYSTEMS", "THEORY", "DATA", "SECURITY"]           // Le génie logiciel repose sur les systèmes, la théorie, les données et la sécurité
  },
  expertLinks: [
    // Liens forts (poids 4)
    ["Machine Learning", "Deep Learning", 4],
    ["Neural Networks", "Deep Learning", 4],
    ["Natural Language Processing", "Machine Learning", 4],
    ["Computer Vision", "Machine Learning", 4],
    ["Reinforcement Learning", "Machine Learning", 4],
    ["Algorithms", "Complexity Theory", 4],
    ["Graph Theory", "Algorithms", 4],
    ["Distributed Systems", "Cloud Computing", 4],
    ["Operating Systems", "Computer Networks", 4],
    ["Databases", "Big Data", 4],
    ["Data Mining", "Big Data", 4],
    ["Human-Computer Interaction", "User Experience", 4],
    ["Computer Graphics", "Virtual Reality", 4],
    ["Cybersecurity", "Network Security", 4],
    ["Blockchain", "Cryptography", 4],
    ["Software Engineering", "Programming Languages", 4],

    // Liens moyens (poids 3)
    ["Generative AI", "Machine Learning", 3],
    ["Explainable AI", "Machine Learning", 3],
    ["Optimization", "Algorithms", 3],
    ["Cryptography", "Formal Methods", 3],
    ["IoT", "Edge Computing", 3],
    ["Information Retrieval", "Data Mining", 3],
    ["Data Visualization", "Big Data", 3],
    ["Virtual Reality", "Augmented Reality", 3],
    ["Privacy", "Cybersecurity", 3],
    ["Differential Privacy", "Privacy", 3],
    ["Quantum Computing", "Algorithms", 3],
    ["Robotics", "AI", 3],
    ["Bioinformatics", "Data Mining", 3],
    ["Federated Learning", "Machine Learning", 3],
    ["Testing & Verification", "Formal Methods", 3],
    ["DevOps", "Software Engineering", 3],

    // Liens entre concepts transversaux
    ["Machine Learning", "Databases", 3],
    ["Cloud Computing", "Data Mining", 3],
    ["Human-Computer Interaction", "AI", 3],
    ["Security", "Blockchain", 3],
    ["Edge Computing", "IoT", 3]
  ],
  conceptKeywords: {
    // Intelligence Artificielle
    "Machine Learning": ["ai", "learning", "models", "training", "prediction"],
    "Deep Learning": ["neural-networks", "layers", "training", "gpu", "big-data"],
    "Neural Networks": ["nodes", "weights", "activation", "backpropagation", "architecture"],
    "Natural Language Processing": ["nlp", "text", "language", "semantics", "syntax"],
    "Computer Vision": ["images", "recognition", "classification", "cnn", "features"],
    "Reinforcement Learning": ["reward", "agent", "environment", "policy", "q-learning"],
    "Generative AI": ["generation", "creativity", "gans", "transformers", "llm"],
    "Explainable AI": ["interpretability", "transparency", "xai", "trust", "ethics"],

    // Théorie
    "Algorithms": ["complexity", "efficiency", "sorting", "searching", "recursion"],
    "Complexity Theory": ["p-np", "computability", "big-o", "turing", "reducibility"],
    "Graph Theory": ["nodes", "edges", "paths", "networks", "topology"],
    "Optimization": ["minimization", "maximization", "constraints", "linear", "nonlinear"],

    // Systèmes
    "Distributed Systems": ["nodes", "communication", "fault-tolerance", "scalability", "consensus"],
    "Cloud Computing": ["servers", "virtualization", "scalability", "iaas", "paas"],
    "Operating Systems": ["kernel", "processes", "memory", "scheduling", "filesystem"],
    "Computer Networks": ["protocols", "routing", "tcp-ip", "bandwidth", "latency"],

    // Données
    "Databases": ["sql", "nosql", "queries", "transactions", "indexing"],
    "Big Data": ["volume", "velocity", "variety", "hadoop", "spark"],
    "Data Mining": ["patterns", "clustering", "classification", "association", "anomalies"],
    "Information Retrieval": ["search", "indexing", "ranking", "relevance", "query"],
    "Data Visualization": ["charts", "graphs", "d3js", "interactive", "dashboard"],

    // Interaction Homme-Machine
    "Human-Computer Interaction": ["usability", "design", "interface", "user-centered", "accessibility"],
    "User Experience": ["ux", "usability", "design", "feedback", "satisfaction"],
    "Computer Graphics": ["rendering", "3d", "shaders", "opengl", "ray-tracing"],
    "Virtual Reality": ["immersion", "3d", "headset", "simulation", "interaction"],
    "Augmented Reality": ["overlay", "real-world", "mobile", "ar-glasses", "mixed-reality"],

    // Sécurité
    "Cybersecurity": ["threats", "vulnerabilities", "protection", "firewall", "encryption"],
    "Network Security": ["firewall", "ids", "vpn", "authentication", "encryption"],
    "Privacy": ["confidentiality", "anonymity", "gdpr", "data-protection", "consent"],
    "Blockchain": ["decentralized", "ledger", "bitcoin", "smart-contracts", "consensus"],
    "Differential Privacy": ["anonymization", "noise", "query", "privacy-preserving", "epsilon"],

    // Technologies émergentes
    "Quantum Computing": ["qubits", "superposition", "entanglement", "shor", "grover"],
    "Robotics": ["automation", "sensors", "actuators", "ros", "autonomy"],
    "Bioinformatics": ["genomics", "sequences", "alignment", "blast", "phylogeny"],

    // Génie Logiciel
    "Software Engineering": ["development", "lifecycle", "requirements", "design", "maintenance"],
    "Programming Languages": ["syntax", "compiler", "interpreter", "paradigms", "frameworks"],
    "Testing & Verification": ["unit-tests", "integration", "debugging", "validation", "verification"],
    "DevOps": ["ci-cd", "automation", "deployment", "monitoring", "containers"],
    "Federated Learning": ["distributed", "privacy", "collaborative", "model-aggregation", "local-training"]
  }
},

"Education Science": {
  clusters: [
    "LEARNING",   // Théories et processus d'apprentissage
    "PEDAGOGY",   // Méthodes et approches pédagogiques
    "CURRICUL",   // Conception et organisation des programmes
    "ASSESS",     // Évaluation et mesure des apprentissages
    "SPECIAL",    // Éducation spécialisée et inclusive
    "TECH",       // Technologies éducatives
    "SOCIAL",     // Dimensions sociales et communautaires
    "POLICY"      // Politiques et gouvernance éducative
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "LEARNING": ["PEDAGOGY", "CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"],
    // L'apprentissage est au cœur de la pédagogie, du curriculum, de l'évaluation, de l'inclusion, des technologies et des aspects sociaux

    "PEDAGOGY": ["LEARNING", "CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"],
    // La pédagogie influence directement l'apprentissage, le curriculum, l'évaluation, l'inclusion, les technologies et les aspects sociaux

    "CURRICUL": ["LEARNING", "PEDAGOGY", "ASSESS", "SPECIAL", "POLICY"],
    // Le curriculum est lié à l'apprentissage, à la pédagogie, à l'évaluation, à l'inclusion et aux politiques

    "ASSESS": ["LEARNING", "PEDAGOGY", "CURRICUL", "TECH", "POLICY"],
    // L'évaluation mesure l'apprentissage, guide la pédagogie, valide le curriculum, utilise les technologies et influence les politiques

    "SPECIAL": ["LEARNING", "PEDAGOGY", "CURRICUL", "ASSESS", "SOCIAL", "POLICY"],
    // L'éducation spécialisée s'appuie sur les théories d'apprentissage, les méthodes pédagogiques, le curriculum, l'évaluation, les aspects sociaux et les politiques

    "TECH": ["LEARNING", "PEDAGOGY", "ASSESS", "POLICY"],
    // Les technologies éducatives soutiennent l'apprentissage, la pédagogie, l'évaluation et sont encadrées par les politiques

    "SOCIAL": ["LEARNING", "PEDAGOGY", "SPECIAL", "POLICY"],
    // Les dimensions sociales impactent l'apprentissage, la pédagogie, l'inclusion et sont influencées par les politiques

    "POLICY": ["CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"]
    // Les politiques éducatives encadrent le curriculum, l'évaluation, l'inclusion, les technologies et les aspects sociaux
  },
  expertLinks: [
    // Liens forts (poids 4) - Théories et concepts fondamentaux
    ["Constructivism", "Situated Learning", 4],
    ["Behaviorism", "Direct Instruction", 4],
    ["Cognitivism", "Metacognition", 4],
    ["Social Learning Theory", "Cooperative Learning", 4],
    ["Zone of Proximal Dev.", "Scaffolding", 4],
    ["Self-Regulated Learning", "Metacognition", 4],
    ["Curriculum Design", "Standards-Based Education", 4],
    ["Formative Assessment", "Feedback", 4],
    ["Inclusive Education", "Universal Design for Learning", 4],
    ["EdTech", "E-Learning", 4],
    ["AI in Education", "Adaptive Learning", 4],

    // Liens moyens (poids 3) - Approches et pratiques
    ["Experiential Learning", "Project-Based Learning", 3],
    ["Differentiated Instruction", "Individualized Learning", 3],
    ["Inquiry-Based Learning", "Problem-Based Learning", 3],
    ["Flipped Classroom", "Blended Learning", 3],
    ["Mastery Learning", "Competency-Based Education", 3],
    ["Summative Assessment", "Standardized Testing", 3],
    ["Authentic Assessment", "Learning Analytics", 3],
    ["Special Education", "Neurodiversity", 3],
    ["Gamification", "Motivation (Ed)", 3],
    ["MOOCs", "Blended Learning", 3],
    ["Social-Emotional Learning", "School Climate", 3],
    ["Educational Equity", "Cultural Capital", 3],
    ["Teacher Professional Dev.", "School Reform", 3],
    ["Higher Education", "Early Childhood Education", 3],

    // Liens transversaux (poids 3)
    ["Constructivism", "Project-Based Learning", 3],
    ["Behaviorism", "Feedback Literacy", 3],
    ["Cognitivism", "Transfer of Learning", 3],
    ["Critical Pedagogy", "Educational Equity", 3],
    ["Hidden Curriculum", "School Climate", 3],
    ["Interdisciplinary Learning", "STEM / STEAM", 3],
    ["Spiral Curriculum", "Competency-Based Education", 3],
    ["Response to Intervention", "Special Education", 3],
    ["Family Engagement", "School Climate", 3],
    ["Education Funding", "Educational Policy", 3]
  ],
  conceptKeywords: {
    // Théories et processus d'apprentissage
    "Constructivism": ["learning", "construction", "knowledge", "piaget", "active"],
    "Behaviorism": ["learning", "stimulus", "response", "skinner", "conditioning"],
    "Cognitivism": ["learning", "cognition", "mental-processes", "information-processing", "memory"],
    "Social Learning Theory": ["learning", "observation", "imitation", "bandura", "modeling"],
    "Situated Learning": ["learning", "context", "authentic", "lave", "wenger"],
    "Experiential Learning": ["learning", "experience", "reflection", "kolb", "cycle"],
    "Self-Regulated Learning": ["learning", "self-direction", "metacognition", "strategies", "goals"],
    "Metacognition": ["thinking", "learning", "awareness", "monitoring", "regulation"],
    "Zone of Proximal Dev.": ["learning", "vygotsky", "potential", "scaffolding", "development"],
    "Scaffolding": ["support", "learning", "guidance", "temporary", "vygotsky"],
    "Transfer of Learning": ["learning", "application", "contexts", "generalization", "skills"],
    "Motivation (Ed)": ["motivation", "engagement", "intrinsic", "extrinsic", "achievement"],

    // Méthodes et approches pédagogiques
    "Differentiated Instruction": ["teaching", "diversity", "adaptation", "needs", "flexibility"],
    "Project-Based Learning": ["learning", "projects", "real-world", "collaboration", "problem-solving"],
    "Inquiry-Based Learning": ["learning", "questions", "investigation", "discovery", "exploration"],
    "Direct Instruction": ["teaching", "explicit", "structured", "scripted", "mastery"],
    "Flipped Classroom": ["teaching", "inverted", "video", "homework", "class-time"],
    "Cooperative Learning": ["learning", "group", "collaboration", "interdependence", "teamwork"],
    "Problem-Based Learning": ["learning", "problems", "real-world", "investigation", "solutions"],
    "Mastery Learning": ["learning", "mastery", "competency", "progression", "assessment"],
    "Feedback Literacy": ["feedback", "understanding", "interpretation", "use", "improvement"],
    "Critical Pedagogy": ["teaching", "critical", "social-justice", "empowerment", "freire"],

    // Conception et organisation des programmes
    "Curriculum Design": ["curriculum", "planning", "objectives", "content", "alignment"],
    "Hidden Curriculum": ["curriculum", "implicit", "values", "norms", "unwritten"],
    "Standards-Based Education": ["education", "standards", "benchmarks", "accountability", "alignment"],
    "Interdisciplinary Learning": ["learning", "disciplines", "integration", "connections", "holistic"],
    "STEM / STEAM": ["education", "science", "technology", "engineering", "math", "arts"],
    "Competency-Based Education": ["education", "competencies", "skills", "mastery", "outcomes"],
    "Spiral Curriculum": ["curriculum", "repetition", "depth", "progression", "bruner"],

    // Évaluation et mesure des apprentissages
    "Formative Assessment": ["assessment", "feedback", "progress", "adjustment", "learning"],
    "Summative Assessment": ["assessment", "evaluation", "final", "grades", "achievement"],
    "Standardized Testing": ["assessment", "standardized", "comparison", "norms", "accountability"],
    "Authentic Assessment": ["assessment", "real-world", "tasks", "performance", "application"],
    "Learning Analytics": ["data", "learning", "analysis", "patterns", "insights"],
    "Rubrics": ["assessment", "criteria", "scoring", "transparency", "feedback"],
    "Feedback": ["communication", "improvement", "specific", "timely", "actionable"],

    // Éducation spécialisée et inclusive
    "Inclusive Education": ["education", "diversity", "access", "equity", "participation"],
    "Special Education": ["education", "disabilities", "iep", "accommodations", "support"],
    "Neurodiversity": ["diversity", "neurological", "strengths", "differences", "inclusion"],
    "Universal Design for Learning": ["design", "accessibility", "flexibility", "multiple-means", "udl"],
    "Response to Intervention": ["education", "intervention", "tiered", "support", "progress-monitoring"],

    // Technologies éducatives
    "EdTech": ["technology", "education", "tools", "innovation", "digital"],
    "E-Learning": ["learning", "online", "digital", "platforms", "virtual"],
    "Gamification": ["learning", "games", "motivation", "engagement", "rewards"],
    "MOOCs": ["education", "online", "massive", "open", "courses"],
    "AI in Education": ["technology", "ai", "personalization", "automation", "adaptation"],
    "Adaptive Learning": ["learning", "personalized", "technology", "adjustment", "pace"],
    "Blended Learning": ["learning", "mix", "online", "face-to-face", "hybrid"],

    // Dimensions sociales et communautaires
    "Educational Equity": ["education", "fairness", "access", "opportunity", "justice"],
    "Social-Emotional Learning": ["learning", "emotions", "relationships", "self-awareness", "empathy"],
    "Cultural Capital": ["education", "culture", "knowledge", "advantage", "bourdieu"],
    "Family Engagement": ["education", "family", "involvement", "partnership", "support"],
    "School Climate": ["education", "environment", "culture", "safety", "relationships"],

    // Politiques et gouvernance éducative
    "Educational Policy": ["policy", "education", "regulation", "standards", "reform"],
    "School Reform": ["education", "change", "improvement", "systemic", "innovation"],
    "Accountability Systems": ["education", "responsibility", "assessment", "standards", "reporting"],
    "Teacher Professional Dev.": ["teachers", "development", "training", "growth", "skills"],
    "Higher Education": ["education", "university", "college", "degrees", "research"],
    "Early Childhood Education": ["education", "children", "preschool", "development", "learning"],
    "Education Funding": ["education", "finance", "budget", "resources", "equity"]
  }
},

"Environmental Science": {
  clusters: [
    "CLIMATE",    // Climatologie
    "ECOLOGY",    // Écologie
    "HYDRO",      // Hydrologie
    "ATMOS",      // Sciences atmosphériques
    "EARTH",      // Sciences de la Terre
    "POLLUT",     // Pollution
    "CONSERV",    // Conservation
    "ENERGY"      // Énergie
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "CLIMATE": ["ECOLOGY", "HYDRO", "ATMOS", "EARTH", "POLLUT", "ENERGY"],
    // Le climat influence l'écologie, l'hydrologie, l'atmosphère, la Terre, la pollution et l'énergie

    "ECOLOGY": ["CLIMATE", "HYDRO", "EARTH", "POLLUT", "CONSERV"],
    // L'écologie est liée au climat, à l'hydrologie, à la Terre, à la pollution et à la conservation

    "HYDRO": ["CLIMATE", "ECOLOGY", "EARTH", "ATMOS", "POLLUT"],
    // L'hydrologie est connectée au climat, à l'écologie, à la Terre, à l'atmosphère et à la pollution

    "ATMOS": ["CLIMATE", "ECOLOGY", "HYDRO", "POLLUT", "ENERGY"],
    // L'atmosphère interagit avec le climat, l'écologie, l'hydrologie, la pollution et l'énergie

    "EARTH": ["CLIMATE", "ECOLOGY", "HYDRO", "ATMOS", "POLLUT", "CONSERV"],
    // Les sciences de la Terre sont liées au climat, à l'écologie, à l'hydrologie, à l'atmosphère, à la pollution et à la conservation

    "POLLUT": ["CLIMATE", "ECOLOGY", "HYDRO", "ATMOS", "EARTH", "CONSERV", "ENERGY"],
    // La pollution affecte le climat, l'écologie, l'hydrologie, l'atmosphère, la Terre, la conservation et l'énergie

    "CONSERV": ["CLIMATE", "ECOLOGY", "EARTH", "POLLUT", "ENERGY"],
    // La conservation est liée au climat, à l'écologie, à la Terre, à la pollution et à l'énergie

    "ENERGY": ["CLIMATE", "ATMOS", "POLLUT", "CONSERV"]
    // L'énergie est connectée au climat, à l'atmosphère, à la pollution et à la conservation
  },
  expertLinks: [
    // Liens forts (poids 4) - Phénomènes globaux et interactions majeures
    ["Climate Change", "Global Warming", 4],
    ["Greenhouse Effect", "Climate Change", 4],
    ["Carbon Cycle", "Climate Change", 4],
    ["Climate Modeling", "Climate Change", 4],
    ["Sea Level Rise", "Climate Change", 4],
    ["Ocean Acidification", "Carbon Cycle", 4],
    ["Ecosystem Dynamics", "Biodiversity", 4],
    ["Food Webs", "Ecosystem Dynamics", 4],
    ["Trophic Cascades", "Biodiversity", 4],
    ["Water Cycle", "Hydrology", 4],
    ["Groundwater", "Water Cycle", 4],
    ["Atmospheric Chemistry", "Air Quality", 4],
    ["Ozone Layer", "Atmospheric Chemistry", 4],
    ["Soil Science", "Biogeochemistry", 4],
    ["Land Use Change", "Habitat Fragmentation", 4],
    ["Conservation Biology", "Ecosystem Services", 4],
    ["Renewable Energy", "Energy Transition", 4],
    ["Carbon Emissions", "Fossil Fuels", 4],

    // Liens moyens (poids 3) - Interactions et processus spécifiques
    ["Climate Change", "Ecosystem Dynamics", 3],
    ["Global Warming", "Sea Level Rise", 3],
    ["Greenhouse Effect", "Radiative Forcing", 3],
    ["Carbon Cycle", "Methane Emissions", 3],
    ["Climate Modeling", "Radiative Forcing", 3],
    ["Ocean Acidification", "Marine Ecosystems", 3],
    ["Biodiversity", "Habitat Fragmentation", 3],
    ["Food Webs", "Invasive Species", 3],
    ["Population Ecology", "Trophic Cascades", 3],
    ["Primary Production", "Ecosystem Dynamics", 3],
    ["Watersheds", "Water Pollution", 3],
    ["Ocean Circulation", "Climate Change", 3],
    ["Wetlands", "Biodiversity", 3],
    ["Glaciology", "Sea Level Rise", 3],
    ["Drought", "Water Cycle", 3],
    ["Air Quality", "Methane Emissions", 3],
    ["Aerosols", "Atmospheric Chemistry", 3],
    ["Erosion", "Land Use Change", 3],
    ["Desertification", "Land Use Change", 3],
    ["Water Pollution", "Eutrophication", 3],
    ["Air Pollution", "Atmospheric Chemistry", 3],
    ["Plastic Pollution", "Microplastics", 3],
    ["Ecotoxicology", "Water Pollution", 3],
    ["Environmental Policy", "Sustainability", 3],
    ["Restoration Ecology", "Protected Areas", 3],
    ["Carbon Emissions", "Climate Change", 3],
    ["Energy Transition", "Renewable Energy", 3],
    ["Fossil Fuels", "Carbon Emissions", 3],
    ["Carbon Capture", "Climate Change", 3]
  ],
  conceptKeywords: {
    // Climatologie
    "Climate Change": ["climate", "global", "warming", "impacts", "mitigation"],
    "Global Warming": ["temperature", "greenhouse-gases", "trend", "anthropogenic", "effects"],
    "Greenhouse Effect": ["gases", "heat-trapping", "co2", "methane", "radiation"],
    "Carbon Cycle": ["carbon", "sinks", "sources", "fluxes", "biogeochemical"],
    "Climate Modeling": ["models", "projections", "scenarios", "simulations", "ipcc"],
    "Sea Level Rise": ["ocean", "melting", "thermal-expansion", "coastal", "flooding"],
    "Ocean Acidification": ["ph", "co2-absorption", "marine-life", "calcification", "corals"],

    // Écologie
    "Ecosystem Dynamics": ["interactions", "balance", "resilience", "succession", "stability"],
    "Biodiversity": ["species", "richness", "diversity", "habitats", "conservation"],
    "Food Webs": ["trophic", "predator-prey", "energy-flow", "networks", "interdependencies"],
    "Trophic Cascades": ["impacts", "keystone-species", "ecosystem-engineers", "top-down", "bottom-up"],
    "Population Ecology": ["populations", "growth", "decline", "dynamics", "carrying-capacity"],
    "Habitat Fragmentation": ["land-use", "connectivity", "isolation", "biodiversity-loss", "corridors"],
    "Invasive Species": ["non-native", "competition", "displacement", "ecological-impact", "management"],
    "Primary Production": ["photosynthesis", "biomass", "productivity", "ecosystems", "energy-input"],

    // Hydrologie
    "Water Cycle": ["precipitation", "evaporation", "runoff", "groundwater", "transpiration"],
    "Groundwater": ["aquifers", "recharge", "extraction", "pollution", "sustainability"],
    "Watersheds": ["drainage", "basins", "water-quality", "management", "ecosystems"],
    "Ocean Circulation": ["currents", "thermohaline", "gyres", "climate-regulation", "nutrients"],
    "Wetlands": ["biodiversity", "water-filtration", "carbon-storage", "flood-control", "habitats"],

    // Sciences atmosphériques
    "Atmospheric Chemistry": ["composition", "pollutants", "reactions", "aerosols", "ozone"],
    "Air Quality": ["pollution", "smog", "particulates", "health-impacts", "monitoring"],
    "Ozone Layer": ["stratosphere", "uv-protection", "depletion", "cfcs", "recovery"],
    "Aerosols": ["particles", "atmospheric", "scattering", "climate-effects", "sources"],
    "Methane Emissions": ["greenhouse-gas", "sources", "sinks", "agriculture", "wetlands"],
    "Radiative Forcing": ["energy-balance", "climate-drivers", "positive-negative", "aerosols", "gases"],

    // Sciences de la Terre
    "Soil Science": ["pedology", "fertility", "erosion", "organic-matter", "microbes"],
    "Biogeochemistry": ["cycles", "nutrients", "carbon-nitrogen", "interactions", "ecosystems"],
    "Land Use Change": ["deforestation", "urbanization", "agriculture", "impacts", "sustainability"],
    "Erosion": ["soil", "water-wind", "degradation", "prevention", "sedimentation"],
    "Desertification": ["aridification", "land-degradation", "climate", "vegetation", "restoration"],
    "Glaciology": ["glaciers", "ice-sheets", "melting", "climate-indicators", "sea-level"],

    // Pollution
    "Water Pollution": ["contaminants", "sources", "eutrophication", "toxic", "remediation"],
    "Air Pollution": ["emissions", "smog", "particulates", "health", "regulation"],
    "Plastic Pollution": ["microplastics", "marine", "debris", "impacts", "cleanup"],
    "Eutrophication": ["nutrients", "algal-blooms", "dead-zones", "agriculture", "runoff"],
    "Ecotoxicology": ["toxins", "ecosystems", "bioaccumulation", "impacts", "assessment"],
    "Microplastics": ["plastic", "micro", "marine", "ingestion", "health-risks"],

    // Conservation
    "Conservation Biology": ["protection", "biodiversity", "habitats", "species", "restoration"],
    "Ecosystem Services": ["benefits", "pollination", "water-purification", "carbon-storage", "recreation"],
    "Environmental Policy": ["regulations", "laws", "agreements", "enforcement", "compliance"],
    "Sustainability": ["long-term", "balance", "resources", "future", "equity"],
    "Restoration Ecology": ["recovery", "degraded-ecosystems", "native-species", "habitat", "monitoring"],
    "Protected Areas": ["parks", "reserves", "biodiversity", "management", "conservation"],

    // Énergie
    "Renewable Energy": ["solar", "wind", "hydro", "geothermal", "biomass"],
    "Carbon Emissions": ["co2", "greenhouse-gases", "sources", "reduction", "offsets"],
    "Energy Transition": ["shift", "renewables", "decarbonization", "policy", "innovation"],
    "Fossil Fuels": ["coal", "oil", "gas", "combustion", "emissions"],
    "Carbon Capture": ["storage", "sequestration", "technologies", "geoengineering", "mitigation"]
  }
},

"Human Rights": {
  clusters: [
    "FOUND",      // Fondements théoriques
    "INTL",       // Droit international
    "CIVIL",      // Droits civils et politiques
    "ECON",       // Droits économiques, sociaux et culturels
    "GROUP",      // Droits des groupes spécifiques
    "VIOLAT",     // Violations des droits
    "MECH",       // Mécanismes de protection
    "MOVEMENT"    // Mouvements sociaux
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "FOUND": ["INTL", "CIVIL", "ECON", "GROUP", "MECH"],
    // Les fondements théoriques sous-tendent le droit international, les droits civils/économiques, les droits des groupes, et les mécanismes

    "INTL": ["FOUND", "CIVIL", "ECON", "GROUP", "VIOLAT", "MECH", "MOVEMENT"],
    // Le droit international est lié aux fondements, aux droits civils/économiques, aux droits des groupes, aux violations, aux mécanismes et aux mouvements

    "CIVIL": ["FOUND", "INTL", "ECON", "GROUP", "VIOLAT", "MECH", "MOVEMENT"],
    // Les droits civils sont connectés aux fondements, au droit international, aux droits économiques, aux droits des groupes, aux violations, aux mécanismes et aux mouvements

    "ECON": ["FOUND", "INTL", "CIVIL", "GROUP", "VIOLAT", "MECH"],
    // Les droits économiques/sociaux sont liés aux fondements, au droit international, aux droits civils, aux droits des groupes, aux violations et aux mécanismes

    "GROUP": ["FOUND", "INTL", "CIVIL", "ECON", "VIOLAT", "MECH", "MOVEMENT"],
    // Les droits des groupes sont liés aux fondements, au droit international, aux droits civils/économiques, aux violations, aux mécanismes et aux mouvements

    "VIOLAT": ["INTL", "CIVIL", "ECON", "GROUP", "MECH", "MOVEMENT"],
    // Les violations sont connectées au droit international, aux droits civils/économiques, aux droits des groupes, aux mécanismes et aux mouvements

    "MECH": ["FOUND", "INTL", "CIVIL", "ECON", "GROUP", "VIOLAT", "MOVEMENT"],
    // Les mécanismes sont liés aux fondements, au droit international, aux droits civils/économiques, aux droits des groupes, aux violations et aux mouvements

    "MOVEMENT": ["INTL", "CIVIL", "ECON", "GROUP", "VIOLAT", "MECH"]
    // Les mouvements sociaux sont connectés au droit international, aux droits civils/économiques, aux droits des groupes, aux violations et aux mécanismes
  },
  expertLinks: [
    // Liens forts (poids 4) - Fondements et instruments internationaux
    ["Human Dignity", "Natural Rights", 4],
    ["Social Contract", "Universalism", 4],
    ["Universalism", "Moral Universalism", 4],
    ["UDHR", "ICCPR", 4],
    ["UDHR", "ICESCR", 4],
    ["Geneva Conventions", "War Crimes", 4],
    ["Rome Statute", "Int'l Criminal Court", 4],
    ["Right to Life", "Freedom from Torture", 4],
    ["Freedom of Expression", "Freedom of Assembly", 4],
    ["Right to Education", "Right to Health", 4],
    ["Self-Determination", "Indigenous Rights", 4],
    ["Genocide", "Crimes Against Humanity", 4],
    ["UN Human Rights Council", "Universal Periodic Review", 4],
    ["Civil Rights Movement", "Feminist Movements", 4],

    // Liens moyens (poids 3) - Droits spécifiques et mécanismes
    ["Cultural Relativism", "Postcolonial Critique", 3],
    ["Capabilities Approach", "Progressive Realization", 3],
    ["Customary Intl. Law", "State Responsibility", 3],
    ["Non-Refoulement", "Refugee Rights", 3],
    ["Treaty Bodies", "Special Rapporteurs", 3],
    ["Right to Privacy", "Digital Rights Activism", 3],
    ["Right to Food", "Right to Water", 3],
    ["Right to Work", "Labor Rights Movement", 3],
    ["Environmental Rights", "Climate Justice", 3],
    ["Women's Rights", "Racial Equality", 3],
    ["Children's Rights", "Disability Rights", 3],
    ["Torture", "Forced Disappearances", 3],
    ["Impunity", "Transitional Justice", 3],
    ["Truth Commissions", "Reparations", 3],
    ["Regional HR Courts", "State Responsibility", 3],
    ["NGOs & Civil Society", "HR Monitoring", 3],
    ["HR Defenders", "Civil Rights Movement", 3],
    ["Decolonization", "Self-Determination", 3],

    // Liens transversaux (poids 3)
    ["Human Dignity", "UDHR", 3],
    ["Natural Rights", "Social Contract", 3],
    ["Universalism", "UDHR", 3],
    ["ICCPR", "Freedom of Expression", 3],
    ["ICESCR", "Right to Education", 3],
    ["Geneva Conventions", "Non-Refoulement", 3],
    ["Rome Statute", "Genocide", 3],
    ["State Responsibility", "Impunity", 3],
    ["Right to Health", "Environmental Rights", 3],
    ["Indigenous Rights", "Self-Determination", 3],
    ["Refugee Rights", "Non-Refoulement", 3],
    ["Disability Rights", "Progressive Realization", 3],
    ["Transitional Justice", "Truth Commissions", 3],
    ["Climate Justice", "Environmental Rights", 3]
  ],
  conceptKeywords: {
    // Fondements théoriques
    "Human Dignity": ["inherent", "value", "respect", "universal", "inalienable"],
    "Natural Rights": ["inalienable", "universal", "locke", "life", "liberty"],
    "Social Contract": ["hobbes", "rousseau", "consent", "obligations", "society"],
    "Universalism": ["universal", "rights", "humanity", "equality", "moral"],
    "Cultural Relativism": ["culture", "context", "diversity", "values", "norms"],
    "Capabilities Approach": ["sen", "nussbaum", "functionings", "freedoms", "well-being"],
    "Moral Universalism": ["ethics", "principles", "humanity", "rights", "duties"],
    "Postcolonial Critique": ["colonialism", "power", "injustice", "decolonization", "critique"],

    // Droit international
    "UDHR": ["universal-declaration", "1948", "human-rights", "united-nations", "foundational"],
    "ICCPR": ["civil-political", "covenant", "1966", "rights", "treaty"],
    "ICESCR": ["economic-social-cultural", "covenant", "1966", "rights", "treaty"],
    "Geneva Conventions": ["humanitarian", "war", "protection", "1949", "conflict"],
    "Rome Statute": ["icc", "international-criminal-court", "1998", "justice", "prosecution"],
    "Customary Intl. Law": ["customary", "practice", "opinio-juris", "binding", "norms"],
    "State Responsibility": ["accountability", "violations", "reparations", "obligations", "state"],
    "Non-Refoulement": ["refugees", "protection", "asylum", "deportation", "safety"],
    "Treaty Bodies": ["committees", "monitoring", "compliance", "reporting", "un"],

    // Droits civils et politiques
    "Right to Life": ["life", "protection", "dignity", "survival", "fundamental"],
    "Freedom of Expression": ["speech", "opinion", "censorship", "media", "democracy"],
    "Freedom of Assembly": ["gather", "protest", "association", "peaceful", "public"],
    "Right to Privacy": ["privacy", "data", "surveillance", "autonomy", "confidentiality"],
    "Freedom from Torture": ["torture", "cruel", "inhuman", "degrading", "prohibition"],
    "Due Process": ["fair-trial", "justice", "legal", "procedures", "rights"],
    "Habeas Corpus": ["detention", "legal", "rights", "court", "protection"],

    // Droits économiques, sociaux et culturels
    "Right to Education": ["access", "quality", "equality", "schooling", "lifelong"],
    "Right to Health": ["access", "care", "prevention", "treatment", "well-being"],
    "Right to Food": ["access", "nutrition", "hunger", "security", "adequate"],
    "Right to Water": ["access", "clean", "sanitation", "security", "adequate"],
    "Right to Work": ["employment", "fair-wages", "conditions", "dignity", "opportunity"],
    "Progressive Realization": ["gradual", "achievement", "resources", "obligations", "improvement"],

    // Droits des groupes spécifiques
    "Environmental Rights": ["environment", "protection", "nature", "future", "sustainability"],
    "Indigenous Rights": ["land", "culture", "autonomy", "traditions", "self-determination"],
    "Women's Rights": ["gender", "equality", "empowerment", "discrimination", "violence"],
    "Children's Rights": ["protection", "development", "participation", "education", "health"],
    "Refugee Rights": ["asylum", "protection", "non-refoulement", "status", "safety"],
    "Disability Rights": ["accessibility", "inclusion", "non-discrimination", "autonomy", "dignity"],
    "Self-Determination": ["autonomy", "freedom", "people", "governance", "sovereignty"],
    "Racial Equality": ["anti-racism", "discrimination", "justice", "equity", "inclusion"],

    // Violations des droits
    "Genocide": ["extermination", "intent", "group", "convention", "prevention"],
    "Crimes Against Humanity": ["widespread", "systematic", "attack", "civilians", "prosecution"],
    "War Crimes": ["conflict", "violations", "geneva", "prosecution", "accountability"],
    "Torture": ["cruel", "inhuman", "pain", "prohibition", "convention"],
    "Forced Disappearances": ["abduction", "secret", "detention", "families", "truth"],
    "Impunity": ["lack-of-accountability", "justice", "perpetrators", "victims", "amnesty"],

    // Mécanismes de protection
    "Transitional Justice": ["post-conflict", "accountability", "reconciliation", "truth", "reparations"],
    "Truth Commissions": ["investigation", "violations", "testimonies", "reconciliation", "report"],
    "Reparations": ["compensation", "restitution", "rehabilitation", "guarantees", "justice"],
    "UN Human Rights Council": ["un", "geneva", "resolutions", "monitoring", "dialogue"],
    "Int'l Criminal Court": ["the-hague", "prosecution", "genocide", "war-crimes", "justice"],
    "Universal Periodic Review": ["un", "states", "human-rights", "assessment", "recommendations"],
    "Special Rapporteurs": ["experts", "thematic", "country", "investigations", "reports"],
    "Regional HR Courts": ["european", "inter-american", "african", "judgments", "enforcement"],

    // Mouvements sociaux
    "NGOs & Civil Society": ["advocacy", "monitoring", "awareness", "pressure", "change"],
    "HR Monitoring": ["documentation", "violations", "reporting", "evidence", "advocacy"],
    "Civil Rights Movement": ["equality", "justice", "protests", "legislation", "history"],
    "Feminist Movements": ["gender", "equality", "waves", "intersectionality", "activism"],
    "Decolonization": ["independence", "anti-colonial", "sovereignty", "justice", "reparations"],
    "HR Defenders": ["activists", "protection", "risks", "advocacy", "support"],
    "Climate Justice": ["environment", "equity", "responsibility", "future", "rights"],
    "Labor Rights Movement": ["workers", "unions", "fair-wages", "conditions", "solidarity"],
    "Digital Rights Activism": ["privacy", "surveillance", "access", "freedom", "technology"]
  }
},

"Language Science": {
  clusters: [
    "PHONET",      // Phonétique et phonologie
    "MORPHSYN",    // Morphologie et syntaxe
    "SEMANPRAG",   // Sémantique et pragmatique
    "SOCIOLIN",    // Sociolinguistique
    "PSYCHOLIN",   // Psycholinguistique
    "HISTCOMP",    // Linguistique historique et comparative
    "ACQUIS",      // Acquisition du langage
    "COMPLIN"      // Linguistique computationnelle
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "PHONET": ["MORPHSYN", "SEMANPRAG", "PSYCHOLIN", "ACQUIS"],
    // La phonétique est liée à la morphosyntaxe (sons → structure), à la sémantique/pragmatique (sons → sens), à la psycholinguistique (perception des sons) et à l'acquisition (apprentissage des sons)

    "MORPHSYN": ["PHONET", "SEMANPRAG", "PSYCHOLIN", "HISTCOMP", "ACQUIS"],
    // La morphosyntaxe est liée à la phonétique (structure des sons), à la sémantique (structure → sens), à la psycholinguistique (traitement des structures), à la linguistique historique (évolution des structures) et à l'acquisition (apprentissage des règles)

    "SEMANPRAG": ["PHONET", "MORPHSYN", "SOCIOLIN", "PSYCHOLIN", "COMPLIN"],
    // La sémantique/pragmatique est liée à la phonétique (sens des sons), à la morphosyntaxe (sens des structures), à la sociolinguistique (sens dans le contexte social), à la psycholinguistique (compréhension du sens) et à la linguistique computationnelle (modélisation du sens)

    "SOCIOLIN": ["SEMANPRAG", "PSYCHOLIN", "HISTCOMP", "ACQUIS"],
    // La sociolinguistique est liée à la sémantique/pragmatique (variation du sens), à la psycholinguistique (perception sociale du langage), à la linguistique historique (évolution sociale des langues) et à l'acquisition (apprentissage dans un contexte social)

    "PSYCHOLIN": ["PHONET", "MORPHSYN", "SEMANPRAG", "SOCIOLIN", "ACQUIS", "COMPLIN"],
    // La psycholinguistique est liée à tous les aspects du langage (perception, traitement, production)

    "HISTCOMP": ["MORPHSYN", "SEMANPRAG", "SOCIOLIN", "ACQUIS"],
    // La linguistique historique est liée à la morphosyntaxe (évolution des structures), à la sémantique (évolution des sens), à la sociolinguistique (évolution sociale) et à l'acquisition (transmission intergénérationnelle)

    "ACQUIS": ["PHONET", "MORPHSYN", "SEMANPRAG", "PSYCHOLIN", "HISTCOMP"],
    // L'acquisition est liée à tous les aspects du langage (apprentissage des sons, des structures, du sens, des processus cognitifs, et transmission historique)

    "COMPLIN": ["SEMANPRAG", "PSYCHOLIN", "MORPHSYN"]
    // La linguistique computationnelle utilise la sémantique/pragmatique (modélisation du sens), la psycholinguistique (modélisation cognitive) et la morphosyntaxe (modélisation des structures)
  },
  expertLinks: [
    // Liens forts (poids 4) - Concepts fondamentaux
    ["Phoneme", "Allophone", 4],
    ["Morpheme", "Word Formation", 4],
    ["Generative Grammar", "Universal Grammar", 4],
    ["Lexical Semantics", "Compositional Semantics", 4],
    ["Speech Acts", "Discourse Analysis", 4],
    ["First Language Acquisition", "Critical Period Hypothesis", 4],
    ["SLA Theory", "Input & Interaction", 4],
    ["Natural Language Processing", "Machine Translation", 4],
    ["Corpus Linguistics", "Word Embeddings", 4],

    // Liens moyens (poids 3) - Interactions entre sous-domaines
    ["Prosody", "Tone Languages", 3],
    ["Articulatory Phonetics", "Phonological Rules", 3],
    ["Syllable Structure", "Morpheme", 3],
    ["Phrase Structure", "Minimalist Program", 3],
    ["Typological Syntax", "Universal Grammar", 3],
    ["Reference & Deixis", "Presupposition", 3],
    ["Implicature", "Speech Acts", 3],
    ["Language Variation", "Dialect", 3],
    ["Code-Switching", "Multilingualism", 3],
    ["Language Policy", "Language Endangerment", 3],
    ["Language Contact", "Multilingualism", 3],
    ["Lexical Access", "Word Recognition", 3],
    ["Sentence Parsing", "Garden-Path Sentences", 3],
    ["Language & Thought", "Bilingual Processing", 3],
    ["Comparative Method", "Proto-Languages", 3],
    ["Language Family", "Grammaticalization", 3],
    ["Nativist Theory", "Usage-Based Linguistics", 3],
    ["Language Change", "Grammaticalization", 3],
    ["Language Modeling", "Word Embeddings", 3],

    // Liens transversaux (poids 3)
    ["Phoneme", "Syllable Structure", 3],
    ["Allophone", "Phonological Rules", 3],
    ["Prosody", "Speech Acts", 3],
    ["Morpheme", "Phrase Structure", 3],
    ["Word Formation", "Typological Syntax", 3],
    ["Generative Grammar", "Minimalist Program", 3],
    ["Universal Grammar", "Nativist Theory", 3],
    ["Lexical Semantics", "Language & Thought", 3],
    ["Compositional Semantics", "Sentence Parsing", 3],
    ["Reference & Deixis", "Discourse Analysis", 3],
    ["Language Variation", "Language Contact", 3],
    ["Dialect", "Language Policy", 3],
    ["First Language Acquisition", "SLA Theory", 3],
    ["Critical Period Hypothesis", "Bilingual Processing", 3]
  ],
  conceptKeywords: {
    // Phonétique et phonologie
    "Phoneme": ["sound", "distinctive", "minimal-pair", "segment", "articulation"],
    "Allophone": ["variant", "phoneme", "contextual", "realization", "free-vs-complementary"],
    "Prosody": ["stress", "intonation", "rhythm", "tone", "suprasegmental"],
    "Tone Languages": ["pitch", "lexical-tone", "contour", "register", "mandarin"],
    "Articulatory Phonetics": ["articulators", "place-manner", "voicing", "ipa", "transcription"],
    "Phonological Rules": ["processes", "assimilation", "deletion", "insertion", "metathesis"],
    "Syllable Structure": ["onset", "nucleus", "coda", "sonority", "hierarchy"],

    // Morphologie et syntaxe
    "Morpheme": ["meaning", "minimal-unit", "free-bound", "affix", "root"],
    "Word Formation": ["compounding", "derivation", "inflection", "blending", "acronyms"],
    "Generative Grammar": ["chomsky", "transformations", "deep-structure", "surface-structure", "recursion"],
    "Universal Grammar": ["innateness", "language-faculty", "principles", "parameters", "ug"],
    "Phrase Structure": ["constituents", "hierarchy", "phrase", "syntax-tree", "x-bar"],
    "Minimalist Program": ["economy", "merge", "move", "chomsky", "minimalism"],
    "Typological Syntax": ["word-order", "alignment", "marking", "cross-linguistic", "variation"],

    // Sémantique et pragmatique
    "Lexical Semantics": ["word-meaning", "semantic-features", "thematic-roles", "sense", "reference"],
    "Compositional Semantics": ["meaning-composition", "truth-conditions", "lambda-calculus", "denotation", "logical-form"],
    "Reference & Deixis": ["referents", "indexicals", "here-there", "i-you", "context"],
    "Presupposition": ["backgrounded", "assumptions", "triggers", "cancellation", "projection"],
    "Implicature": ["conversational", "grice", "maxims", "scalar", "particularized"],
    "Speech Acts": ["austin", "searle", "illocutionary", "perlocutionary", "performative"],
    "Discourse Analysis": ["coherence", "cohesion", "anaphora", "turn-taking", "conversation"],

    // Sociolinguistique
    "Language Variation": ["dialectal", "social", "regional", "stylistic", "register"],
    "Dialect": ["regional-variety", "lexical", "phonological", "grammatical", "isolect"],
    "Code-Switching": ["language-mixing", "bilingual", "context", "markers", "functions"],
    "Language Policy": ["planning", "status", "corpus", "acquisition", "standardization"],
    "Language Contact": ["borrowing", "interference", "convergence", "pidgins", "creoles"],
    "Multilingualism": ["bilingualism", "trilingualism", "code-mixing", "dominance", "balance"],
    "Language Endangerment": ["extinction", "revitalization", "documentation", "maintenance", "shift"],

    // Psycholinguistique
    "Lexical Access": ["mental-lexicon", "retrieval", "frequency", "neighborhood", "priming"],
    "Sentence Parsing": ["syntax", "ambiguity", "garden-path", "parser", "real-time"],
    "Language & Thought": ["sapir-whorf", "cognition", "perception", "relativity", "influence"],
    "Bilingual Processing": ["code-switching", "interference", "selection", "control", "executive-function"],
    "Garden-Path Sentences": ["ambiguity", "misleading", "reanalysis", "syntax", "processing"],
    "Word Recognition": ["visual", "auditory", "lexical-decision", "priming", "frequency"],

    // Linguistique historique et comparative
    "Language Change": ["evolution", "innovation", "diffusion", "variation", "mechanisms"],
    "Comparative Method": ["reconstruction", "cognates", "sound-change", "proto-forms", "correspondences"],
    "Proto-Languages": ["ancestor", "reconstruction", "proto-indo-european", "comparison", "etymology"],
    "Language Family": ["genetic", "relatedness", "subgroups", "tree-model", "classification"],
    "Grammaticalization": ["change", "grammatical", "pathways", "bleaching", "extension"],

    // Acquisition du langage
    "First Language Acquisition": ["children", "stages", "milestones", "innateness", "input"],
    "Critical Period Hypothesis": ["lenneberg", "age", "sensitive-period", "plasticity", "maturation"],
    "SLA Theory": ["second-language", "interlanguage", "fossilization", "transfer", "motivation"],
    "Input & Interaction": ["comprehensible-input", "krashen", "negotiation", "feedback", "output"],
    "Nativist Theory": ["chomsky", "lAD", "innate", "grammar", "biological-basis"],
    "Usage-Based Linguistics": ["emergentism", "frequency", "experience", "construction-grammar", "tomasello"],

    // Linguistique computationnelle
    "Natural Language Processing": ["nlp", "computational", "algorithms", "text", "speech"],
    "Machine Translation": ["automatic", "translation", "neural", "rule-based", "evaluation"],
    "Corpus Linguistics": ["corpora", "annotation", "frequency", "concordance", "statistics"],
    "Word Embeddings": ["vector", "semantic-space", "word2vec", "glove", "contextual"],
    "Language Modeling": ["probabilistic", "prediction", "perplexity", "neural", "transformers"]
  }
},

"Neuroscience": {
  clusters: [
    "MOLCELL",    // Neurosciences moléculaires et cellulaires
    "SYSTEMS",    // Neurosciences des systèmes
    "COGNEURO",   // Neurosciences cognitives
    "DEVNEURO",   // Neurodéveloppement
    "CLINICAL",   // Neurosciences cliniques
    "COMPUT",     // Neurosciences computationnelles
    "METHODS",    // Méthodes et techniques
    "TRANSLA"     // Neurosciences translationnelles
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "MOLCELL": ["SYSTEMS", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
    // Les mécanismes moléculaires et cellulaires sous-tendent les systèmes neuronaux, le développement, les applications cliniques, les modèles computationnels et les méthodes

    "SYSTEMS": ["MOLCELL", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
    // Les systèmes neuronaux intègrent les mécanismes moléculaires, supportent les fonctions cognitives, évoluent avec le développement, sont ciblés en clinique, inspirent les modèles computationnels et utilisent des méthodes spécifiques

    "COGNEURO": ["MOLCELL", "SYSTEMS", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
    // Les neurosciences cognitives s'appuient sur les mécanismes moléculaires, les systèmes neuronaux, le développement, ont des applications cliniques, utilisent des modèles computationnels et des méthodes d'imagerie

    "DEVNEURO": ["MOLCELL", "SYSTEMS", "COGNEURO", "CLINICAL", "METHODS"],
    // Le neurodéveloppement dépend des mécanismes moléculaires, façonne les systèmes neuronaux, influence les fonctions cognitives, a des implications cliniques et utilise des méthodes spécifiques

    "CLINICAL": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "COMPUT", "METHODS", "TRANSLA"],
    // Les neurosciences cliniques s'appuient sur tous les niveaux d'analyse (moléculaire à systémique), utilisent des modèles computationnels, des méthodes diagnostiques et visent la traduction

    "COMPUT": ["MOLCELL", "SYSTEMS", "COGNEURO", "CLINICAL", "METHODS", "TRANSLA"],
    // Les neurosciences computationnelles modélisent les mécanismes moléculaires, les systèmes neuronaux, les fonctions cognitives, ont des applications cliniques, utilisent des méthodes quantitatives et visent la traduction

    "METHODS": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "TRANSLA"],
    // Les méthodes sont appliquées à tous les niveaux d'analyse et types de neurosciences

    "TRANSLA": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"]
    // La recherche translationnelle intègre tous les aspects des neurosciences pour des applications pratiques
  },
  expertLinks: [
    // Liens forts (poids 4) - Concepts fondamentaux et mécanismes clés
    ["Action Potential", "Ion Channels", 4],
    ["Synaptic Plasticity", "Long-Term Potentiation", 4],
    ["Neurotransmitter Systems", "Receptor Signaling", 4],
    ["Visual Cortex", "Auditory Processing", 4],
    ["Motor System", "Basal Ganglia", 4],
    ["Prefrontal Networks", "Executive Control (Neural)", 4],
    ["Working Memory (Neural)", "Attention Networks", 4],
    ["Neurogenesis", "Synaptic Pruning", 4],
    ["Alzheimer's Disease", "Brain Aging", 4],
    ["Parkinson's Disease", "Basal Ganglia", 4],
    ["Neural Coding", "Brain Oscillations", 4],
    ["Connectomics", "Predictive Processing", 4],
    ["fMRI", "EEG / MEG", 4],
    ["Optogenetics", "Patch-Clamp Recording", 4],

    // Liens moyens (poids 3) - Interactions entre systèmes et fonctions
    ["Ion Channels", "Receptor Signaling", 3],
    ["Neuroinflammation", "Myelin & Glia", 3],
    ["Long-Term Potentiation", "Neuroplasticity Rehab.", 3],
    ["Limbic System", "Emotion Regulation (Neural)", 3],
    ["Default Mode Network", "Attention Networks", 3],
    ["Thalamo-Cortical Loops", "Motor System", 3],
    ["Decision Neuroscience", "Reward Circuits", 3],
    ["Language Networks", "Social Brain", 3],
    ["Critical Periods", "Neurogenesis", 3],
    ["Neurotrophins", "Synaptic Plasticity", 3],
    ["Adolescent Brain", "Critical Periods", 3],
    ["Schizophrenia (Neuro)", "Depression & Brain", 3],
    ["Traumatic Brain Injury", "Multiple Sclerosis", 3],
    ["Bayesian Brain", "Free Energy Principle", 3],
    ["TMS / tDCS", "Brain Stimulation Therapy", 3],
    ["Diffusion Tensor Imaging", "Connectomics", 3],
    ["Neuroprotection", "Drug Target Discovery", 3],
    ["Biomarkers (Neuro)", "Animal Models", 3],

    // Liens transversaux (poids 3)
    ["Action Potential", "Neural Coding", 3],
    ["Synaptic Plasticity", "Neurotrophins", 3],
    ["Visual Cortex", "Perception", 3],
    ["Motor System", "Movement", 3],
    ["Prefrontal Networks", "Cognitive Control", 3],
    ["Default Mode Network", "Self-Referential Thought", 3],
    ["Attention Networks", "Cognitive Flexibility", 3],
    ["Working Memory (Neural)", "Executive Control (Neural)", 3],
    ["Emotion Regulation (Neural)", "Limbic System", 3],
    ["Decision Neuroscience", "Prefrontal Networks", 3],
    ["Language Networks", "Broca's Area", 3],
    ["Reward Circuits", "Dopamine", 3],
    ["Social Brain", "Theory of Mind", 3]
  ],
  conceptKeywords: {
    // Neurosciences moléculaires et cellulaires
    "Action Potential": ["neuron", "depolarization", "repolarization", "threshold", "voltage-gated"],
    "Ion Channels": ["sodium", "potassium", "calcium", "voltage-gated", "ligand-gated"],
    "Neurotransmitter Systems": ["dopamine", "serotonin", "glutamate", "gaba", "acetylcholine"],
    "Synaptic Plasticity": ["ltp", "ltd", "hebbian", "synaptic-strength", "learning"],
    "Receptor Signaling": ["gpcr", "ionotropic", "metabotropic", "second-messenger", "cascade"],
    "Neuroinflammation": ["microglia", "astrocytes", "cytokines", "neurodegeneration", "immune-response"],
    "Myelin & Glia": ["oligodendrocytes", "schwann-cells", "myelination", "demyelination", "white-matter"],
    "Long-Term Potentiation": ["hippocampus", "synaptic-strengthening", "ampa", "nmda", "calcium"],

    // Neurosciences des systèmes
    "Visual Cortex": ["v1", "primary-visual", "orientation", "edges", "hierarchical"],
    "Auditory Processing": ["cochlea", "auditory-cortex", "frequency", "tonotopy", "sound"],
    "Motor System": ["cortex", "basal-ganglia", "cerebellum", "movement", "coordination"],
    "Limbic System": ["amygdala", "hippocampus", "hypothalamus", "emotion", "memory"],
    "Basal Ganglia": ["caudate", "putamen", "globus-pallidus", "movement", "reward"],
    "Prefrontal Networks": ["executive-function", "planning", "decision-making", "working-memory", "attention"],
    "Default Mode Network": ["resting-state", "self-referential", "mind-wandering", "default-mode", "connectivity"],
    "Thalamo-Cortical Loops": ["thalamus", "cortex", "oscillations", "feedback", "sensory-motor"],
    "Attention Networks": ["dorsal", "ventral", "saliency", "filtering", "focus"],

    // Neurosciences cognitives
    "Working Memory (Neural)": ["prefrontal-cortex", "maintenance", "manipulation", "capacity", "delay-tasks"],
    "Executive Control (Neural)": ["inhibition", "shifting", "updating", "cognitive-flexibility", "go-no-go"],
    "Emotion Regulation (Neural)": ["amygdala", "prefrontal", "reappraisal", "suppression", "coping"],
    "Decision Neuroscience": ["risk", "reward", "uncertainty", "ventromedial-prefrontal", "orbitofrontal"],
    "Language Networks": ["broca", "wernicke", "arcuate-fasciculus", "syntax", "semantics"],
    "Reward Circuits": ["dopamine", "nucleus-accumbens", "ventral-tegmental", "motivation", "reinforcement"],
    "Social Brain": ["mirror-neurons", "theory-of-mind", "empathy", "face-processing", "social-cognition"],

    // Neurodéveloppement
    "Neurogenesis": ["hippocampus", "subventricular-zone", "adult", "stem-cells", "plasticity"],
    "Synaptic Pruning": ["adolescence", "development", "refinement", "elimination", "maturation"],
    "Critical Periods": ["plasticity", "sensitive-period", "language", "vision", "developmental-window"],
    "Neurotrophins": ["bdnf", "ngf", "nt-3", "growth-factors", "survival"],
    "Brain Aging": ["cognitive-decline", "neurodegeneration", "memory", "processing-speed", "volume-loss"],
    "Adolescent Brain": ["maturation", "risk-taking", "emotional-regulation", "peer-influence", "plasticity"],

    // Neurosciences cliniques
    "Alzheimer's Disease": ["amyloid", "tau", "dementia", "memory-loss", "neurodegeneration"],
    "Parkinson's Disease": ["dopamine", "substantia-nigra", "tremor", "bradykinesia", "lewy-bodies"],
    "Epilepsy": ["seizures", "hypersynchrony", "excitability", "anticonvulsants", "foci"],
    "Schizophrenia (Neuro)": ["dopamine", "glutamate", "hallucinations", "delusions", "cognitive-symptoms"],
    "Depression & Brain": ["serotonin", "hippocampus", "amygdala", "mood", "neuroplasticity"],
    "Traumatic Brain Injury": ["concussion", "contusion", "diffuse-axial", "cognitive-deficits", "rehabilitation"],
    "Multiple Sclerosis": ["demyelination", "autoimmune", "lesions", "inflammation", "white-matter"],

    // Neurosciences computationnelles
    "Neural Coding": ["spike-trains", "rate-coding", "temporal-coding", "information-theory", "decoding"],
    "Brain Oscillations": ["gamma", "beta", "alpha", "theta", "delta"],
    "Bayesian Brain": ["probability", "prediction", "uncertainty", "inference", "prior"],
    "Connectomics": ["networks", "white-matter", "tractography", "graph-theory", "hub"],
    "Predictive Processing": ["prediction-error", "free-energy", "active-inference", "hierarchical", "generative-models"],
    "Free Energy Principle": ["active-inference", "markov-blanket", "variational", "bayesian", "self-organization"],

    // Méthodes et techniques
    "fMRI": ["bold", "hemodynamic", "spatial-resolution", "functional", "neuroimaging"],
    "EEG / MEG": ["electrical", "magnetic", "temporal-resolution", "event-related", "brainwaves"],
    "Optogenetics": ["light", "opsins", "neuronal-control", "causal", "manipulation"],
    "Patch-Clamp Recording": ["electrophysiology", "ion-channels", "single-cell", "voltage-clamp", "current-clamp"],
    "TMS / tDCS": ["non-invasive", "stimulation", "excitability", "modulation", "therapy"],
    "Diffusion Tensor Imaging": ["white-matter", "tractography", "anisotropy", "connectivity", "fiber-tracking"],

    // Neurosciences translationnelles
    "Neuroprotection": ["antioxidants", "anti-inflammatory", "neurotrophic", "apoptosis", "therapeutics"],
    "Neuroplasticity Rehab.": ["stroke", "tbi", "therapy", "recovery", "compensation"],
    "Drug Target Discovery": ["pharmacology", "receptors", "pathways", "screening", "biomarkers"],
    "Biomarkers (Neuro)": ["csf", "blood", "imaging", "genetic", "prognostic"],
    "Animal Models": ["mouse", "rat", "primate", "disease-models", "transgenic"],
    "Brain Stimulation Therapy": ["deep-brain-stimulation", "tms", "tdcs", "depression", "parkinson"]
  }
},

"Philosophy": {
  clusters: [
    "ONTOL",      // Ontologie et métaphysique
    "KNOW",       // Épistémologie
    "ETHVAL",     // Éthique et valeurs
    "LANGLOG",    // Philosophie du langage et logique
    "MINDCON",    // Philosophie de l'esprit et de la conscience
    "SCITEC",     // Philosophie des sciences et de la technologie
    "SOCIALPOL",  // Philosophie sociale et politique
    "HISTPHIL"    // Histoire de la philosophie
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "ONTOL": ["KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "HISTPHIL"],
    // L'ontologie est liée à l'épistémologie (être vs connaître), à l'éthique (être vs devoir-être), au langage (être vs dire), à l'esprit (être vs penser), aux sciences (être vs expliquer) et à l'histoire

    "KNOW": ["ONTOL", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL"],
    // L'épistémologie est liée à l'ontologie (connaître l'être), à l'éthique (connaître le bien), au langage (connaître par le langage), à l'esprit (connaître par la pensée), aux sciences (méthodes de connaissance) et à la philosophie sociale (connaissance collective)

    "ETHVAL": ["ONTOL", "KNOW", "LANGLOG", "MINDCON", "SOCIALPOL", "HISTPHIL"],
    // L'éthique est liée à l'ontologie (valeurs de l'être), à l'épistémologie (connaître le bien), au langage (exprimer les valeurs), à l'esprit (moralité et conscience), à la philosophie sociale (justice) et à l'histoire

    "LANGLOG": ["ONTOL", "KNOW", "ETHVAL", "MINDCON", "SCITEC"],
    // La philosophie du langage est liée à l'ontologie (langage et réalité), à l'épistémologie (langage et connaissance), à l'éthique (langage et valeurs), à l'esprit (langage et pensée) et aux sciences (langage et logique)

    "MINDCON": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "SCITEC", "SOCIALPOL"],
    // La philosophie de l'esprit est liée à l'ontologie (esprit et réalité), à l'épistémologie (esprit et connaissance), à l'éthique (esprit et moralité), au langage (esprit et communication) et aux sciences (esprit et explication scientifique)

    "SCITEC": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SOCIALPOL"],
    // La philosophie des sciences est liée à l'ontologie (science et réalité), à l'épistémologie (méthodes scientifiques), à l'éthique (science et valeurs), au langage (science et communication), à l'esprit (science et cognition) et à la philosophie sociale (science et société)

    "SOCIALPOL": ["ONTOL", "KNOW", "ETHVAL", "MINDCON", "SCITEC", "HISTPHIL"],
    // La philosophie sociale est liée à l'ontologie (société et réalité), à l'épistémologie (connaissance sociale), à l'éthique (justice sociale), à l'esprit (conscience collective), aux sciences (société et explication scientifique) et à l'histoire

    "HISTPHIL": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL"]
    // L'histoire de la philosophie est liée à tous les domaines, car elle retrace leur évolution
  },
  expertLinks: [
    // Liens forts (poids 4) - Concepts fondamentaux et théories majeures
    ["Substance Theory", "Process Philosophy", 4],
    ["Justified True Belief", "Gettier Problem", 4],
    ["Normative Ethics", "Moral Realism", 4],
    ["Truth-Conditional Semantics", "Possible World Semantics", 4],
    ["Hard Problem of Consciousness", "Physicalism", 4],
    ["Scientific Explanation", "Confirmation Theory", 4],
    ["Distributive Justice", "Egalitarianism", 4],
    ["Platonism", "Aristotelianism", 4],
    ["Rationalism", "Empiricism", 4],
    ["Kantian Philosophy", "German Idealism", 4],
    ["Phenomenology", "Existentialism", 4],
    ["Vienna Circle", "Instrumentalism", 4],

    // Liens moyens (poids 3) - Interactions entre sous-domaines
    ["Trope Theory", "Grounding", 3],
    ["Truthmakers", "Abstract Objects", 3],
    ["Mereology", "Existence", 3],
    ["Persistence", "Structural Realism", 3],
    ["Epistemic Closure", "Virtue Epistemology", 3],
    ["Social Epistemology", "Testimony", 3],
    ["Bayesian Epistemology", "A Priori Knowledge", 3],
    ["Reliabilism", "Contextualism", 3],
    ["Non-Cognitivism", "Expressivism", 3],
    ["Error Theory", "Contractarianism", 3],
    ["Preference Utilitarianism", "Bioethics", 3],
    ["Environmental Ethics", "Capability Approach", 3],
    ["Causal Theory of Reference", "Speech Act Theory", 3],
    ["Deflationism", "Inferentialism", 3],
    ["Liar Paradox", "Vagueness", 3],
    ["Propositional Attitudes", "Intentionality", 3],
    ["Property Dualism", "Qualia", 3],
    ["Functionalism", "Eliminativism", 3],
    ["Panpsychism", "Integrated Information Theory", 3],
    ["Underdetermination", "Natural Kinds", 3],
    ["Reduction & Emergence", "Demarcation Problem", 3],
    ["Libertarianism", "Deliberative Democracy", 3],
    ["Feminist Philosophy", "Critical Theory", 3],
    ["Recognition Theory", "Philosophy of Law", 3],

    // Liens transversaux (poids 3)
    ["Substance Theory", "Existence", 3],
    ["Process Philosophy", "Persistence", 3],
    ["Justified True Belief", "Reliabilism", 3],
    ["Gettier Problem", "Epistemic Closure", 3],
    ["Normative Ethics", "Contractarianism", 3],
    ["Moral Realism", "Non-Cognitivism", 3],
    ["Truth-Conditional Semantics", "Causal Theory of Reference", 3],
    ["Possible World Semantics", "Speech Act Theory", 3],
    ["Hard Problem of Consciousness", "Property Dualism", 3],
    ["Physicalism", "Functionalism", 3],
    ["Qualia", "Intentionality", 3],
    ["Scientific Explanation", "Paradigm Shifts", 3],
    ["Confirmation Theory", "Reduction & Emergence", 3],
    ["Distributive Justice", "Libertarianism", 3],
    ["Egalitarianism", "Deliberative Democracy", 3]
  ],
  conceptKeywords: {
    // Ontologie et métaphysique
    "Substance Theory": ["aristotle", "essence", "particulars", "universals", "metaphysics"],
    "Process Philosophy": ["whitehead", "becoming", "events", "flux", "reality"],
    "Trope Theory": ["properties", "particulars", "tropes", "bundles", "ontology"],
    "Grounding": ["dependence", "metaphysical", "explanation", "priority", "building"],
    "Truthmakers": ["truth", "entities", "correspondence", "ontology", "facts"],
    "Abstract Objects": ["platonism", "mathematics", "concepts", "non-spatiotemporal", "existence"],
    "Mereology": ["parts", "wholes", "composition", "parthood", "ontology"],
    "Existence": ["being", "reality", "quantification", "modality", "essence"],
    "Persistence": ["time", "identity", "endurance", "perdurance", "change"],
    "Structural Realism": ["science", "structure", "relations", "ontic", "epistemic"],

    // Épistémologie
    "Justified True Belief": ["knowledge", "justification", "truth", "belief", "gettier"],
    "Gettier Problem": ["counterexamples", "knowledge", "luck", "justification", "truth"],
    "Epistemic Closure": ["knowledge", "entailment", "closure", "skepticism", "principles"],
    "Virtue Epistemology": ["virtues", "intellectual", "reliabilism", "character", "sosa"],
    "Social Epistemology": ["knowledge", "community", "testimony", "trust", "collective"],
    "Bayesian Epistemology": ["probability", "belief", "updating", "evidence", "rationality"],
    "A Priori Knowledge": ["reason", "independent", "experience", "necessary", "analytic"],
    "Reliabilism": ["reliability", "process", "knowledge", "justification", "goldman"],
    "Contextualism": ["context", "knowledge", "standards", "skepticism", "deRose"],
    "Testimony": ["knowledge", "trust", "communication", "authority", "reliability"],

    // Éthique et valeurs
    "Normative Ethics": ["moral-theories", "deontology", "consequentialism", "virtue", "principles"],
    "Moral Realism": ["objectivity", "moral-facts", "cognitivism", "truth", "realism"],
    "Non-Cognitivism": ["emotions", "prescriptivism", "expressivism", "anti-realism", "ayers"],
    "Expressivism": ["moral-language", "emotions", "non-factual", "blackburn", "attitudes"],
    "Error Theory": ["moral-language", "error", "fictionalism", "mackie", "objectivity"],
    "Contractarianism": ["contract", "moral-rules", "agreement", "scanlon", "rawls"],
    "Preference Utilitarianism": ["utility", "preferences", "maximization", "singer", "welfare"],
    "Bioethics": ["medicine", "life", "autonomy", "beneficence", "justice"],
    "Environmental Ethics": ["nature", "value", "anthropocentrism", "ecocentrism", "sustainability"],
    "Capability Approach": ["functionings", "capabilities", "sen", "nussbaum", "well-being"],

    // Philosophie du langage et logique
    "Truth-Conditional Semantics": ["meaning", "truth-conditions", "propositions", "frege", "tarski"],
    "Possible World Semantics": ["modality", "possible-worlds", "meaning", "kripke", "intensions"],
    "Causal Theory of Reference": ["reference", "causality", "kripke", "naming", "rigid-designators"],
    "Speech Act Theory": ["austin", "searle", "illocutionary", "perlocutionary", "performatives"],
    "Deflationism": ["truth", "minimalism", "horwich", "redundancy", "disquotational"],
    "Inferentialism": ["meaning", "inference", "brandom", "pragmatism", "norms"],
    "Liar Paradox": ["truth", "self-reference", "paradox", "tarski", "hierarchy"],
    "Vagueness": ["borderline", "sorites", "fuzzy", "supervaluationism", "context"],

    // Philosophie de l'esprit et de la conscience
    "Propositional Attitudes": ["beliefs", "desires", "intentionality", "mental-states", "propositions"],
    "Hard Problem of Consciousness": ["chalmers", "experience", "qualia", "physical", "explanatory-gap"],
    "Physicalism": ["materialism", "mind-brain", "reduction", "supervenience", "non-reductive"],
    "Property Dualism": ["mind", "properties", "physical", "mental", "chalmers"],
    "Functionalism": ["mind", "functions", "roles", "multiple-realizability", "putnam"],
    "Qualia": ["experience", "subjective", "phenomenal", "ineffable", "nagel"],
    "Intentionality": ["aboutness", "mental-states", "brentano", "directionality", "content"],
    "Panpsychism": ["consciousness", "ubiquitous", "mind", "matter", "galileo-problem"],
    "Eliminativism": ["mind", "elimination", "churchlands", "neuroscience", "folk-psychology"],
    "Integrated Information Theory": ["consciousness", "phi", "integration", "information", "tononi"],

    // Philosophie des sciences et de la technologie
    "Scientific Explanation": ["explanation", "laws", "causation", "unification", "hempel"],
    "Confirmation Theory": ["evidence", "hypotheses", "bayes", "confirmation", "carnap"],
    "Underdetermination": ["evidence", "theories", "duhem", "quine", "holism"],
    "Natural Kinds": ["categories", "science", "realism", "essentialism", "kripke"],
    "Instrumentalism": ["theories", "tools", "prediction", "van-fraassen", "constructive-empiricism"],
    "Paradigm Shifts": ["kuhn", "science", "revolution", "normal-science", "incommensurability"],
    "Reduction & Emergence": ["reductionism", "emergence", "complexity", "nagel", "non-reductive"],
    "Demarcation Problem": ["science", "pseudoscience", "popper", "falsifiability", "criteria"],

    // Philosophie sociale et politique
    "Distributive Justice": ["justice", "resources", "rawls", "equality", "fairness"],
    "Libertarianism": ["liberty", "rights", "nozick", "minimal-state", "property"],
    "Egalitarianism": ["equality", "opportunity", "welfare", "luck", "responsibility"],
    "Deliberative Democracy": ["democracy", "deliberation", "habermas", "consensus", "public-reason"],
    "Feminist Philosophy": ["gender", "equality", "oppression", "intersectionality", "beauvoir"],
    "Critical Theory": ["society", "critique", "ideology", "marx", "frankfurt-school"],
    "Recognition Theory": ["identity", "recognition", "honneth", "respect", "justice"],
    "Philosophy of Law": ["law", "justice", "legal-positivism", "natural-law", "hart"],

    // Histoire de la philosophie
    "Platonism": ["plato", "forms", "idealism", "dualism", "reality"],
    "Aristotelianism": ["aristotle", "substance", "causation", "virtue", "logic"],
    "Rationalism": ["reason", "innate-ideas", "descartes", "spinoza", "leibniz"],
    "Empiricism": ["experience", "sense-data", "locke", "berkeley", "hume"],
    "Kantian Philosophy": ["kant", "categories", "phenomena", "noumena", "transcendental"],
    "German Idealism": ["fichte", "schelling", "hegel", "absolute", "dialectic"],
    "Phenomenology": ["husserl", "intentionality", "epoché", "lifeworld", "consciousness"],
    "Pragmatism": ["peirce", "james", "dewey", "practice", "truth"],
    "Existentialism": ["sartre", "camus", "authenticity", "freedom", "absurd"],
    "Vienna Circle": ["logical-positivism", "carnap", "neurath", "verification", "empiricism"]
  }
},

"Systems Science": {
  clusters: [
    "COMPLEX",    // Théorie de la complexité
    "CYBERN",     // Cybernétique
    "SYSTHINK",   // Pensée systémique
    "NETWORKS",   // Théorie des réseaux
    "DYNAMIC",    // Dynamique des systèmes
    "INFOTHE",    // Théorie de l'information
    "EMERGE",     // Émergence
    "APPLIED"     // Applications
  ],
  clusterConnections: {
    // Connexions logiques entre clusters
    "COMPLEX": ["CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE", "APPLIED"],
    // La théorie de la complexité est liée à la cybernétique (contrôle des systèmes complexes), à la pensée systémique, aux réseaux, à la dynamique, à l'émergence et aux applications

    "CYBERN": ["COMPLEX", "SYSTHINK", "DYNAMIC", "INFOTHE", "APPLIED"],
    // La cybernétique est liée à la complexité (systèmes complexes), à la pensée systémique, à la dynamique (contrôle), à la théorie de l'information et aux applications

    "SYSTHINK": ["COMPLEX", "CYBERN", "NETWORKS", "DYNAMIC", "EMERGE", "APPLIED"],
    // La pensée systémique est liée à la complexité, à la cybernétique, aux réseaux, à la dynamique, à l'émergence et aux applications

    "NETWORKS": ["COMPLEX", "SYSTHINK", "DYNAMIC", "INFOTHE", "EMERGE", "APPLIED"],
    // La théorie des réseaux est liée à la complexité, à la pensée systémique, à la dynamique, à la théorie de l'information, à l'émergence et aux applications

    "DYNAMIC": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "INFOTHE", "EMERGE", "APPLIED"],
    // La dynamique des systèmes est liée à tous les autres clusters, car elle décrit le comportement des systèmes

    "INFOTHE": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE"],
    // La théorie de l'information est liée à la complexité, à la cybernétique, à la pensée systémique, aux réseaux, à la dynamique et à l'émergence

    "EMERGE": ["COMPLEX", "SYSTHINK", "NETWORKS", "DYNAMIC", "INFOTHE", "APPLIED"],
    // L'émergence est liée à la complexité, à la pensée systémique, aux réseaux, à la dynamique, à la théorie de l'information et aux applications

    "APPLIED": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE"]
    // Les applications sont liées à tous les autres clusters, car elles utilisent les concepts des sciences des systèmes
  },
  expertLinks: [
    // Liens forts (poids 4) - Concepts fondamentaux
    ["Nonlinear Dynamics", "Chaos Theory", 4],
    ["Complex Adaptive Systems", "Agent-Based Modeling", 4],
    ["Feedback Loops", "Control Theory", 4],
    ["Homeostasis", "Autopoiesis", 4],
    ["Second-Order Cybernetics", "Circular Causality", 4],
    ["Causal Loop Diagrams", "Stocks & Flows", 4],
    ["System Dynamics", "Leverage Points", 4],
    ["Graph Theory (Sys)", "Small-World Networks", 4],
    ["Scale-Free Networks", "Network Resilience", 4],
    ["Attractors", "Stability Analysis", 4],
    ["Differential Equations", "Stochastic Processes", 4],
    ["Entropy", "Shannon Information", 4],
    ["Mutual Information", "Kolmogorov Complexity", 4],
    ["Emergence", "Self-Organization", 4],
    ["Dissipative Structures", "Pattern Formation", 4],
    ["Swarm Intelligence", "Resilience Engineering", 4],
    ["Sociotechnical Systems", "Wicked Problems", 4],

    // Liens moyens (poids 3) - Interactions entre concepts
    ["Nonlinear Dynamics", "Phase Transitions", 3],
    ["Chaos Theory", "Power Laws", 3],
    ["Complex Adaptive Systems", "Feedback Loops", 3],
    ["Agent-Based Modeling", "Phase Transitions", 3],
    ["Power Laws", "Network Resilience", 3],
    ["Feedback Loops", "Causal Loop Diagrams", 3],
    ["Control Theory", "Homeostasis", 3],
    ["Autopoiesis", "Second-Order Cybernetics", 3],
    ["Circular Causality", "Causal Loop Diagrams", 3],
    ["Stocks & Flows", "System Dynamics", 3],
    ["Leverage Points", "Systems Archetypes", 3],
    ["Soft Systems Methodology", "Wicked Problems", 3],
    ["Graph Theory (Sys)", "Centrality Measures", 3],
    ["Small-World Networks", "Community Detection", 3],
    ["Scale-Free Networks", "Multilayer Networks", 3],
    ["Network Resilience", "Centrality Measures", 3],
    ["Community Detection", "Multilayer Networks", 3],
    ["Attractors", "Limit Cycles", 3],
    ["Stability Analysis", "Coupling & Synchrony", 3],
    ["Limit Cycles", "Differential Equations", 3],
    ["Differential Equations", "Coupling & Synchrony", 3],
    ["Stochastic Processes", "Pattern Formation", 3],
    ["Coupling & Synchrony", "Swarm Intelligence", 3],
    ["Entropy", "Channel Capacity", 3],
    ["Shannon Information", "Mutual Information", 3],
    ["Kolmogorov Complexity", "Channel Capacity", 3],
    ["Emergence", "Dissipative Structures", 3],
    ["Self-Organization", "Pattern Formation", 3],
    ["Dissipative Structures", "Swarm Intelligence", 3],
    ["Pattern Formation", "Simulation Modeling", 3],
    ["Swarm Intelligence", "Risk Analysis", 3],
    ["Resilience Engineering", "System of Systems", 3],

    // Liens transversaux (poids 3)
    ["Nonlinear Dynamics", "System Dynamics", 3],
    ["Chaos Theory", "Attractors", 3],
    ["Complex Adaptive Systems", "Emergence", 3],
    ["Agent-Based Modeling", "Swarm Intelligence", 3],
    ["Phase Transitions", "Criticality", 3],
    ["Power Laws", "Fractals", 3],
    ["Feedback Loops", "Homeostasis", 3],
    ["Control Theory", "Autopoiesis", 3],
    ["Homeostasis", "Resilience Engineering", 3],
    ["Autopoiesis", "Self-Organization", 3]
  ],
  conceptKeywords: {
    // Théorie de la complexité
    "Nonlinear Dynamics": ["chaos", "bifurcation", "sensitivity", "butterfly-effect", "deterministic"],
    "Chaos Theory": ["lorenz", "strange-attractors", "unpredictability", "initial-conditions", "fractals"],
    "Complex Adaptive Systems": ["adaptation", "learning", "evolution", "agents", "holland"],
    "Agent-Based Modeling": ["simulation", "agents", "interactions", "rules", "netlogo"],
    "Phase Transitions": ["criticality", "percolation", "order-disorder", "universality", "renormalization"],
    "Power Laws": ["scale-invariance", "pareto", "zipf", "heavy-tails", "fractals"],
    "Feedback Loops": ["positive", "negative", "reinforcing", "balancing", "delays"],

    // Cybernétique
    "Control Theory": ["regulation", "stability", "controllers", "set-points", "error-correction"],
    "Homeostasis": ["equilibrium", "stability", "cannon", "physiological", "adaptation"],
    "Autopoiesis": ["self-production", "maturana", "varela", "autonomous", "living-systems"],
    "Second-Order Cybernetics": ["observer", "self-reference", "von-foerster", "recursion", "constructivism"],
    "Circular Causality": ["feedback", "recursion", "mutual-influence", "loops", "nonlinearity"],

    // Pensée systémique
    "Causal Loop Diagrams": ["feedback", "variables", "links", "reinforcing", "balancing"],
    "Stocks & Flows": ["accumulation", "rates", "levels", "dynamics", "forrester"],
    "System Dynamics": ["forrester", "simulation", "feedback", "time-delays", "nonlinearity"],
    "Leverage Points": ["interventions", "high-impact", "meadows", "system-change", "paradigms"],
    "Systems Archetypes": ["patterns", "behavior", "generic-structures", "policy-resistance", "shifting-burden"],
    "Soft Systems Methodology": ["checkland", "problem-solving", "stakeholders", "rich-pictures", "root-definitions"],

    // Théorie des réseaux
    "Graph Theory (Sys)": ["nodes", "edges", "paths", "connectivity", "topology"],
    "Small-World Networks": ["watts-strogatz", "clustering", "short-paths", "six-degrees", "efficiency"],
    "Scale-Free Networks": ["barabasi", "power-law", "hubs", "preferential-attachment", "robustness"],
    "Network Resilience": ["robustness", "vulnerability", "attack", "failure", "recovery"],
    "Centrality Measures": ["degree", "betweenness", "closeness", "eigenvector", "pagerank"],
    "Community Detection": ["modularity", "louvain", "girvan-newman", "clusters", "overlap"],
    "Multilayer Networks": ["layers", "interdependencies", "coupling", "multiplex", "interconnected"],

    // Dynamique des systèmes
    "Attractors": ["fixed-points", "limit-cycles", "strange", "basins", "stability"],
    "Stability Analysis": ["lyapunov", "equilibrium", "perturbations", "bifurcations", "resilience"],
    "Limit Cycles": ["periodic", "oscillations", "phase-space", "poincare", "nonlinear"],
    "Differential Equations": ["ode", "pde", "linear", "nonlinear", "numerical"],
    "Stochastic Processes": ["randomness", "markov", "brownian", "diffusion", "monte-carlo"],
    "Coupling & Synchrony": ["interaction", "phase-locking", "kuramoto", "oscillators", "coordination"],

    // Théorie de l'information
    "Entropy": ["shannon", "uncertainty", "disorder", "information-content", "thermodynamics"],
    "Shannon Information": ["bits", "communication", "encoding", "channel", "source"],
    "Mutual Information": ["dependence", "correlation", "shared-information", "redundancy", "synergy"],
    "Kolmogorov Complexity": ["algorithmic", "description-length", "randomness", "compressibility", "universal-turing-machine"],
    "Channel Capacity": ["bandwidth", "noise", "shannon", "maximum-rate", "communication"],

    // Émergence
    "Emergence": ["novelty", "irreducibility", "hierarchy", "downward-causation", "strong-weak"],
    "Self-Organization": ["order", "spontaneous", "non-equilibrium", "dissipation", "patterns"],
    "Dissipative Structures": ["prigogine", "non-equilibrium", "order-from-chaos", "entropy", "bifurcations"],
    "Pattern Formation": ["turing", "morphogenesis", "spatial", "temporal", "symmetry-breaking"],

    // Applications
    "Swarm Intelligence": ["collective", "decentralized", "ant-colony", "particle-swarm", "optimization"],
    "Resilience Engineering": ["safety", "adaptation", "failure-management", "complex-systems", "robustness"],
    "Sociotechnical Systems": ["humans", "technology", "interaction", "design", "organization"],
    "Wicked Problems": ["complexity", "uncertainty", "conflict", "rittel-webber", "no-stop-rule"],
    "Simulation Modeling": ["computational", "agent-based", "discrete-event", "system-dynamics", "validation"],
    "Risk Analysis": ["uncertainty", "probability", "hazards", "vulnerability", "mitigation"],
    "System of Systems": ["meta-systems", "interoperability", "hierarchy", "emergent-behavior", "integration"]
  }
},

      
"Interdisciplinary Knowledge Network": {
  clusters: [
    "PHIL",      // Philosophie
    "EDUC",      // Sciences de l'éducation
    "HR",        // Droits de l'homme
    "ENV",       // Sciences environnementales
    "CS",        // Informatique
    "NEURO",     // Neurosciences
    "COGPSY",    // Psychologie cognitive
    "LANG",      // Sciences du langage
    "ANTH",      // Anthropologie
    "SYS"        // Sciences des systèmes
  ],
  clusterConnections: {
    // Connexions entre disciplines (basées sur les liens inter-disciplines dans votre fichier)
    "PHIL": ["EDUC", "HR", "ENV", "CS", "NEURO", "COGPSY", "LANG", "ANTH", "SYS"],
    "EDUC": ["PHIL", "HR", "ENV", "CS", "NEURO", "COGPSY", "LANG", "ANTH", "SYS"],
    "HR": ["PHIL", "EDUC", "ENV", "CS", "NEURO", "COGPSY", "LANG", "ANTH", "SYS"],
    "ENV": ["PHIL", "EDUC", "HR", "CS", "NEURO", "COGPSY", "LANG", "ANTH", "SYS"],
    "CS": ["PHIL", "EDUC", "HR", "ENV", "NEURO", "COGPSY", "LANG", "ANTH", "SYS"],
    "NEURO": ["PHIL", "EDUC", "HR", "ENV", "CS", "COGPSY", "LANG", "ANTH", "SYS"],
    "COGPSY": ["PHIL", "EDUC", "HR", "ENV", "CS", "NEURO", "LANG", "ANTH", "SYS"],
    "LANG": ["PHIL", "EDUC", "HR", "ENV", "CS", "NEURO", "COGPSY", "ANTH", "SYS"],
    "ANTH": ["PHIL", "EDUC", "HR", "ENV", "CS", "NEURO", "COGPSY", "LANG", "SYS"],
    "SYS": ["PHIL", "EDUC", "HR", "ENV", "CS", "NEURO", "COGPSY", "LANG", "ANTH"]
  },
  expertLinks: [
    // Liens forts (poids 5) - Basés sur les connexions majeures dans votre fichier
    {s: "Epistemology", t: "Constructivism", w: 5, pair: ["PHIL", "EDUC"]},
    {s: "Critical Theory", t: "Critical Pedagogy", w: 5, pair: ["PHIL", "EDUC"]},
    {s: "Ethics", t: "Human Dignity", w: 5, pair: ["PHIL", "HR"]},
    {s: "Educational Equity", t: "Justice", w: 5, pair: ["EDUC", "HR"]},
    {s: "Environmental Rights", t: "Sustainability", w: 5, pair: ["HR", "ENV"]},
    {s: "Climate Change", t: "Machine Learning", w: 5, pair: ["ENV", "CS"]},
    {s: "Machine Learning", t: "Neural Coding", w: 5, pair: ["CS", "NEURO"]},
    {s: "Synaptic Plasticity", t: "Working Memory", w: 5, pair: ["NEURO", "COGPSY"]},
    {s: "Working Memory", t: "Psycholinguistics", w: 5, pair: ["COGPSY", "LANG"]},
    {s: "Language & Culture", t: "Social Structure", w: 5, pair: ["LANG", "ANTH"]},
    {s: "Ecosystem Dynamics", t: "Complex Systems", w: 5, pair: ["ENV", "SYS"]},

    // Liens moyens (poids 4) - Autres connexions importantes
    {s: "Logic", t: "Formal Methods", w: 4, pair: ["PHIL", "CS"]},
    {s: "Phil. of Mind", t: "Predictive Processing", w: 4, pair: ["PHIL", "NEURO"]},
    {s: "Metacognition (Ed)", t: "Working Memory", w: 4, pair: ["EDUC", "COGPSY"]},
    {s: "Digital Rights", t: "Cybersecurity", w: 4, pair: ["HR", "CS"]},
    {s: "AI in Education", t: "Machine Learning", w: 4, pair: ["EDUC", "CS"]},
    {s: "Constructivism", t: "Synaptic Plasticity", w: 4, pair: ["EDUC", "NEURO"]},
    {s: "NLP", t: "Computational Ling.", w: 4, pair: ["CS", "LANG"]},
    {s: "Neural Coding", t: "Network Theory", w: 4, pair: ["NEURO", "SYS"]},
    {s: "Political Ecology", t: "Ecosystem Dynamics", w: 4, pair: ["ANTH", "ENV"]},
    {s: "Social Structure", t: "Complex Systems", w: 4, pair: ["ANTH", "SYS"]},

    // Liens transversaux (poids 3)
    {s: "Ethics", t: "Educational Equity", w: 3, pair: ["PHIL", "EDUC"]},
    {s: "Justice", t: "Climate Change", w: 3, pair: ["HR", "ENV"]},
    {s: "Data Science", t: "Neuroimaging", w: 3, pair: ["CS", "NEURO"]},
    {s: "Dual-Process Theory", t: "Heuristics & Biases", w: 3, pair: ["COGPSY", "COGPSY"]},
    {s: "Language Acquisition", t: "Pedagogy", w: 3, pair: ["LANG", "EDUC"]}
  ],
  conceptKeywords: {
    // Philosophie
    "Epistemology": ["knowledge", "justification", "truth", "belief", "theory-of-knowledge"],
    "Ethics": ["moral", "values", "right-wrong", "normative", "virtue"],
    "Logic": ["reasoning", "arguments", "validity", "symbolic", "formal"],
    "Phil. of Mind": ["consciousness", "mental-states", "mind-body", "intentionality", "qualia"],
    "Phil. of Science": ["methodology", "explanation", "laws", "theories", "empiricism"],
    "Critical Theory": ["society", "critique", "ideology", "emancipation", "marxist"],
    "Ontology": ["being", "existence", "reality", "categories", "metaphysics"],
    "Phenomenology": ["experience", "consciousness", "lived-experience", "husserl", "perception"],

    // Sciences de l'éducation
    "Constructivism": ["learning", "knowledge-construction", "piaget", "active", "student-centered"],
    "Pedagogy": ["teaching", "methods", "instruction", "curriculum", "strategies"],
    "Self-Reg. Learning": ["metacognition", "autonomy", "goals", "strategies", "motivation"],
    "Formative Assessment": ["feedback", "evaluation", "progress", "adjustment", "learning"],
    "Educational Equity": ["fairness", "access", "opportunity", "inclusion", "justice"],
    "AI in Education": ["technology", "personalization", "adaptive", "tools", "automation"],
    "Critical Pedagogy": ["empowerment", "social-justice", "freire", "dialogue", "transformation"],
    "Metacognition (Ed)": ["thinking-about-thinking", "self-regulation", "awareness", "control", "learning"],

    // Droits de l'homme
    "Human Dignity": ["inherent", "value", "respect", "universal", "inalienable"],
    "Justice": ["fairness", "equity", "rights", "law", "social-justice"],
    "International HR Law": ["treaties", "conventions", "un", "protection", "accountability"],
    "Environmental Rights": ["nature", "protection", "sustainability", "future", "ecology"],
    "Digital Rights": ["privacy", "access", "freedom", "technology", "surveillance"],
    "Transitional Justice": ["reconciliation", "accountability", "truth", "reparations", "post-conflict"],
    "Accountability": ["responsibility", "answerability", "transparency", "justice", "obligation"],

    // Sciences environnementales
    "Climate Change": ["global-warming", "greenhouse-gases", "impacts", "mitigation", "adaptation"],
    "Biodiversity": ["species", "ecosystems", "conservation", "richness", "habitats"],
    "Ecosystem Dynamics": ["interactions", "balance", "resilience", "succession", "stability"],
    "Sustainability": ["long-term", "balance", "resources", "future", "equity"],
    "Environmental Policy": ["regulations", "laws", "protection", "management", "governance"],
    "Renewable Energy": ["solar", "wind", "hydro", "sustainable", "clean"],
    "Carbon Cycle": ["carbon", "atmosphere", "ocean", "plants", "climate"],

    // Informatique
    "Machine Learning": ["ai", "algorithms", "training", "models", "prediction"],
    "NLP": ["language", "processing", "text", "comprehension", "generation"],
    "Cybersecurity": ["protection", "threats", "encryption", "networks", "privacy"],
    "Data Science": ["analysis", "big-data", "statistics", "insights", "visualization"],
    "Human-Comp. Inter.": ["usability", "design", "user-experience", "interface", "accessibility"],
    "Algorithms": ["computation", "efficiency", "sorting", "searching", "complexity"],
    "Formal Methods": ["verification", "logic", "proofs", "correctness", "specification"],

    // Neurosciences
    "Synaptic Plasticity": ["learning", "memory", "neural-connections", "ltp", "hebbian"],
    "Prefrontal Cortex": ["executive-function", "decision-making", "planning", "working-memory", "attention"],
    "Neural Coding": ["representation", "neurons", "information", "spikes", "patterns"],
    "Brain Oscillations": ["rhythms", "gamma", "beta", "theta", "synchronization"],
    "Neuroimaging": ["fmri", "eeg", "brain-scans", "visualization", "mapping"],
    "Predictive Processing": ["prediction", "brain", "expectations", "errors", "models"],
    "Default Mode Network": ["rest", "mind-wandering", "self-referential", "connectivity", "introspection"],

    // Psychologie cognitive
    "Working Memory": ["short-term", "storage", "manipulation", "capacity", "executive"],
    "Dual-Process Theory": ["intuition", "reasoning", "fast-slow", "kahneman", "cognition"],
    "Executive Control": ["regulation", "inhibition", "shifting", "updating", "cognitive-flexibility"],
    "Heuristics & Biases": ["mental-shortcuts", "errors", "judgment", "decision-making", "tversky"],
    "Theory of Mind": ["empathy", "perspective-taking", "beliefs", "intentions", "social-cognition"],
    "Emotion Regulation": ["management", "coping", "strategies", "awareness", "control"],
    "Attribution Theory": ["causality", "explanations", "locus-of-control", "kelly", "bias"],
    "Selective Attention": ["focus", "filtering", "distraction", "prioritization", "cognitive-resources"],

    // Sciences du langage
    "Syntax": ["grammar", "structure", "rules", "sentences", "chomsky"],
    "Semantics": ["meaning", "words", "phrases", "context", "truth-conditions"],
    "Language Acquisition": ["learning", "children", "stages", "innateness", "input"],
    "Sociolinguistics": ["language", "society", "variation", "dialects", "culture"],
    "Computational Ling.": ["nlp", "algorithms", "parsing", "generation", "models"],
    "Language & Culture": ["communication", "identity", "norms", "practices", "diversity"],
    "Psycholinguistics": ["processing", "comprehension", "production", "brain", "language"],

    // Anthropologie
    "Ethnography": ["fieldwork", "culture", "observation", "qualitative", "participant-observation"],
    "Cultural Relativism": ["diversity", "values", "perspective", "judgment", "boas"],
    "Political Ecology": ["environment", "power", "resources", "conflict", "justice"],
    "Human Evolution": ["origins", "adaptation", "fossils", "hominids", "darwin"],
    "Social Structure": ["organization", "hierarchy", "roles", "institutions", "networks"],
    "Medical Anthropology": ["health", "culture", "disease", "healing", "beliefs"],
    "Material Culture": ["artifacts", "objects", "technology", "symbols", "archaeology"],

    // Sciences des systèmes
    "Complex Systems": ["networks", "interactions", "emergence", "nonlinearity", "adaptation"],
    "Emergence": ["novelty", "properties", "whole", "parts", "unpredictability"],
    "Systems Thinking": ["holism", "interconnections", "feedback", "dynamics", "perspectives"],
    "Network Theory": ["nodes", "edges", "graphs", "connectivity", "topology"],
    "Information Theory": ["entropy", "communication", "bits", "channels", "shannon"],
    "Resilience": ["adaptation", "recovery", "robustness", "stability", "shocks"],
    "Self-Organization": ["order", "spontaneous", "patterns", "complexity", "dissipation"]
  }
}

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
if (config.expertLinks && Array.isArray(config.expertLinks)) {
  config.expertLinks.forEach(link => {
    // Si c'est un tuple [source, target, weight]
    if (Array.isArray(link) && link.length >= 3) {
      addLink(link[0], link[1], link[2]);
    }
    // Si c'est un objet {source, target, weight}
    else if (link.source && link.target && link.weight !== undefined) {
      addLink(link.source, link.target, link.weight);
    }
    // Si c'est un objet personnalisé {s, t, w} (votre cas)
    else if (link.s && link.t && link.w !== undefined) {
      addLink(link.s, link.t, link.w);
    }
    // Sinon, ignorez (pas de console.warn pour éviter le spam)
    else {
      // Ne rien faire (les liens non reconnus sont ignorés)
    }
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
