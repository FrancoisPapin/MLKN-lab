// MLKN.lab — Education Science Data | MIT License | François Papin
'use strict';
window.MAP_DATA = {
  "title": "Education Science",
  "clusters": {
    "LEARNING": {
      "label": "Learning Theory",
      "color": "#C0392B",
      "light": "#FDF0EF"
    },
    "PEDAGOGY": {
      "label": "Pedagogy & Instruction",
      "color": "#1A6BAA",
      "light": "#EBF4FB"
    },
    "CURRICUL": {
      "label": "Curriculum Studies",
      "color": "#B7770D",
      "light": "#FEF9EE"
    },
    "ASSESS": {
      "label": "Assessment",
      "color": "#1A8A4A",
      "light": "#EAFAF1"
    },
    "SPECIAL": {
      "label": "Inclusive & Special Ed.",
      "color": "#7D3C98",
      "light": "#F5EEF8"
    },
    "TECH": {
      "label": "Educational Technology",
      "color": "#0A7E8C",
      "light": "#E8F8FA"
    },
    "SOCIAL": {
      "label": "Social & Cultural",
      "color": "#C05718",
      "light": "#FDF3EE"
    },
    "POLICY": {
      "label": "Policy & Systems",
      "color": "#1A4A7A",
      "light": "#EBF2FA"
    }
  },
  "nodes": [
    {
      "id": "Constructivism",
      "cluster": "LEARNING",
      "size": 30
    },
    {
      "id": "Behaviorism",
      "cluster": "LEARNING",
      "size": 24
    },
    {
      "id": "Cognitivism",
      "cluster": "LEARNING",
      "size": 24
    },
    {
      "id": "Social Learning Theory",
      "cluster": "LEARNING",
      "size": 22
    },
    {
      "id": "Situated Learning",
      "cluster": "LEARNING",
      "size": 20
    },
    {
      "id": "Experiential Learning",
      "cluster": "LEARNING",
      "size": 20
    },
    {
      "id": "Self-Regulated Learning",
      "cluster": "LEARNING",
      "size": 24
    },
    {
      "id": "Metacognition",
      "cluster": "LEARNING",
      "size": 24
    },
    {
      "id": "Zone of Proximal Dev.",
      "cluster": "LEARNING",
      "size": 22
    },
    {
      "id": "Scaffolding",
      "cluster": "LEARNING",
      "size": 22
    },
    {
      "id": "Transfer of Learning",
      "cluster": "LEARNING",
      "size": 18
    },
    {
      "id": "Motivation (Ed)",
      "cluster": "LEARNING",
      "size": 22
    },
    {
      "id": "Individualized Learning",
      "cluster": "PEDAGOGY",  // ou "LEARNING" si vous préférez
      "size": 20
    },
    {
      "id": "Differentiated Instruction",
      "cluster": "PEDAGOGY",
      "size": 24
    },
    {
      "id": "Project-Based Learning",
      "cluster": "PEDAGOGY",
      "size": 24
    },
    {
      "id": "Inquiry-Based Learning",
      "cluster": "PEDAGOGY",
      "size": 22
    },
    {
      "id": "Direct Instruction",
      "cluster": "PEDAGOGY",
      "size": 20
    },
    {
      "id": "Flipped Classroom",
      "cluster": "PEDAGOGY",
      "size": 18
    },
    {
      "id": "Cooperative Learning",
      "cluster": "PEDAGOGY",
      "size": 22
    },
    {
      "id": "Problem-Based Learning",
      "cluster": "PEDAGOGY",
      "size": 22
    },
    {
      "id": "Mastery Learning",
      "cluster": "PEDAGOGY",
      "size": 20
    },
    {
      "id": "Feedback Literacy",
      "cluster": "PEDAGOGY",
      "size": 20
    },
    {
      "id": "Critical Pedagogy",
      "cluster": "SOCIAL",
      "size": 22
    },
    {
      "id": "Curriculum Design",
      "cluster": "CURRICUL",
      "size": 26
    },
    {
      "id": "Hidden Curriculum",
      "cluster": "CURRICUL",
      "size": 18
    },
    {
      "id": "Standards-Based Education",
      "cluster": "CURRICUL",
      "size": 22
    },
    {
      "id": "Interdisciplinary Learning",
      "cluster": "CURRICUL",
      "size": 20
    },
    {
      "id": "STEM / STEAM",
      "cluster": "CURRICUL",
      "size": 22
    },
    {
      "id": "Competency-Based Education",
      "cluster": "CURRICUL",
      "size": 22
    },
    {
      "id": "Spiral Curriculum",
      "cluster": "CURRICUL",
      "size": 18
    },
    {
      "id": "Formative Assessment",
      "cluster": "ASSESS",
      "size": 28
    },
    {
      "id": "Summative Assessment",
      "cluster": "ASSESS",
      "size": 24
    },
    {
      "id": "Standardized Testing",
      "cluster": "ASSESS",
      "size": 22
    },
    {
      "id": "Authentic Assessment",
      "cluster": "ASSESS",
      "size": 20
    },
    {
      "id": "Learning Analytics",
      "cluster": "ASSESS",
      "size": 22
    },
    {
      "id": "Rubrics",
      "cluster": "ASSESS",
      "size": 16
    },
    {
      "id": "Feedback",
      "cluster": "ASSESS",
      "size": 22
    },
    {
      "id": "Inclusive Education",
      "cluster": "SPECIAL",
      "size": 26
    },
    {
      "id": "Special Education",
      "cluster": "SPECIAL",
      "size": 24
    },
    {
      "id": "Neurodiversity",
      "cluster": "SPECIAL",
      "size": 20
    },
    {
      "id": "Universal Design for Learning",
      "cluster": "SPECIAL",
      "size": 22
    },
    {
      "id": "Response to Intervention",
      "cluster": "SPECIAL",
      "size": 18
    },
    {
      "id": "EdTech",
      "cluster": "TECH",
      "size": 26
    },
    {
      "id": "E-Learning",
      "cluster": "TECH",
      "size": 22
    },
    {
      "id": "Gamification",
      "cluster": "TECH",
      "size": 20
    },
    {
      "id": "MOOCs",
      "cluster": "TECH",
      "size": 20
    },
    {
      "id": "AI in Education",
      "cluster": "TECH",
      "size": 24
    },
    {
      "id": "Adaptive Learning",
      "cluster": "TECH",
      "size": 22
    },
    {
      "id": "Blended Learning",
      "cluster": "TECH",
      "size": 22
    },
    {
      "id": "Educational Equity",
      "cluster": "SOCIAL",
      "size": 26
    },
    {
      "id": "Social-Emotional Learning",
      "cluster": "SOCIAL",
      "size": 24
    },
    {
      "id": "Cultural Capital",
      "cluster": "SOCIAL",
      "size": 18
    },
    {
      "id": "Family Engagement",
      "cluster": "SOCIAL",
      "size": 16
    },
    {
      "id": "School Climate",
      "cluster": "SOCIAL",
      "size": 18
    },
    {
      "id": "Educational Policy",
      "cluster": "POLICY",
      "size": 26
    },
    {
      "id": "School Reform",
      "cluster": "POLICY",
      "size": 22
    },
    {
      "id": "Accountability Systems",
      "cluster": "POLICY",
      "size": 20
    },
    {
      "id": "Teacher Professional Dev.",
      "cluster": "POLICY",
      "size": 22
    },
    {
      "id": "Higher Education",
      "cluster": "POLICY",
      "size": 20
    },
    {
      "id": "Early Childhood Education",
      "cluster": "POLICY",
      "size": 20
    },
    {
      "id": "Education Funding",
      "cluster": "POLICY",
      "size": 18
    }
  ],
  "links": [
    {
      "source": "Constructivism",
      "target": "Zone of Proximal Dev.",
      "weight": 5
    },
    {
      "source": "Constructivism",
      "target": "Scaffolding",
      "weight": 5
    },
    {
      "source": "Constructivism",
      "target": "Situated Learning",
      "weight": 4
    },
    {
      "source": "Constructivism",
      "target": "Experiential Learning",
      "weight": 4
    },
    {
      "source": "Constructivism",
      "target": "Social Learning Theory",
      "weight": 4
    },
    {
      "source": "Constructivism",
      "target": "Project-Based Learning",
      "weight": 4
    },
    {
      "source": "Constructivism",
      "target": "Inquiry-Based Learning",
      "weight": 4
    },
    {
      "source": "Behaviorism",
      "target": "Cognitivism",
      "weight": 3
    },
    {
      "source": "Behaviorism",
      "target": "Direct Instruction",
      "weight": 4
    },
    {
      "source": "Behaviorism",
      "target": "Mastery Learning",
      "weight": 4
    },
    {
      "source": "Cognitivism",
      "target": "Metacognition",
      "weight": 5
    },
    {
      "source": "Cognitivism",
      "target": "Self-Regulated Learning",
      "weight": 4
    },
    {
      "source": "Social Learning Theory",
      "target": "Cooperative Learning",
      "weight": 5
    },
    {
      "source": "Self-Regulated Learning",
      "target": "Metacognition",
      "weight": 5
    },
    {
      "source": "Self-Regulated Learning",
      "target": "Motivation (Ed)",
      "weight": 4
    },
    {
      "source": "Zone of Proximal Dev.",
      "target": "Scaffolding",
      "weight": 5
    },
    {
      "source": "Differentiated Instruction",
      "target": "Universal Design for Learning",
      "weight": 4
    },
    {
      "source": "Differentiated Instruction",
      "target": "Inclusive Education",
      "weight": 4
    },
    {
      "source": "Flipped Classroom",
      "target": "Blended Learning",
      "weight": 5
    },
    {
      "source": "Problem-Based Learning",
      "target": "Project-Based Learning",
      "weight": 4
    },
    {
      "source": "Curriculum Design",
      "target": "Standards-Based Education",
      "weight": 5
    },
    {
      "source": "Curriculum Design",
      "target": "Spiral Curriculum",
      "weight": 4
    },
    {
      "source": "Curriculum Design",
      "target": "Interdisciplinary Learning",
      "weight": 4
    },
    {
      "source": "Curriculum Design",
      "target": "STEM / STEAM",
      "weight": 4
    },
    {
      "source": "Curriculum Design",
      "target": "Competency-Based Education",
      "weight": 4
    },
    {
      "source": "Standards-Based Education",
      "target": "Accountability Systems",
      "weight": 4
    },
    {
      "source": "Formative Assessment",
      "target": "Summative Assessment",
      "weight": 4
    },
    {
      "source": "Formative Assessment",
      "target": "Feedback",
      "weight": 5
    },
    {
      "source": "Formative Assessment",
      "target": "Rubrics",
      "weight": 4
    },
    {
      "source": "Mastery Learning",
      "target": "Formative Assessment",
      "weight": 4
    },
    {
      "source": "Summative Assessment",
      "target": "Standardized Testing",
      "weight": 4
    },
    {
      "source": "Learning Analytics",
      "target": "AI in Education",
      "weight": 5
    },
    {
      "source": "Learning Analytics",
      "target": "Adaptive Learning",
      "weight": 4
    },
    {
      "source": "Inclusive Education",
      "target": "Special Education",
      "weight": 5
    },
    {
      "source": "Inclusive Education",
      "target": "Universal Design for Learning",
      "weight": 5
    },
    {
      "source": "Neurodiversity",
      "target": "Inclusive Education",
      "weight": 4
    },
    {
      "source": "EdTech",
      "target": "E-Learning",
      "weight": 5
    },
    {
      "source": "EdTech",
      "target": "AI in Education",
      "weight": 5
    },
    {
      "source": "EdTech",
      "target": "Blended Learning",
      "weight": 4
    },
    {
      "source": "E-Learning",
      "target": "MOOCs",
      "weight": 4
    },
    {
      "source": "AI in Education",
      "target": "Adaptive Learning",
      "weight": 5
    },
    {
      "source": "Educational Equity",
      "target": "Social-Emotional Learning",
      "weight": 4
    },
    {
      "source": "Educational Equity",
      "target": "School Climate",
      "weight": 3
    },
    {
      "source": "Educational Equity",
      "target": "Cultural Capital",
      "weight": 4
    },
    {
      "source": "Educational Equity",
      "target": "Critical Pedagogy",
      "weight": 5
    },
    {
      "source": "Educational Policy",
      "target": "School Reform",
      "weight": 5
    },
    {
      "source": "Educational Policy",
      "target": "Accountability Systems",
      "weight": 5
    },
    {
      "source": "Educational Policy",
      "target": "Education Funding",
      "weight": 4
    },
    {
      "source": "Educational Policy",
      "target": "Educational Equity",
      "weight": 4
    },
    {
      "source": "School Reform",
      "target": "Teacher Professional Dev.",
      "weight": 4
    },
    {
      "source": "Authentic Assessment",
      "target": "Formative Assessment",
      "weight": 3
    },
    {
      "source": "Social-Emotional Learning",
      "target": "School Climate",
      "weight": 4
    },
    {
      "source": "Gamification",
      "target": "Motivation (Ed)",
      "weight": 4
    },
    {
      "source": "Critical Pedagogy",
      "target": "Hidden Curriculum",
      "weight": 4
    },
    {
      "source": "Feedback",
      "target": "Feedback Literacy",
      "weight": 5
    }
  ]
};
