// MLKN.lab — Interdisciplinary Knowledge Network Data
// 26 Disciplines + 5 Core Layers + 4 Meta-Layers
// Author: François Papin | May 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/ | https://github.com/FrancoisPapin
'use strict';

window.MAP_DATA = (function() {

// ── 5 Core Discipline Domains (Layer 1) ─────────────────────────────────────
var CORE_DOMAINS = {
  FORMAL:    { label: "Formal Sciences",       color: "#FF6347", light: "#FEF9EE" },
  NATURAL:   { label: "Natural Sciences",      color: "#2ECC71", light: "#EAFAF1" },
  HEALTH:    { label: "Health Sciences",        color: "#3498DB", light: "#EBF4FB" },
  SOCIAL:    { label: "Social Sciences",        color: "#9B59B6", light: "#F5EEF8" },
  HUMANITIES:{ label: "Humanities",              color: "#E74C3C", light: "#FDF0EF" },
  APPLIED:   { label: "Applied Sciences",       color: "#F39C12", light: "#FEF9EE" }
};

// ── 26 Academic Disciplines (Layer 2) ───────────────────────────────────────
var DISCIPLINES = {
  // Formal Sciences
  MATH:    { label: "Mathematical Science",    color: "#FF6347", light: "#FEF9EE", domain: "FORMAL" },
  LOGIC:   { label: "Logic",                    color: "#FF4757", light: "#FEF9EE", domain: "FORMAL" },
  CS:      { label: "Computer Science",         color: "#0A7E8C", light: "#E8F8FA", domain: "FORMAL" },
  SYS:     { label: "Systems Science",          color: "#D97706", light: "#FEF9EE", domain: "FORMAL" },

  // Natural Sciences
  NEURO:   { label: "Neuroscience",             color: "#C05718", light: "#FDF3EE", domain: "NATURAL" },
  ENV:     { label: "Environmental Science",    color: "#1A8A4A", light: "#EAFAF1", domain: "NATURAL" },
  BIO:     { label: "Biology",                  color: "#2ECC71", light: "#EAFAF1", domain: "NATURAL" },

  // Health Sciences
  MED:     { label: "Medicine",                 color: "#2ED573", light: "#EBF8FA", domain: "HEALTH" },
  PUBHLTH: { label: "Public Health",            color: "#53D1B6", light: "#EBF8FA", domain: "HEALTH" },
  BIOETH:  { label: "Bioethics",                color: "#1E90FF", light: "#EBF8FA", domain: "HEALTH" },

  // Social Sciences
  ANTH:    { label: "Anthropology",             color: "#8E44AD", light: "#F5EEF8", domain: "SOCIAL" },
  LAW:     { label: "Law",                      color: "#9B59B6", light: "#F5EEF8", domain: "SOCIAL" },
  EDUC:    { label: "Education Science",        color: "#1A6BAA", light: "#EBF4FB", domain: "SOCIAL" },
  ECON:    { label: "Economics",                color: "#3498DB", light: "#EBF8FA", domain: "SOCIAL" },
  PSY:     { label: "Psychology",               color: "#1ABC9C", light: "#EBF8FA", domain: "SOCIAL" },
  SOC:     { label: "Sociology",                color: "#34495E", light: "#F5EEF8", domain: "SOCIAL" },
  DIGGEO:  { label: "Digital Geopolitics",       color: "#7F8C8D", light: "#F5EEF8", domain: "SOCIAL" },

  // Humanities
  PHIL:    { label: "Philosophy",               color: "#B7770D", light: "#FEF9EE", domain: "HUMANITIES" },
  LANG:    { label: "Language Science",         color: "#2E7D52", light: "#EAFAF1", domain: "HUMANITIES" },
  SOCEP:   { label: "Social Epistemology",       color: "#BDC3C7", light: "#F5EEF8", domain: "HUMANITIES" },
  HIST:    { label: "History of Science",        color: "#95A5A6", light: "#F5EEF8", domain: "HUMANITIES" },
  ART:     { label: "Art & Design",              color: "#ECF0F1", light: "#F5EEF8", domain: "HUMANITIES" },

  // Applied Sciences
  ENG:     { label: "Engineering",              color: "#F39C12", light: "#FEF9EE", domain: "APPLIED" },
  DESIGN:  { label: "Design",                  color: "#E67E22", light: "#FEF9EE", domain: "APPLIED" },
  URBAN:   { label: "Urban Planning",           color: "#D35400", light: "#FEF9EE", domain: "APPLIED" },
  ARCH:    { label: "Architecture",             color: "#E74C3C", light: "#FEF9EE", domain: "APPLIED" },

  // Interdisciplinary Nodes
  INTERDISC: { label: "Interdisciplinary",      color: "#8E44AD", light: "#F5EEF8", domain: "INTERDISC" }
};

// ── Epistemic Role taxonomy (academic standard) ───────────────────────────────
var EPISTEMIC = {
  FOUNDATIONAL:   { label: "Foundational",    color: "#8B5CF6", icon: "◈" },
  THEORETICAL:    { label: "Theoretical",     color: "#2563EB", icon: "◉" },
  METHODOLOGICAL: { label: "Methodological",  color: "#059669", icon: "◎" },
  EMPIRICAL:      { label: "Empirical",       color: "#D97706", icon: "◌" },
  APPLIED:        { label: "Applied",         color: "#DC2626", icon: "◍" },
  NORMATIVE:      { label: "Normative",       color: "#7C3AED", icon: "◐" },
  META:           { label: "Meta-Level",      color: "#6C5CE7", light: "#F5F3FF" }
};

// ── Levels of Analysis (scientific standard) ─────────────────────────────────
var ANALYSIS_LEVELS = {
  MOLECULAR:  { label: "Molecular / Neural",  color: "#EF4444", tier: 1 },
  INDIVIDUAL: { label: "Individual",          color: "#F59E0B", tier: 2 },
  SOCIAL:     { label: "Social / Cultural",   color: "#10B981", tier: 3 },
  SYSTEM:     { label: "System / Global",     color: "#3B82F6", tier: 4 }
};

// ── Nodes (Layers 2–5) ────────────────────────────────────────────────────────
var NODES = [
  // ========== LAYER 2: DISCIPLINES (26) ==========
  // Formal Sciences
  { id: "mathematical_science", disc: "MATH", size: 30, er: "FOUNDATIONAL", al: "SYSTEM", layer: 2, visible: true, domain: "FORMAL" },
  { id: "logic",                disc: "LOGIC", size: 25, er: "FOUNDATIONAL", al: "INDIVIDUAL", layer: 2, visible: true, domain: "FORMAL" },
  { id: "computer_science",     disc: "CS",    size: 35, er: "METHODOLOGICAL", al: "SYSTEM", layer: 2, visible: true, domain: "FORMAL" },
  { id: "systems_science",      disc: "SYS",   size: 30, er: "THEORETICAL", al: "SYSTEM", layer: 2, visible: true, domain: "FORMAL" },

  // Natural Sciences
  { id: "neuroscience",         disc: "NEURO", size: 35, er: "EMPIRICAL", al: "MOLECULAR", layer: 2, visible: true, domain: "NATURAL" },
  { id: "environmental_science", disc: "ENV", size: 30, er: "EMPIRICAL", al: "SYSTEM", layer: 2, visible: true, domain: "NATURAL" },
  { id: "biology",              disc: "BIO",   size: 30, er: "EMPIRICAL", al: "MOLECULAR", layer: 2, visible: true, domain: "NATURAL" },

  // Health Sciences
  { id: "medicine",             disc: "MED",   size: 35, er: "APPLIED", al: "INDIVIDUAL", layer: 2, visible: true, domain: "HEALTH" },
  { id: "public_health",        disc: "PUBHLTH", size: 30, er: "APPLIED", al: "SYSTEM", layer: 2, visible: true, domain: "HEALTH" },
  { id: "bioethics",            disc: "BIOETH", size: 25, er: "NORMATIVE", al: "SYSTEM", layer: 2, visible: true, domain: "HEALTH" },

  // Social Sciences
  { id: "anthropology",          disc: "ANTH",  size: 30, er: "METHODOLOGICAL", al: "SOCIAL", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "law",                 disc: "LAW",   size: 30, er: "NORMATIVE", al: "SOCIAL", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "education_science",    disc: "EDUC",  size: 30, er: "THEORETICAL", al: "SOCIAL", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "economics",            disc: "ECON",  size: 30, er: "THEORETICAL", al: "SYSTEM", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "psychology",           disc: "PSY",   size: 35, er: "THEORETICAL", al: "INDIVIDUAL", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "sociology",            disc: "SOC",   size: 30, er: "THEORETICAL", al: "SOCIAL", layer: 2, visible: true, domain: "SOCIAL" },
  { id: "digital_geopolitics",   disc: "DIGGEO", size: 25, er: "NORMATIVE", al: "SYSTEM", layer: 2, visible: true, domain: "SOCIAL" },

  // Humanities
  { id: "philosophy",           disc: "PHIL",  size: 30, er: "FOUNDATIONAL", al: "SYSTEM", layer: 2, visible: true, domain: "HUMANITIES" },
  { id: "language_science",     disc: "LANG",  size: 30, er: "THEORETICAL", al: "INDIVIDUAL", layer: 2, visible: true, domain: "HUMANITIES" },
  { id: "social_epistemology",   disc: "SOCEP", size: 25, er: "META", al: "SYSTEM", layer: 2, visible: true, domain: "HUMANITIES" },
  { id: "history_of_science",    disc: "HIST",  size: 25, er: "META", al: "SYSTEM", layer: 2, visible: true, domain: "HUMANITIES" },
  { id: "art_and_design",        disc: "ART",   size: 25, er: "APPLIED", al: "SOCIAL", layer: 2, visible: true, domain: "HUMANITIES" },

  // Applied Sciences
  { id: "engineering",           disc: "ENG",   size: 30, er: "APPLIED", al: "SYSTEM", layer: 2, visible: true, domain: "APPLIED" },
  { id: "design",               disc: "DESIGN", size: 25, er: "APPLIED", al: "SOCIAL", layer: 2, visible: true, domain: "APPLIED" },
  { id: "urban_planning",        disc: "URBAN", size: 25, er: "APPLIED", al: "SYSTEM", layer: 2, visible: true, domain: "APPLIED" },
  { id: "architecture",          disc: "ARCH",  size: 25, er: "APPLIED", al: "SOCIAL", layer: 2, visible: true, domain: "APPLIED" },

  // Interdisciplinary Nodes
  { id: "interdisciplinarity", disc: "INTERDISC", size: 35, er: "META", al: "SYSTEM", layer: 1, visible: true, domain: "INTERDISC" },
  { id: "transdisciplinarity", disc: "INTERDISC", size: 33, er: "META", al: "SYSTEM", layer: 1, visible: true, domain: "INTERDISC" },
  { id: "knowledge_integration", disc: "INTERDISC", size: 31, er: "META", al: "SYSTEM", layer: 1, visible: true, domain: "INTERDISC" },
  { id: "cross_disciplinary",   disc: "INTERDISC", size: 29, er: "META", al: "SYSTEM", layer: 1, visible: true, domain: "INTERDISC" },

  // ========== LAYER 3: SUBDISCIPLINES (Hidden by default) ==========
  // Formal Sciences
  { id: "algebra",               disc: "MATH", size: 20, er: "FOUNDATIONAL", al: "MOLECULAR", layer: 3, visible: false, domain: "FORMAL", parent_field: "mathematical_science" },
  { id: "calculus",              disc: "MATH", size: 20, er: "FOUNDATIONAL", al: "MOLECULAR", layer: 3, visible: false, domain: "FORMAL", parent_field: "mathematical_science" },
  { id: "statistics",            disc: "MATH", size: 20, er: "METHODOLOGICAL", al: "SYSTEM", layer: 3, visible: false, domain: "FORMAL", parent_field: "mathematical_science" },
  { id: "ai",                   disc: "CS",    size: 30, er: "METHODOLOGICAL", al: "SYSTEM", layer: 3, visible: false, domain: "FORMAL", parent_field: "computer_science" },
  { id: "data_science",         disc: "CS",    size: 25, er: "METHODOLOGICAL", al: "SYSTEM", layer: 3, visible: false, domain: "FORMAL", parent_field: "computer_science" },
  { id: "software_engineering", disc: "CS",    size: 20, er: "APPLIED", al: "SYSTEM", layer: 3, visible: false, domain: "FORMAL", parent_field: "computer_science" },
  { id: "symbolic_logic",        disc: "LOGIC", size: 20, er: "FOUNDATIONAL", al: "INDIVIDUAL", layer: 3, visible: false, domain: "FORMAL", parent_field: "logic" },
  { id: "complex_systems",      disc: "SYS",   size: 25, er: "THEORETICAL", al: "SYSTEM", layer: 3, visible: false, domain: "FORMAL", parent_field: "systems_science" },

  // Natural Sciences
  { id: "cognitive_neuroscience", disc: "NEURO", size: 25, er: "EMPIRICAL", al: "MOLECULAR", layer: 3, visible: false, domain: "NATURAL", parent_field: "neuroscience" },
  { id: "molecular_neuroscience", disc: "NEURO", size: 20, er: "EMPIRICAL", al: "MOLECULAR", layer: 3, visible: false, domain: "NATURAL", parent_field: "neuroscience" },
  { id: "ecology",               disc: "ENV",   size: 25, er: "EMPIRICAL", al: "SYSTEM", layer: 3, visible: false, domain: "NATURAL", parent_field: "environmental_science" },
  { id: "climate_science",       disc: "ENV",   size: 25, er: "EMPIRICAL", al: "SYSTEM", layer: 3, visible: false, domain: "NATURAL", parent_field: "environmental_science" },
  { id: "genetics",              disc: "BIO",   size: 25, er: "EMPIRICAL", al: "MOLECULAR", layer: 3, visible: false, domain: "NATURAL", parent_field: "biology" },

  // Health Sciences
  { id: "clinical_medicine",     disc: "MED",   size: 25, er: "APPLIED", al: "INDIVIDUAL", layer: 3, visible: false, domain: "HEALTH", parent_field: "medicine" },
  { id: "epidemiology",          disc: "PUBHLTH", size: 25, er: "EMPIRICAL", al: "SYSTEM", layer: 3, visible: false, domain: "HEALTH", parent_field: "public_health" },
  { id: "medical_ethics",        disc: "BIOETH", size: 20, er: "NORMATIVE", al: "SYSTEM", layer: 3, visible: false, domain: "HEALTH", parent_field: "bioethics" },

  // Social Sciences
  { id: "cognitive_psychology", disc: "PSY",   size: 30, er: "THEORETICAL", al: "INDIVIDUAL", layer: 3, visible: false, domain: "SOCIAL", parent_field: "psychology" },
  { id: "clinical_psychology",  disc: "PSY",   size: 25, er: "APPLIED", al: "INDIVIDUAL", layer: 3, visible: false, domain: "SOCIAL", parent_field: "psychology" },
  { id: "social_psychology",     disc: "PSY",   size: 25, er: "THEORETICAL", al: "SOCIAL", layer: 3, visible: false, domain: "SOCIAL", parent_field: "psychology" },
  { id: "microeconomics",        disc: "ECON",  size: 25, er: "THEORETICAL", al: "SYSTEM", layer: 3, visible: false, domain: "SOCIAL", parent_field: "economics" },
  { id: "international_law",     disc: "LAW",   size: 25, er: "APPLIED", al: "SYSTEM", layer: 3, visible: false, domain: "SOCIAL", parent_field: "law" },
  { id: "cybersecurity",        disc: "DIGGEO", size: 25, er: "APPLIED", al: "SYSTEM", layer: 3, visible: false, domain: "SOCIAL", parent_field: "digital_geopolitics" },

  // Humanities
  { id: "ethics",               disc: "PHIL",  size: 25, er: "NORMATIVE", al: "SYSTEM", layer: 3, visible: false, domain: "HUMANITIES", parent_field: "philosophy" },
  { id: "linguistics",          disc: "LANG",  size: 25, er: "THEORETICAL", al: "INDIVIDUAL", layer: 3, visible: false, domain: "HUMANITIES", parent_field: "language_science" },
  { id: "knowledge_production", disc: "SOCEP", size: 20, er: "META", al: "SYSTEM", layer: 3, visible: false, domain: "HUMANITIES", parent_field: "social_epistemology" },

  // Applied Sciences
  { id: "civil_engineering",    disc: "ENG",   size: 25, er: "APPLIED", al: "SYSTEM", layer: 3, visible: false, domain: "APPLIED", parent_field: "engineering" },
  { id: "user_experience_design", disc: "DESIGN", size: 20, er: "APPLIED", al: "SOCIAL", layer: 3, visible: false, domain: "APPLIED", parent_field: "design" },
  { id: "transportation_planning", disc: "URBAN", size: 20, er: "APPLIED", al: "SYSTEM", layer: 3, visible: false, domain: "APPLIED", parent_field: "urban_planning" },

  // ========== LAYER 4: THEMATIC DOMAINS (Hidden by default) ==========
  // Formal Sciences
  { id: "abstract_algebra",     disc: "MATH", size: 15, er: "FOUNDATIONAL", al: "MOLECULAR", layer: 4, visible: false, domain: "FORMAL", subdiscipline: "algebra" },
  { id: "machine_learning",     disc: "CS",   size: 20, er: "METHODOLOGICAL", al: "SYSTEM", layer: 4, visible: false, domain: "FORMAL", subdiscipline: "ai" },
  { id: "propositional_logic",  disc: "LOGIC", size: 15, er: "FOUNDATIONAL", al: "INDIVIDUAL", layer: 4, visible: false, domain: "FORMAL", subdiscipline: "symbolic_logic" },
  { id: "network_theory",       disc: "SYS",   size: 20, er: "THEORETICAL", al: "SYSTEM", layer: 4, visible: false, domain: "FORMAL", subdiscipline: "complex_systems" },

  // Natural Sciences
  { id: "brain_imaging",        disc: "NEURO", size: 20, er: "METHODOLOGICAL", al: "MOLECULAR", layer: 4, visible: false, domain: "NATURAL", subdiscipline: "cognitive_neuroscience" },
  { id: "biodiversity",         disc: "ENV",   size: 20, er: "EMPIRICAL", al: "SYSTEM", layer: 4, visible: false, domain: "NATURAL", subdiscipline: "ecology" },
  { id: "molecular_genetics",   disc: "BIO",   size: 20, er: "EMPIRICAL", al: "MOLECULAR", layer: 4, visible: false, domain: "NATURAL", subdiscipline: "genetics" },

  // Health Sciences
  { id: "diagnosis",             disc: "MED",   size: 20, er: "APPLIED", al: "INDIVIDUAL", layer: 4, visible: false, domain: "HEALTH", subdiscipline: "clinical_medicine" },
  { id: "disease_surveillance",  disc: "PUBHLTH", size: 20, er: "EMPIRICAL", al: "SYSTEM", layer: 4, visible: false, domain: "HEALTH", subdiscipline: "epidemiology" },
  { id: "clinical_ethics",       disc: "BIOETH", size: 15, er: "NORMATIVE", al: "SYSTEM", layer: 4, visible: false, domain: "HEALTH", subdiscipline: "medical_ethics" },

  // Social Sciences
  { id: "memory",                disc: "PSY",   size: 20, er: "THEORETICAL", al: "INDIVIDUAL", layer: 4, visible: false, domain: "SOCIAL", subdiscipline: "cognitive_psychology" },
  { id: "justice",               disc: "LAW",   size: 20, er: "NORMATIVE", al: "SOCIAL", layer: 4, visible: false, domain: "SOCIAL", subdiscipline: "international_law" },
  { id: "supply_and_demand",     disc: "ECON",  size: 20, er: "THEORETICAL", al: "SYSTEM", layer: 4, visible: false, domain: "SOCIAL", subdiscipline: "microeconomics" },
  { id: "network_security",      disc: "DIGGEO", size: 20, er: "APPLIED", al: "SYSTEM", layer: 4, visible: false, domain: "SOCIAL", subdiscipline: "cybersecurity" },

  // Humanities
  { id: "moral_philosophy",      disc: "PHIL",  size: 20, er: "NORMATIVE", al: "SYSTEM", layer: 4, visible: false, domain: "HUMANITIES", subdiscipline: "ethics" },
  { id: "phonetics",             disc: "LANG",  size: 15, er: "THEORETICAL", al: "INDIVIDUAL", layer: 4, visible: false, domain: "HUMANITIES", subdiscipline: "linguistics" },
  { id: "scientific_knowledge", disc: "SOCEP", size: 15, er: "META", al: "SYSTEM", layer: 4, visible: false, domain: "HUMANITIES", subdiscipline: "knowledge_production" },

  // Applied Sciences
  { id: "structural_engineering", disc: "ENG", size: 20, er: "APPLIED", al: "SYSTEM", layer: 4, visible: false, domain: "APPLIED", subdiscipline: "civil_engineering" },
  { id: "usability",             disc: "DESIGN", size: 15, er: "APPLIED", al: "SOCIAL", layer: 4, visible: false, domain: "APPLIED", subdiscipline: "user_experience_design" },
  { id: "traffic_management",    disc: "URBAN", size: 15, er: "APPLIED", al: "SYSTEM", layer: 4, visible: false, domain: "APPLIED", subdiscipline: "transportation_planning" },

  // ========== LAYER 5: MAIN THEMATICS (Hidden by default) ==========
  // Formal Sciences
  { id: "groups",               disc: "MATH", size: 10, er: "FOUNDATIONAL", al: "MOLECULAR", layer: 5, visible: false, domain: "FORMAL", thematic_domain: "abstract_algebra" },
  { id: "supervised_learning",   disc: "CS",   size: 15, er: "METHODOLOGICAL", al: "INDIVIDUAL", layer: 5, visible: false, domain: "FORMAL", thematic_domain: "machine_learning" },
  { id: "logical_connectives",   disc: "LOGIC", size: 10, er: "FOUNDATIONAL", al: "INDIVIDUAL", layer: 5, visible: false, domain: "FORMAL", thematic_domain: "propositional_logic" },
  { id: "graph_theory",         disc: "SYS",   size: 15, er: "THEORETICAL", al: "SYSTEM", layer: 5, visible: false, domain: "FORMAL", thematic_domain: "network_theory" },

  // Natural Sciences
  { id: "fMRI",                 disc: "NEURO", size: 15, er: "METHODOLOGICAL", al: "MOLECULAR", layer: 5, visible: false, domain: "NATURAL", thematic_domain: "brain_imaging" },
  { id: "species_diversity",   disc: "ENV",   size: 15, er: "EMPIRICAL", al: "SYSTEM", layer: 5, visible: false, domain: "NATURAL", thematic_domain: "biodiversity" },
  { id: "DNA_sequencing",       disc: "BIO",   size: 15, er: "EMPIRICAL", al: "MOLECULAR", layer: 5, visible: false, domain: "NATURAL", thematic_domain: "molecular_genetics" },

  // Health Sciences
  { id: "symptom_analysis",     disc: "MED",   size: 15, er: "APPLIED", al: "INDIVIDUAL", layer: 5, visible: false, domain: "HEALTH", thematic_domain: "diagnosis" },
  { id: "case_reporting",       disc: "PUBHLTH", size: 15, er: "EMPIRICAL", al: "SYSTEM", layer: 5, visible: false, domain: "HEALTH", thematic_domain: "disease_surveillance" },
  { id: "informed_consent",    disc: "BIOETH", size: 10, er: "NORMATIVE", al: "SYSTEM", layer: 5, visible: false, domain: "HEALTH", thematic_domain: "clinical_ethics" },

  // Social Sciences
  { id: "short_term_memory",    disc: "PSY",   size: 15, er: "THEORETICAL", al: "INDIVIDUAL", layer: 5, visible: false, domain: "SOCIAL", thematic_domain: "memory" },
  { id: "fairness",             disc: "LAW",   size: 15, er: "NORMATIVE", al: "SOCIAL", layer: 5, visible: false, domain: "SOCIAL", thematic_domain: "justice" },
  { id: "market_equilibrium",   disc: "ECON",  size: 15, er: "THEORETICAL", al: "SYSTEM", layer: 5, visible: false, domain: "SOCIAL", thematic_domain: "supply_and_demand" },
  { id: "firewalls",            disc: "DIGGEO", size: 15, er: "APPLIED", al: "SYSTEM", layer: 5, visible: false, domain: "SOCIAL", thematic_domain: "network_security" },

  // Humanities
  { id: "utilitarianism",      disc: "PHIL",  size: 15, er: "NORMATIVE", al: "SYSTEM", layer: 5, visible: false, domain: "HUMANITIES", thematic_domain: "moral_philosophy" },
  { id: "articulation",        disc: "LANG",  size: 10, er: "THEORETICAL", al: "INDIVIDUAL", layer: 5, visible: false, domain: "HUMANITIES", thematic_domain: "phonetics" },
  { id: "objectivity",         disc: "SOCEP", size: 10, er: "META", al: "SYSTEM", layer: 5, visible: false, domain: "HUMANITIES", thematic_domain: "scientific_knowledge" },

  // Applied Sciences
  { id: "load_bearing",        disc: "ENG",   size: 15, er: "APPLIED", al: "SYSTEM", layer: 5, visible: false, domain: "APPLIED", thematic_domain: "structural_engineering" },
  { id: "user_friendly",        disc: "DESIGN", size: 10, er: "APPLIED", al: "SOCIAL", layer: 5, visible: false, domain: "APPLIED", thematic_domain: "usability" },
  { id: "traffic_flow",        disc: "URBAN", size: 10, er: "APPLIED", al: "SYSTEM", layer: 5, visible: false, domain: "APPLIED", thematic_domain: "traffic_management" }
];

// ── Intra-discipline links (Layers 2–5) ─────────────────────────────────────
var INTRA = [
  // ========== LAYER 2 → LAYER 3 (Discipline → Subdiscipline) ==========
  // Formal Sciences
  { s: "mathematical_science", t: "algebra", w: 5 },
  { s: "mathematical_science", t: "calculus", w: 5 },
  { s: "mathematical_science", t: "statistics", w: 5 },
  { s: "computer_science", t: "ai", w: 5 },
  { s: "computer_science", t: "data_science", w: 5 },
  { s: "computer_science", t: "software_engineering", w: 5 },
  { s: "logic", t: "symbolic_logic", w: 5 },
  { s: "systems_science", t: "complex_systems", w: 5 },

  // Natural Sciences
  { s: "neuroscience", t: "cognitive_neuroscience", w: 5 },
  { s: "neuroscience", t: "molecular_neuroscience", w: 5 },
  { s: "environmental_science", t: "ecology", w: 5 },
  { s: "environmental_science", t: "climate_science", w: 5 },
  { s: "biology", t: "genetics", w: 5 },

  // Health Sciences
  { s: "medicine", t: "clinical_medicine", w: 5 },
  { s: "public_health", t: "epidemiology", w: 5 },
  { s: "bioethics", t: "medical_ethics", w: 5 },

  // Social Sciences
  { s: "psychology", t: "cognitive_psychology", w: 5 },
  { s: "psychology", t: "clinical_psychology", w: 5 },
  { s: "psychology", t: "social_psychology", w: 5 },
  { s: "economics", t: "microeconomics", w: 5 },
  { s: "law", t: "international_law", w: 5 },
  { s: "digital_geopolitics", t: "cybersecurity", w: 5 },

  // Humanities
  { s: "philosophy", t: "ethics", w: 5 },
  { s: "language_science", t: "linguistics", w: 5 },
  { s: "social_epistemology", t: "knowledge_production", w: 5 },

  // Applied Sciences
  { s: "engineering", t: "civil_engineering", w: 5 },
  { s: "design", t: "user_experience_design", w: 5 },
  { s: "urban_planning", t: "transportation_planning", w: 5 },

  // ========== LAYER 3 → LAYER 4 (Subdiscipline → Thematic Domain) ==========
  // Formal Sciences
  { s: "algebra", t: "abstract_algebra", w: 5 },
  { s: "ai", t: "machine_learning", w: 5 },
  { s: "symbolic_logic", t: "propositional_logic", w: 5 },
  { s: "complex_systems", t: "network_theory", w: 5 },

  // Natural Sciences
  { s: "cognitive_neuroscience", t: "brain_imaging", w: 5 },
  { s: "ecology", t: "biodiversity", w: 5 },
  { s: "genetics", t: "molecular_genetics", w: 5 },

  // Health Sciences
  { s: "clinical_medicine", t: "diagnosis", w: 5 },
  { s: "epidemiology", t: "disease_surveillance", w: 5 },
  { s: "medical_ethics", t: "clinical_ethics", w: 5 },

  // Social Sciences
  { s: "cognitive_psychology", t: "memory", w: 5 },
  { s: "international_law", t: "justice", w: 5 },
  { s: "microeconomics", t: "supply_and_demand", w: 5 },
  { s: "cybersecurity", t: "network_security", w: 5 },

  // Humanities
  { s: "ethics", t: "moral_philosophy", w: 5 },
  { s: "linguistics", t: "phonetics", w: 5 },
  { s: "knowledge_production", t: "scientific_knowledge", w: 5 },

  // Applied Sciences
  { s: "civil_engineering", t: "structural_engineering", w: 5 },
  { s: "user_experience_design", t: "usability", w: 5 },
  { s: "transportation_planning", t: "traffic_management", w: 5 },

  // ========== LAYER 4 → LAYER 5 (Thematic Domain → Main Thematic) ==========
  // Formal Sciences
  { s: "abstract_algebra", t: "groups", w: 5 },
  { s: "machine_learning", t: "supervised_learning", w: 5 },
  { s: "propositional_logic", t: "logical_connectives", w: 5 },
  { s: "network_theory", t: "graph_theory", w: 5 },

  // Natural Sciences
  { s: "brain_imaging", t: "fMRI", w: 5 },
  { s: "biodiversity", t: "species_diversity", w: 5 },
  { s: "molecular_genetics", t: "DNA_sequencing", w: 5 },

  // Health Sciences
  { s: "diagnosis", t: "symptom_analysis", w: 5 },
  { s: "disease_surveillance", t: "case_reporting", w: 5 },
  { s: "clinical_ethics", t: "informed_consent", w: 5 },

  // Social Sciences
  { s: "memory", t: "short_term_memory", w: 5 },
  { s: "justice", t: "fairness", w: 5 },
  { s: "supply_and_demand", t: "market_equilibrium", w: 5 },
  { s: "network_security", t: "firewalls", w: 5 },

  // Humanities
  { s: "moral_philosophy", t: "utilitarianism", w: 5 },
  { s: "phonetics", t: "articulation", w: 5 },
  { s: "scientific_knowledge", t: "objectivity", w: 5 },

  // Applied Sciences
  { s: "structural_engineering", t: "load_bearing", w: 5 },
  { s: "usability", t: "user_friendly", w: 5 },
  { s: "traffic_management", t: "traffic_flow", w: 5 },

  // ========== ORIGINAL INTRA-DISCIPLINE LINKS (from your file) ==========
  // Philosophy
  { s: "Epistemology", t: "Logic", w: 4 },
  { s: "Ethics", t: "Critical Theory", w: 4 },
  { s: "Phil. of Mind", t: "Phenomenology", w: 5 },
  { s: "Phil. of Science", t: "Epistemology", w: 4 },
  { s: "Critical Theory", t: "Ethics", w: 4 },
  { s: "Ontology", t: "Phil. of Science", w: 3 },
  { s: "Phil. of Mind", t: "Epistemology", w: 3 },

  // Education Science
  { s: "Constructivism", t: "Self-Reg. Learning", w: 4 },
  { s: "Pedagogy", t: "Formative Assessment", w: 4 },
  { s: "Critical Pedagogy", t: "Educational Equity", w: 5 },
  { s: "AI in Education", t: "Formative Assessment", w: 4 },
  { s: "Metacognition (Ed)", t: "Self-Reg. Learning", w: 5 },
  { s: "Metacognition (Ed)", t: "Constructivism", w: 4 },
  { s: "Pedagogy", t: "Critical Pedagogy", w: 4 },

  // Human Rights
  { s: "Human Dignity", t: "Justice", w: 5 },
  { s: "International HR Law", t: "Accountability", w: 4 },
  { s: "Environmental Rights", t: "Justice", w: 4 },
  { s: "Digital Rights", t: "Accountability", w: 3 },
  { s: "Transitional Justice", t: "Accountability", w: 4 },
  { s: "Human Dignity", t: "International HR Law", w: 4 },

  // Environmental Science
  { s: "Climate Change", t: "Biodiversity", w: 4 },
  { s: "Ecosystem Dynamics", t: "Biodiversity", w: 5 },
  { s: "Sustainability", t: "Environmental Policy", w: 5 },
  { s: "Renewable Energy", t: "Sustainability", w: 4 },
  { s: "Climate Change", t: "Carbon Cycle", w: 5 },
  { s: "Environmental Policy", t: "Climate Change", w: 4 },

  // Computer Science
  { s: "Machine Learning", t: "Data Science", w: 5 },
  { s: "NLP", t: "Machine Learning", w: 4 },
  { s: "Cybersecurity", t: "Data Science", w: 3 },
  { s: "Algorithms", t: "Formal Methods", w: 4 },
  { s: "Human-Comp. Inter.", t: "NLP", w: 3 },
  { s: "Machine Learning", t: "Algorithms", w: 3 },
  { s: "Artificial Intelligence", t: "Machine Learning", w: 5 },

  // Neuroscience
  { s: "Synaptic Plasticity", t: "Neural Coding", w: 4 },
  { s: "Predictive Processing", t: "Brain Oscillations", w: 4 },
  { s: "Neuroimaging", t: "Default Mode Network", w: 4 },
  { s: "Prefrontal Cortex", t: "Default Mode Network", w: 4 },
  { s: "Predictive Processing", t: "Neural Coding", w: 4 },
  { s: "Brain Oscillations", t: "Neural Coding", w: 3 },
  { s: "Cognitive Control", t: "Decision Neuroscience", w: 4 },

  // Cognitive Psychology
  { s: "Working Memory", t: "Executive Control", w: 5 },
  { s: "Dual-Process Theory", t: "Heuristics & Biases", w: 5 },
  { s: "Emotion Regulation", t: "Executive Control", w: 4 },
  { s: "Attribution Theory", t: "Heuristics & Biases", w: 3 },
  { s: "Theory of Mind", t: "Attribution Theory", w: 4 },
  { s: "Selective Attention", t: "Working Memory", w: 4 },
  { s: "Theory of Mind", t: "Emotion Regulation", w: 3 },

  // Language Science
  { s: "Syntax", t: "Semantics", w: 4 },
  { s: "Language Acquisition", t: "Psycholinguistics", w: 4 },
  { s: "Computational Ling.", t: "Semantics", w: 4 },
  { s: "Language & Culture", t: "Sociolinguistics", w: 4 },
  { s: "Psycholinguistics", t: "Syntax", w: 3 },
  { s: "Language Acquisition", t: "Sociolinguistics", w: 3 },

  // Anthropology
  { s: "Ethnography", t: "Social Structure", w: 4 },
  { s: "Cultural Relativism", t: "Ethnography", w: 4 },
  { s: "Political Ecology", t: "Social Structure", w: 4 },
  { s: "Medical Anthropology", t: "Ethnography", w: 3 },
  { s: "Material Culture", t: "Ethnography", w: 3 },
  { s: "Human Evolution", t: "Social Structure", w: 2 },

  // Systems Science
  { s: "Complex Systems", t: "Emergence", w: 5 },
  { s: "Systems Thinking", t: "Resilience", w: 4 },
  { s: "Network Theory", t: "Complex Systems", w: 4 },
  { s: "Information Theory", t: "Complex Systems", w: 4 },
  { s: "Self-Organization", t: "Emergence", w: 5 },
  { s: "Self-Organization", t: "Complex Systems", w: 4 },
  { s: "Systems Thinking", t: "Network Theory", w: 3 }
];

// ── Inter-discipline bridge links (Expanded) ─────────────────────────────────
var INTER = [
  // ========== ORIGINAL INTERDISCIPLINARY LINKS (from your file) ==========
  // PHIL
  { s: "Epistemology", t: "Constructivism", w: 5, pair: ["PHIL", "EDUC"] },
  { s: "Critical Theory", t: "Critical Pedagogy", w: 5, pair: ["PHIL", "EDUC"] },
  { s: "Ethics", t: "Educational Equity", w: 4, pair: ["PHIL", "EDUC"] },
  { s: "Epistemology", t: "Metacognition (Ed)", w: 4, pair: ["PHIL", "EDUC"] },
  { s: "Phenomenology", t: "Pedagogy", w: 3, pair: ["PHIL", "EDUC"] },
  { s: "Ethics", t: "Human Dignity", w: 5, pair: ["PHIL", "HR"] },
  { s: "Critical Theory", t: "Justice", w: 4, pair: ["PHIL", "HR"] },
  { s: "Logic", t: "International HR Law", w: 3, pair: ["PHIL", "HR"] },
  { s: "Ontology", t: "Human Dignity", w: 3, pair: ["PHIL", "HR"] },
  { s: "Ethics", t: "Sustainability", w: 4, pair: ["PHIL", "ENV"] },
  { s: "Phil. of Science", t: "Climate Change", w: 3, pair: ["PHIL", "ENV"] },
  { s: "Critical Theory", t: "Environmental Policy", w: 3, pair: ["PHIL", "ENV"] },
  { s: "Logic", t: "Formal Methods", w: 5, pair: ["PHIL", "CS"] },
  { s: "Phil. of Mind", t: "Machine Learning", w: 4, pair: ["PHIL", "CS"] },
  { s: "Phil. of Science", t: "Data Science", w: 3, pair: ["PHIL", "CS"] },
  { s: "Epistemology", t: "Algorithms", w: 3, pair: ["PHIL", "CS"] },
  { s: "Phil. of Mind", t: "Predictive Processing", w: 5, pair: ["PHIL", "NEURO"] },
  { s: "Phenomenology", t: "Default Mode Network", w: 4, pair: ["PHIL", "NEURO"] },
  { s: "Phil. of Mind", t: "Neural Coding", w: 3, pair: ["PHIL", "NEURO"] },
  { s: "Epistemology", t: "Dual-Process Theory", w: 4, pair: ["PHIL", "COGPSY"] },
  { s: "Phil. of Mind", t: "Theory of Mind", w: 4, pair: ["PHIL", "COGPSY"] },
  { s: "Ethics", t: "Attribution Theory", w: 3, pair: ["PHIL", "COGPSY"] },
  { s: "Phenomenology", t: "Emotion Regulation", w: 3, pair: ["PHIL", "COGPSY"] },
  { s: "Logic", t: "Syntax", w: 4, pair: ["PHIL", "LANG"] },
  { s: "Epistemology", t: "Psycholinguistics", w: 3, pair: ["PHIL", "LANG"] },
  { s: "Phil. of Mind", t: "Semantics", w: 3, pair: ["PHIL", "LANG"] },
  { s: "Critical Theory", t: "Cultural Relativism", w: 4, pair: ["PHIL", "ANTH"] },
  { s: "Ethics", t: "Social Structure", w: 3, pair: ["PHIL", "ANTH"] },
  { s: "Ontology", t: "Material Culture", w: 2, pair: ["PHIL", "ANTH"] },
  { s: "Ontology", t: "Complex Systems", w: 4, pair: ["PHIL", "SYS"] },
  { s: "Epistemology", t: "Information Theory", w: 4, pair: ["PHIL", "SYS"] },
  { s: "Phil. of Science", t: "Systems Thinking", w: 3, pair: ["PHIL", "SYS"] },

  // EDUC
  { s: "Educational Equity", t: "Justice", w: 5, pair: ["EDUC", "HR"] },
  { s: "Critical Pedagogy", t: "Human Dignity", w: 4, pair: ["EDUC", "HR"] },
  { s: "Formative Assessment", t: "Accountability", w: 3, pair: ["EDUC", "HR"] },
  { s: "Educational Equity", t: "Climate Change", w: 3, pair: ["EDUC", "ENV"] },
  { s: "Pedagogy", t: "Sustainability", w: 3, pair: ["EDUC", "ENV"] },
  { s: "Critical Pedagogy", t: "Environmental Policy", w: 3, pair: ["EDUC", "ENV"] },
  { s: "AI in Education", t: "Machine Learning", w: 5, pair: ["EDUC", "CS"] },
  { s: "Formative Assessment", t: "Data Science", w: 4, pair: ["EDUC", "CS"] },
  { s: "Self-Reg. Learning", t: "Human-Comp. Inter.", w: 4, pair: ["EDUC", "CS"] },
  { s: "AI in Education", t: "NLP", w: 3, pair: ["EDUC", "CS"] },
  { s: "Constructivism", t: "Synaptic Plasticity", w: 4, pair: ["EDUC", "NEURO"] },
  { s: "Self-Reg. Learning", t: "Prefrontal Cortex", w: 4, pair: ["EDUC", "NEURO"] },
  { s: "Formative Assessment", t: "Neuroimaging", w: 3, pair: ["EDUC", "NEURO"] },
  { s: "Metacognition (Ed)", t: "Working Memory", w: 5, pair: ["EDUC", "COGPSY"] },
  { s: "Metacognition (Ed)", t: "Executive Control", w: 4, pair: ["EDUC", "COGPSY"] },
  { s: "Self-Reg. Learning", t: "Selective Attention", w: 4, pair: ["EDUC", "COGPSY"] },
  { s: "Pedagogy", t: "Theory of Mind", w: 4, pair: ["EDUC", "COGPSY"] },
  { s: "Formative Assessment", t: "Dual-Process Theory", w: 3, pair: ["EDUC", "COGPSY"] },
  { s: "Language Acquisition", t: "Pedagogy", w: 4, pair: ["LANG", "EDUC"] },
  { s: "Psycholinguistics", t: "Formative Assessment", w: 3, pair: ["LANG", "EDUC"] },
  { s: "NLP", t: "AI in Education", w: 3, pair: ["CS", "EDUC"] },
  { s: "Critical Pedagogy", t: "Cultural Relativism", w: 4, pair: ["EDUC", "ANTH"] },
  { s: "Educational Equity", t: "Social Structure", w: 4, pair: ["EDUC", "ANTH"] },
  { s: "Self-Reg. Learning", t: "Systems Thinking", w: 4, pair: ["EDUC", "SYS"] },
  { s: "Formative Assessment", t: "Network Theory", w: 3, pair: ["EDUC", "SYS"] },

  // HR
  { s: "Environmental Rights", t: "Sustainability", w: 5, pair: ["HR", "ENV"] },
  { s: "Justice", t: "Climate Change", w: 4, pair: ["HR", "ENV"] },
  { s: "International HR Law", t: "Environmental Policy", w: 4, pair: ["HR", "ENV"] },
  { s: "Digital Rights", t: "Cybersecurity", w: 5, pair: ["HR", "CS"] },
  { s: "Accountability", t: "Data Science", w: 4, pair: ["HR", "CS"] },
  { s: "Human Dignity", t: "Human-Comp. Inter.", w: 3, pair: ["HR", "CS"] },
  { s: "Human Dignity", t: "Default Mode Network", w: 3, pair: ["HR", "NEURO"] },
  { s: "Justice", t: "Prefrontal Cortex", w: 3, pair: ["HR", "NEURO"] },
  { s: "Justice", t: "Dual-Process Theory", w: 4, pair: ["HR", "COGPSY"] },
  { s: "Human Dignity", t: "Theory of Mind", w: 4, pair: ["HR", "COGPSY"] },
  { s: "Accountability", t: "Attribution Theory", w: 3, pair: ["HR", "COGPSY"] },
  { s: "International HR Law", t: "Sociolinguistics", w: 3, pair: ["HR", "LANG"] },
  { s: "Justice", t: "Language & Culture", w: 3, pair: ["HR", "LANG"] },
  { s: "Human Dignity", t: "Cultural Relativism", w: 4, pair: ["HR", "ANTH"] },
  { s: "Justice", t: "Social Structure", w: 4, pair: ["HR", "ANTH"] },
  { s: "Environmental Rights", t: "Political Ecology", w: 4, pair: ["HR", "ANTH"] },
  { s: "Transitional Justice", t: "Ethnography", w: 3, pair: ["HR", "ANTH"] },
  { s: "Accountability", t: "Systems Thinking", w: 3, pair: ["HR", "SYS"] },
  { s: "International HR Law", t: "Network Theory", w: 2, pair: ["HR", "SYS"] },

  // ENV
  { s: "Climate Change", t: "Machine Learning", w: 5, pair: ["ENV", "CS"] },
  { s: "Biodiversity", t: "Data Science", w: 4, pair: ["ENV", "CS"] },
  { s: "Renewable Energy", t: "Machine Learning", w: 4, pair: ["ENV", "CS"] },
  { s: "Environmental Policy", t: "Algorithms", w: 3, pair: ["ENV", "CS"] },
  { s: "Ecosystem Dynamics", t: "Neural Coding", w: 3, pair: ["ENV", "NEURO"] },
  { s: "Climate Change", t: "Predictive Processing", w: 3, pair: ["ENV", "NEURO"] },
  { s: "Climate Change", t: "Heuristics & Biases", w: 4, pair: ["ENV", "COGPSY"] },
  { s: "Sustainability", t: "Dual-Process Theory", w: 3, pair: ["ENV", "COGPSY"] },
  { s: "Environmental Policy", t: "Attribution Theory", w: 3, pair: ["ENV", "COGPSY"] },
  { s: "Environmental Policy", t: "Sociolinguistics", w: 3, pair: ["ENV", "LANG"] },
  { s: "Climate Change", t: "Language & Culture", w: 3, pair: ["ENV", "LANG"] },
  { s: "Political Ecology", t: "Ecosystem Dynamics", w: 5, pair: ["ANTH", "ENV"] },
  { s: "Ethnography", t: "Biodiversity", w: 4, pair: ["ANTH", "ENV"] },
  { s: "Cultural Relativism", t: "Sustainability", w: 3, pair: ["ANTH", "ENV"] },
  { s: "Ecosystem Dynamics", t: "Complex Systems", w: 5, pair: ["ENV", "SYS"] },
  { s: "Resilience", t: "Environmental Policy", w: 4, pair: ["SYS", "ENV"] },
  { s: "Emergence", t: "Biodiversity", w: 4, pair: ["SYS", "ENV"] },
  { s: "Self-Organization", t: "Ecosystem Dynamics", w: 4, pair: ["SYS", "ENV"] },
  { s: "Network Theory", t: "Biodiversity", w: 3, pair: ["SYS", "ENV"] },

  // CS
  { s: "Machine Learning", t: "Neural Coding", w: 5, pair: ["CS", "NEURO"] },
  { s: "NLP", t: "Predictive Processing", w: 4, pair: ["CS", "NEURO"] },
  { s: "Data Science", t: "Neuroimaging", w: 4, pair: ["CS", "NEURO"] },
  { s: "Algorithms", t: "Brain Oscillations", w: 3, pair: ["CS", "NEURO"] },
  { s: "Machine Learning", t: "Dual-Process Theory", w: 4, pair: ["CS", "COGPSY"] },
  { s: "Human-Comp. Inter.", t: "Selective Attention", w: 4, pair: ["CS", "COGPSY"] },
  { s: "NLP", t: "Working Memory", w: 4, pair: ["CS", "COGPSY"] },
  { s: "Data Science", t: "Heuristics & Biases", w: 3, pair: ["CS", "COGPSY"] },
  { s: "NLP", t: "Computational Ling.", w: 5, pair: ["CS", "LANG"] },
  { s: "Machine Learning", t: "Semantics", w: 4, pair: ["CS", "LANG"] },
  { s: "NLP", t: "Language Acquisition", w: 4, pair: ["CS", "LANG"] },
  { s: "Data Science", t: "Psycholinguistics", w: 3, pair: ["CS", "LANG"] },
  { s: "Data Science", t: "Ethnography", w: 3, pair: ["CS", "ANTH"] },
  { s: "Human-Comp. Inter.", t: "Material Culture", w: 3, pair: ["CS", "ANTH"] },
  { s: "Algorithms", t: "Network Theory", w: 4, pair: ["CS", "SYS"] },
  { s: "Data Science", t: "Information Theory", w: 5, pair: ["CS", "SYS"] },
  { s: "Machine Learning", t: "Complex Systems", w: 4, pair: ["CS", "SYS"] },
  { s: "Formal Methods", t: "Systems Thinking", w: 3, pair: ["CS", "SYS"] },

  // NEURO
  { s: "Synaptic Plasticity", t: "Working Memory", w: 5, pair: ["NEURO", "COGPSY"] },
  { s: "Prefrontal Cortex", t: "Executive Control", w: 5, pair: ["NEURO", "COGPSY"] },
  { s: "Brain Oscillations", t: "Selective Attention", w: 4, pair: ["NEURO", "COGPSY"] },
  { s: "Predictive Processing", t: "Dual-Process Theory", w: 4, pair: ["NEURO", "COGPSY"] },
  { s: "Default Mode Network", t: "Theory of Mind", w: 4, pair: ["NEURO", "COGPSY"] },
  { s: "Neural Coding", t: "Heuristics & Biases", w: 3, pair: ["NEURO", "COGPSY"] },
  { s: "Neural Coding", t: "Psycholinguistics", w: 4, pair: ["NEURO", "LANG"] },
  { s: "Predictive Processing", t: "Syntax", w: 4, pair: ["NEURO", "LANG"] },
  { s: "Neuroimaging", t: "Language Acquisition", w: 3, pair: ["NEURO", "LANG"] },
  { s: "Brain Oscillations", t: "Computational Ling.", w: 3, pair: ["NEURO", "LANG"] },
  { s: "Human Evolution", t: "Neural Coding", w: 4, pair: ["ANTH", "NEURO"] },
  { s: "Neuroimaging", t: "Medical Anthropology", w: 3, pair: ["NEURO", "ANTH"] },
  { s: "Neural Coding", t: "Network Theory", w: 4, pair: ["NEURO", "SYS"] },
  { s: "Brain Oscillations", t: "Information Theory", w: 4, pair: ["NEURO", "SYS"] },
  { s: "Predictive Processing", t: "Self-Organization", w: 4, pair: ["NEURO", "SYS"] },
  { s: "Synaptic Plasticity", t: "Emergence", w: 3, pair: ["NEURO", "SYS"] },

  // COGPSY
  { s: "Working Memory", t: "Psycholinguistics", w: 5, pair: ["COGPSY", "LANG"] },
  { s: "Executive Control", t: "Language Acquisition", w: 4, pair: ["COGPSY", "LANG"] },
  { s: "Selective Attention", t: "Syntax", w: 3, pair: ["COGPSY", "LANG"] },
  { s: "Dual-Process Theory", t: "Semantics", w: 3, pair: ["COGPSY", "LANG"] },
  { s: "Attribution Theory", t: "Cultural Relativism", w: 4, pair: ["COGPSY", "ANTH"] },
  { s: "Theory of Mind", t: "Social Structure", w: 4, pair: ["COGPSY", "ANTH"] },
  { s: "Heuristics & Biases", t: "Material Culture", w: 3, pair: ["COGPSY", "ANTH"] },
  { s: "Dual-Process Theory", t: "Complex Systems", w: 4, pair: ["COGPSY", "SYS"] },
  { s: "Working Memory", t: "Information Theory", w: 3, pair: ["COGPSY", "SYS"] },
  { s: "Selective Attention", t: "Self-Organization", w: 3, pair: ["COGPSY", "SYS"] },

  // LANG
  { s: "Language & Culture", t: "Social Structure", w: 5, pair: ["LANG", "ANTH"] },
  { s: "Sociolinguistics", t: "Ethnography", w: 4, pair: ["LANG", "ANTH"] },
  { s: "Language & Culture", t: "Cultural Relativism", w: 4, pair: ["LANG", "ANTH"] },
  { s: "Language Acquisition", t: "Medical Anthropology", w: 3, pair: ["LANG", "ANTH"] },
  { s: "Computational Ling.", t: "Network Theory", w: 4, pair: ["LANG", "SYS"] },
  { s: "Semantics", t: "Information Theory", w: 4, pair: ["LANG", "SYS"] },
  { s: "Language Acquisition", t: "Self-Organization", w: 3, pair: ["LANG", "SYS"] },
  { s: "Syntax", t: "Complex Systems", w: 3, pair: ["LANG", "SYS"] },

  // ANTH
  { s: "Social Structure", t: "Complex Systems", w: 4, pair: ["ANTH", "SYS"] },
  { s: "Political Ecology", t: "Systems Thinking", w: 4, pair: ["ANTH", "SYS"] },
  { s: "Ethnography", t: "Network Theory", w: 3, pair: ["ANTH", "SYS"] },
  { s: "Material Culture", t: "Self-Organization", w: 2, pair: ["ANTH", "SYS"] },

  // ========== NEW INTERDISCIPLINARY LINKS (for new disciplines) ==========
  // Formal Sciences
  { s: "mathematical_science", t: "computer_science", w: 5, pair: ["FORMAL", "FORMAL"] },
  { s: "mathematical_science", t: "logic", w: 4, pair: ["FORMAL", "FORMAL"] },
  { s: "computer_science", t: "systems_science", w: 4, pair: ["FORMAL", "FORMAL"] },
  { s: "logic", t: "symbolic_logic", w: 4, pair: ["FORMAL", "FORMAL"] },
  { s: "systems_science", t: "complex_systems", w: 4, pair: ["FORMAL", "FORMAL"] },
  { s: "ai", t: "machine_learning", w: 5, pair: ["FORMAL", "FORMAL"] },
  { s: "ai", t: "neuroscience", w: 4, pair: ["FORMAL", "NATURAL"] }, // AI ↔ Neuroscience
  { s: "machine_learning", t: "neural_coding", w: 4, pair: ["FORMAL", "NATURAL"] }, // ML ↔ Neural Coding

  // Natural Sciences
  { s: "neuroscience", t: "cognitive_neuroscience", w: 5, pair: ["NATURAL", "NATURAL"] },
  { s: "environmental_science", t: "ecology", w: 5, pair: ["NATURAL", "NATURAL"] },
  { s: "environmental_science", t: "climate_science", w: 4, pair: ["NATURAL", "NATURAL"] },
  { s: "biology", t: "genetics", w: 5, pair: ["NATURAL", "NATURAL"] },
  { s: "cognitive_neuroscience", t: "brain_imaging", w: 4, pair: ["NATURAL", "NATURAL"] },
  { s: "ecology", t: "biodiversity", w: 4, pair: ["NATURAL", "NATURAL"] },
  { s: "genetics", t: "molecular_genetics", w: 4, pair: ["NATURAL", "NATURAL"] },

  // Health Sciences
  { s: "medicine", t: "clinical_medicine", w: 5, pair: ["HEALTH", "HEALTH"] },
  { s: "public_health", t: "epidemiology", w: 5, pair: ["HEALTH", "HEALTH"] },
  { s: "bioethics", t: "medical_ethics", w: 5, pair: ["HEALTH", "HEALTH"] },
  { s: "clinical_medicine", t: "diagnosis", w: 4, pair: ["HEALTH", "HEALTH"] },
  { s: "epidemiology", t: "disease_surveillance", w: 4, pair: ["HEALTH", "HEALTH"] },
  { s: "medical_ethics", t: "clinical_ethics", w: 4, pair: ["HEALTH", "HEALTH"] },
  { s: "clinical_medicine", t: "public_health", w: 3, pair: ["HEALTH", "HEALTH"] }, // Medicine ↔ Public Health
  { s: "diagnosis", t: "disease_surveillance", w: 3, pair: ["HEALTH", "HEALTH"] }, // Diagnosis ↔ Disease Surveillance

  // Social Sciences
  { s: "psychology", t: "cognitive_psychology", w: 5, pair: ["SOCIAL", "SOCIAL"] },
  { s: "psychology", t: "social_psychology", w: 4, pair: ["SOCIAL", "SOCIAL"] },
  { s: "economics", t: "microeconomics", w: 5, pair: ["SOCIAL", "SOCIAL"] },
  { s: "law", t: "international_law", w: 5, pair: ["SOCIAL", "SOCIAL"] },
  { s: "digital_geopolitics", t: "cybersecurity", w: 5, pair: ["SOCIAL", "SOCIAL"] },
  { s: "cognitive_psychology", t: "memory", w: 4, pair: ["SOCIAL", "SOCIAL"] },
  { s: "international_law", t: "justice", w: 4, pair: ["SOCIAL", "SOCIAL"] },
  { s: "microeconomics", t: "supply_and_demand", w: 4, pair: ["SOCIAL", "SOCIAL"] },
  { s: "cybersecurity", t: "network_security", w: 4, pair: ["SOCIAL", "SOCIAL"] },
  { s: "psychology", t: "neuroscience", w: 4, pair: ["SOCIAL", "NATURAL"] }, // Psychology ↔ Neuroscience
  { s: "cognitive_psychology", t: "neuroscience", w: 4, pair: ["SOCIAL", "NATURAL"] }, // Cognitive Psychology ↔ Neuroscience
  { s: "memory", t: "brain_imaging", w: 4, pair: ["SOCIAL", "NATURAL"] }, // Memory ↔ Brain Imaging

  // Humanities
  { s: "philosophy", t: "ethics", w: 5, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "language_science", t: "linguistics", w: 5, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "social_epistemology", t: "knowledge_production", w: 5, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "ethics", t: "moral_philosophy", w: 4, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "linguistics", t: "phonetics", w: 4, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "knowledge_production", t: "scientific_knowledge", w: 4, pair: ["HUMANITIES", "HUMANITIES"] },
  { s: "philosophy", t: "social_epistemology", w: 3, pair: ["HUMANITIES", "HUMANITIES"] }, // Philosophy ↔ Social Epistemology

  // Applied Sciences
  { s: "engineering", t: "civil_engineering", w: 5, pair: ["APPLIED", "APPLIED"] },
  { s: "design", t: "user_experience_design", w: 5, pair: ["APPLIED", "APPLIED"] },
  { s: "urban_planning", t: "transportation_planning", w: 5, pair: ["APPLIED", "APPLIED"] },
  { s: "civil_engineering", t: "structural_engineering", w: 4, pair: ["APPLIED", "APPLIED"] },
  { s: "user_experience_design", t: "usability", w: 4, pair: ["APPLIED", "APPLIED"] },
  { s: "transportation_planning", t: "traffic_management", w: 4, pair: ["APPLIED", "APPLIED"] },
  { s: "engineering", t: "computer_science", w: 4, pair: ["APPLIED", "FORMAL"] }, // Engineering ↔ Computer Science
  { s: "design", t: "computer_science", w: 3, pair: ["APPLIED", "FORMAL"] }, // Design ↔ Computer Science
  { s: "urban_planning", t: "environmental_science", w: 4, pair: ["APPLIED", "NATURAL"] }, // Urban Planning ↔ Environmental Science

  // ========== INTERDISCIPLINARY NODES LINKS ==========
  { s: "Interdisciplinarity", t: "Phil. of Science", w: 5, pair: ["INTERDISC", "PHIL"] },
  { s: "Interdisciplinarity", t: "Machine Learning", w: 5, pair: ["INTERDISC", "CS"] },
  { s: "Interdisciplinarity", t: "Cognitive Control", w: 5, pair: ["INTERDISC", "NEURO"] },
  { s: "Interdisciplinarity", t: "Complex Systems", w: 5, pair: ["INTERDISC", "SYS"] },
  { s: "Interdisciplinarity", t: "Epistemology", w: 5, pair: ["INTERDISC", "PHIL"] },
  { s: "Transdisciplinarity", t: "Critical Theory", w: 4, pair: ["INTERDISC", "PHIL"] },
  { s: "Transdisciplinarity", t: "Complex Systems", w: 4, pair: ["INTERDISC", "SYS"] },
  { s: "Transdisciplinarity", t: "Sustainability", w: 4, pair: ["INTERDISC", "ENV"] },
  { s: "Transdisciplinarity", t: "Human Dignity", w: 4, pair: ["INTERDISC", "HR"] },
  { s: "Transdisciplinarity", t: "Ethics", w: 4, pair: ["INTERDISC", "PHIL"] },
  { s: "Knowledge Integration", t: "Cognitive Control", w: 5, pair: ["INTERDISC", "NEURO"] },
  { s: "Knowledge Integration", t: "Decision Neuroscience", w: 5, pair: ["INTERDISC", "NEURO"] },
  { s: "Knowledge Integration", t: "Artificial Intelligence", w: 5, pair: ["INTERDISC", "CS"] },
  { s: "Knowledge Integration", t: "Ethics", w: 5, pair: ["INTERDISC", "PHIL"] },
  { s: "Knowledge Integration", t: "Executive Control", w: 5, pair: ["INTERDISC", "COGPSY"] },
  { s: "Cross-Disciplinary", t: "Artificial Intelligence", w: 4, pair: ["INTERDISC", "CS"] },
  { s: "Cross-Disciplinary", t: "Phil. of Science", w: 4, pair: ["INTERDISC", "PHIL"] },
  { s: "Cross-Disciplinary", t: "Predictive Processing", w: 4, pair: ["INTERDISC", "NEURO"] },
  { s: "Cross-Disciplinary", t: "Algorithms", w: 4, pair: ["INTERDISC", "CS"] },
  { s: "Cross-Disciplinary", t: "Phil. of Mind", w: 4, pair: ["INTERDISC", "PHIL"] },
  { s: "Interdisciplinarity", t: "Transdisciplinarity", w: 5, pair: ["INTERDISC", "INTERDISC"] },
  { s: "Interdisciplinarity", t: "Knowledge Integration", w: 5, pair: ["INTERDISC", "INTERDISC"] },
  { s: "Knowledge Integration", t: "Transdisciplinarity", w: 5, pair: ["INTERDISC", "INTERDISC"] },
  { s: "Knowledge Integration", t: "Cross-Disciplinary", w: 5, pair: ["INTERDISC", "INTERDISC"] },
  { s: "Transdisciplinarity", t: "Cross-Disciplinary", w: 5, pair: ["INTERDISC", "INTERDISC"] }
];

// ── Build flat nodes/links arrays ─────────────────────────────────
var allNodes = NODES.map(function(n) {
  return {
    id: n.id,
    cluster: n.disc,
    size: n.size,
    label: n.label || n.id.replace(/_/g, ' '), // Use label if provided, else format id
    epistemicRole: n.er,
    analysisLevel: n.al,
    disc: n.disc,
    domain: n.domain,
    layer: n.layer || 2, // Default to Layer 2 (Discipline)
    visible: n.visible !== undefined ? n.visible : (n.layer <= 2), // Show Layers 1–2 by default
    parent_field: n.parent_field,
    subdiscipline: n.subdiscipline,
    thematic_domain: n.thematic_domain
  };
});

var allLinks = INTRA.map(function(l) {
  return {
    source: l.s,
    target: l.t,
    weight: l.w,
    inter: false,
    layer: 2 // Default to Layer 2 (Discipline)
  };
}).concat(INTER.map(function(l) {
  return {
    source: l.s,
    target: l.t,
    weight: l.w,
    inter: true,
    pair: l.pair,
    layer: 2 // Default to Layer 2 (Discipline)
  };
}));

// ── Return the full data structure ─────────────────────────────────
return {
  title: "Interdisciplinary Knowledge Network",
  coreDomains: CORE_DOMAINS,
  clusters: DISCIPLINES,
  nodes: allNodes,
  links: allLinks,
  disciplines: DISCIPLINES,
  epistemic: EPISTEMIC,
  analysisLevels: ANALYSIS_LEVELS,
  intraLinks: INTRA,
  interLinks: INTER,
  metadata: {
    totalCoreDomains: 6,
    totalDisciplines: 26,
    totalNodes: allNodes.length,
    totalLinks: allLinks.length,
    layers: {
      1: "Core Domains (Hidden)",
      2: "Disciplines (Visible by Default)",
      3: "Subdisciplines (Hidden by Default)",
      4: "Thematic Domains (Hidden by Default)",
      5: "Main Thematics (Hidden by Default)"
    },
    progressiveDisclosure: {
      enabled: true,
      defaultVisibleLayers: [1, 2], // Show Layers 1–2 by default
      clickToExpand: true // Click on a node to show its children (next layer)
    },
    standardsAlignment: {
      oecdFrascati: "All nodes aligned with OECD Frascati Manual (2015).",
      unescoFields: "All nodes aligned with UNESCO Fields of Science (2021).",
      scopus: "All nodes aligned with Scopus Subject Areas (2024).",
      mesh: "Health-related nodes aligned with MeSH Terms (2024).",
      ieee: "Engineering/CS nodes aligned with IEEE Thesaurus (2024)."
    }
  }
};

// Intégration avec DISCIPLINE_CONFIG (votre code existant)
if (typeof DISCIPLINE_CONFIG !== 'undefined') {
  const interdisciplinaryConfig = DISCIPLINE_CONFIG["Interdisciplinary Knowledge Network"] ||
                                 DISCIPLINE_CONFIG["Interdisciplinary"];

  if (interdisciplinaryConfig) {
    // Fusionner les liens générés avec les données existantes
    const generatedLinks = [];
    const config = interdisciplinaryConfig;

    // Générer les liens intra-disciplines (basé sur clusterConnections)
    for (const [cluster, connections] of Object.entries(config.clusterConnections || {})) {
      for (const connectedCluster of connections) {
        generatedLinks.push({
          source: cluster,
          target: connectedCluster,
          weight: 3,
          inter: false,
          layer: 2
        });
      }
    }

    // Ajouter les expertLinks
    if (config.expertLinks) {
      config.expertLinks.forEach(link => {
        generatedLinks.push({
          source: link[0],
          target: link[1],
          weight: link[2] || 3,
          inter: true,
          pair: ["INTERDISCIPLINARY", "INTERDISCIPLINARY"],
          layer: 2
        });
      });
    }

    // Fusionner avec les données existantes
    return {
      title: "Interdisciplinary Knowledge Network",
      coreDomains: CORE_DOMAINS,
      clusters: DISCIPLINES,
      nodes: allNodes,
      links: allLinks.concat(generatedLinks),
      disciplines: DISCIPLINES,
      epistemic: EPISTEMIC,
      analysisLevels: ANALYSIS_LEVELS,
      intraLinks: INTRA,
      interLinks: INTER,
      metadata: {
        ...this.metadata,
        configIntegrated: true
      }
    };
  }
}

})();
