// MLKN.lab — Interdisciplinary Knowledge Network Data
// 10 Disciplines (Cognitive Science removed)
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/ | https://github.com/FrancoisPapin
'use strict';

window.MAP_DATA = (function(){

// ── 10 Disciplines ────────────────────────────────────────────────
var DISCIPLINES = {
  PHIL:   {label:"Philosophy",            color:"#B7770D", light:"#FEF9EE"},
  EDUC:   {label:"Education Science",     color:"#1A6BAA", light:"#EBF4FB"},
  HR:     {label:"Human Rights",          color:"#C0392B", light:"#FDF0EF"},
  ENV:    {label:"Environmental Science", color:"#1A8A4A", light:"#EAFAF1"},
  CS:     {label:"Computer Science",      color:"#0A7E8C", light:"#E8F8FA"},
  NEURO:  {label:"Neuroscience",          color:"#C05718", light:"#FDF3EE"},
  COGPSY: {label:"Cognitive Psychology",  color:"#1A4A7A", light:"#EBF2FA"},
  LANG:   {label:"Language Science",      color:"#2E7D52", light:"#EAFAF1"},
  ANTH:   {label:"Anthropology",          color:"#8E44AD", light:"#F5EEF8"},
  SYS:    {label:"Systems Science",       color:"#D97706", light:"#FEF9EE"}
};

// ── Epistemic Role taxonomy (academic standard) ───────────────────
var EPISTEMIC = {
  FOUNDATIONAL:   {label:"Foundational",    color:"#8B5CF6", icon:"◈"},
  THEORETICAL:    {label:"Theoretical",     color:"#2563EB", icon:"◉"},
  METHODOLOGICAL: {label:"Methodological",  color:"#059669", icon:"◎"},
  EMPIRICAL:      {label:"Empirical",       color:"#D97706", icon:"◌"},
  APPLIED:        {label:"Applied",         color:"#DC2626", icon:"◍"},
  NORMATIVE:      {label:"Normative",       color:"#7C3AED", icon:"◐"}
};

// ── Levels of Analysis (scientific standard) ──────────────────────
var ANALYSIS_LEVELS = {
  MOLECULAR:  {label:"Molecular / Neural",  color:"#EF4444", tier:1},
  INDIVIDUAL: {label:"Individual",          color:"#F59E0B", tier:2},
  SOCIAL:     {label:"Social / Cultural",   color:"#10B981", tier:3},
  SYSTEM:     {label:"System / Global",     color:"#3B82F6", tier:4}
};

// ── Nodes (7–9 per discipline, no COGSCI) ────────────────────────
var NODES = [

  // PHILOSOPHY
  {id:"Epistemology",          disc:"PHIL",   size:26, er:"FOUNDATIONAL",   al:"INDIVIDUAL"},
  {id:"Ethics",                disc:"PHIL",   size:28, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"Logic",                 disc:"PHIL",   size:22, er:"METHODOLOGICAL",  al:"INDIVIDUAL"},
  {id:"Phil. of Mind",         disc:"PHIL",   size:26, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Phil. of Science",      disc:"PHIL",   size:22, er:"FOUNDATIONAL",    al:"SYSTEM"},
  {id:"Critical Theory",       disc:"PHIL",   size:22, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"Ontology",              disc:"PHIL",   size:20, er:"FOUNDATIONAL",    al:"SYSTEM"},
  {id:"Phenomenology",         disc:"PHIL",   size:22, er:"THEORETICAL",     al:"INDIVIDUAL"},

  // EDUCATION SCIENCE
  {id:"Constructivism",        disc:"EDUC",   size:28, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Pedagogy",              disc:"EDUC",   size:24, er:"APPLIED",         al:"SOCIAL"},
  {id:"Self-Reg. Learning",    disc:"EDUC",   size:24, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Formative Assessment",  disc:"EDUC",   size:24, er:"METHODOLOGICAL",  al:"INDIVIDUAL"},
  {id:"Educational Equity",    disc:"EDUC",   size:24, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"AI in Education",       disc:"EDUC",   size:22, er:"APPLIED",         al:"SYSTEM"},
  {id:"Critical Pedagogy",     disc:"EDUC",   size:20, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"Metacognition (Ed)",    disc:"EDUC",   size:22, er:"THEORETICAL",     al:"INDIVIDUAL",
   label:"Metacognition"},

  // HUMAN RIGHTS
  {id:"Human Dignity",         disc:"HR",     size:30, er:"FOUNDATIONAL",    al:"INDIVIDUAL"},
  {id:"Justice",               disc:"HR",     size:26, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"International HR Law",  disc:"HR",     size:22, er:"APPLIED",         al:"SYSTEM"},
  {id:"Environmental Rights",  disc:"HR",     size:20, er:"NORMATIVE",       al:"SYSTEM"},
  {id:"Digital Rights",        disc:"HR",     size:20, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"Transitional Justice",  disc:"HR",     size:22, er:"APPLIED",         al:"SYSTEM"},
  {id:"Accountability",        disc:"HR",     size:20, er:"APPLIED",         al:"SOCIAL"},

  // ENVIRONMENTAL SCIENCE
  {id:"Climate Change",        disc:"ENV",    size:28, er:"EMPIRICAL",       al:"SYSTEM"},
  {id:"Biodiversity",          disc:"ENV",    size:26, er:"EMPIRICAL",       al:"SYSTEM"},
  {id:"Ecosystem Dynamics",    disc:"ENV",    size:22, er:"THEORETICAL",     al:"SYSTEM"},
  {id:"Sustainability",        disc:"ENV",    size:26, er:"NORMATIVE",       al:"SYSTEM"},
  {id:"Environmental Policy",  disc:"ENV",    size:20, er:"APPLIED",         al:"SYSTEM"},
  {id:"Renewable Energy",      disc:"ENV",    size:20, er:"APPLIED",         al:"SYSTEM"},
  {id:"Carbon Cycle",          disc:"ENV",    size:18, er:"EMPIRICAL",       al:"SYSTEM"},

  // COMPUTER SCIENCE
  {id:"Machine Learning",      disc:"CS",     size:28, er:"METHODOLOGICAL",  al:"SYSTEM"},
  {id:"NLP",                   disc:"CS",     size:24, er:"APPLIED",         al:"INDIVIDUAL"},
  {id:"Cybersecurity",         disc:"CS",     size:22, er:"APPLIED",         al:"SOCIAL"},
  {id:"Data Science",          disc:"CS",     size:24, er:"METHODOLOGICAL",  al:"SYSTEM"},
  {id:"Human-Comp. Inter.",    disc:"CS",     size:20, er:"APPLIED",         al:"INDIVIDUAL"},
  {id:"Algorithms",            disc:"CS",     size:22, er:"THEORETICAL",     al:"SYSTEM"},
  {id:"Formal Methods",        disc:"CS",     size:16, er:"THEORETICAL",     al:"SYSTEM"},

  // NEUROSCIENCE
  {id:"Synaptic Plasticity",   disc:"NEURO",  size:24, er:"EMPIRICAL",       al:"MOLECULAR"},
  {id:"Prefrontal Cortex",     disc:"NEURO",  size:24, er:"EMPIRICAL",       al:"MOLECULAR"},
  {id:"Neural Coding",         disc:"NEURO",  size:22, er:"THEORETICAL",     al:"MOLECULAR"},
  {id:"Brain Oscillations",    disc:"NEURO",  size:20, er:"EMPIRICAL",       al:"MOLECULAR"},
  {id:"Neuroimaging",          disc:"NEURO",  size:24, er:"METHODOLOGICAL",  al:"INDIVIDUAL"},
  {id:"Predictive Processing", disc:"NEURO",  size:24, er:"THEORETICAL",     al:"MOLECULAR"},
  {id:"Default Mode Network",  disc:"NEURO",  size:20, er:"EMPIRICAL",       al:"INDIVIDUAL"},

  // COGNITIVE PSYCHOLOGY
  {id:"Working Memory",        disc:"COGPSY", size:26, er:"EMPIRICAL",       al:"INDIVIDUAL"},
  {id:"Dual-Process Theory",   disc:"COGPSY", size:26, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Executive Control",     disc:"COGPSY", size:24, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Heuristics & Biases",   disc:"COGPSY", size:22, er:"EMPIRICAL",       al:"INDIVIDUAL"},
  {id:"Theory of Mind",        disc:"COGPSY", size:26, er:"EMPIRICAL",       al:"SOCIAL"},
  {id:"Emotion Regulation",    disc:"COGPSY", size:20, er:"EMPIRICAL",       al:"INDIVIDUAL"},
  {id:"Attribution Theory",    disc:"COGPSY", size:20, er:"THEORETICAL",     al:"SOCIAL"},
  {id:"Selective Attention",   disc:"COGPSY", size:22, er:"EMPIRICAL",       al:"INDIVIDUAL"},

  // LANGUAGE SCIENCE
  {id:"Syntax",                disc:"LANG",   size:22, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Semantics",             disc:"LANG",   size:22, er:"THEORETICAL",     al:"INDIVIDUAL"},
  {id:"Language Acquisition",  disc:"LANG",   size:24, er:"EMPIRICAL",       al:"INDIVIDUAL"},
  {id:"Sociolinguistics",      disc:"LANG",   size:22, er:"EMPIRICAL",       al:"SOCIAL"},
  {id:"Computational Ling.",   disc:"LANG",   size:22, er:"METHODOLOGICAL",  al:"SYSTEM"},
  {id:"Language & Culture",    disc:"LANG",   size:20, er:"THEORETICAL",     al:"SOCIAL"},
  {id:"Psycholinguistics",     disc:"LANG",   size:20, er:"EMPIRICAL",       al:"INDIVIDUAL"},

  // ANTHROPOLOGY
  {id:"Ethnography",           disc:"ANTH",   size:26, er:"METHODOLOGICAL",  al:"SOCIAL"},
  {id:"Cultural Relativism",   disc:"ANTH",   size:22, er:"NORMATIVE",       al:"SOCIAL"},
  {id:"Political Ecology",     disc:"ANTH",   size:22, er:"THEORETICAL",     al:"SOCIAL"},
  {id:"Human Evolution",       disc:"ANTH",   size:22, er:"EMPIRICAL",       al:"MOLECULAR"},
  {id:"Social Structure",      disc:"ANTH",   size:22, er:"THEORETICAL",     al:"SOCIAL"},
  {id:"Medical Anthropology",  disc:"ANTH",   size:20, er:"APPLIED",         al:"INDIVIDUAL"},
  {id:"Material Culture",      disc:"ANTH",   size:18, er:"EMPIRICAL",       al:"SOCIAL"},

  // SYSTEMS SCIENCE
  {id:"Complex Systems",       disc:"SYS",    size:26, er:"THEORETICAL",     al:"SYSTEM"},
  {id:"Emergence",             disc:"SYS",    size:24, er:"THEORETICAL",     al:"SYSTEM"},
  {id:"Systems Thinking",      disc:"SYS",    size:24, er:"APPLIED",         al:"SYSTEM"},
  {id:"Network Theory",        disc:"SYS",    size:22, er:"METHODOLOGICAL",  al:"SYSTEM"},
  {id:"Information Theory",    disc:"SYS",    size:24, er:"FOUNDATIONAL",    al:"SYSTEM"},
  {id:"Resilience",            disc:"SYS",    size:20, er:"APPLIED",         al:"SYSTEM"},
  {id:"Self-Organization",     disc:"SYS",    size:22, er:"THEORETICAL",     al:"SYSTEM"}
];

// ── Intra-discipline links ────────────────────────────────────────
var INTRA = [
  // PHIL
  {s:"Epistemology",t:"Logic",w:4},{s:"Ethics",t:"Critical Theory",w:4},
  {s:"Phil. of Mind",t:"Phenomenology",w:5},{s:"Phil. of Science",t:"Epistemology",w:4},
  {s:"Critical Theory",t:"Ethics",w:4},{s:"Ontology",t:"Phil. of Science",w:3},
  {s:"Phil. of Mind",t:"Epistemology",w:3},
  // EDUC
  {s:"Constructivism",t:"Self-Reg. Learning",w:4},{s:"Pedagogy",t:"Formative Assessment",w:4},
  {s:"Critical Pedagogy",t:"Educational Equity",w:5},{s:"AI in Education",t:"Formative Assessment",w:4},
  {s:"Metacognition (Ed)",t:"Self-Reg. Learning",w:5},{s:"Metacognition (Ed)",t:"Constructivism",w:4},
  {s:"Pedagogy",t:"Critical Pedagogy",w:4},
  // HR
  {s:"Human Dignity",t:"Justice",w:5},{s:"International HR Law",t:"Accountability",w:4},
  {s:"Environmental Rights",t:"Justice",w:4},{s:"Digital Rights",t:"Accountability",w:3},
  {s:"Transitional Justice",t:"Accountability",w:4},{s:"Human Dignity",t:"International HR Law",w:4},
  // ENV
  {s:"Climate Change",t:"Biodiversity",w:4},{s:"Ecosystem Dynamics",t:"Biodiversity",w:5},
  {s:"Sustainability",t:"Environmental Policy",w:5},{s:"Renewable Energy",t:"Sustainability",w:4},
  {s:"Climate Change",t:"Carbon Cycle",w:5},{s:"Environmental Policy",t:"Climate Change",w:4},
  // CS
  {s:"Machine Learning",t:"Data Science",w:5},{s:"NLP",t:"Machine Learning",w:4},
  {s:"Cybersecurity",t:"Data Science",w:3},{s:"Algorithms",t:"Formal Methods",w:4},
  {s:"Human-Comp. Inter.",t:"NLP",w:3},{s:"Machine Learning",t:"Algorithms",w:3},
  // NEURO
  {s:"Synaptic Plasticity",t:"Neural Coding",w:4},{s:"Predictive Processing",t:"Brain Oscillations",w:4},
  {s:"Neuroimaging",t:"Default Mode Network",w:4},{s:"Prefrontal Cortex",t:"Default Mode Network",w:4},
  {s:"Predictive Processing",t:"Neural Coding",w:4},{s:"Brain Oscillations",t:"Neural Coding",w:3},
  // COGPSY
  {s:"Working Memory",t:"Executive Control",w:5},{s:"Dual-Process Theory",t:"Heuristics & Biases",w:5},
  {s:"Emotion Regulation",t:"Executive Control",w:4},{s:"Attribution Theory",t:"Heuristics & Biases",w:3},
  {s:"Theory of Mind",t:"Attribution Theory",w:4},{s:"Selective Attention",t:"Working Memory",w:4},
  {s:"Theory of Mind",t:"Emotion Regulation",w:3},
  // LANG
  {s:"Syntax",t:"Semantics",w:4},{s:"Language Acquisition",t:"Psycholinguistics",w:4},
  {s:"Computational Ling.",t:"Semantics",w:4},{s:"Language & Culture",t:"Sociolinguistics",w:4},
  {s:"Psycholinguistics",t:"Syntax",w:3},{s:"Language Acquisition",t:"Sociolinguistics",w:3},
  // ANTH
  {s:"Ethnography",t:"Social Structure",w:4},{s:"Cultural Relativism",t:"Ethnography",w:4},
  {s:"Political Ecology",t:"Social Structure",w:4},{s:"Medical Anthropology",t:"Ethnography",w:3},
  {s:"Material Culture",t:"Ethnography",w:3},{s:"Human Evolution",t:"Social Structure",w:2},
  // SYS
  {s:"Complex Systems",t:"Emergence",w:5},{s:"Systems Thinking",t:"Resilience",w:4},
  {s:"Network Theory",t:"Complex Systems",w:4},{s:"Information Theory",t:"Complex Systems",w:4},
  {s:"Self-Organization",t:"Emergence",w:5},{s:"Self-Organization",t:"Complex Systems",w:4},
  {s:"Systems Thinking",t:"Network Theory",w:3}
];

// ── Inter-discipline bridge links ─────────────────────────────────
// weight 4-5 = MAJOR bridge | weight 2-3 = minor bridge
// COGSCI nodes removed; bridges rerouted through COGPSY / NEURO
var INTER = [

  // ── PHILOSOPHY ──────────────────────────────────────────────────
  // PHIL ↔ EDUC  (major: epistemology→pedagogy, ethics→equity)
  {s:"Epistemology",t:"Constructivism",w:5,pair:["PHIL","EDUC"]},
  {s:"Critical Theory",t:"Critical Pedagogy",w:5,pair:["PHIL","EDUC"]},
  {s:"Ethics",t:"Educational Equity",w:4,pair:["PHIL","EDUC"]},
  {s:"Epistemology",t:"Metacognition (Ed)",w:4,pair:["PHIL","EDUC"]},
  {s:"Phenomenology",t:"Pedagogy",w:3,pair:["PHIL","EDUC"]},

  // PHIL ↔ HR  (major: ethics→dignity, critical theory→justice)
  {s:"Ethics",t:"Human Dignity",w:5,pair:["PHIL","HR"]},
  {s:"Critical Theory",t:"Justice",w:4,pair:["PHIL","HR"]},
  {s:"Logic",t:"International HR Law",w:3,pair:["PHIL","HR"]},
  {s:"Ontology",t:"Human Dignity",w:3,pair:["PHIL","HR"]},

  // PHIL ↔ ENV  (ethics→sustainability, Phil. of Science→climate)
  {s:"Ethics",t:"Sustainability",w:4,pair:["PHIL","ENV"]},
  {s:"Phil. of Science",t:"Climate Change",w:3,pair:["PHIL","ENV"]},
  {s:"Critical Theory",t:"Environmental Policy",w:3,pair:["PHIL","ENV"]},

  // PHIL ↔ CS  (logic→formal methods — strongest bridge)
  {s:"Logic",t:"Formal Methods",w:5,pair:["PHIL","CS"]},
  {s:"Phil. of Mind",t:"Machine Learning",w:4,pair:["PHIL","CS"]},
  {s:"Phil. of Science",t:"Data Science",w:3,pair:["PHIL","CS"]},
  {s:"Epistemology",t:"Algorithms",w:3,pair:["PHIL","CS"]},

  // PHIL ↔ NEURO  (Phil. of Mind→Predictive Processing/Neural Coding)
  {s:"Phil. of Mind",t:"Predictive Processing",w:5,pair:["PHIL","NEURO"]},
  {s:"Phenomenology",t:"Default Mode Network",w:4,pair:["PHIL","NEURO"]},
  {s:"Phil. of Mind",t:"Neural Coding",w:3,pair:["PHIL","NEURO"]},

  // PHIL ↔ COGPSY  (Epistemology→Dual-Process Theory, Ethics→Theory of Mind)
  {s:"Epistemology",t:"Dual-Process Theory",w:4,pair:["PHIL","COGPSY"]},
  {s:"Phil. of Mind",t:"Theory of Mind",w:4,pair:["PHIL","COGPSY"]},
  {s:"Ethics",t:"Attribution Theory",w:3,pair:["PHIL","COGPSY"]},
  {s:"Phenomenology",t:"Emotion Regulation",w:3,pair:["PHIL","COGPSY"]},

  // PHIL ↔ LANG  (Logic→Syntax, Phenomenology→Semantics)
  {s:"Logic",t:"Syntax",w:4,pair:["PHIL","LANG"]},
  {s:"Epistemology",t:"Psycholinguistics",w:3,pair:["PHIL","LANG"]},
  {s:"Phil. of Mind",t:"Semantics",w:3,pair:["PHIL","LANG"]},

  // PHIL ↔ ANTH  (Critical Theory→Cultural Relativism, Ethics→Social Structure)
  {s:"Critical Theory",t:"Cultural Relativism",w:4,pair:["PHIL","ANTH"]},
  {s:"Ethics",t:"Social Structure",w:3,pair:["PHIL","ANTH"]},
  {s:"Ontology",t:"Material Culture",w:2,pair:["PHIL","ANTH"]},

  // PHIL ↔ SYS  (Ontology→Complex Systems, Epistemology→Information Theory)
  {s:"Ontology",t:"Complex Systems",w:4,pair:["PHIL","SYS"]},
  {s:"Epistemology",t:"Information Theory",w:4,pair:["PHIL","SYS"]},
  {s:"Phil. of Science",t:"Systems Thinking",w:3,pair:["PHIL","SYS"]},

  // ── EDUCATION ───────────────────────────────────────────────────
  // EDUC ↔ HR  (major: equity→justice, pedagogy→dignity)
  {s:"Educational Equity",t:"Justice",w:5,pair:["EDUC","HR"]},
  {s:"Critical Pedagogy",t:"Human Dignity",w:4,pair:["EDUC","HR"]},
  {s:"Formative Assessment",t:"Accountability",w:3,pair:["EDUC","HR"]},

  // EDUC ↔ ENV
  {s:"Educational Equity",t:"Climate Change",w:3,pair:["EDUC","ENV"]},
  {s:"Pedagogy",t:"Sustainability",w:3,pair:["EDUC","ENV"]},
  {s:"Critical Pedagogy",t:"Environmental Policy",w:3,pair:["EDUC","ENV"]},

  // EDUC ↔ CS  (AI in Education→Machine Learning — strongest)
  {s:"AI in Education",t:"Machine Learning",w:5,pair:["EDUC","CS"]},
  {s:"Formative Assessment",t:"Data Science",w:4,pair:["EDUC","CS"]},
  {s:"Self-Reg. Learning",t:"Human-Comp. Inter.",w:4,pair:["EDUC","CS"]},
  {s:"AI in Education",t:"NLP",w:3,pair:["EDUC","CS"]},

  // EDUC ↔ NEURO  (Constructivism→Synaptic Plasticity, Assessment→Neuroimaging)
  {s:"Constructivism",t:"Synaptic Plasticity",w:4,pair:["EDUC","NEURO"]},
  {s:"Self-Reg. Learning",t:"Prefrontal Cortex",w:4,pair:["EDUC","NEURO"]},
  {s:"Formative Assessment",t:"Neuroimaging",w:3,pair:["EDUC","NEURO"]},

  // EDUC ↔ COGPSY  (major: metacognition, working memory)
  {s:"Metacognition (Ed)",t:"Working Memory",w:5,pair:["EDUC","COGPSY"]},
  {s:"Metacognition (Ed)",t:"Executive Control",w:4,pair:["EDUC","COGPSY"]},
  {s:"Self-Reg. Learning",t:"Selective Attention",w:4,pair:["EDUC","COGPSY"]},
  {s:"Pedagogy",t:"Theory of Mind",w:4,pair:["EDUC","COGPSY"]},
  {s:"Formative Assessment",t:"Dual-Process Theory",w:3,pair:["EDUC","COGPSY"]},

  // EDUC ↔ LANG  (Language Acquisition→pedagogy)
  {s:"Language Acquisition",t:"Pedagogy",w:4,pair:["LANG","EDUC"]},
  {s:"Psycholinguistics",t:"Formative Assessment",w:3,pair:["LANG","EDUC"]},
  {s:"NLP",t:"AI in Education",w:3,pair:["CS","EDUC"]},

  // EDUC ↔ ANTH  (Critical Pedagogy→Cultural Relativism)
  {s:"Critical Pedagogy",t:"Cultural Relativism",w:4,pair:["EDUC","ANTH"]},
  {s:"Educational Equity",t:"Social Structure",w:4,pair:["EDUC","ANTH"]},

  // EDUC ↔ SYS
  {s:"Self-Reg. Learning",t:"Systems Thinking",w:4,pair:["EDUC","SYS"]},
  {s:"Formative Assessment",t:"Network Theory",w:3,pair:["EDUC","SYS"]},

  // ── HUMAN RIGHTS ────────────────────────────────────────────────
  // HR ↔ ENV  (major: environmental rights→sustainability)
  {s:"Environmental Rights",t:"Sustainability",w:5,pair:["HR","ENV"]},
  {s:"Justice",t:"Climate Change",w:4,pair:["HR","ENV"]},
  {s:"International HR Law",t:"Environmental Policy",w:4,pair:["HR","ENV"]},

  // HR ↔ CS  (major: digital rights→cybersecurity)
  {s:"Digital Rights",t:"Cybersecurity",w:5,pair:["HR","CS"]},
  {s:"Accountability",t:"Data Science",w:4,pair:["HR","CS"]},
  {s:"Human Dignity",t:"Human-Comp. Inter.",w:3,pair:["HR","CS"]},

  // HR ↔ NEURO
  {s:"Human Dignity",t:"Default Mode Network",w:3,pair:["HR","NEURO"]},
  {s:"Justice",t:"Prefrontal Cortex",w:3,pair:["HR","NEURO"]},

  // HR ↔ COGPSY  (Justice→Dual-Process, Dignity→Theory of Mind)
  {s:"Justice",t:"Dual-Process Theory",w:4,pair:["HR","COGPSY"]},
  {s:"Human Dignity",t:"Theory of Mind",w:4,pair:["HR","COGPSY"]},
  {s:"Accountability",t:"Attribution Theory",w:3,pair:["HR","COGPSY"]},

  // HR ↔ LANG
  {s:"International HR Law",t:"Sociolinguistics",w:3,pair:["HR","LANG"]},
  {s:"Justice",t:"Language & Culture",w:3,pair:["HR","LANG"]},

  // HR ↔ ANTH  (major: dignity→cultural relativism, justice→social structure)
  {s:"Human Dignity",t:"Cultural Relativism",w:4,pair:["HR","ANTH"]},
  {s:"Justice",t:"Social Structure",w:4,pair:["HR","ANTH"]},
  {s:"Environmental Rights",t:"Political Ecology",w:4,pair:["HR","ANTH"]},
  {s:"Transitional Justice",t:"Ethnography",w:3,pair:["HR","ANTH"]},

  // HR ↔ SYS
  {s:"Accountability",t:"Systems Thinking",w:3,pair:["HR","SYS"]},
  {s:"International HR Law",t:"Network Theory",w:2,pair:["HR","SYS"]},

  // ── ENVIRONMENTAL SCIENCE ────────────────────────────────────────
  // ENV ↔ CS  (major: climate→ML, biodiversity→data science)
  {s:"Climate Change",t:"Machine Learning",w:5,pair:["ENV","CS"]},
  {s:"Biodiversity",t:"Data Science",w:4,pair:["ENV","CS"]},
  {s:"Renewable Energy",t:"Machine Learning",w:4,pair:["ENV","CS"]},
  {s:"Environmental Policy",t:"Algorithms",w:3,pair:["ENV","CS"]},

  // ENV ↔ NEURO
  {s:"Ecosystem Dynamics",t:"Neural Coding",w:3,pair:["ENV","NEURO"]},
  {s:"Climate Change",t:"Predictive Processing",w:3,pair:["ENV","NEURO"]},

  // ENV ↔ COGPSY  (climate risk perception, heuristics in env decisions)
  {s:"Climate Change",t:"Heuristics & Biases",w:4,pair:["ENV","COGPSY"]},
  {s:"Sustainability",t:"Dual-Process Theory",w:3,pair:["ENV","COGPSY"]},
  {s:"Environmental Policy",t:"Attribution Theory",w:3,pair:["ENV","COGPSY"]},

  // ENV ↔ LANG
  {s:"Environmental Policy",t:"Sociolinguistics",w:3,pair:["ENV","LANG"]},
  {s:"Climate Change",t:"Language & Culture",w:3,pair:["ENV","LANG"]},

  // ENV ↔ ANTH  (major: political ecology↔ecosystem, ethnography↔biodiversity)
  {s:"Political Ecology",t:"Ecosystem Dynamics",w:5,pair:["ANTH","ENV"]},
  {s:"Ethnography",t:"Biodiversity",w:4,pair:["ANTH","ENV"]},
  {s:"Cultural Relativism",t:"Sustainability",w:3,pair:["ANTH","ENV"]},

  // ENV ↔ SYS  (major: ecosystem↔complex systems)
  {s:"Ecosystem Dynamics",t:"Complex Systems",w:5,pair:["ENV","SYS"]},
  {s:"Resilience",t:"Environmental Policy",w:4,pair:["SYS","ENV"]},
  {s:"Emergence",t:"Biodiversity",w:4,pair:["SYS","ENV"]},
  {s:"Self-Organization",t:"Ecosystem Dynamics",w:4,pair:["SYS","ENV"]},
  {s:"Network Theory",t:"Biodiversity",w:3,pair:["SYS","ENV"]},

  // ── COMPUTER SCIENCE ──────────────────────────────────────────────
  // CS ↔ NEURO  (major: ML→neural coding, NLP→brain oscillations)
  {s:"Machine Learning",t:"Neural Coding",w:5,pair:["CS","NEURO"]},
  {s:"NLP",t:"Predictive Processing",w:4,pair:["CS","NEURO"]},
  {s:"Data Science",t:"Neuroimaging",w:4,pair:["CS","NEURO"]},
  {s:"Algorithms",t:"Brain Oscillations",w:3,pair:["CS","NEURO"]},

  // CS ↔ COGPSY  (major: ML→dual-process, HCI→selective attention)
  {s:"Machine Learning",t:"Dual-Process Theory",w:4,pair:["CS","COGPSY"]},
  {s:"Human-Comp. Inter.",t:"Selective Attention",w:4,pair:["CS","COGPSY"]},
  {s:"NLP",t:"Working Memory",w:4,pair:["CS","COGPSY"]},
  {s:"Data Science",t:"Heuristics & Biases",w:3,pair:["CS","COGPSY"]},

  // CS ↔ LANG  (major: NLP→computational linguistics)
  {s:"NLP",t:"Computational Ling.",w:5,pair:["CS","LANG"]},
  {s:"Machine Learning",t:"Semantics",w:4,pair:["CS","LANG"]},
  {s:"NLP",t:"Language Acquisition",w:4,pair:["CS","LANG"]},
  {s:"Data Science",t:"Psycholinguistics",w:3,pair:["CS","LANG"]},

  // CS ↔ ANTH
  {s:"Data Science",t:"Ethnography",w:3,pair:["CS","ANTH"]},
  {s:"Human-Comp. Inter.",t:"Material Culture",w:3,pair:["CS","ANTH"]},

  // CS ↔ SYS  (major: algorithms→network theory, data science→information theory)
  {s:"Algorithms",t:"Network Theory",w:4,pair:["CS","SYS"]},
  {s:"Data Science",t:"Information Theory",w:5,pair:["CS","SYS"]},
  {s:"Machine Learning",t:"Complex Systems",w:4,pair:["CS","SYS"]},
  {s:"Formal Methods",t:"Systems Thinking",w:3,pair:["CS","SYS"]},

  // ── NEUROSCIENCE ──────────────────────────────────────────────────
  // NEURO ↔ COGPSY  (major: synaptic plasticity→working memory)
  {s:"Synaptic Plasticity",t:"Working Memory",w:5,pair:["NEURO","COGPSY"]},
  {s:"Prefrontal Cortex",t:"Executive Control",w:5,pair:["NEURO","COGPSY"]},
  {s:"Brain Oscillations",t:"Selective Attention",w:4,pair:["NEURO","COGPSY"]},
  {s:"Predictive Processing",t:"Dual-Process Theory",w:4,pair:["NEURO","COGPSY"]},
  {s:"Default Mode Network",t:"Theory of Mind",w:4,pair:["NEURO","COGPSY"]},
  {s:"Neural Coding",t:"Heuristics & Biases",w:3,pair:["NEURO","COGPSY"]},

  // NEURO ↔ LANG  (neural coding→psycholinguistics)
  {s:"Neural Coding",t:"Psycholinguistics",w:4,pair:["NEURO","LANG"]},
  {s:"Predictive Processing",t:"Syntax",w:4,pair:["NEURO","LANG"]},
  {s:"Neuroimaging",t:"Language Acquisition",w:3,pair:["NEURO","LANG"]},
  {s:"Brain Oscillations",t:"Computational Ling.",w:3,pair:["NEURO","LANG"]},

  // NEURO ↔ ANTH  (human evolution→neural coding)
  {s:"Human Evolution",t:"Neural Coding",w:4,pair:["ANTH","NEURO"]},
  {s:"Neuroimaging",t:"Medical Anthropology",w:3,pair:["NEURO","ANTH"]},

  // NEURO ↔ SYS  (major: neural coding→network theory, brain oscillations→information theory)
  {s:"Neural Coding",t:"Network Theory",w:4,pair:["NEURO","SYS"]},
  {s:"Brain Oscillations",t:"Information Theory",w:4,pair:["NEURO","SYS"]},
  {s:"Predictive Processing",t:"Self-Organization",w:4,pair:["NEURO","SYS"]},
  {s:"Synaptic Plasticity",t:"Emergence",w:3,pair:["NEURO","SYS"]},

  // ── COGNITIVE PSYCHOLOGY ──────────────────────────────────────────
  // COGPSY ↔ LANG  (working memory→psycholinguistics — major)
  {s:"Working Memory",t:"Psycholinguistics",w:5,pair:["COGPSY","LANG"]},
  {s:"Executive Control",t:"Language Acquisition",w:4,pair:["COGPSY","LANG"]},
  {s:"Selective Attention",t:"Syntax",w:3,pair:["COGPSY","LANG"]},
  {s:"Dual-Process Theory",t:"Semantics",w:3,pair:["COGPSY","LANG"]},

  // COGPSY ↔ ANTH
  {s:"Attribution Theory",t:"Cultural Relativism",w:4,pair:["COGPSY","ANTH"]},
  {s:"Theory of Mind",t:"Social Structure",w:4,pair:["COGPSY","ANTH"]},
  {s:"Heuristics & Biases",t:"Material Culture",w:3,pair:["COGPSY","ANTH"]},

  // COGPSY ↔ SYS  (dual-process→complex systems, working memory→information theory)
  {s:"Dual-Process Theory",t:"Complex Systems",w:4,pair:["COGPSY","SYS"]},
  {s:"Working Memory",t:"Information Theory",w:3,pair:["COGPSY","SYS"]},
  {s:"Selective Attention",t:"Self-Organization",w:3,pair:["COGPSY","SYS"]},

  // ── LANGUAGE SCIENCE ──────────────────────────────────────────────
  // LANG ↔ ANTH  (major: language & culture→social structure)
  {s:"Language & Culture",t:"Social Structure",w:5,pair:["LANG","ANTH"]},
  {s:"Sociolinguistics",t:"Ethnography",w:4,pair:["LANG","ANTH"]},
  {s:"Language & Culture",t:"Cultural Relativism",w:4,pair:["LANG","ANTH"]},
  {s:"Language Acquisition",t:"Medical Anthropology",w:3,pair:["LANG","ANTH"]},

  // LANG ↔ SYS  (computational linguistics→network theory)
  {s:"Computational Ling.",t:"Network Theory",w:4,pair:["LANG","SYS"]},
  {s:"Semantics",t:"Information Theory",w:4,pair:["LANG","SYS"]},
  {s:"Language Acquisition",t:"Self-Organization",w:3,pair:["LANG","SYS"]},
  {s:"Syntax",t:"Complex Systems",w:3,pair:["LANG","SYS"]},

  // ── ANTHROPOLOGY ↔ SYSTEMS SCIENCE ──────────────────────────────
  {s:"Social Structure",t:"Complex Systems",w:4,pair:["ANTH","SYS"]},
  {s:"Political Ecology",t:"Systems Thinking",w:4,pair:["ANTH","SYS"]},
  {s:"Ethnography",t:"Network Theory",w:3,pair:["ANTH","SYS"]},
  {s:"Material Culture",t:"Self-Organization",w:2,pair:["ANTH","SYS"]}
];

// ── Build flat nodes/links arrays ─────────────────────────────────
var allNodes = NODES.map(function(n){
  return {
    id: n.id, cluster: n.disc, size: n.size,
    label: n.label,
    epistemicRole: n.er, analysisLevel: n.al, disc: n.disc
  };
});

var allLinks = INTRA.map(function(l){
  return {source:l.s, target:l.t, weight:l.w, inter:false};
}).concat(INTER.map(function(l){
  return {source:l.s, target:l.t, weight:l.w, inter:true, pair:l.pair};
}));

return {
  title:          "Interdisciplinary Knowledge Network",
  clusters:       DISCIPLINES,
  nodes:          allNodes,
  links:          allLinks,
  disciplines:    DISCIPLINES,
  epistemic:      EPISTEMIC,
  analysisLevels: ANALYSIS_LEVELS,
  intraLinks:     INTRA.map(function(l){return{source:l.s,target:l.t,weight:l.w};}),
  interLinks:     INTER.map(function(l){return{source:l.s,target:l.t,weight:l.w,pair:l.pair};})
};

  // Intégration avec DISCIPLINE_CONFIG
if (typeof DISCIPLINE_CONFIG !== 'undefined') {
  const interdisciplinaryConfig = DISCIPLINE_CONFIG["Interdisciplinary Knowledge Network"] ||
                                 DISCIPLINE_CONFIG["Interdisciplinary"];

  if (interdisciplinaryConfig) {
    // Fusionner les liens générés avec les données existantes
    const generatedLinks = [];
    const config = interdisciplinaryConfig;

    // Générer les liens intra-disciplines (basé sur clusterConnections)
    for (const [cluster, connections] of Object.entries(config.clusterConnections)) {
      for (const connectedCluster of connections) {
        generatedLinks.push({
          source: cluster,
          target: connectedCluster,
          weight: 3, // Poids par défaut pour les connexions entre clusters
          inter: false
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
          pair: ["INTERDISCIPLINARY", "INTERDISCIPLINARY"] // Marquer comme interdisciplinaire
        });
      });
    }

    // Fusionner avec les données existantes
    return {
      title: "Interdisciplinary Knowledge Network",
      clusters: DISCIPLINES,
      nodes: allNodes,
      links: allLinks.concat(generatedLinks), // Fusionner les liens existants et générés
      disciplines: DISCIPLINES,
      epistemic: EPISTEMIC,
      analysisLevels: ANALYSIS_LEVELS,
      intraLinks: INTRA,
      interLinks: INTER
    };
  }
}
  
})();)
