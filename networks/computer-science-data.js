// MLKN.lab — Computer Science Data | MIT License | François Papin
'use strict';
window.MAP_DATA = {
  "title": "Computer Science",
  "clusters": {
    "AI": {
      "label": "Artificial Intelligence",
      "color": "#D63031",
      "light": "#FEF2F2"
    },
    "THEORY": {
      "label": "Theory & Algorithms",
      "color": "#00897B",
      "light": "#E8F5F3"
    },
    "SYSTEMS": {
      "label": "Systems & Networks",
      "color": "#0277BD",
      "light": "#E3F2FD"
    },
    "DATA": {
      "label": "Data & Databases",
      "color": "#2E7D52",
      "light": "#E8F5EC"
    },
    "HCI": {
      "label": "HCI & Interaction",
      "color": "#C47D00",
      "light": "#FEF9E7"
    },
    "SECURITY": {
      "label": "Security & Privacy",
      "color": "#8E44AD",
      "light": "#F5EEF8"
    },
    "EMERGING": {
      "label": "Emerging Fields",
      "color": "#C98000",
      "light": "#FEFCE8"
    },
    "SE": {
      "label": "Software Engineering",
      "color": "#1B7840",
      "light": "#EAFAF1"
    }
  },
  "nodes": [
    {
      "id": "Machine Learning",
      "cluster": "AI",
      "size": 28
    },
    {
      "id": "AI",
      "cluster": "AI",
      "size": 28
    },
    {
      "id": "Deep Learning",
      "cluster": "AI",
      "size": 26
    },
    {
      "id": "Neural Networks",
      "cluster": "AI",
      "size": 24
    },
    {
      "id": "Natural Language Processing",
      "cluster": "AI",
      "size": 22
    },
    {
      "id": "Computer Vision",
      "cluster": "AI",
      "size": 22
    },
    {
      "id": "Reinforcement Learning",
      "cluster": "AI",
      "size": 20
    },
    {
      "id": "Generative AI",
      "cluster": "AI",
      "size": 22
    },
    {
      "id": "Explainable AI",
      "cluster": "AI",
      "size": 18
    },
    {
      "id": "Algorithms",
      "cluster": "THEORY",
      "size": 26
    },
    {
      "id": "Complexity Theory",
      "cluster": "THEORY",
      "size": 22
    },
    {
      "id": "Graph Theory",
      "cluster": "THEORY",
      "size": 20
    },
    {
      "id": "Optimization",
      "cluster": "THEORY",
      "size": 22
    },
    {
      "id": "Cryptography",
      "cluster": "THEORY",
      "size": 20
    },
    {
      "id": "Formal Methods",
      "cluster": "THEORY",
      "size": 16
    },
    {
      "id": "Distributed Systems",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Cloud Computing",
      "cluster": "SYSTEMS",
      "size": 22
    },
    {
      "id": "Operating Systems",
      "cluster": "SYSTEMS",
      "size": 18
    },
    {
      "id": "Computer Networks",
      "cluster": "SYSTEMS",
      "size": 20
    },
    {
      "id": "IoT",
      "cluster": "SYSTEMS",
      "size": 18
    },
    {
      "id": "Edge Computing",
      "cluster": "SYSTEMS",
      "size": 16
    },
    {
      "id": "Databases",
      "cluster": "DATA",
      "size": 22
    },
    {
      "id": "Big Data",
      "cluster": "DATA",
      "size": 22
    },
    {
      "id": "Data Mining",
      "cluster": "DATA",
      "size": 20
    },
    {
      "id": "Information Retrieval",
      "cluster": "DATA",
      "size": 18
    },
    {
      "id": "Data Visualization",
      "cluster": "DATA",
      "size": 18
    },
    {
      "id": "Human-Computer Interaction",
      "cluster": "HCI",
      "size": 22
    },
    {
      "id": "User Experience",
      "cluster": "HCI",
      "size": 20
    },
    {
      "id": "Computer Graphics",
      "cluster": "HCI",
      "size": 18
    },
    {
      "id": "Virtual Reality",
      "cluster": "HCI",
      "size": 18
    },
    {
      "id": "Augmented Reality",
      "cluster": "HCI",
      "size": 16
    },
    {
      "id": "Cybersecurity",
      "cluster": "SECURITY",
      "size": 24
    },
    {
      "id": "Security",
      "cluster": "SECURITY",
      "size": 26
    },
    {
      "id": "Network Security",
      "cluster": "SECURITY",
      "size": 20
    },
    {
      "id": "Privacy",
      "cluster": "SECURITY",
      "size": 20
    },
    {
      "id": "Blockchain",
      "cluster": "SECURITY",
      "size": 20
    },
    {
      "id": "Differential Privacy",
      "cluster": "SECURITY",
      "size": 16
    },
    {
      "id": "Quantum Computing",
      "cluster": "EMERGING",
      "size": 22
    },
    {
      "id": "Robotics",
      "cluster": "EMERGING",
      "size": 20
    },
    {
      "id": "Bioinformatics",
      "cluster": "EMERGING",
      "size": 18
    },
    {
      "id": "Federated Learning",
      "cluster": "EMERGING",
      "size": 16
    },
    {
      "id": "Software Engineering",
      "cluster": "SE",
      "size": 22
    },
    {
      "id": "Programming Languages",
      "cluster": "SE",
      "size": 20
    },
    {
      "id": "Testing & Verification",
      "cluster": "SE",
      "size": 16
    },
    {
      "id": "DevOps",
      "cluster": "SE",
      "size": 16
    }
  ],
  "links": [
    {
      "source": "AI",
      "target": "Machine Learning",
      "weight": 5
    },
    {
      "source": "Security",
      "target": "Cybersecurity",
      "weight": 5
    },
    {
      "source": "Machine Learning",
      "target": "Deep Learning",
      "weight": 5
    },
    {
      "source": "Deep Learning",
      "target": "Neural Networks",
      "weight": 5
    },
    {
      "source": "Deep Learning",
      "target": "Natural Language Processing",
      "weight": 4
    },
    {
      "source": "Deep Learning",
      "target": "Computer Vision",
      "weight": 4
    },
    {
      "source": "Deep Learning",
      "target": "Generative AI",
      "weight": 4
    },
    {
      "source": "Machine Learning",
      "target": "Reinforcement Learning",
      "weight": 4
    },
    {
      "source": "Machine Learning",
      "target": "Data Mining",
      "weight": 4
    },
    {
      "source": "Machine Learning",
      "target": "Federated Learning",
      "weight": 3
    },
    {
      "source": "Explainable AI",
      "target": "Machine Learning",
      "weight": 4
    },
    {
      "source": "Reinforcement Learning",
      "target": "Robotics",
      "weight": 3
    },
    {
      "source": "Algorithms",
      "target": "Complexity Theory",
      "weight": 5
    },
    {
      "source": "Algorithms",
      "target": "Graph Theory",
      "weight": 4
    },
    {
      "source": "Algorithms",
      "target": "Optimization",
      "weight": 4
    },
    {
      "source": "Cryptography",
      "target": "Network Security",
      "weight": 4
    },
    {
      "source": "Cryptography",
      "target": "Blockchain",
      "weight": 3
    },
    {
      "source": "Formal Methods",
      "target": "Testing & Verification",
      "weight": 4
    },
    {
      "source": "Distributed Systems",
      "target": "Cloud Computing",
      "weight": 5
    },
    {
      "source": "Distributed Systems",
      "target": "Computer Networks",
      "weight": 4
    },
    {
      "source": "Cloud Computing",
      "target": "Edge Computing",
      "weight": 4
    },
    {
      "source": "Cloud Computing",
      "target": "Big Data",
      "weight": 3
    },
    {
      "source": "Computer Networks",
      "target": "Network Security",
      "weight": 4
    },
    {
      "source": "IoT",
      "target": "Edge Computing",
      "weight": 4
    },
    {
      "source": "Databases",
      "target": "Big Data",
      "weight": 4
    },
    {
      "source": "Big Data",
      "target": "Data Mining",
      "weight": 4
    },
    {
      "source": "Natural Language Processing",
      "target": "Information Retrieval",
      "weight": 3
    },
    {
      "source": "Human-Computer Interaction",
      "target": "User Experience",
      "weight": 5
    },
    {
      "source": "Virtual Reality",
      "target": "Computer Graphics",
      "weight": 4
    },
    {
      "source": "Virtual Reality",
      "target": "Augmented Reality",
      "weight": 4
    },
    {
      "source": "Cybersecurity",
      "target": "Network Security",
      "weight": 4
    },
    {
      "source": "Cybersecurity",
      "target": "Privacy",
      "weight": 4
    },
    {
      "source": "Differential Privacy",
      "target": "Privacy",
      "weight": 4
    },
    {
      "source": "Differential Privacy",
      "target": "Federated Learning",
      "weight": 3
    },
    {
      "source": "Software Engineering",
      "target": "Programming Languages",
      "weight": 4
    },
    {
      "source": "Software Engineering",
      "target": "Testing & Verification",
      "weight": 3
    },
    {
      "source": "Software Engineering",
      "target": "DevOps",
      "weight": 3
    },
    {
      "source": "Quantum Computing",
      "target": "Cryptography",
      "weight": 3
    },
    {
      "source": "Bioinformatics",
      "target": "Machine Learning",
      "weight": 3
    },
    {
      "source": "Data Visualization",
      "target": "Human-Computer Interaction",
      "weight": 3
    }
  ]
};
