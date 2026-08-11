## Datasets

All datasets for MLKN.lab are available below. Most files are stored in this repository using **Git LFS**, while the largest file is hosted on **Zenodo** for reliability.
   **File** | **Size** | **Download** | **Method** |
 |----------|---------|--------------|------------|
 | `MLKN_Hierarchy_Network_Nodes_6CoreDomains.csv` | 1.7MB | [GitHub](data/knowledge_network/datasets/MLKN_Hierarchy_Network_Nodes_6CoreDomains_Final.csv) | Git LFS |
 | `MLKN_Hierarchy_Network_Edges_6CoreDomains.csv` | 23.1MB | [GitHub](data/knowledge_network/datasets/MLKN_Hierarchy_Network_Edges_6CoreDomains_Final.csv) | Git LFS |
 | `MLKN_hypergraph_nodes.json` | 5.6MB | [GitHub](data/knowledge_network/datasets/full_hierarchy_nodes.json) | Git LFS |
 | `MLKN_hypergraph_edges.json` | 40.5MB | [GitHub](data/knowledge_network/datasets/full_hierarchy_edges.json) | Git LFS |
 | `MLKN_full_hierarchy.json` | 46.1MB | [GitHub](data/knowledge_network/datasets/full_hierarchy.json) | Git LFS |
 | `MLKN_Hierarchy_Fully_Expanded.csv` | 38.1MB | [GitHub](data/knowledge_network/datasets/MLKN_Hierarchy_Fully_Expanded_Final.csv) | Git LFS |
 | `MLKN_Hierarchy_Reclassified_Core_Domains.csv` | 45.3MB | [GitHub](data/knowledge_network/datasets/MLKN_Hierarchy_Reclassified_Core_Domains_Final.csv) | Git LFS |
 | **`MLKN_Hierarchy_Master_File_All_Layers_All_Details.csv`** | **92.3MB** | [Zenodo (DOI)]([https://doi.org/10.5281/zenodo.21363227]) | Zenodo |

### Download All Datasets
To download all datasets (including the Zenodo-hosted file), run:
```bash
python download_datasets.py
