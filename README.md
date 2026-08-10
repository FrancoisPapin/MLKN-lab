# MLKN.lab — Multi-Layered Knowledge Network Ideas Laboratory

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21363227.svg)](https://doi.org/10.5281/zenodo.21363227)
[![Website](https://img.shields.io/badge/Website-Visit-blue)](https://francoispapin.github.io/MLKN-lab/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/FrancoisPapin/MLKN-lab)

---

## **Overview**

**MLKN.lab** (*Multi-Layered Knowledge Network Ideas Laboratory*) is a **computational meta-science platform** that maps the **structural topology of human knowledge** through a **polyhierarchical, data-driven framework**. It models scientific knowledge as a **dynamic, multi-layered hypergraph**, revealing hidden structures, bridges, and gaps across disciplines.

Built from **bibliometric analysis of large-scale scholarly metadata** (OpenAlex, Scopus, MeSH, IEEE Thesaurus), MLKN.lab operationalizes a **polyhierarchy** across:
- **5 Ontological Layers** (Core Domains → Concepts).
- **6 Epistemological Core Domains** (Formal Sciences, Natural Sciences, Engineering & Technology, Life Sciences, Health & Medical Sciences, Social Sciences & Humanities).
- **25 Academic Disciplines** (e.g., Computer Science, Neuroscience).
- **235 Subdisciplines** (e.g., AI, Cognitive Psychology).
- **320K+ Interdisciplinary Connections**.

MLKN.lab serves as:
-**Research Platform**: A living laboratory for testing hypotheses about the evolution of science.
-**Scientific Instrument**: A high-precision tool for graph-theoretic analysis of knowledge networks.
-**Cognitive Interface**: A generative system to augment human reasoning through interactive knowledge maps.

---

## **Key Features**

### **1. Polyhierarchical Framework**
- **5 Ontological Layers**: Core Domains → Academic Disciplines → Subdisciplines → Core Thematic Domains → Main Concepts.
- **6 Core Domains**: Formal Sciences, Natural Sciences, Engineering & Technology, Life Sciences, Health & Medical Sciences, Social Sciences & Humanities.
- **Reclassified Ontology**: Extends OpenAlex’s 4-domain taxonomy to **6 domains** for **balanced representation** and **interdisciplinarity**.

### **2. Knowledge Networks**
- **Interdisciplinary Knowledge Network**: Visualize all 25 disciplines simultaneously, organized into 6 Core Domains.
- **25 Disciplinary Knowledge Networks**: Explore individual discipline networks (e.g., Computer Science, Neuroscience, Psychology).
- **Interactive Visualizations**: Powered by **D3.js** and **NetworkX** for dynamic exploration.

### **3. Data & Methodology**
- **Data Source**: OpenAlex (March 2026 snapshot), supplemented by Scopus, MeSH, and IEEE Thesaurus.
- **Classification Logic**: Aligns with **OECD Frascati Manual** and **UNESCO Fields of Science**.
- **Validation**: Network metrics (centrality, modularity) and expert review ensure accuracy.

### **4. Applications**
- **For Researchers**: Uncover hidden connections, identify emerging fields, and test meta-science hypotheses.
- **For Educators**: Design interdisciplinary curricula and adaptive learning paths.
- **For Policymakers**: Inform science policy by visualizing gaps, silos, and opportunities.
- **For AI Developers**: Enhance AI reasoning with structured knowledge networks.

---

## **Repository Structure**
```
MLKN-lab/
│
├── index.html                       # Homepage
│
├── research/                        # Research
│   ├── research.html                # Research focus
│   ├── model.html                   # MLKN.model
│   ├── model-mathematical-foundations.html   # MLKN.model - Mathematical Foundations
│   └── method.html                  # Method
│
├── knowledge_network/               # Knowledge network visualizations
│   ├── polyhierarchy.html           # Polyhierarchy
│   ├── MLKN-hypergraph.html         # Interactive hypergraph
│   └── data.html                    # Data
│
├── knowledge_library/               # Bibliography and monographs
│   ├── references.html              # Scientific references
│   └── open-access-monographs.html  # Open-access monographs
│   └── normative-references.html    # Normative references
│
├── applications/                    # Applications
│   ├── applications.html            # General applications
│   └── essay.html                   # Essays & explorations
│   └── normative-applications.html  # Normative applications
│
├── about/                           # About
│   ├── about.html                   # About MLKN.lab
│   └── open-access-monographs.html  # Inspirations
│   └── normative-foundations.html   # Normative foundations
│
├── data/                            # Datasets
│   ├── MLKN_Hierarchy_Master_File_All_layers_All_Details_Final.csv  # Master hierarchy (92.9 MB)
│   ├── MLKN_hypergraph_nodes.json   # Nodes for visualization (5.6 MB)
│   └── MLKN_hypergraph_edges.json   # Edges for visualization (40.5 MB)
│
├── tutorials/                       # Jupyter notebooks
│   └── MLKN_tutorial.ipynb          # Quickstart guide
│
├── css/                             # Stylesheets
│   └── style.css                    # Main styles
│
└── README.md                        # This file
```

---

## **Getting Started**

### **Prerequisites**
- **Python 3.x** (for data analysis)
- **Jupyter Notebook** (for tutorials)
- **D3.js** (for interactive visualizations)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/FrancoisPapin/MLKN-lab.git
   cd MLKN-lab
   ```
2. Install dependencies:
   ```bash
   pip install pandas networkx matplotlib
   ```

### **Quickstart**
- Load the **master hierarchy CSV** into a DataFrame:
  ```python
  import pandas as pd
  df = pd.read_csv("data/MLKN_Hierarchy_Master_File_All_layers_All_Details_Final.csv")
  print(df.head())
  ```
- Visualize the **hypergraph** using the provided JSON files:
  ```python
  import json
  with open("data/MLKN_hypergraph_nodes.json") as f:
      nodes = json.load(f)
  with open("data/MLKN_hypergraph_edges.json") as f:
      edges = json.load(f)
  ```

---

## **Dataset Overview**

| **File**                                                      | **Format** | **Size**   | **Purpose**                           |
|---------------------------------------------------------------|------------|------------|---------------------------------------|
| `MLKN_Hierarchy_Master_File_All_layers_All_Details_Final.csv` | CSV        | 92.9 MB    | Master hierarchy for analysis         |
| `MLKN_hypergraph_nodes.json`                                  | JSON       | 5.6 MB     | Nodes for interactive visualization   |
| `MLKN_hypergraph_edges.json`                                  | JSON       | 40.5 MB    | Edges for interactive visualization   |
| `MLKN_tutorial.ipynb`                                         | Jupyter    | 534 Bytes  | Quickstart guide                      |

### **Key Statistics**
- **326,862 rows** (CSV)
- **31,590 nodes** (JSON)
- **320,075 edges** (JSON)
- **5 Ontological Layers**
- **6 Core Domains**
- **25 Academic Disciplines**
- **235 Subdisciplines**

---

## **Use Cases**

### **1. Network Analysis**
- Study the **topological structure** of scientific knowledge using **NetworkX** or **Gephi**.
- Identify **key disciplines, bridges between fields, or emerging research areas**.

### **2. Meta-Science Research**
- Analyze **interdisciplinarity, knowledge diffusion, or the evolution of scientific fields**.
- Example: Track how concepts like *"Transformers"* diffuse from AI to neuroscience.

### **3. Computational Epistemology**
- Model **how knowledge is structured, validated, and evolved** in computational systems.
- Develop **AI systems** that reason over scientific knowledge.

### **4. Interactive Visualization**
- Explore the **[MLKN.hypergraph](https://francoispapin.github.io/MLKN-lab/knowledge_network/MLKN-hypergraph.html)**.
- Build **custom network explorers** for specific research questions.

---
## **Scientific References**
MLKN.lab is grounded in **meta-science, network theory, computational epistemology, and cognitive science**. Key references include:
- Fortunato, S., et al. (2018). *Science of Science*. **Science**.
- Barabási, A.-L., & Albert, R. (1999). *Emergence of Scaling in Random Networks*. **Science**.
- Boccaletti, S., et al. (2014). *The Structure and Dynamics of Multilayer Networks*. **Physics Reports**.
- Thagard, P. (2019). *How to Collaborate: A Computational Model of Scientific Knowledge Integration*. **Philosophical Explorations**.

🔗 **[Full Bibliography](https://francoispapin.github.io/MLKN-lab/references/references.html)**

---
## **Open Access Monographs**
Explore **10+ open-access monographs** that inspire MLKN.lab, including:
- Seibt, J., Hakli, R., & Nørskov, M. (Eds.). (2026). *Robophilosophy: Philosophy of, for, and by Social Robotics*. **MIT Press**.
- Chirimuuta, M. (Ed.). (2024). *The Brain Abstracted: Simplification in the History and Philosophy of Neuroscience*. **MIT Press**.
- Nersessian, N. J. (Ed.). (2022). *Interdisciplinarity in the Making: Models and Methods in Frontier Science*. **MIT Press**.

🔗 **[Full Monographs Collection](https://francoispapin.github.io/MLKN-lab/references/open-access-monographs.html)**

---
## **Contributing**
We welcome contributions! Here’s how you can help:
1. **Report Issues**: Open an issue on GitHub for bugs or feature requests.
2. **Suggest Improvements**: Propose enhancements to the hierarchy or visualizations.
3. **Cite MLKN.lab**: If you use our data or tools, please cite:
   ```
   Papin, F. (2026). MLKN.lab Hierarchy Master File and Knowledge Network Data (All Layers, All Details) [Dataset]. Zenodo. https://doi.org/10.5281/zenodo.21363227
   ```

---
## **License**
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---
## **Contact**
- **Author**: [François Papin](https://www.linkedin.com/in/francois-papin/)
- **Website**: [https://francoispapin.github.io/MLKN-lab/](https://francoispapin.github.io/MLKN-lab/)
- **GitHub**: [https://github.com/FrancoisPapin/MLKN-lab](https://github.com/FrancoisPapin/MLKN-lab)

---
## **Related Resources**
🔗 - **[MLKN.labV1](https://francoispapin.github.io/MLKN-labV1/)** (Previous version)
🔗 - **[Zenodo Dataset](https://doi.org/10.5281/zenodo.21363227)** (DOI: [10.5281/zenodo.21363227](https://doi.org/10.5281/zenodo.21363227))
🔗 - **[OpenAlex](https://docs.openalex.org/)** (Data source)
🔗 - **[OECD Frascati Manual](https://www.oecd.org/science/inno/38235147.pdf)** (Classification standard)
