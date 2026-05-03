// MLKN.lab — Neuroscience Data | MIT License | François Papin
'use strict';
window.MAP_DATA = {
  "title": "Neuroscience",
  "clusters": {
    "MOLCELL": {
      "label": "Molecular & Cellular",
      "color": "#C0392B",
      "light": "#FDF0EF"
    },
    "SYSTEMS": {
      "label": "Systems Neuroscience",
      "color": "#1A6BAA",
      "light": "#EBF4FB"
    },
    "COGNEURO": {
      "label": "Cognitive Neuroscience",
      "color": "#B7770D",
      "light": "#FEF9EE"
    },
    "DEVNEURO": {
      "label": "Developmental Neuroscience",
      "color": "#1A8A4A",
      "light": "#EAFAF1"
    },
    "CLINICAL": {
      "label": "Clinical Neuroscience",
      "color": "#7D3C98",
      "light": "#F5EEF8"
    },
    "COMPUT": {
      "label": "Computational Neuroscience",
      "color": "#0A7E8C",
      "light": "#E8F8FA"
    },
    "METHODS": {
      "label": "Methods & Imaging",
      "color": "#C05718",
      "light": "#FDF3EE"
    },
    "TRANSLA": {
      "label": "Translational Neuroscience",
      "color": "#1A4A7A",
      "light": "#EBF2FA"
    }
  },
  "nodes": [
    {
      "id": "Action Potential",
      "cluster": "MOLCELL",
      "size": 26
    },
    {
      "id": "Ion Channels",
      "cluster": "MOLCELL",
      "size": 22
    },
    {
      "id": "Neurotransmitter Systems",
      "cluster": "MOLCELL",
      "size": 24
    },
    {
      "id": "Dopamine",  // <-- Ajoutez ici
      "cluster": "MOLCELL",
      "size": 24
    },
    {
      "id": "Synaptic Plasticity",
      "cluster": "MOLCELL",
      "size": 28
    },
    {
      "id": "Receptor Signaling",
      "cluster": "MOLCELL",
      "size": 20
    },
    {
      "id": "Neuroinflammation",
      "cluster": "MOLCELL",
      "size": 18
    },
    {
      "id": "Myelin & Glia",
      "cluster": "MOLCELL",
      "size": 18
    },
    {
      "id": "Long-Term Potentiation",
      "cluster": "MOLCELL",
      "size": 22
    },
    {
      "id": "Visual Cortex",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Perception",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Auditory Processing",
      "cluster": "SYSTEMS",
      "size": 20
    },
    {
      "id": "Motor System",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Movement",
      "cluster": "SYSTEMS",
      "size": 22
    },
    {
      "id": "Broca's Area",
      "cluster": "SYSTEMS",
      "size": 22
    },
    {
      "id": "Limbic System",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Basal Ganglia",
      "cluster": "SYSTEMS",
      "size": 22
    },
    {
      "id": "Prefrontal Networks",
      "cluster": "SYSTEMS",
      "size": 26
    },
    {
      "id": "Default Mode Network",
      "cluster": "SYSTEMS",
      "size": 24
    },
    {
      "id": "Thalamo-Cortical Loops",
      "cluster": "SYSTEMS",
      "size": 18
    },
    {
      "id": "Attention Networks",
      "cluster": "COGNEURO",
      "size": 24
    },
    {
      "id": "Working Memory (Neural)",
      "cluster": "COGNEURO",
      "size": 22
    },
    {
      "id": "Executive Control (Neural)",
      "cluster": "COGNEURO",
      "size": 22
    },
    {
      "id": "Cognitive Control",
      "cluster": "COGNEURO",
      "size": 24
    },
    {
      "id": "Cognitive Flexibility",
      "cluster": "COGNEURO",
      "size": 22
    },
    {
      "id": "Self-Referential Thought",
      "cluster": "COGNEURO",
      "size": 20
    },
    {
      "id": "Emotion Regulation (Neural)",
      "cluster": "COGNEURO",
      "size": 20
    },
    {
      "id": "Decision Neuroscience",
      "cluster": "COGNEURO",
      "size": 22
    },
    {
      "id": "Language Networks",
      "cluster": "COGNEURO",
      "size": 20
    },
    {
      "id": "Reward Circuits",
      "cluster": "COGNEURO",
      "size": 22
    },
    {
      "id": "Social Brain",
      "cluster": "COGNEURO",
      "size": 18
    },
    {
      "id": "Neurogenesis",
      "cluster": "DEVNEURO",
      "size": 22
    },
    {
      "id": "Synaptic Pruning",
      "cluster": "DEVNEURO",
      "size": 20
    },
    {
      "id": "Critical Periods",
      "cluster": "DEVNEURO",
      "size": 22
    },
    {
      "id": "Neurotrophins",
      "cluster": "DEVNEURO",
      "size": 18
    },
    {
      "id": "Brain Aging",
      "cluster": "DEVNEURO",
      "size": 20
    },
    {
      "id": "Adolescent Brain",
      "cluster": "DEVNEURO",
      "size": 18
    },
    {
      "id": "Alzheimer's Disease",
      "cluster": "CLINICAL",
      "size": 26
    },
    {
      "id": "Parkinson's Disease",
      "cluster": "CLINICAL",
      "size": 22
    },
    {
      "id": "Epilepsy",
      "cluster": "CLINICAL",
      "size": 20
    },
    {
      "id": "Schizophrenia (Neuro)",
      "cluster": "CLINICAL",
      "size": 20
    },
    {
      "id": "Depression & Brain",
      "cluster": "CLINICAL",
      "size": 20
    },
    {
      "id": "Traumatic Brain Injury",
      "cluster": "CLINICAL",
      "size": 18
    },
    {
      "id": "Multiple Sclerosis",
      "cluster": "CLINICAL",
      "size": 18
    },
    {
      "id": "Neural Coding",
      "cluster": "COMPUT",
      "size": 24
    },
    {
      "id": "Brain Oscillations",
      "cluster": "COMPUT",
      "size": 22
    },
    {
      "id": "Bayesian Brain",
      "cluster": "COMPUT",
      "size": 24
    },
    {
      "id": "Connectomics",
      "cluster": "COMPUT",
      "size": 22
    },
    {
      "id": "Predictive Processing",
      "cluster": "COMPUT",
      "size": 24
    },
    {
      "id": "Free Energy Principle",
      "cluster": "COMPUT",
      "size": 20
    },
    {
      "id": "fMRI",
      "cluster": "METHODS",
      "size": 26
    },
    {
      "id": "EEG / MEG",
      "cluster": "METHODS",
      "size": 24
    },
    {
      "id": "Optogenetics",
      "cluster": "METHODS",
      "size": 22
    },
    {
      "id": "Patch-Clamp Recording",
      "cluster": "METHODS",
      "size": 18
    },
    {
      "id": "TMS / tDCS",
      "cluster": "METHODS",
      "size": 20
    },
    {
      "id": "Diffusion Tensor Imaging",
      "cluster": "METHODS",
      "size": 20
    },
    {
      "id": "Neuroprotection",
      "cluster": "TRANSLA",
      "size": 20
    },
    {
      "id": "Neuroplasticity Rehab.",
      "cluster": "TRANSLA",
      "size": 22
    },
    {
      "id": "Drug Target Discovery",
      "cluster": "TRANSLA",
      "size": 20
    },
    {
      "id": "Biomarkers (Neuro)",
      "cluster": "TRANSLA",
      "size": 20
    },
    {
      "id": "Animal Models",
      "cluster": "TRANSLA",
      "size": 18
    },
    {
      "id": "Brain Stimulation Therapy",
      "cluster": "TRANSLA",
      "size": 20
    }
  ],
  "links": [
    {
      "source": "Action Potential",
      "target": "Ion Channels",
      "weight": 5
    },
    {
      "source": "Neurotransmitter Systems",
      "target": "Synaptic Plasticity",
      "weight": 5
    },
    {
      "source": "Synaptic Plasticity",
      "target": "Long-Term Potentiation",
      "weight": 5
    },
    {
      "source": "Myelin & Glia",
      "target": "Neuroinflammation",
      "weight": 4
    },
    {
      "source": "Prefrontal Networks",
      "target": "Limbic System",
      "weight": 5
    },
    {
      "source": "Prefrontal Networks",
      "target": "Basal Ganglia",
      "weight": 4
    },
    {
      "source": "Limbic System",
      "target": "Default Mode Network",
      "weight": 4
    },
    {
      "source": "Basal Ganglia",
      "target": "Motor System",
      "weight": 5
    },
    {
      "source": "Thalamo-Cortical Loops",
      "target": "Default Mode Network",
      "weight": 4
    },
    {
      "source": "Attention Networks",
      "target": "Working Memory (Neural)",
      "weight": 5
    },
    {
      "source": "Working Memory (Neural)",
      "target": "Executive Control (Neural)",
      "weight": 5
    },
    {
      "source": "Reward Circuits",
      "target": "Decision Neuroscience",
      "weight": 4
    },
    {
      "source": "Emotion Regulation (Neural)",
      "target": "Limbic System",
      "weight": 4
    },
    {
      "source": "Neurogenesis",
      "target": "Synaptic Pruning",
      "weight": 4
    },
    {
      "source": "Critical Periods",
      "target": "Synaptic Pruning",
      "weight": 4
    },
    {
      "source": "Neurotrophins",
      "target": "Neurogenesis",
      "weight": 4
    },
    {
      "source": "Brain Aging",
      "target": "Alzheimer's Disease",
      "weight": 5
    },
    {
      "source": "Alzheimer's Disease",
      "target": "Neuroinflammation",
      "weight": 4
    },
    {
      "source": "Parkinson's Disease",
      "target": "Basal Ganglia",
      "weight": 4
    },
    {
      "source": "Epilepsy",
      "target": "Brain Oscillations",
      "weight": 4
    },
    {
      "source": "Schizophrenia (Neuro)",
      "target": "Prefrontal Networks",
      "weight": 4
    },
    {
      "source": "Depression & Brain",
      "target": "Limbic System",
      "weight": 4
    },
    {
      "source": "Multiple Sclerosis",
      "target": "Myelin & Glia",
      "weight": 5
    },
    {
      "source": "Neural Coding",
      "target": "Brain Oscillations",
      "weight": 4
    },
    {
      "source": "Bayesian Brain",
      "target": "Predictive Processing",
      "weight": 5
    },
    {
      "source": "Predictive Processing",
      "target": "Free Energy Principle",
      "weight": 5
    },
    {
      "source": "Connectomics",
      "target": "Neural Coding",
      "weight": 4
    },
    {
      "source": "fMRI",
      "target": "Default Mode Network",
      "weight": 5
    },
    {
      "source": "fMRI",
      "target": "Attention Networks",
      "weight": 4
    },
    {
      "source": "EEG / MEG",
      "target": "Brain Oscillations",
      "weight": 5
    },
    {
      "source": "Optogenetics",
      "target": "Synaptic Plasticity",
      "weight": 4
    },
    {
      "source": "TMS / tDCS",
      "target": "Neuroplasticity Rehab.",
      "weight": 4
    },
    {
      "source": "Diffusion Tensor Imaging",
      "target": "Connectomics",
      "weight": 4
    },
    {
      "source": "Neuroprotection",
      "target": "Drug Target Discovery",
      "weight": 4
    },
    {
      "source": "Drug Target Discovery",
      "target": "Animal Models",
      "weight": 4
    },
    {
      "source": "Biomarkers (Neuro)",
      "target": "Alzheimer's Disease",
      "weight": 4
    },
    {
      "source": "Brain Stimulation Therapy",
      "target": "Neuroplasticity Rehab.",
      "weight": 4
    },
    {
      "source": "Critical Periods",
      "target": "Visual Cortex",
      "weight": 3
    },
    {
      "source": "Predictive Processing",
      "target": "Visual Cortex",
      "weight": 4
    },
    {
      "source": "Neurotransmitter Systems",
      "target": "Depression & Brain",
      "weight": 4
    },
    {
      "source": "Neurotransmitter Systems",
      "target": "Schizophrenia (Neuro)",
      "weight": 4
    }
  ]
};
