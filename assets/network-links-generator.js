// =============================================
// MLKN.lab - Network Links Generator (5-Layer Structure)
// Author: François Papin (adapted for 26 disciplines + 5 layers + 5 Core Domains)
// May 2026 | MIT License
// =============================================

// =============================================
// CONFIGURATION PAR DISCIPLINE (26 disciplines)
// Organized into 5 Core Discipline Domains (Layer 1)
// =============================================
const DISCIPLINE_CONFIG = {

  // ========== CORE DOMAIN 1: FORMAL SCIENCES ==========
  "Mathematical Science": {
    domain: "FORMAL",
    clusters: ["ALGEBRA", "CALCULUS", "STATISTICS", "TOPOLOGY"],
    clusterConnections: {
      "ALGEBRA": ["CALCULUS", "STATISTICS"],
      "CALCULUS": ["ALGEBRA", "STATISTICS", "TOPOLOGY"],
      "STATISTICS": ["ALGEBRA", "CALCULUS"],
      "TOPOLOGY": ["CALCULUS"]
    },
    expertLinks: [
      ["algebra", "abstract_algebra", 4],
      ["calculus", "differential_equations", 4],
      ["statistics", "probability_theory", 4],
      ["topology", "algebraic_topology", 4],
      ["abstract_algebra", "groups", 3],
      ["differential_equations", "partial_differential_equations", 3],
      ["probability_theory", "stochastic_processes", 3]
    ],
    conceptKeywords: {
      "algebra": ["groups", "rings", "fields", "modules", "vector-spaces"],
      "calculus": ["limits", "derivatives", "integrals", "series", "multivariable"],
      "statistics": ["probability", "distributions", "hypothesis-testing", "regression", "bayesian"],
      "topology": ["spaces", "continuity", "compactness", "connectedness", "manifolds"],
      "abstract_algebra": ["groups", "rings", "fields", "modules", "vector-spaces"],
      "differential_equations": ["ode", "pde", "linear", "nonlinear", "numerical"],
      "probability_theory": ["distributions", "expectation", "variance", "stochastic", "markov"],
      "algebraic_topology": ["homotopy", "homology", "cohomology", "fundamental-group", "manifolds"],
      "groups": ["abelian", "non-abelian", "finite", "infinite", "lie-groups"],
      "partial_differential_equations": ["heat", "wave", "laplace", "navier-stokes", "schrodinger"],
      "stochastic_processes": ["markov", "brownian", "poisson", "diffusion", "martingale"]
    }
  },

  "Logic": {
    domain: "FORMAL",
    clusters: ["SYMBOLIC", "MATHLOGIC", "COMPLOGIC", "PHILLOGIC"],
    clusterConnections: {
      "SYMBOLIC": ["MATHLOGIC", "COMPLOGIC", "PHILLOGIC"],
      "MATHLOGIC": ["SYMBOLIC", "COMPLOGIC"],
      "COMPLOGIC": ["SYMBOLIC", "MATHLOGIC", "PHILLOGIC"],
      "PHILLOGIC": ["SYMBOLIC", "COMPLOGIC"]
    },
    expertLinks: [
      ["symbolic_logic", "propositional_logic", 4],
      ["mathematical_logic", "predicate_logic", 4],
      ["computational_logic", "lambda_calculus", 4],
      ["philosophical_logic", "modal_logic", 4],
      ["propositional_logic", "logical_connectives", 3],
      ["predicate_logic", "quantifiers", 3],
      ["lambda_calculus", "type_theory", 3]
    ],
    conceptKeywords: {
      "symbolic_logic": ["propositions", "connectives", "truth-tables", "tautologies", "contradictions"],
      "mathematical_logic": ["sets", "functions", "relations", "proof-theory", "model-theory"],
      "computational_logic": ["algorithms", "computability", "complexity", "automata", "type-systems"],
      "philosophical_logic": ["modality", "necessity", "possibility", "epistemic", "deontic"],
      "propositional_logic": ["connectives", "truth-tables", "tautologies", "contradictions", "normal-forms"],
      "predicate_logic": ["quantifiers", "predicates", "variables", "free-bound", "interpretations"],
      "lambda_calculus": ["abstraction", "application", "reduction", "combinators", "typed"],
      "modal_logic": ["necessity", "possibility", "kripke-semantics", "axiomatic-systems", "temporal"],
      "logical_connectives": ["and", "or", "not", "implies", "iff"],
      "quantifiers": ["universal", "existential", "uniqueness", "scope", "nested"],
      "type_theory": ["types", "terms", "judgments", "dependent-types", "homotopy"]
    }
  },

  "Computer Science": {
    domain: "FORMAL",
    clusters: ["AI", "THEORY", "SYSTEMS", "DATA", "HCI", "SECURITY", "EMERGING", "SE"],
    clusterConnections: {
      "AI": ["THEORY", "DATA", "SYSTEMS", "HCI", "EMERGING"],
      "THEORY": ["AI", "SYSTEMS", "DATA", "SECURITY"],
      "SYSTEMS": ["AI", "THEORY", "DATA", "SECURITY", "SE", "EMERGING"],
      "DATA": ["AI", "THEORY", "SYSTEMS", "HCI", "SECURITY"],
      "HCI": ["AI", "DATA", "SYSTEMS", "EMERGING"],
      "SECURITY": ["THEORY", "SYSTEMS", "DATA", "EMERGING"],
      "EMERGING": ["AI", "SYSTEMS", "DATA", "HCI", "SECURITY"],
      "SE": ["SYSTEMS", "THEORY", "DATA", "SECURITY"]
    },
    expertLinks: [
      ["ai", "machine_learning", 4],
      ["theory", "algorithms", 4],
      ["systems", "complex_systems", 4],
      ["data", "data_science", 4],
      ["hci", "human_computer_interaction", 4],
      ["security", "cybersecurity", 4],
      ["emerging", "ai_ethics", 4],
      ["se", "software_engineering", 4],
      ["machine_learning", "supervised_learning", 3],
      ["algorithms", "formal_methods", 3],
      ["complex_systems", "network_theory", 3],
      ["data_science", "machine_learning", 3],
      ["human_computer_interaction", "usability", 3],
      ["cybersecurity", "network_security", 3],
      ["ai_ethics", "algorithmic_bias", 3],
      ["software_engineering", "programming_languages", 3]
    ],
    conceptKeywords: {
      "ai": ["machine-learning", "neural-networks", "cognition", "automation", "intelligence"],
      "theory": ["algorithms", "complexity", "computability", "automata", "formal-languages"],
      "systems": ["distributed", "networks", "operating-systems", "databases", "cloud"],
      "data": ["databases", "big-data", "data-mining", "information-retrieval", "visualization"],
      "hci": ["usability", "user-experience", "interaction-design", "accessibility", "cognitive-ergonomics"],
      "security": ["cryptography", "network-security", "privacy", "cybersecurity", "trust"],
      "emerging": ["ai-ethics", "quantum-computing", "blockchain", "robotics", "bioinformatics"],
      "se": ["requirements", "design", "testing", "maintenance", "devops"],
      "machine_learning": ["supervised", "unsupervised", "reinforcement", "neural-networks", "deep-learning"],
      "algorithms": ["sorting", "searching", "graph", "dynamic-programming", "greedy"],
      "complex_systems": ["networks", "dynamics", "chaos", "emergence", "adaptation"],
      "data_science": ["statistics", "machine-learning", "data-mining", "visualization", "big-data"],
      "human_computer_interaction": ["interfaces", "usability", "accessibility", "cognition", "emotion"],
      "cybersecurity": ["encryption", "firewalls", "intrusion-detection", "vulnerabilities", "threats"],
      "ai_ethics": ["fairness", "accountability", "transparency", "bias", "human-oversight"],
      "software_engineering": ["requirements-engineering", "design-patterns", "testing", "maintenance", "agile"],
      "supervised_learning": ["classification", "regression", "training", "validation", "overfitting"],
      "formal_methods": ["verification", "model-checking", "theorem-proving", "specification", "correctness"],
      "network_theory": ["graphs", "nodes", "edges", "connectivity", "centrality"],
      "usability": ["user-friendly", "learnability", "efficiency", "memorability", "satisfaction"],
      "network_security": ["firewalls", "ids", "vpn", "zero-trust", "end-to-end-encryption"],
      "algorithmic_bias": ["discrimination", "fairness", "accountability", "transparency", "audit"],
      "programming_languages": ["syntax", "semantics", "compilation", "interpretation", "paradigms"]
    }
  },

  "Systems Science": {
    domain: "FORMAL",
    clusters: ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "INFOTHE", "EMERGE", "APPLIED"],
    clusterConnections: {
      "COMPLEX": ["CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE", "APPLIED"],
      "CYBERN": ["COMPLEX", "SYSTHINK", "DYNAMIC", "INFOTHE", "APPLIED"],
      "SYSTHINK": ["COMPLEX", "CYBERN", "NETWORKS", "DYNAMIC", "EMERGE", "APPLIED"],
      "NETWORKS": ["COMPLEX", "SYSTHINK", "DYNAMIC", "INFOTHE", "EMERGE", "APPLIED"],
      "DYNAMIC": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "INFOTHE", "EMERGE", "APPLIED"],
      "INFOTHE": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE"],
      "EMERGE": ["COMPLEX", "SYSTHINK", "NETWORKS", "DYNAMIC", "INFOTHE", "APPLIED"],
      "APPLIED": ["COMPLEX", "CYBERN", "SYSTHINK", "NETWORKS", "DYNAMIC", "EMERGE"]
    },
    expertLinks: [
      ["complex_systems", "network_theory", 4],
      ["cybernetics", "control_theory", 4],
      ["systems_thinking", "causal_loop_diagrams", 4],
      ["networks", "graph_theory", 4],
      ["dynamics", "system_dynamics", 4],
      ["information_theory", "entropy", 4],
      ["emergence", "self_organization", 4],
      ["applied", "resilience_engineering", 4],
      ["network_theory", "small_world_networks", 3],
      ["control_theory", "homeostasis", 3],
      ["causal_loop_diagrams", "stocks_and_flows", 3],
      ["graph_theory", "centrality_measures", 3],
      ["system_dynamics", "leverage_points", 3],
      ["entropy", "shannon_information", 3],
      ["self_organization", "dissipative_structures", 3],
      ["resilience_engineering", "sociotechnical_systems", 3]
    ],
    conceptKeywords: {
      "complex_systems": ["networks", "interactions", "emergence", "nonlinearity", "adaptation"],
      "cybernetics": ["feedback", "control", "communication", "systems", "homeostasis"],
      "systems_thinking": ["holism", "interconnections", "feedback", "dynamics", "perspectives"],
      "networks": ["graph-theory", "small-world", "scale-free", "resilience", "centrality"],
      "dynamics": ["system-dynamics", "feedback-loops", "stocks", "flows", "simulation"],
      "information_theory": ["entropy", "shannon", "communication", "channels", "coding"],
      "emergence": ["novelty", "irreducibility", "hierarchy", "downward-causation", "strong-weak"],
      "applied": ["sociotechnical-systems", "wicked-problems", "risk-analysis", "simulation-modeling", "policy"],
      "network_theory": ["nodes", "edges", "paths", "connectivity", "topology"],
      "control_theory": ["regulation", "stability", "controllers", "set-points", "error-correction"],
      "causal_loop_diagrams": ["feedback", "variables", "links", "reinforcing", "balancing"],
      "graph_theory": ["nodes", "edges", "paths", "connectivity", "topology"],
      "system_dynamics": ["forrester", "simulation", "feedback", "time-delays", "nonlinearity"],
      "entropy": ["shannon", "uncertainty", "disorder", "information-content", "thermodynamics"],
      "shannon_information": ["bits", "communication", "encoding", "channel", "source"],
      "self_organization": ["order", "spontaneous", "non-equilibrium", "dissipation", "patterns"],
      "dissipative_structures": ["prigogine", "non-equilibrium", "order-from-chaos", "entropy", "bifurcations"],
      "resilience_engineering": ["safety", "adaptation", "failure-management", "complex-systems", "robustness"],
      "sociotechnical_systems": ["humans", "technology", "interaction", "design", "organization"],
      "small_world_networks": ["watts-strogatz", "clustering", "short-paths", "six-degrees", "efficiency"],
      "homeostasis": ["equilibrium", "stability", "cannon", "physiological", "adaptation"],
      "stocks_and_flows": ["accumulation", "rates", "levels", "dynamics", "forrester"],
      "centrality_measures": ["degree", "betweenness", "closeness", "eigenvector", "pagerank"],
      "leverage_points": ["interventions", "high-impact", "meadows", "system-change", "paradigms"]
    }
  },

  // ========== CORE DOMAIN 2: NATURAL SCIENCES ==========
  "Neuroscience": {
    domain: "NATURAL",
    clusters: ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS", "TRANSLA"],
    clusterConnections: {
      "MOLCELL": ["SYSTEMS", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
      "SYSTEMS": ["MOLCELL", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
      "COGNEURO": ["MOLCELL", "SYSTEMS", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"],
      "DEVNEURO": ["MOLCELL", "SYSTEMS", "COGNEURO", "CLINICAL", "METHODS"],
      "CLINICAL": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "COMPUT", "METHODS", "TRANSLA"],
      "COMPUT": ["MOLCELL", "SYSTEMS", "COGNEURO", "CLINICAL", "METHODS", "TRANSLA"],
      "METHODS": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "TRANSLA"],
      "TRANSLA": ["MOLCELL", "SYSTEMS", "COGNEURO", "DEVNEURO", "CLINICAL", "COMPUT", "METHODS"]
    },
    expertLinks: [
      ["molecular_neuroscience", "neural_coding", 4],
      ["systems_neuroscience", "brain_imaging", 4],
      ["cognitive_neuroscience", "executive_control", 4],
      ["developmental_neuroscience", "neurogenesis", 4],
      ["clinical_neuroscience", "alzheimers_disease", 4],
      ["computational_neuroscience", "neural_networks", 4],
      ["neuro_methods", "fMRI", 4],
      ["translational_neuroscience", "neuroprotection", 4],
      ["neural_coding", "action_potential", 3],
      ["brain_imaging", "EEG", 3],
      ["executive_control", "prefrontal_networks", 3],
      ["neurogenesis", "synaptic_pruning", 3],
      ["alzheimers_disease", "brain_aging", 3],
      ["neural_networks", "deep_learning", 3],
      ["fMRI", "diffusion_tensor_imaging", 3],
      ["neuroprotection", "drug_target_discovery", 3]
    ],
    conceptKeywords: {
      "molecular_neuroscience": ["neurons", "synapses", "neurotransmitters", "ion-channels", "receptors"],
      "systems_neuroscience": ["circuits", "pathways", "networks", "integration", "behavior"],
      "cognitive_neuroscience": ["brain", "cognition", "memory", "attention", "perception"],
      "developmental_neuroscience": ["growth", "plasticity", "maturation", "critical-periods", "aging"],
      "clinical_neuroscience": ["diagnosis", "treatment", "disease-management", "clinical-trials", "patient-care"],
      "computational_neuroscience": ["models", "simulations", "neural-networks", "machine-learning", "brain-machine-interfaces"],
      "neuro_methods": ["fMRI", "EEG", "MEG", "PET", "DTI"],
      "translational_neuroscience": ["therapeutics", "biomarkers", "animal-models", "clinical-trials", "drug-development"],
      "neural_coding": ["spike-trains", "rate-coding", "temporal-coding", "information-theory", "decoding"],
      "action_potential": ["neuron", "depolarization", "repolarization", "threshold", "voltage-gated"],
      "brain_imaging": ["fMRI", "EEG", "MEG", "PET", "DTI"],
      "EEG": ["electroencephalography", "brainwaves", "alpha", "beta", "gamma"],
      "executive_control": ["inhibition", "shifting", "updating", "cognitive-flexibility", "go-no-go"],
      "prefrontal_networks": ["planning", "decision-making", "working-memory", "attention", "goal-directed"],
      "neurogenesis": ["hippocampus", "subventricular-zone", "adult", "stem-cells", "plasticity"],
      "synaptic_pruning": ["adolescence", "development", "refinement", "elimination", "maturation"],
      "alzheimers_disease": ["amyloid", "tau", "dementia", "memory-loss", "neurodegeneration"],
      "brain_aging": ["cognitive-decline", "neurodegeneration", "memory", "processing-speed", "volume-loss"],
      "neural_networks": ["nodes", "weights", "activation", "backpropagation", "architecture"],
      "deep_learning": ["neural-networks", "layers", "training", "gpu", "big-data"],
      "diffusion_tensor_imaging": ["white-matter", "tractography", "anisotropy", "connectivity", "fiber-tracking"],
      "neuroprotection": ["antioxidants", "anti-inflammatory", "neurotrophic", "apoptosis", "therapeutics"],
      "drug_target_discovery": ["pharmacology", "receptors", "pathways", "screening", "biomarkers"]
    }
  },

  "Environmental Science": {
    domain: "NATURAL",
    clusters: ["CLIMATE", "ECOLOGY", "HYDRO", "ATMOS", "EARTH", "POLLUT", "CONSERV", "ENERGY"],
    clusterConnections: {
      "CLIMATE": ["ECOLOGY", "HYDRO", "ATMOS", "EARTH", "POLLUT", "ENERGY"],
      "ECOLOGY": ["CLIMATE", "HYDRO", "EARTH", "POLLUT", "CONSERV"],
      "HYDRO": ["CLIMATE", "ECOLOGY", "EARTH", "ATMOS", "POLLUT"],
      "ATMOS": ["CLIMATE", "ECOLOGY", "HYDRO", "POLLUT", "ENERGY"],
      "EARTH": ["CLIMATE", "ECOLOGY", "HYDRO", "ATMOS", "POLLUT", "CONSERV"],
      "POLLUT": ["CLIMATE", "ECOLOGY", "HYDRO", "ATMOS", "EARTH", "CONSERV", "ENERGY"],
      "CONSERV": ["CLIMATE", "ECOLOGY", "EARTH", "POLLUT", "ENERGY"],
      "ENERGY": ["CLIMATE", "ATMOS", "POLLUT", "CONSERV"]
    },
    expertLinks: [
      ["climate_science", "climate_change", 4],
      ["ecology", "biodiversity", 4],
      ["hydrology", "water_cycle", 4],
      ["atmospheric_science", "atmospheric_chemistry", 4],
      ["earth_science", "geology", 4],
      ["pollution", "environmental_pollution", 4],
      ["conservation", "conservation_biology", 4],
      ["energy", "renewable_energy", 4],
      ["climate_change", "global_warming", 3],
      ["biodiversity", "ecosystem_dynamics", 3],
      ["water_cycle", "hydrological_cycle", 3],
      ["atmospheric_chemistry", "air_quality", 3],
      ["geology", "mineralogy", 3],
      ["environmental_pollution", "water_pollution", 3],
      ["conservation_biology", "ecosystem_services", 3],
      ["renewable_energy", "solar_energy", 3]
    ],
    conceptKeywords: {
      "climate_science": ["climate", "weather", "atmosphere", "ocean", "cryosphere"],
      "ecology": ["ecosystems", "populations", "communities", "biodiversity", "interactions"],
      "hydrology": ["water", "cycle", "groundwater", "watersheds", "precipitation"],
      "atmospheric_science": ["atmosphere", "weather", "climate", "composition", "dynamics"],
      "earth_science": ["geology", "soil", "minerals", "tectonics", "landforms"],
      "pollution": ["contaminants", "sources", "impacts", "remediation", "monitoring"],
      "conservation": ["protection", "biodiversity", "habitats", "restoration", "sustainability"],
      "energy": ["resources", "renewable", "fossil-fuels", "efficiency", "transition"],
      "climate_change": ["global-warming", "greenhouse-gases", "impacts", "mitigation", "adaptation"],
      "global_warming": ["temperature", "greenhouse-gases", "trend", "anthropogenic", "effects"],
      "biodiversity": ["species", "ecosystems", "conservation", "richness", "habitats"],
      "ecosystem_dynamics": ["interactions", "balance", "resilience", "succession", "stability"],
      "hydrological_cycle": ["precipitation", "evaporation", "runoff", "groundwater", "transpiration"],
      "atmospheric_chemistry": ["composition", "pollutants", "reactions", "aerosols", "ozone"],
      "air_quality": ["pollution", "smog", "particulates", "health-impacts", "monitoring"],
      "geology": ["rocks", "minerals", "plate-tectonics", "volcanoes", "earthquakes"],
      "mineralogy": ["minerals", "crystallography", "classification", "properties", "formation"],
      "environmental_pollution": ["water", "air", "soil", "noise", "plastic"],
      "water_pollution": ["contaminants", "sources", "eutrophication", "toxic", "remediation"],
      "conservation_biology": ["protection", "biodiversity", "habitats", "restoration", "sustainability"],
      "ecosystem_services": ["benefits", "pollination", "water-purification", "carbon-storage", "recreation"],
      "renewable_energy": ["solar", "wind", "hydro", "geothermal", "biomass"],
      "solar_energy": ["photovoltaic", "solar-thermal", "concentrated", "passive", "active"]
    }
  },

  "Biology": {
    domain: "NATURAL",
    clusters: ["GENETICS", "CELLBIO", "EVOBIO", "ECOLOGY", "PHYSBIO"],
    clusterConnections: {
      "GENETICS": ["CELLBIO", "EVOBIO", "ECOLOGY"],
      "CELLBIO": ["GENETICS", "EVOBIO", "PHYSBIO"],
      "EVOBIO": ["GENETICS", "CELLBIO", "ECOLOGY", "PHYSBIO"],
      "ECOLOGY": ["GENETICS", "EVOBIO", "PHYSBIO"],
      "PHYSBIO": ["CELLBIO", "EVOBIO", "ECOLOGY"]
    },
    expertLinks: [
      ["genetics", "molecular_genetics", 4],
      ["cell_biology", "cell_signaling", 4],
      ["evolutionary_biology", "population_genetics", 4],
      ["ecology", "community_ecology", 4],
      ["physiology", "neurophysiology", 4],
      ["molecular_genetics", "dna_sequencing", 3],
      ["cell_signaling", "signal_transduction", 3],
      ["population_genetics", "genetic_drift", 3],
      ["community_ecology", "trophic_cascades", 3],
      ["neurophysiology", "action_potential", 3]
    ],
    conceptKeywords: {
      "genetics": ["genes", "chromosomes", "dna", "rna", "heredity"],
      "cell_biology": ["cells", "organelles", "membranes", "cytoskeleton", "division"],
      "evolutionary_biology": ["evolution", "natural-selection", "adaptation", "speciation", "phylogeny"],
      "ecology": ["ecosystems", "populations", "communities", "biodiversity", "interactions"],
      "physiology": ["functions", "organs", "systems", "homeostasis", "regulation"],
      "molecular_genetics": ["dna", "rna", "transcription", "translation", "gene-expression"],
      "cell_signaling": ["receptors", "ligands", "pathways", "second-messengers", "kinases"],
      "population_genetics": ["alleles", "frequencies", "hardy-weinberg", "selection", "mutation"],
      "community_ecology": ["species-interactions", "competition", "predation", "symbiosis", "succession"],
      "neurophysiology": ["neurons", "synapses", "action-potentials", "neurotransmitters", "plasticity"],
      "dna_sequencing": ["sanger", "next-generation", "illumina", "pacbio", "nanopore"],
      "signal_transduction": ["gpcr", "tyrosine-kinase", "jak-stat", "mapk", "nf-kb"],
      "genetic_drift": ["random", "allele-frequencies", "founder-effect", "bottleneck", "neutral-theory"],
      "trophic_cascades": ["impacts", "keystone-species", "ecosystem-engineers", "top-down", "bottom-up"],
      "action_potential": ["neuron", "depolarization", "repolarization", "threshold", "voltage-gated"]
    }
  },

  // ========== CORE DOMAIN 3: HEALTH SCIENCES ==========
  "Medicine": {
    domain: "HEALTH",
    clusters: ["CLINICAL", "INTERNAL", "SURGERY", "PEDIATRICS", "PUBLICMED"],
    clusterConnections: {
      "CLINICAL": ["INTERNAL", "SURGERY", "PEDIATRICS", "PUBLICMED"],
      "INTERNAL": ["CLINICAL", "SURGERY", "PEDIATRICS"],
      "SURGERY": ["CLINICAL", "INTERNAL", "PEDIATRICS"],
      "PEDIATRICS": ["CLINICAL", "INTERNAL", "SURGERY", "PUBLICMED"],
      "PUBLICMED": ["CLINICAL", "PEDIATRICS"]
    },
    expertLinks: [
      ["clinical_medicine", "diagnosis", 4],
      ["internal_medicine", "cardiology", 4],
      ["surgery", "orthopedics", 4],
      ["pediatrics", "neonatology", 4],
      ["public_health_medicine", "epidemiology", 4],
      ["diagnosis", "symptom_analysis", 3],
      ["cardiology", "heart_failure", 3],
      ["orthopedics", "fractures", 3],
      ["neonatology", "premature_birth", 3],
      ["epidemiology", "disease_surveillance", 3]
    ],
    conceptKeywords: {
      "clinical_medicine": ["patient-care", "treatment", "prevention", "diagnosis", "prognosis"],
      "internal_medicine": ["adult-care", "chronic-diseases", "preventive-care", "geriatrics", "hospitalist"],
      "surgery": ["operative", "minimally-invasive", "robotic", "transplant", "trauma"],
      "pediatrics": ["children", "development", "vaccination", "congenital", "adolescent"],
      "public_health_medicine": ["population", "prevention", "screening", "outbreaks", "policy"],
      "diagnosis": ["symptoms", "signs", "tests", "imaging", "biopsy"],
      "cardiology": ["heart", "coronary", "arrhythmia", "hypertension", "heart-failure"],
      "orthopedics": ["bones", "joints", "muscles", "ligaments", "fractures"],
      "neonatology": ["newborns", "premature", "jaundice", "respiratory", "infections"],
      "epidemiology": ["disease", "outbreaks", "surveillance", "risk-factors", "prevention"],
      "symptom_analysis": ["history", "physical-exam", "differential", "laboratory", "radiology"],
      "heart_failure": ["systolic", "diastolic", "ejection-fraction", "edema", "shortness-of-breath"],
      "fractures": ["simple", "compound", "comminuted", "open", "closed"],
      "premature_birth": ["preterm", "low-birth-weight", "neonatal-care", "complications", "developmental-delays"],
      "disease_surveillance": ["monitoring", "outbreaks", "case-definitions", "reporting", "analysis"]
    }
  },

  "Public Health": {
    domain: "HEALTH",
    clusters: ["EPIDEMIO", "BIOSTATS", "ENVHEALTH", "HEALTHPOLICY", "GLOBALHEALTH"],
    clusterConnections: {
      "EPIDEMIO": ["BIOSTATS", "ENVHEALTH", "HEALTHPOLICY", "GLOBALHEALTH"],
      "BIOSTATS": ["EPIDEMIO", "ENVHEALTH", "HEALTHPOLICY"],
      "ENVHEALTH": ["EPIDEMIO", "BIOSTATS", "HEALTHPOLICY", "GLOBALHEALTH"],
      "HEALTHPOLICY": ["EPIDEMIO", "BIOSTATS", "ENVHEALTH", "GLOBALHEALTH"],
      "GLOBALHEALTH": ["EPIDEMIO", "ENVHEALTH", "HEALTHPOLICY"]
    },
    expertLinks: [
      ["epidemiology", "disease_surveillance", 4],
      ["biostatistics", "statistical_modeling", 4],
      ["environmental_health", "toxicology", 4],
      ["health_policy", "health_economics", 4],
      ["global_health", "pandemic_preparedness", 4],
      ["disease_surveillance", "case_reporting", 3],
      ["statistical_modeling", "regression_analysis", 3],
      ["toxicology", "risk_assessment", 3],
      ["health_economics", "cost_effectiveness", 3],
      ["pandemic_preparedness", "vaccine_development", 3]
    ],
    conceptKeywords: {
      "epidemiology": ["disease", "outbreaks", "transmission", "incidence", "prevalence"],
      "biostatistics": ["data", "analysis", "hypothesis-testing", "confounding", "bias"],
      "environmental_health": ["pollution", "exposure", "hazards", "risk", "prevention"],
      "health_policy": ["regulation", "financing", "access", "equity", "reform"],
      "global_health": ["pandemics", "inequality", "cooperation", "sustainable-development", "one-health"],
      "disease_surveillance": ["monitoring", "outbreaks", "case-definitions", "reporting", "analysis"],
      "statistical_modeling": ["regression", "time-series", "spatial", "bayesian", "machine-learning"],
      "toxicology": ["poisons", "dose-response", "ld50", "carcinogens", "teratogens"],
      "health_economics": ["cost-effectiveness", "quality-adjusted-life-years", "willingness-to-pay", "budget-impact", "markov-models"],
      "pandemic_preparedness": ["surveillance", "stockpiles", "vaccines", "quarantine", "coordination"],
      "case_reporting": ["individual", "aggregate", "mandatory", "voluntary", "electronic"],
      "regression_analysis": ["linear", "logistic", "cox", "poisson", "mixed-effects"],
      "risk_assessment": ["hazard", "exposure", "dose-response", "uncertainty", "communication"],
      "cost_effectiveness": ["qaly", "daly", "icer", "willingness-to-pay", "budget-impact"],
      "vaccine_development": ["clinical-trials", "efficacy", "safety", "immunogenicity", "manufacturing"]
    }
  },

  "Bioethics": {
    domain: "HEALTH",
    clusters: ["MEDETHICS", "RESETHICS", "ENVETHICS", "DIGETHICS", "BIOLAW"],
    clusterConnections: {
      "MEDETHICS": ["RESETHICS", "ENVETHICS", "DIGETHICS", "BIOLAW"],
      "RESETHICS": ["MEDETHICS", "ENVETHICS", "DIGETHICS"],
      "ENVETHICS": ["MEDETHICS", "RESETHICS", "BIOLAW"],
      "DIGETHICS": ["MEDETHICS", "RESETHICS", "ENVETHICS", "BIOLAW"],
      "BIOLAW": ["MEDETHICS", "RESETHICS", "ENVETHICS", "DIGETHICS"]
    },
    expertLinks: [
      ["medical_ethics", "clinical_ethics", 4],
      ["research_ethics", "informed_consent", 4],
      ["environmental_ethics", "sustainability_ethics", 4],
      ["digital_ethics", "ai_ethics", 4],
      ["biolaw", "genetic_privacy", 4],
      ["clinical_ethics", "end_of_life_ethics", 3],
      ["informed_consent", "autonomy", 3],
      ["sustainability_ethics", "intergenerational_justice", 3],
      ["ai_ethics", "algorithmic_bias", 3],
      ["genetic_privacy", "dna_testing", 3]
    ],
    conceptKeywords: {
      "medical_ethics": ["autonomy", "beneficence", "non-maleficence", "justice", "confidentiality"],
      "research_ethics": ["human-subjects", "animal-welfare", "scientific-integrity", "conflict-of-interest", "data-sharing"],
      "environmental_ethics": ["anthropocentrism", "biocentrism", "ecocentrism", "sustainability", "stewardship"],
      "digital_ethics": ["privacy", "surveillance", "algorithmic-bias", "autonomy", "transparency"],
      "biolaw": ["regulation", "biodiversity", "biotechnology", "genetic-testing", "patents"],
      "clinical_ethics": ["decision-making", "advance-directives", "palliative-care", "resource-allocation", "futility"],
      "informed_consent": ["autonomy", "understanding", "voluntariness", "competence", "disclosure"],
      "sustainability_ethics": ["future-generations", "climate-justice", "precautionary-principle", "planetary-boundaries", "degrowth"],
      "ai_ethics": ["fairness", "accountability", "transparency", "explainability", "human-oversight"],
      "genetic_privacy": ["dna", "data-protection", "discrimination", "insurance", "employment"],
      "end_of_life_ethics": ["euthanasia", "palliative-sedation", "do-not-resuscitate", "advance-care-planning", "hospice"],
      "autonomy": ["self-determination", "informed-choice", "refusal-of-treatment", "capacity", "surrogate"],
      "intergenerational_justice": ["future-generations", "climate-change", "resource-depletion", "discounting", "sustainability"],
      "algorithmic_bias": ["discrimination", "fairness", "accountability", "transparency", "audit"],
      "dna_testing": ["genetic-screening", "predictive-testing", "carrier-testing", "prenatal-testing", "forensic"]
    }
  },

  // ========== CORE DOMAIN 4: SOCIAL SCIENCES ==========
  "Anthropology": {
    domain: "SOCIAL",
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
      ["cultural_anthropology", "ethnography", 4],
      ["biological_anthropology", "human_evolution", 4],
      ["linguistic_anthropology", "language_and_culture", 4],
      ["archaeology", "material_culture", 4],
      ["medical_anthropology", "ethnomedicine", 4],
      ["ecological_anthropology", "political_ecology", 4],
      ["political_anthropology", "social_structure", 4],
      ["applied_anthropology", "development_anthropology", 4],
      ["ethnography", "social_structure", 3],
      ["human_evolution", "cultural_ecology", 3],
      ["language_and_culture", "sociolinguistics", 3],
      ["material_culture", "ethnography", 3],
      ["ethnomedicine", "global_health", 3],
      ["political_ecology", "ecosystem_dynamics", 3],
      ["social_structure", "complex_systems", 3],
      ["development_anthropology", "sustainability", 3]
    ],
    conceptKeywords: {
      "cultural_anthropology": ["culture", "society", "symbols", "rituals", "beliefs"],
      "biological_anthropology": ["evolution", "hominids", "fossils", "adaptation", "natural-selection"],
      "linguistic_anthropology": ["language", "communication", "culture", "symbols", "meaning"],
      "archaeology": ["artifacts", "excavation", "stratigraphy", "chronology", "material-culture"],
      "medical_anthropology": ["health", "culture", "disease", "healing", "beliefs"],
      "ecological_anthropology": ["environment", "adaptation", "subsistence", "ecosystem", "sustainability"],
      "political_anthropology": ["power", "governance", "conflict", "resistance", "state"],
      "applied_anthropology": ["development", "policy", "intervention", "advocacy", "practice"],
      "ethnography": ["fieldwork", "culture", "observation", "qualitative", "ethnographic"],
      "human_evolution": ["evolution", "hominids", "fossils", "adaptation", "natural-selection"],
      "language_and_culture": ["language", "communication", "culture", "symbols", "meaning"],
      "material_culture": ["artifacts", "objects", "technology", "materials", "crafts"],
      "ethnomedicine": ["traditional-healing", "herbs", "rituals", "health-beliefs"],
      "political_ecology": ["environment", "power", "resources", "conflict", "justice"],
      "social_structure": ["society", "hierarchy", "organization", "roles", "institutions"],
      "development_anthropology": ["development", "projects", "NGOs", "sustainability", "community"],
      "sustainability": ["long-term", "balance", "resources", "future", "equity"],
      "complex_systems": ["networks", "interactions", "emergence", "nonlinearity", "adaptation"],
      "ecosystem_dynamics": ["interactions", "balance", "resilience", "succession", "stability"]
    }
  },

  "Law": {
    domain: "SOCIAL",
    clusters: ["INTLAW", "CONSTLAW", "CRIMLAW", "CIVLAW", "HUMRIGHTS"],
    clusterConnections: {
      "INTLAW": ["CONSTLAW", "CRIMLAW", "CIVLAW", "HUMRIGHTS"],
      "CONSTLAW": ["INTLAW", "CRIMLAW", "CIVLAW", "HUMRIGHTS"],
      "CRIMLAW": ["INTLAW", "CONSTLAW", "CIVLAW"],
      "CIVLAW": ["INTLAW", "CONSTLAW", "CRIMLAW", "HUMRIGHTS"],
      "HUMRIGHTS": ["INTLAW", "CONSTLAW", "CIVLAW"]
    },
    expertLinks: [
      ["international_law", "treaty_law", 4],
      ["constitutional_law", "separation_of_powers", 4],
      ["criminal_law", "criminal_procedure", 4],
      ["civil_law", "contract_law", 4],
      ["human_rights", "justice", 4],
      ["treaty_law", "vienna_convention", 3],
      ["separation_of_powers", "checks_and_balances", 3],
      ["criminal_procedure", "due_process", 3],
      ["contract_law", "tort_law", 3],
      ["justice", "fairness", 3]
    ],
    conceptKeywords: {
      "international_law": ["treaties", "customary-law", "general-principles", "sources", "un-charter"],
      "constitutional_law": ["constitutions", "amendments", "judicial-review", "federalism", "rights"],
      "criminal_law": ["crimes", "punishments", "mens-rea", "actus-reus", "defenses"],
      "civil_law": ["contracts", "torts", "property", "family-law", "inheritance"],
      "human_rights": ["dignity", "equality", "freedom", "non-discrimination", "remedies"],
      "treaty_law": ["ratification", "reservations", "interpretation", "invalidity", "termination"],
      "separation_of_powers": ["executive", "legislative", "judicial", "independence", "accountability"],
      "criminal_procedure": ["investigation", "prosecution", "trial", "appeal", "evidence"],
      "contract_law": ["offer", "acceptance", "consideration", "breach", "remedies"],
      "justice": ["fairness", "equality", "access", "impartiality", "rule-of-law"],
      "vienna_convention": ["treaty-interpretation", "pacta-sunt-servanda", "good-faith", "context", "object-and-purpose"],
      "checks_and_balances": ["separation", "prevent-tyranny", "ambition-counteracts-ambition", "federalist-51", "accountability"],
      "due_process": ["fair-trial", "notice", "hearing", "impartial-tribunal", "legal-representation"],
      "tort_law": ["negligence", "intentional-torts", "strict-liability", "damages", "duty-of-care"]
    }
  },

  "Education Science": {
    domain: "SOCIAL",
    clusters: ["LEARNING", "PEDAGOGY", "CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL", "POLICY"],
    clusterConnections: {
      "LEARNING": ["PEDAGOGY", "CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"],
      "PEDAGOGY": ["LEARNING", "CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"],
      "CURRICUL": ["LEARNING", "PEDAGOGY", "ASSESS", "SPECIAL", "POLICY"],
      "ASSESS": ["LEARNING", "PEDAGOGY", "CURRICUL", "TECH", "POLICY"],
      "SPECIAL": ["LEARNING", "PEDAGOGY", "CURRICUL", "ASSESS", "SOCIAL", "POLICY"],
      "TECH": ["LEARNING", "PEDAGOGY", "ASSESS", "POLICY"],
      "SOCIAL": ["LEARNING", "PEDAGOGY", "SPECIAL", "POLICY"],
      "POLICY": ["CURRICUL", "ASSESS", "SPECIAL", "TECH", "SOCIAL"]
    },
    expertLinks: [
      ["constructivism", "situated_learning", 4],
      ["behaviorism", "direct_instruction", 4],
      ["cognitivism", "metacognition", 4],
      ["social_learning_theory", "cooperative_learning", 4],
      ["zone_of_proximal_dev", "scaffolding", 4],
      ["self_regulated_learning", "metacognition", 4],
      ["curriculum_design", "standards_based_education", 4],
      ["formative_assessment", "feedback", 4],
      ["inclusive_education", "universal_design_for_learning", 4],
      ["edtech", "e_learning", 4],
      ["ai_in_education", "adaptive_learning", 4],
      ["situated_learning", "authentic_assessment", 3],
      ["direct_instruction", "differentiated_instruction", 3],
      ["metacognition", "self_regulated_learning", 3],
      ["cooperative_learning", "inquiry_based_learning", 3],
      ["scaffolding", "zone_of_proximal_dev", 3],
      ["feedback", "formative_assessment", 3],
      ["universal_design_for_learning", "inclusive_education", 3],
      ["e_learning", "blended_learning", 3],
      ["adaptive_learning", "personalized_learning", 3]
    ],
    conceptKeywords: {
      "constructivism": ["learning", "construction", "knowledge", "piaget", "active"],
      "behaviorism": ["learning", "stimulus", "response", "skinner", "conditioning"],
      "cognitivism": ["learning", "cognition", "mental-processes", "information-processing", "memory"],
      "social_learning_theory": ["learning", "observation", "imitation", "bandura", "modeling"],
      "zone_of_proximal_dev": ["learning", "vygotsky", "potential", "scaffolding", "development"],
      "self_regulated_learning": ["learning", "self-direction", "metacognition", "strategies", "goals"],
      "curriculum_design": ["curriculum", "planning", "objectives", "content", "alignment"],
      "formative_assessment": ["assessment", "feedback", "progress", "adjustment", "learning"],
      "inclusive_education": ["education", "diversity", "access", "equity", "participation"],
      "edtech": ["technology", "education", "tools", "innovation", "digital"],
      "ai_in_education": ["technology", "ai", "personalization", "adaptive", "tools"],
      "situated_learning": ["context", "authentic", "real-world", "lave", "wenger"],
      "authentic_assessment": ["real-world", "performance", "portfolios", "projects", "reflection"],
      "direct_instruction": ["teaching", "explicit", "structured", "scripted", "mastery"],
      "differentiated_instruction": ["teaching", "diversity", "adaptation", "needs", "flexibility"],
      "metacognition": ["thinking", "learning", "awareness", "monitoring", "regulation"],
      "cooperative_learning": ["learning", "group", "collaboration", "interdependence", "teamwork"],
      "inquiry_based_learning": ["learning", "questions", "investigation", "discovery", "exploration"],
      "scaffolding": ["support", "learning", "guidance", "temporary", "vygotsky"],
      "feedback": ["communication", "improvement", "specific", "timely", "actionable"],
      "universal_design_for_learning": ["design", "accessibility", "flexibility", "multiple-means", "udl"],
      "e_learning": ["online", "distance-education", "moocs", "lms", "synchronous"],
      "blended_learning": ["online", "face-to-face", "hybrid", "flipped", "synchronous"],
      "adaptive_learning": ["personalized", "technology", "adjustment", "pace", "automation"],
      "personalized_learning": ["individualized", "tailored", "adaptive", "student-centered", "differentiation"]
    }
  },

  "Economics": {
    domain: "SOCIAL",
    clusters: ["MICRO", "MACRO", "BEHAV", "DEVECON", "INTECON"],
    clusterConnections: {
      "MICRO": ["MACRO", "BEHAV", "DEVECON", "INTECON"],
      "MACRO": ["MICRO", "BEHAV", "DEVECON", "INTECON"],
      "BEHAV": ["MICRO", "MACRO", "DEVECON"],
      "DEVECON": ["MICRO", "MACRO", "BEHAV", "INTECON"],
      "INTECON": ["MICRO", "MACRO", "DEVECON"]
    },
    expertLinks: [
      ["microeconomics", "supply_and_demand", 4],
      ["macroeconomics", "fiscal_policy", 4],
      ["behavioral_economics", "heuristics", 4],
      ["development_economics", "poverty_alleviation", 4],
      ["international_economics", "trade_policy", 4],
      ["supply_and_demand", "market_equilibrium", 3],
      ["fiscal_policy", "taxation", 3],
      ["heuristics", "cognitive_biases", 3],
      ["poverty_alleviation", "microfinance", 3],
      ["trade_policy", "tariffs", 3]
    ],
    conceptKeywords: {
      "microeconomics": ["individuals", "firms", "markets", "prices", "efficiency"],
      "macroeconomics": ["aggregate", "gdp", "inflation", "unemployment", "growth"],
      "behavioral_economics": ["psychology", "biases", "heuristics", "nudges", "experiments"],
      "development_economics": ["poverty", "inequality", "growth", "institutions", "policy"],
      "international_economics": ["trade", "finance", "exchange-rates", "globalization", "crises"],
      "supply_and_demand": ["equilibrium", "elasticity", "consumer-surplus", "producer-surplus", "market-clearing"],
      "fiscal_policy": ["taxation", "spending", "deficit", "debt", "multiplier"],
      "heuristics": ["availability", "representativeness", "anchoring", "framing", "overconfidence"],
      "poverty_alleviation": ["microfinance", "conditional-cash-transfers", "education", "health", "infrastructure"],
      "trade_policy": ["tariffs", "quotas", "subsidies", "wto", "regional-agreements"],
      "market_equilibrium": ["supply", "demand", "price", "quantity", "competitive"],
      "taxation": ["progressive", "regressive", "flat", "vat", "corporate"],
      "cognitive_biases": ["confirmation", "overconfidence", "hindsight", "sunk-cost", "loss-aversion"],
      "microfinance": ["microloans", "savings", "insurance", "entrepreneurship", "women-empowerment"],
      "tariffs": ["import", "export", "ad-valorem", "specific", "protectionism"]
    }
  },

  "Psychology": {
    domain: "SOCIAL",
    clusters: ["COGPSY", "CLINPSY", "SOCPSY", "DEVPSY", "NEUROPSY"],
    clusterConnections: {
      "COGPSY": ["CLINPSY", "SOCPSY", "DEVPSY", "NEUROPSY"],
      "CLINPSY": ["COGPSY", "SOCPSY", "DEVPSY"],
      "SOCPSY": ["COGPSY", "CLINPSY", "DEVPSY", "NEUROPSY"],
      "DEVPSY": ["COGPSY", "CLINPSY", "SOCPSY"],
      "NEUROPSY": ["COGPSY", "CLINPSY", "SOCPSY", "DEVPSY"]
    },
    expertLinks: [
      ["cognitive_psychology", "memory", 4],
      ["clinical_psychology", "psychotherapy", 4],
      ["social_psychology", "group_dynamics", 4],
      ["developmental_psychology", "child_development", 4],
      ["neuropsychology", "brain_injury", 4],
      ["memory", "working_memory", 3],
      ["psychotherapy", "cognitive_behavioral_therapy", 3],
      ["group_dynamics", "conformity", 3],
      ["child_development", "piaget_theory", 3],
      ["brain_injury", "traumatic_brain_injury", 3]
    ],
    conceptKeywords: {
      "cognitive_psychology": ["perception", "attention", "memory", "language", "problem-solving"],
      "clinical_psychology": ["assessment", "diagnosis", "therapy", "intervention", "mental-health"],
      "social_psychology": ["attitudes", "group-behavior", "social-cognition", "interpersonal", "culture"],
      "developmental_psychology": ["lifespan", "cognitive-development", "social-development", "moral-development", "aging"],
      "neuropsychology": ["brain-behavior", "cognitive-assessment", "rehabilitation", "neuroimaging", "neuroplasticity"],
      "memory": ["encoding", "storage", "retrieval", "short-term", "long-term"],
      "psychotherapy": ["cognitive-behavioral", "psychoanalytic", "humanistic", "integrative", "evidence-based"],
      "group_dynamics": ["conformity", "obedience", "leadership", "cohesion", "conflict"],
      "child_development": ["piaget", "erikson", "kohlberg", "attachment", "temperament"],
      "brain_injury": ["tbi", "stroke", "neurodegenerative", "rehabilitation", "plasticity"],
      "working_memory": ["central-executive", "phonological-loop", "visuospatial-sketchpad", "episodic-buffer", "baddeley"],
      "cognitive_behavioral_therapy": ["cbt", "cognitive-restructuring", "behavioral-activation", "exposure", "homework"],
      "conformity": ["asch", "normative-influence", "informational-influence", "compliance", "independence"],
      "piaget_theory": ["stages", "assimilation", "accommodation", "schema", "equilibration"],
      "traumatic_brain_injury": ["concussion", "contusion", "diffuse-axial", "cognitive-deficits", "rehabilitation"]
    }
  },

  "Sociology": {
    domain: "SOCIAL",
    clusters: ["SOCTHEORY", "CULTURE", "ECONSOC", "POLITICSOC", "URBANSOC"],
    clusterConnections: {
      "SOCTHEORY": ["CULTURE", "ECONSOC", "POLITICSOC", "URBANSOC"],
      "CULTURE": ["SOCTHEORY", "ECONSOC", "POLITICSOC"],
      "ECONSOC": ["SOCTHEORY", "CULTURE", "POLITICSOC", "URBANSOC"],
      "POLITICSOC": ["SOCTHEORY", "CULTURE", "ECONSOC", "URBANSOC"],
      "URBANSOC": ["SOCTHEORY", "CULTURE", "ECONSOC", "POLITICSOC"]
    },
    expertLinks: [
      ["social_theory", "critical_theory", 4],
      ["cultural_sociology", "symbolic_interactionism", 4],
      ["economic_sociology", "social_capital", 4],
      ["political_sociology", "social_movements", 4],
      ["urban_sociology", "gentrification", 4],
      ["critical_theory", "marxism", 3],
      ["symbolic_interactionism", "self_concept", 3],
      ["social_capital", "networks", 3],
      ["social_movements", "collective_action", 3],
      ["gentrification", "urban_renewal", 3]
    ],
    conceptKeywords: {
      "social_theory": ["marx", "weber", "durkheim", "parson", "giddens"],
      "cultural_sociology": ["symbols", "meaning", "rituals", "narratives", "identity"],
      "economic_sociology": ["markets", "institutions", "networks", "inequality", "embeddedness"],
      "political_sociology": ["power", "state", "social-movements", "revolution", "ideology"],
      "urban_sociology": ["cities", "neighborhoods", "gentrification", "segregation", "urbanization"],
      "critical_theory": ["hegemony", "ideology", "false-consciousness", "praxis", "emancipation"],
      "symbolic_interactionism": ["self", "society", "meaning", "interaction", "goffman"],
      "social_capital": ["trust", "norms", "networks", "reciprocity", "collective-action"],
      "social_movements": ["collective-action", "mobilization", "frames", "resources", "opportunities"],
      "gentrification": ["displacement", "renewal", "housing", "inequality", "neighborhood-change"],
      "marxism": ["class", "exploitation", "alienation", "dialectical-materialism", "communism"],
      "self_concept": ["identity", "self-esteem", "self-efficacy", "looking-glass-self", "impression-management"],
      "networks": ["ties", "nodes", "density", "centrality", "structural-holes"],
      "collective_action": ["mobilization", "organization", "leadership", "resources", "outcomes"],
      "urban_renewal": ["redevelopment", "revitalization", "displacement", "community", "policy"]
    }
  },

  "Digital Geopolitics": {
    domain: "SOCIAL",
    clusters: ["CYBERSEC", "DIGGOV", "AIGEO", "DATAGEO", "PLATFORM"],
    clusterConnections: {
      "CYBERSEC": ["DIGGOV", "AIGEO", "DATAGEO", "PLATFORM"],
      "DIGGOV": ["CYBERSEC", "AIGEO", "DATAGEO", "PLATFORM"],
      "AIGEO": ["CYBERSEC", "DIGGOV", "DATAGEO", "PLATFORM"],
      "DATAGEO": ["CYBERSEC", "DIGGOV", "AIGEO", "PLATFORM"],
      "PLATFORM": ["CYBERSEC", "DIGGOV", "AIGEO", "DATAGEO"]
    },
    expertLinks: [
      ["cybersecurity", "network_security", 4],
      ["digital_governance", "internet_governance", 4],
      ["ai_geopolitics", "ai_ethics", 4],
      ["data_geopolitics", "data_sovereignty", 4],
      ["platform_geopolitics", "digital_colonialism", 4],
      ["network_security", "firewalls", 3],
      ["internet_governance", "icann", 3],
      ["ai_ethics", "algorithmic_bias", 3],
      ["data_sovereignty", "data_localization", 3],
      ["digital_colonialism", "data_extractivism", 3]
    ],
    conceptKeywords: {
      "cybersecurity": ["threats", "vulnerabilities", "protection", "encryption", "authentication"],
      "digital_governance": ["regulation", "policy", "standards", "compliance", "multi-stakeholder"],
      "ai_geopolitics": ["competition", "innovation", "military", "economic", "soft-power"],
      "data_geopolitics": ["cross-border", "localization", "jurisdiction", "extraterritoriality", "cloud"],
      "platform_geopolitics": ["gafa", "balkans", "content-moderation", "taxation", "antitrust"],
      "network_security": ["firewalls", "ids", "vpn", "zero-trust", "end-to-end-encryption"],
      "internet_governance": ["icann", "iana", "itrs", "wsis", "net-neutrality"],
      "ai_ethics": ["fairness", "accountability", "transparency", "explainability", "human-oversight"],
      "data_sovereignty": ["localization", "jurisdiction", "extraterritoriality", "cloud-computing", "gdp"],
      "digital_colonialism": ["extraction", "exploitation", "dependency", "neocolonialism", "data-justice"],
      "firewalls": ["packet-filtering", "stateful-inspection", "next-generation", "application-layer", "utm"],
      "icann": ["domain-names", "root-zone", "gtlds", "cc-tlds", "dns"],
      "algorithmic_bias": ["discrimination", "fairness", "accountability", "transparency", "audit"],
      "data_localization": ["storage", "processing", "jurisdiction", "compliance", "sovereignty"],
      "data_extractivism": ["surveillance", "exploitation", "commodification", "privacy", "consent"]
    }
  },

  // ========== CORE DOMAIN 5: HUMANITIES ==========
  "Philosophy": {
    domain: "HUMANITIES",
    clusters: ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL", "HISTPHIL"],
    clusterConnections: {
      "ONTOL": ["KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL", "HISTPHIL"],
      "KNOW": ["ONTOL", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL"],
      "ETHVAL": ["ONTOL", "KNOW", "LANGLOG", "MINDCON", "SOCIALPOL", "HISTPHIL"],
      "LANGLOG": ["ONTOL", "KNOW", "ETHVAL", "MINDCON", "SCITEC"],
      "MINDCON": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "SCITEC", "SOCIALPOL"],
      "SCITEC": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SOCIALPOL"],
      "SOCIALPOL": ["ONTOL", "KNOW", "ETHVAL", "MINDCON", "SCITEC", "HISTPHIL"],
      "HISTPHIL": ["ONTOL", "KNOW", "ETHVAL", "LANGLOG", "MINDCON", "SCITEC", "SOCIALPOL"]
    },
    expertLinks: [
      ["ontology", "metaphysics", 4],
      ["epistemology", "theory_of_knowledge", 4],
      ["ethics", "moral_philosophy", 4],
      ["philosophy_of_language", "linguistics", 4],
      ["philosophy_of_mind", "consciousness", 4],
      ["philosophy_of_science", "scientific_method", 4],
      ["social_philosophy", "justice", 4],
      ["political_philosophy", "democracy", 4],
      ["metaphysics", "being", 3],
      ["theory_of_knowledge", "justification", 3],
      ["moral_philosophy", "utilitarianism", 3],
      ["linguistics", "semantics", 3],
      ["consciousness", "hard_problem", 3],
      ["scientific_method", "hypothesis_testing", 3],
      ["justice", "distributive_justice", 3],
      ["democracy", "deliberative_democracy", 3]
    ],
    conceptKeywords: {
      "ontology": ["being", "existence", "reality", "categories", "substance"],
      "epistemology": ["knowledge", "justification", "truth", "belief", "scepticism"],
      "ethics": ["moral", "values", "right-wrong", "virtue", "deontology"],
      "philosophy_of_language": ["meaning", "reference", "truth", "speech-acts", "semantics"],
      "philosophy_of_mind": ["consciousness", "mental-states", "mind-body", "intentionality", "qualia"],
      "philosophy_of_science": ["methodology", "explanation", "laws", "theories", "empiricism"],
      "social_philosophy": ["society", "justice", "equality", "power", "institutions"],
      "political_philosophy": ["state", "governance", "rights", "justice", "authority"],
      "metaphysics": ["substance", "properties", "causation", "modality", "essence"],
      "theory_of_knowledge": ["justification", "truth", "belief", "gettier-problems", "reliabilism"],
      "moral_philosophy": ["utilitarianism", "deontology", "virtue-ethics", "consequentialism", "normative-ethics"],
      "linguistics": ["syntax", "semantics", "pragmatics", "phonology", "morphology"],
      "consciousness": ["hard-problem", "qualia", "subjective-experience", "neural-correlates", "easy-problem"],
      "scientific_method": ["observation", "hypothesis", "experiment", "verification", "falsification"],
      "justice": ["fairness", "equality", "rights", "deserts", "entitlements"],
      "distributive_justice": ["rawls", "equality", "difference-principle", "veil-of-ignorance", "fair-equality"],
      "deliberative_democracy": ["habermas", "deliberation", "public-reason", "consensus", "legitimacy"],
      "being": ["existence", "reality", "substance", "essence", "quiddity"],
      "justification": ["reasons", "evidence", "warrant", "internalism", "externalism"],
      "utilitarianism": ["greatest-happiness", "consequentialism", "bentham", "mill", "hedonism"]
    }
  },

  "Language Science": {
    domain: "HUMANITIES",
    clusters: ["PHONET", "MORPHSYN", "SEMANPRAG", "SOCIOLIN", "PSYCHOLIN", "HISTCOMP", "ACQUIS", "COMPLIN"],
    clusterConnections: {
      "PHONET": ["MORPHSYN", "SEMANPRAG", "PSYCHOLIN", "ACQUIS"],
      "MORPHSYN": ["PHONET", "SEMANPRAG", "PSYCHOLIN", "HISTCOMP", "ACQUIS"],
      "SEMANPRAG": ["PHONET", "MORPHSYN", "SOCIOLIN", "PSYCHOLIN", "COMPLIN"],
      "SOCIOLIN": ["SEMANPRAG", "PSYCHOLIN", "HISTCOMP", "ACQUIS"],
      "PSYCHOLIN": ["PHONET", "MORPHSYN", "SEMANPRAG", "SOCIOLIN", "ACQUIS", "COMPLIN"],
      "HISTCOMP": ["MORPHSYN", "SEMANPRAG", "SOCIOLIN", "ACQUIS"],
      "ACQUIS": ["PHONET", "MORPHSYN", "SEMANPRAG", "PSYCHOLIN", "HISTCOMP"],
      "COMPLIN": ["SEMANPRAG", "PSYCHOLIN", "MORPHSYN"]
    },
    expertLinks: [
      ["phonetics", "articulation", 4],
      ["morphology", "word_formation", 4],
      ["semantics", "meaning", 4],
      ["sociolinguistics", "language_variation", 4],
      ["psycholinguistics", "language_processing", 4],
      ["historical_linguistics", "language_change", 4],
      ["language_acquisition", "first_language_acquisition", 4],
      ["computational_linguistics", "natural_language_processing", 4],
      ["articulation", "phonation", 3],
      ["word_formation", "compounding", 3],
      ["meaning", "lexical_semantics", 3],
      ["language_variation", "dialectology", 3],
      ["language_processing", "sentence_parsing", 3],
      ["language_change", "grammaticalization", 3],
      ["first_language_acquisition", "critical_period", 3],
      ["natural_language_processing", "machine_translation", 3]
    ],
    conceptKeywords: {
      "phonetics": ["articulation", "acoustics", "phonation", "prosody", "transcription"],
      "morphology": ["morphemes", "affixation", "compounding", "inflection", "derivation"],
      "semantics": ["meaning", "sense", "reference", "truth-conditions", "compositionality"],
      "sociolinguistics": ["language", "society", "variation", "dialects", "culture"],
      "psycholinguistics": ["processing", "comprehension", "production", "brain", "language"],
      "historical_linguistics": ["change", "reconstruction", "comparative-method", "proto-languages", "etymology"],
      "language_acquisition": ["children", "stages", "milestones", "innateness", "input"],
      "computational_linguistics": ["nlp", "algorithms", "parsing", "generation", "models"],
      "articulation": ["tongue", "lips", "palate", "manners", "places"],
      "word_formation": ["prefixes", "suffixes", "roots", "stems", "blending"],
      "meaning": ["sense", "reference", "denotation", "connotation", "semantic-roles"],
      "language_variation": ["dialects", "registers", "styles", "social-factors", "geographical-factors"],
      "language_processing": ["comprehension", "production", "parsing", "lexical-access", "syntactic-analysis"],
      "language_change": ["sound-change", "analogy", "reanalysis", "grammaticalization", "borrowing"],
      "first_language_acquisition": ["babbling", "one-word-stage", "two-word-stage", "telegraphic-speech", "overgeneralization"],
      "critical_period": ["lenneberg", "age", "sensitive-period", "plasticity", "maturation"],
      "natural_language_processing": ["tokenization", "tagging", "chunking", "parsing", "semantic-analysis"],
      "machine_translation": ["rule-based", "statistical", "neural", "evaluation", "bleu-score"],
      "lexical_semantics": ["word-meaning", "semantic-features", "thematic-roles", "sense", "reference"],
      "dialectology": ["regional-variation", "social-variation", "isoglosses", "dialect-continuum", "standardization"],
      "compounding": ["endocentric", "exocentric", "head", "modifier", "noun-noun"],
      "grammaticalization": ["change", "grammatical", "pathways", "bleaching", "extension"]
    }
  },

  "Social Epistemology": {
    domain: "HUMANITIES",
    clusters: ["KNOWPROD", "SOCKNOW", "EXPERTISE", "TRUST"],
    clusterConnections: {
      "KNOWPROD": ["SOCKNOW", "EXPERTISE", "TRUST"],
      "SOCKNOW": ["KNOWPROD", "EXPERTISE", "TRUST"],
      "EXPERTISE": ["KNOWPROD", "SOCKNOW", "TRUST"],
      "TRUST": ["KNOWPROD", "SOCKNOW", "EXPERTISE"]
    },
    expertLinks: [
      ["knowledge_production", "scientific_knowledge", 4],
      ["social_knowledge", "lay_knowledge", 4],
      ["expertise", "knowledge_systems", 4],
      ["trust", "knowledge_practices", 4],
      ["scientific_knowledge", "objectivity", 3],
      ["lay_knowledge", "folk_theories", 3],
      ["knowledge_systems", "traditional_knowledge", 3],
      ["knowledge_practices", "peer_review", 3]
    ],
    conceptKeywords: {
      "knowledge_production": ["research", "discovery", "validation", "dissemination", "institutions"],
      "social_knowledge": ["collective", "distributed", "cultural", "tacit", "explicit"],
      "expertise": ["specialization", "skills", "experience", "credentials", "authority"],
      "trust": ["reliability", "credibility", "confidence", "reputation", "institutions"],
      "scientific_knowledge": ["objectivity", "subjectivity", "evidence", "theory", "peer-review"],
      "lay_knowledge": ["everyday", "common-sense", "folk-theories", "intuition", "experience"],
      "knowledge_systems": ["traditional", "indigenous", "western", "integration", "hybrid"],
      "knowledge_practices": ["methods", "standards", "norms", "communities", "institutions"],
      "objectivity": ["neutrality", "impartiality", "facts", "bias", "intersubjectivity"],
      "folk_theories": ["naive", "intuitive", "causal", "explanations", "misconceptions"],
      "traditional_knowledge": ["indigenous", "local", "oral", "practical", "holistic"],
      "peer_review": ["evaluation", "feedback", "quality-control", "publication", "anonymity"]
    }
  },

  "History of Science": {
    domain: "HUMANITIES",
    clusters: ["SCIREV", "INSTHIST", "SOCSCI", "PHILSCI"],
    clusterConnections: {
      "SCIREV": ["INSTHIST", "SOCSCI", "PHILSCI"],
      "INSTHIST": ["SCIREV", "SOCSCI", "PHILSCI"],
      "SOCSCI": ["SCIREV", "INSTHIST", "PHILSCI"],
      "PHILSCI": ["SCIREV", "INSTHIST", "SOCSCI"]
    },
    expertLinks: [
      ["scientific_revolution", "paradigm_shifts", 4],
      ["institutional_history", "scientific_communities", 4],
      ["social_history", "science_and_society", 4],
      ["philosophical_history", "science_and_philosophy", 4],
      ["paradigm_shifts", "kuhnian_revolutions", 3],
      ["scientific_communities", "invisible_colleges", 3],
      ["science_and_society", "public_understanding", 3],
      ["science_and_philosophy", "metaphysics_of_science", 3]
    ],
    conceptKeywords: {
      "scientific_revolution": ["copernican", "galilean", "newtonian", "experimental", "mathematical"],
      "institutional_history": ["universities", "academies", "journals", "societies", "funding"],
      "social_history": ["gender", "class", "race", "colonialism", "public-understanding"],
      "philosophical_history": ["positivism", "realism", "instrumentalism", "constructivism", "postmodernism"],
      "paradigm_shifts": ["normal-science", "anomalies", "crisis", "revolution", "new-paradigm"],
      "scientific_communities": ["collaboration", "competition", "peer-review", "reputation", "credit"],
      "science_and_society": ["public-understanding", "science-communication", "trust", "controversies", "policy"],
      "science_and_philosophy": ["metaphysics", "epistemology", "methodology", "values", "objectivity"],
      "kuhnian_revolutions": ["incommensurability", "gestalt-switch", "disciplinary-matrix", "exemplars", "puzzles"],
      "invisible_colleges": ["networks", "correspondence", "collaboration", "reputation", "informal"],
      "public_understanding": ["science-communication", "literacy", "engagement", "trust", "perception"],
      "metaphysics_of_science": ["realism", "anti-realism", "instrumentalism", "constructivism", "entities"]
    }
  },

  "Art and Design": {
    domain: "HUMANITIES",
    clusters: ["VISUAL", "DIGITAL", "DESIGNTHINK", "AESTHETICS", "CULTURAL"],
    clusterConnections: {
      "VISUAL": ["DIGITAL", "DESIGNTHINK", "AESTHETICS", "CULTURAL"],
      "DIGITAL": ["VISUAL", "DESIGNTHINK", "AESTHETICS"],
      "DESIGNTHINK": ["VISUAL", "DIGITAL", "AESTHETICS", "CULTURAL"],
      "AESTHETICS": ["VISUAL", "DIGITAL", "DESIGNTHINK", "CULTURAL"],
      "CULTURAL": ["VISUAL", "DIGITAL", "DESIGNTHINK", "AESTHETICS"]
    },
    expertLinks: [
      ["visual_arts", "painting", 4],
      ["digital_art", "generative_art", 4],
      ["design_thinking", "user_centered_design", 4],
      ["aesthetics", "beauty", 4],
      ["cultural_studies", "visual_culture", 4],
      ["painting", "oil_painting", 3],
      ["generative_art", "algorithmic_art", 3],
      ["user_centered_design", "usability", 3],
      ["beauty", "harmony", 3],
      ["visual_culture", "media_studies", 3]
    ],
    conceptKeywords: {
      "visual_arts": ["painting", "sculpture", "drawing", "printmaking", "photography"],
      "digital_art": ["generative", "interactive", "virtual", "augmented", "nft"],
      "design_thinking": ["user-centered", "prototyping", "iteration", "empathy", "problem-solving"],
      "aesthetics": ["beauty", "taste", "judgment", "sublime", "experience"],
      "cultural_studies": ["visual-culture", "media", "representation", "identity", "power"],
      "painting": ["oil", "acrylic", "watercolor", "abstract", "realism"],
      "generative_art": ["algorithms", "code", "procedural", "parametric", "ai-generated"],
      "user_centered_design": ["usability", "accessibility", "human-factors", "ergonomics", "inclusive"],
      "beauty": ["harmony", "proportion", "symmetry", "subjective", "objective"],
      "visual_culture": ["images", "media", "representation", "gaze", "spectacle"],
      "oil_painting": ["canvas", "pigments", "brushwork", "glazing", "impasto"],
      "algorithmic_art": ["code", "parameters", "randomness", "fractals", "neural-networks"],
      "harmony": ["balance", "proportion", "unity", "variety", "rhythm"],
      "media_studies": ["television", "film", "radio", "digital-media", "convergence"]
    }
  },

  // ========== CORE DOMAIN 6: APPLIED SCIENCES ==========
  "Engineering": {
    domain: "APPLIED",
    clusters: ["CIVIL", "MECH", "ELEC", "CHEM", "SOFTWARE"],
    clusterConnections: {
      "CIVIL": ["MECH", "ELEC", "CHEM", "SOFTWARE"],
      "MECH": ["CIVIL", "ELEC", "CHEM"],
      "ELEC": ["CIVIL", "MECH", "CHEM", "SOFTWARE"],
      "CHEM": ["CIVIL", "MECH", "ELEC"],
      "SOFTWARE": ["CIVIL", "ELEC"]
    },
    expertLinks: [
      ["civil_engineering", "structural_engineering", 4],
      ["mechanical_engineering", "thermodynamics", 4],
      ["electrical_engineering", "circuit_design", 4],
      ["chemical_engineering", "process_design", 4],
      ["software_engineering", "algorithms", 4],
      ["structural_engineering", "load_bearing", 3],
      ["thermodynamics", "heat_transfer", 3],
      ["circuit_design", "integrated_circuits", 3],
      ["process_design", "chemical_reactors", 3],
      ["algorithms", "data_structures", 3]
    ],
    conceptKeywords: {
      "civil_engineering": ["structures", "transportation", "hydraulics", "geotechnical", "environmental"],
      "mechanical_engineering": ["thermodynamics", "fluid-mechanics", "heat-transfer", "mechanics", "robotics"],
      "electrical_engineering": ["circuits", "power", "control", "signal-processing", "telecommunications"],
      "chemical_engineering": ["process-design", "reactors", "separation", "thermodynamics", "kinetics"],
      "software_engineering": ["algorithms", "data-structures", "design-patterns", "testing", "devops"],
      "structural_engineering": ["loads", "stresses", "deflection", "stability", "materials"],
      "thermodynamics": ["laws", "energy", "entropy", "work", "heat"],
      "circuit_design": ["resistors", "capacitors", "inductors", "transistors", "ics"],
      "process_design": ["reactors", "distillation", "absorption", "extraction", "optimization"],
      "algorithms": ["sorting", "searching", "graph", "dynamic-programming", "greedy"],
      "load_bearing": ["compression", "tension", "shear", "bending", "buckling"],
      "heat_transfer": ["conduction", "convection", "radiation", "heat-exchangers", "fins"],
      "integrated_circuits": ["chips", "transistors", "logic-gates", "memory", "microprocessors"],
      "chemical_reactors": ["batch", "continuous", "cstr", "pfr", "catalysis"],
      "data_structures": ["arrays", "linked-lists", "trees", "graphs", "hash-tables"]
    }
  },

  "Design": {
    domain: "APPLIED",
    clusters: ["UX", "INDUSTRIAL", "GRAPHIC", "INTERACTION"],
    clusterConnections: {
      "UX": ["INDUSTRIAL", "GRAPHIC", "INTERACTION"],
      "INDUSTRIAL": ["UX", "GRAPHIC"],
      "GRAPHIC": ["UX", "INDUSTRIAL", "INTERACTION"],
      "INTERACTION": ["UX", "GRAPHIC"]
    },
    expertLinks: [
      ["user_experience_design", "usability", 4],
      ["industrial_design", "product_design", 4],
      ["graphic_design", "visual_identity", 4],
      ["interaction_design", "human_computer_interaction", 4],
      ["usability", "user_friendly", 3],
      ["product_design", "ergonomics", 3],
      ["visual_identity", "branding", 3],
      ["human_computer_interaction", "user_interface", 3]
    ],
    conceptKeywords: {
      "user_experience_design": ["usability", "accessibility", "user-research", "prototyping", "testing"],
      "industrial_design": ["product", "ergonomics", "aesthetics", "materials", "manufacturing"],
      "graphic_design": ["typography", "layout", "color", "branding", "visual-identity"],
      "interaction_design": ["interfaces", "navigation", "feedback", "affordances", "mental-models"],
      "usability": ["learnability", "efficiency", "memorability", "errors", "satisfaction"],
      "product_design": ["form", "function", "aesthetics", "ergonomics", "sustainability"],
      "visual_identity": ["logo", "color-palette", "typography", "style-guide", "branding"],
      "human_computer_interaction": ["interfaces", "usability", "accessibility", "cognition", "emotion"],
      "user_friendly": ["intuitive", "simple", "clear", "consistent", "forgiving"],
      "ergonomics": ["human-factors", "anthropometrics", "biomechanics", "cognitive", "environmental"],
      "branding": ["identity", "positioning", "messaging", "values", "personality"],
      "user_interface": ["gui", "cli", "voice", "gesture", "tangible"]
    }
  },

  "Urban Planning": {
    domain: "APPLIED",
    clusters: ["TRANSPORT", "LANDUSE", "ENVPLAN", "HOUSING", "SMART"],
    clusterConnections: {
      "TRANSPORT": ["LANDUSE", "ENVPLAN", "HOUSING", "SMART"],
      "LANDUSE": ["TRANSPORT", "ENVPLAN", "HOUSING"],
      "ENVPLAN": ["TRANSPORT", "LANDUSE", "HOUSING", "SMART"],
      "HOUSING": ["TRANSPORT", "LANDUSE", "ENVPLAN"],
      "SMART": ["TRANSPORT", "LANDUSE", "ENVPLAN", "HOUSING"]
    },
    expertLinks: [
      ["transportation_planning", "traffic_management", 4],
      ["land_use_planning", "zoning", 4],
      ["environmental_planning", "sustainability", 4],
      ["housing_policy", "affordable_housing", 4],
      ["smart_cities", "digital_infrastructure", 4],
      ["traffic_management", "traffic_flow", 3],
      ["zoning", "land_use_regulations", 3],
      ["sustainability", "environmental_impact", 3],
      ["affordable_housing", "public_housing", 3],
      ["digital_infrastructure", "smart_grid", 3]
    ],
    conceptKeywords: {
      "transportation_planning": ["traffic", "public-transport", "roads", "highways", "sustainable-mobility"],
      "land_use_planning": ["zoning", "subdivision", "urban-design", "growth-management", "sprawl"],
      "environmental_planning": ["sustainability", "conservation", "pollution", "climate-adaptation", "resilience"],
      "housing_policy": ["affordable-housing", "gentrification", "homelessness", "rent-control", "public-housing"],
      "smart_cities": ["iot", "sensors", "data", "efficiency", "quality-of-life"],
      "traffic_management": ["congestion", "signals", "public-transit", "bike-lanes", "pedestrian"],
      "zoning": ["residential", "commercial", "industrial", "mixed-use", "density"],
      "sustainability": ["environmental", "social", "economic", "long-term", "resilience"],
      "affordable_housing": ["subsidies", "rent-control", "inclusionary-zoning", "housing-vouchers", "co-housing"],
      "digital_infrastructure": ["broadband", "5g", "smart-grid", "surveillance", "privacy"],
      "traffic_flow": ["volume", "speed", "density", "capacity", "level-of-service"],
      "land_use_regulations": ["building-codes", "setbacks", "height-limits", "floor-area-ratio", "variances"],
      "environmental_impact": ["carbon-footprint", "air-quality", "water-use", "biodiversity", "noise"],
      "public_housing": ["social-housing", "subsidized", "rent-geared-to-income", "mixed-income", "cooperative"],
      "smart_grid": ["electricity", "renewable-energy", "demand-response", "energy-storage", "microgrids"]
    }
  },

  "Architecture": {
    domain: "APPLIED",
    clusters: ["DESIGN", "HISTORY", "TECHNOLOGY", "URBAN", "SUSTAINABLE"],
    clusterConnections: {
      "DESIGN": ["HISTORY", "TECHNOLOGY", "URBAN", "SUSTAINABLE"],
      "HISTORY": ["DESIGN", "TECHNOLOGY", "URBAN"],
      "TECHNOLOGY": ["DESIGN", "HISTORY", "URBAN", "SUSTAINABLE"],
      "URBAN": ["DESIGN", "HISTORY", "TECHNOLOGY", "SUSTAINABLE"],
      "SUSTAINABLE": ["DESIGN", "TECHNOLOGY", "URBAN"]
    },
    expertLinks: [
      ["architectural_design", "space_planning", 4],
      ["history_of_architecture", "architectural_styles", 4],
      ["architectural_technology", "building_materials", 4],
      ["urban_design", "city_planning", 4],
      ["sustainable_architecture", "green_building", 4],
      ["space_planning", "ergonomics", 3],
      ["architectural_styles", "modernism", 3],
      ["building_materials", "concrete", 3],
      ["city_planning", "zoning", 3],
      ["green_building", "leed_certification", 3]
    ],
    conceptKeywords: {
      "architectural_design": ["aesthetics", "function", "form", "space", "light"],
      "history_of_architecture": ["styles", "movements", "periods", "influences", "evolution"],
      "architectural_technology": ["materials", "structures", "construction", "innovation", "sustainability"],
      "urban_design": ["public-space", "streets", "parks", "neighborhoods", "connectivity"],
      "sustainable_architecture": ["energy-efficiency", "renewable-materials", "passive-design", "net-zero", "biophilic"],
      "space_planning": ["layout", "circulation", "ergonomics", "accessibility", "flexibility"],
      "architectural_styles": ["modernism", "postmodernism", "brutalism", "deconstructivism", "neoclassical"],
      "building_materials": ["concrete", "steel", "wood", "glass", "composites"],
      "city_planning": ["zoning", "land-use", "transportation", "infrastructure", "public-services"],
      "green_building": ["sustainability", "energy-efficiency", "water-conservation", "indoor-air-quality", "waste-reduction"],
      "ergonomics": ["human-factors", "anthropometrics", "biomechanics", "cognitive", "environmental"],
      "modernism": ["function-over-form", "minimalism", "open-plan", "industrial-materials", "le-corbusier"],
      "concrete": ["portland-cement", "reinforced", "precast", "formwork", "curing"],
      "leed_certification": ["sustainable-sites", "water-efficiency", "energy-atmosphere", "materials-resources", "indoor-environmental-quality"]
    }
  },

  // ========== INTERDISCIPLINARY NETWORK ==========
  "Interdisciplinary Knowledge Network": {
    domain: "INTERDISC",
    clusters: ["FORMAL", "NATURAL", "HEALTH", "SOCIAL", "HUMANITIES", "APPLIED", "INTERDISC"],
    clusterConnections: {
      "FORMAL": ["NATURAL", "HEALTH", "SOCIAL", "HUMANITIES", "APPLIED", "INTERDISC"],
      "NATURAL": ["FORMAL", "HEALTH", "SOCIAL", "HUMANITIES", "APPLIED", "INTERDISC"],
      "HEALTH": ["FORMAL", "NATURAL", "SOCIAL", "HUMANITIES", "APPLIED", "INTERDISC"],
      "SOCIAL": ["FORMAL", "NATURAL", "HEALTH", "HUMANITIES", "APPLIED", "INTERDISC"],
      "HUMANITIES": ["FORMAL", "NATURAL", "HEALTH", "SOCIAL", "APPLIED", "INTERDISC"],
      "APPLIED": ["FORMAL", "NATURAL", "HEALTH", "SOCIAL", "HUMANITIES", "INTERDISC"],
      "INTERDISC": ["FORMAL", "NATURAL", "HEALTH", "SOCIAL", "HUMANITIES", "APPLIED"]
    },
    expertLinks: [
      // Core Domain → Discipline (Layer 1 → Layer 2)
      ["FORMAL", "mathematical_science", 5],
      ["FORMAL", "logic", 5],
      ["FORMAL", "computer_science", 5],
      ["FORMAL", "systems_science", 5],
      ["NATURAL", "neuroscience", 5],
      ["NATURAL", "environmental_science", 5],
      ["NATURAL", "biology", 5],
      ["HEALTH", "medicine", 5],
      ["HEALTH", "public_health", 5],
      ["HEALTH", "bioethics", 5],
      ["SOCIAL", "anthropology", 5],
      ["SOCIAL", "law", 5],
      ["SOCIAL", "education_science", 5],
      ["SOCIAL", "economics", 5],
      ["SOCIAL", "psychology", 5],
      ["SOCIAL", "sociology", 5],
      ["SOCIAL", "digital_geopolitics", 5],
      ["HUMANITIES", "philosophy", 5],
      ["HUMANITIES", "language_science", 5],
      ["HUMANITIES", "social_epistemology", 5],
      ["HUMANITIES", "history_of_science", 5],
      ["HUMANITIES", "art_and_design", 5],
      ["APPLIED", "engineering", 5],
      ["APPLIED", "design", 5],
      ["APPLIED", "urban_planning", 5],
      ["APPLIED", "architecture", 5],

      // Discipline → Subdiscipline (Layer 2 → Layer 3)
      ["mathematical_science", "algebra", 4],
      ["computer_science", "ai", 4],
      ["neuroscience", "cognitive_neuroscience", 4],
      ["environmental_science", "ecology", 4],
      ["medicine", "clinical_medicine", 4],
      ["public_health", "epidemiology", 4],
      ["anthropology", "cultural_anthropology", 4],
      ["law", "international_law", 4],
      ["education_science", "pedagogy", 4],
      ["economics", "microeconomics", 4],
      ["psychology", "cognitive_psychology", 4],
      ["philosophy", "ethics", 4],
      ["language_science", "linguistics", 4],
      ["engineering", "civil_engineering", 4],
      ["design", "user_experience_design", 4],

      // Subdiscipline → Thematic Domain (Layer 3 → Layer 4)
      ["ai", "machine_learning", 4],
      ["cognitive_neuroscience", "brain_imaging", 4],
      ["ecology", "biodiversity", 4],
      ["clinical_medicine", "diagnosis", 4],
      ["epidemiology", "disease_surveillance", 4],
      ["cultural_anthropology", "ethnography", 4],
      ["international_law", "justice", 4],
      ["pedagogy", "constructivism", 4],
      ["microeconomics", "supply_and_demand", 4],
      ["cognitive_psychology", "memory", 4],
      ["ethics", "moral_philosophy", 4],
      ["linguistics", "phonetics", 4],
      ["civil_engineering", "structural_engineering", 4],
      ["user_experience_design", "usability", 4],

      // Thematic Domain → Main Thematic (Layer 4 → Layer 5)
      ["machine_learning", "supervised_learning", 3],
      ["brain_imaging", "fMRI", 3],
      ["biodiversity", "species_diversity", 3],
      ["diagnosis", "symptom_analysis", 3],
      ["disease_surveillance", "case_reporting", 3],
      ["ethnography", "fieldwork", 3],
      ["justice", "fairness", 3],
      ["constructivism", "metacognition", 3],
      ["supply_and_demand", "market_equilibrium", 3],
      ["memory", "short_term_memory", 3],
      ["moral_philosophy", "utilitarianism", 3],
      ["phonetics", "articulation", 3],
      ["structural_engineering", "load_bearing", 3],
      ["usability", "user_friendly", 3],

      // Cross-Domain Connections (Layer 2 ↔ Layer 2)
      ["computer_science", "neuroscience", 4],
      ["psychology", "neuroscience", 4],
      ["medicine", "public_health", 4],
      ["education_science", "psychology", 4],
      ["environmental_science", "public_health", 4],
      ["law", "human_rights", 4],
      ["digital_geopolitics", "computer_science", 4],
      ["philosophy", "social_epistemology", 4],
      ["language_science", "psychology", 4],
      ["engineering", "computer_science", 4],

      // Cross-Domain Connections (Layer 3 ↔ Layer 3)
      ["ai", "cognitive_neuroscience", 4],
      ["machine_learning", "neural_coding", 4],
      ["cognitive_psychology", "neuroscience", 4],
      ["clinical_medicine", "public_health", 4],
      ["epidemiology", "environmental_science", 4],
      ["cultural_anthropology", "language_science", 4],
      ["international_law", "human_rights", 4],
      ["pedagogy", "cognitive_psychology", 4],
      ["microeconomics", "psychology", 4],
      ["ethics", "bioethics", 4],
      ["linguistics", "cognitive_psychology", 4],
      ["civil_engineering", "urban_planning", 4],

      // Cross-Domain Connections (Layer 4 ↔ Layer 4)
      ["machine_learning", "brain_imaging", 4],
      ["memory", "neural_coding", 4],
      ["disease_surveillance", "environmental_health", 4],
      ["ethnography", "language_and_culture", 4],
      ["justice", "human_dignity", 4],
      ["constructivism", "synaptic_plasticity", 4],
      ["supply_and_demand", "heuristics", 4],
      ["moral_philosophy", "bioethics", 4],
      ["phonetics", "language_acquisition", 4],
      ["structural_engineering", "urban_design", 4],

      // Interdisciplinary Nodes (Layer 1)
      ["Interdisciplinarity", "Transdisciplinarity", 5],
      ["Interdisciplinarity", "Knowledge Integration", 5],
      ["Interdisciplinarity", "Cross-Disciplinary", 5],
      ["Transdisciplinarity", "Knowledge Integration", 5],
      ["Transdisciplinarity", "Cross-Disciplinary", 5],
      ["Knowledge Integration", "Cross-Disciplinary", 5],

      // Interdisciplinary Nodes ↔ Disciplines (Layer 1 ↔ Layer 2)
      ["Interdisciplinarity", "computer_science", 5],
      ["Interdisciplinarity", "neuroscience", 5],
      ["Interdisciplinarity", "psychology", 5],
      ["Interdisciplinarity", "philosophy", 5],
      ["Transdisciplinarity", "environmental_science", 4],
      ["Transdisciplinarity", "public_health", 4],
      ["Transdisciplinarity", "education_science", 4],
      ["Knowledge Integration", "ai", 5],
      ["Knowledge Integration", "cognitive_neuroscience", 5],
      ["Cross-Disciplinary", "machine_learning", 4],
      ["Cross-Disciplinary", "brain_imaging", 4]
    ],
    conceptKeywords: {
      // Core Domains (Layer 1)
      "FORMAL": ["mathematics", "logic", "computer-science", "systems-science", "abstraction"],
      "NATURAL": ["physics", "chemistry", "biology", "neuroscience", "environmental-science"],
      "HEALTH": ["medicine", "public-health", "bioethics", "disease", "wellness"],
      "SOCIAL": ["anthropology", "law", "education", "economics", "psychology", "sociology", "digital-geopolitics"],
      "HUMANITIES": ["philosophy", "language-science", "social-epistemology", "history-of-science", "art-and-design"],
      "APPLIED": ["engineering", "design", "urban-planning", "architecture", "technology"],
      "INTERDISC": ["interdisciplinarity", "transdisciplinarity", "knowledge-integration", "cross-disciplinary", "synthesis"],

      // Disciplines (Layer 2)
      "mathematical_science": ["algebra", "calculus", "statistics", "topology", "logic"],
      "logic": ["symbolic", "mathematical", "computational", "philosophical", "formal"],
      "computer_science": ["ai", "algorithms", "data", "systems", "theory"],
      "systems_science": ["complex-systems", "cybernetics", "systems-thinking", "networks", "dynamics"],
      "neuroscience": ["cognitive", "molecular", "clinical", "computational", "methods"],
      "environmental_science": ["climate", "ecology", "hydrology", "atmospheric", "earth"],
      "biology": ["genetics", "cell-biology", "evolution", "ecology", "physiology"],
      "medicine": ["clinical", "internal", "surgery", "pediatrics", "public-health"],
      "public_health": ["epidemiology", "biostatistics", "environmental-health", "policy", "global"],
      "bioethics": ["medical-ethics", "research-ethics", "environmental-ethics", "digital-ethics", "biolaw"],
      "anthropology": ["cultural", "biological", "linguistic", "archaeology", "medical", "ecological", "political", "applied"],
      "law": ["international", "constitutional", "criminal", "civil", "human-rights"],
      "education_science": ["learning", "pedagogy", "curriculum", "assessment", "special", "technology", "social", "policy"],
      "economics": ["micro", "macro", "behavioral", "development", "international"],
      "psychology": ["cognitive", "clinical", "social", "developmental", "neuropsychology"],
      "sociology": ["theory", "culture", "economic", "political", "urban"],
      "digital_geopolitics": ["cybersecurity", "digital-governance", "ai-geopolitics", "data-geopolitics", "platform-geopolitics"],
      "philosophy": ["ontology", "epistemology", "ethics", "language", "mind", "science", "social", "history"],
      "language_science": ["phonetics", "morphology", "semantics", "sociolinguistics", "psycholinguistics", "historical", "acquisition", "computational"],
      "social_epistemology": ["knowledge-production", "social-knowledge", "expertise", "trust"],
      "history_of_science": ["scientific-revolution", "institutional-history", "social-history", "philosophical-history"],
      "art_and_design": ["visual", "digital", "design-thinking", "aesthetics", "cultural"],
      "engineering": ["civil", "mechanical", "electrical", "chemical", "software"],
      "design": ["ux", "industrial", "graphic", "interaction"],
      "urban_planning": ["transport", "land-use", "environmental", "housing", "smart"],
      "architecture": ["design", "history", "technology", "urban", "sustainable"],

      // Subdisciplines (Layer 3)
      "algebra": ["abstract", "linear", "group-theory", "ring-theory", "vector-spaces"],
      "ai": ["machine-learning", "natural-language-processing", "computer-vision", "robotics", "expert-systems"],
      "cognitive_neuroscience": ["brain-imaging", "neural-coding", "neuroplasticity", "cognitive-control", "decision-neuroscience"],
      "ecology": ["biodiversity", "ecosystem-dynamics", "population-ecology", "community-ecology", "conservation-biology"],
      "clinical_medicine": ["diagnosis", "treatment", "disease-management", "clinical-trials", "patient-care"],
      "epidemiology": ["disease-surveillance", "outbreak-investigation", "risk-factors", "public-health-policy", "biostatistics"],
      "cultural_anthropology": ["ethnography", "cultural-relativism", "symbolic-anthropology", "ethnolinguistics", "medical-anthropology"],
      "international_law": ["treaty-law", "human-rights", "international-criminal-law", "diplomatic-law", "trade-law"],
      "pedagogy": ["constructivism", "behaviorism", "cognitivism", "social-learning-theory", "active-learning"],
      "microeconomics": ["supply-and-demand", "market-structure", "consumer-theory", "firm-theory", "equilibrium"],
      "cognitive_psychology": ["perception", "attention", "memory", "language", "problem-solving"],
      "ethics": ["moral-philosophy", "applied-ethics", "normative-ethics", "meta-ethics", "virtue-ethics"],
      "linguistics": ["phonetics", "morphology", "semantics", "syntax", "pragmatics"],
      "civil_engineering": ["structural-engineering", "transportation", "hydraulics", "geotechnical", "environmental"],
      "user_experience_design": ["usability", "accessibility", "user-research", "prototyping", "testing"],

      // Thematic Domains (Layer 4)
      "machine_learning": ["supervised-learning", "unsupervised-learning", "reinforcement-learning", "neural-networks", "deep-learning"],
      "brain_imaging": ["fMRI", "EEG", "MEG", "PET", "DTI"],
      "biodiversity": ["species-diversity", "ecosystem-diversity", "genetic-diversity", "functional-diversity", "phylogenetic-diversity"],
      "diagnosis": ["symptom-analysis", "laboratory-tests", "imaging", "clinical-examination", "differential-diagnosis"],
      "disease_surveillance": ["case-reporting", "outbreak-detection", "epidemic-intelligence", "public-health-response", "monitoring"],
      "ethnography": ["fieldwork", "participant-observation", "interviews", "case-studies", "ethnographic-methods"],
      "justice": ["fairness", "equity", "impartiality", "rule-of-law", "social-justice"],
      "constructivism": ["learning-theory", "knowledge-construction", "piaget", "vygotsky", "scaffolding"],
      "supply_and_demand": ["market-equilibrium", "elasticity", "consumer-surplus", "producer-surplus", "price-mechanism"],
      "memory": ["short-term-memory", "long-term-memory", "working-memory", "episodic-memory", "semantic-memory"],
      "moral_philosophy": ["utilitarianism", "deontology", "virtue-ethics", "consequentialism", "normative-ethics"],
      "phonetics": ["articulation", "acoustics", "phonation", "prosody", "transcription"],
      "structural_engineering": ["load-bearing", "stress-analysis", "deflection", "stability", "material-science"],
      "usability": ["user-friendly", "learnability", "efficiency", "memorability", "satisfaction"],

      // Main Thematics (Layer 5)
      "supervised_learning": ["classification", "regression", "training-data", "validation", "overfitting"],
      "fMRI": ["functional-mri", "bold-signal", "neuroimaging", "brain-activity", "hemodynamic-response"],
      "species_diversity": ["richness", "evenness", "shannon-index", "simpson-index", "biodiversity-metrics"],
      "symptom_analysis": ["history-taking", "physical-exam", "laboratory-tests", "differential-diagnosis", "clinical-reasoning"],
      "case_reporting": ["individual-cases", "aggregate-data", "mandatory-reporting", "voluntary-reporting", "electronic-systems"],
      "fieldwork": ["observation", "interviews", "surveys", "participant-observation", "ethnographic-fieldnotes"],
      "fairness": ["equity", "impartiality", "justice", "bias-mitigation", "algorithmic-fairness"],
      "metacognition": ["thinking-about-thinking", "self-regulation", "awareness", "monitoring", "control"],
      "market_equilibrium": ["supply", "demand", "price", "quantity", "competitive-equilibrium"],
      "short_term_memory": ["working-memory", "central-executive", "phonological-loop", "visuospatial-sketchpad", "episodic-buffer"],
      "utilitarianism": ["greatest-happiness", "consequentialism", "bentham", "mill", "hedonism"],
      "articulation": ["tongue", "lips", "palate", "manners-of-articulation", "places-of-articulation"],
      "load_bearing": ["compression", "tension", "shear", "bending", "buckling"],
      "user_friendly": ["intuitive", "simple", "clear", "consistent", "forgiving"]
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
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    existingLinks.add(`${sourceId}-${targetId}`);
    existingLinks.add(`${targetId}-${sourceId}`);
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
            addLink(node1.id, node2.id, 3);
          });
        });
      });
    });
  }

  // 3. Liens spécifiques (experts)
  if (config.expertLinks && Array.isArray(config.expertLinks)) {
    config.expertLinks.forEach(link => {
      if (Array.isArray(link) && link.length >= 3) {
        addLink(link[0], link[1], link[2]);
      } else if (link.s && link.t && link.w !== undefined) {
        addLink(link.s, link.t, link.w);
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
        if (commonKeywords.length >= 3) {
          const weight = Math.min(5, 2 + commonKeywords.length);
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
