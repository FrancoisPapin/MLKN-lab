// MLKN.lab — Human Rights Data | MIT License | François Papin
'use strict';
window.MAP_DATA = {
  "title": "Human Rights",
  "clusters": {
    "FOUND": {
      "label": "Philosophical Foundations",
      "color": "#B7770D",
      "light": "#FEF9EE"
    },
    "INTL": {
      "label": "International HR Law",
      "color": "#0277BD",
      "light": "#E3F2FD"
    },
    "CIVIL": {
      "label": "Civil & Political Rights",
      "color": "#C0392B",
      "light": "#FDF0EF"
    },
    "ECON": {
      "label": "Economic, Social & Cultural",
      "color": "#1A8A4A",
      "light": "#EAFAF1"
    },
    "GROUP": {
      "label": "Group & Collective Rights",
      "color": "#7D3C98",
      "light": "#F5EEF8"
    },
    "VIOLAT": {
      "label": "Violations & Accountability",
      "color": "#922B21",
      "light": "#FDEDEC"
    },
    "MECH": {
      "label": "Mechanisms & Institutions",
      "color": "#1A4A7A",
      "light": "#EBF2FA"
    },
    "MOVEMENT": {
      "label": "Movements & Advocacy",
      "color": "#C05718",
      "light": "#FDF3EE"
    }
  },
  "nodes": [
    {
      "id": "Human Dignity",
      "cluster": "FOUND",
      "size": 32
    },
    {
      "id": "Natural Rights",
      "cluster": "FOUND",
      "size": 24
    },
    {
      "id": "Social Contract",
      "cluster": "FOUND",
      "size": 22
    },
    {
      "id": "Universalism",
      "cluster": "FOUND",
      "size": 24
    },
    {
      "id": "Cultural Relativism",
      "cluster": "FOUND",
      "size": 20
    },
    {
      "id": "Capabilities Approach",
      "cluster": "FOUND",
      "size": 22
    },
    {
      "id": "Moral Universalism",
      "cluster": "FOUND",
      "size": 20
    },
    {
      "id": "Postcolonial Critique",
      "cluster": "FOUND",
      "size": 20
    },
    {
      "id": "UDHR",
      "cluster": "INTL",
      "size": 30
    },
    {
      "id": "ICCPR",
      "cluster": "INTL",
      "size": 24
    },
    {
      "id": "ICESCR",
      "cluster": "INTL",
      "size": 24
    },
    {
      "id": "Geneva Conventions",
      "cluster": "INTL",
      "size": 22
    },
    {
      "id": "Rome Statute",
      "cluster": "INTL",
      "size": 22
    },
    {
      "id": "Customary Intl. Law",
      "cluster": "INTL",
      "size": 22
    },
    {
      "id": "State Responsibility",
      "cluster": "INTL",
      "size": 20
    },
    {
      "id": "Non-Refoulement",
      "cluster": "INTL",
      "size": 20
    },
    {
      "id": "Treaty Bodies",
      "cluster": "INTL",
      "size": 20
    },
    {
      "id": "Right to Life",
      "cluster": "CIVIL",
      "size": 26
    },
    {
      "id": "Freedom of Expression",
      "cluster": "CIVIL",
      "size": 26
    },
    {
      "id": "Freedom of Assembly",
      "cluster": "CIVIL",
      "size": 22
    },
    {
      "id": "Right to Privacy",
      "cluster": "CIVIL",
      "size": 22
    },
    {
      "id": "Freedom from Torture",
      "cluster": "CIVIL",
      "size": 24
    },
    {
      "id": "Due Process",
      "cluster": "CIVIL",
      "size": 20
    },
    {
      "id": "Habeas Corpus",
      "cluster": "CIVIL",
      "size": 18
    },
    {
      "id": "Right to Education",
      "cluster": "ECON",
      "size": 24
    },
    {
      "id": "Right to Health",
      "cluster": "ECON",
      "size": 24
    },
    {
      "id": "Right to Food",
      "cluster": "ECON",
      "size": 22
    },
    {
      "id": "Right to Water",
      "cluster": "ECON",
      "size": 22
    },
    {
      "id": "Right to Work",
      "cluster": "ECON",
      "size": 20
    },
    {
      "id": "Progressive Realization",
      "cluster": "ECON",
      "size": 18
    },
    {
      "id": "Environmental Rights",
      "cluster": "ECON",
      "size": 20
    },
    {
      "id": "Indigenous Rights",
      "cluster": "GROUP",
      "size": 24
    },
    {
      "id": "Women's Rights",
      "cluster": "GROUP",
      "size": 24
    },
    {
      "id": "Children's Rights",
      "cluster": "GROUP",
      "size": 22
    },
    {
      "id": "Refugee Rights",
      "cluster": "GROUP",
      "size": 22
    },
    {
      "id": "Disability Rights",
      "cluster": "GROUP",
      "size": 20
    },
    {
      "id": "Self-Determination",
      "cluster": "GROUP",
      "size": 22
    },
    {
      "id": "Racial Equality",
      "cluster": "GROUP",
      "size": 22
    },
    {
      "id": "Genocide",
      "cluster": "VIOLAT",
      "size": 24
    },
    {
      "id": "Crimes Against Humanity",
      "cluster": "VIOLAT",
      "size": 26
    },
    {
      "id": "War Crimes",
      "cluster": "VIOLAT",
      "size": 24
    },
    {
      "id": "Torture",
      "cluster": "VIOLAT",
      "size": 22
    },
    {
      "id": "Forced Disappearances",
      "cluster": "VIOLAT",
      "size": 20
    },
    {
      "id": "Impunity",
      "cluster": "VIOLAT",
      "size": 20
    },
    {
      "id": "Transitional Justice",
      "cluster": "VIOLAT",
      "size": 24
    },
    {
      "id": "Truth Commissions",
      "cluster": "VIOLAT",
      "size": 20
    },
    {
      "id": "Reparations",
      "cluster": "VIOLAT",
      "size": 20
    },
    {
      "id": "UN Human Rights Council",
      "cluster": "MECH",
      "size": 26
    },
    {
      "id": "Int'l Criminal Court",
      "cluster": "MECH",
      "size": 26
    },
    {
      "id": "Universal Periodic Review",
      "cluster": "MECH",
      "size": 22
    },
    {
      "id": "Special Rapporteurs",
      "cluster": "MECH",
      "size": 20
    },
    {
      "id": "Regional HR Courts",
      "cluster": "MECH",
      "size": 22
    },
    {
      "id": "NGOs & Civil Society",
      "cluster": "MECH",
      "size": 22
    },
    {
      "id": "HR Monitoring",
      "cluster": "MECH",
      "size": 18
    },
    {
      "id": "Civil Rights Movement",
      "cluster": "MOVEMENT",
      "size": 24
    },
    {
      "id": "Feminist Movements",
      "cluster": "MOVEMENT",
      "size": 22
    },
    {
      "id": "Decolonization",
      "cluster": "MOVEMENT",
      "size": 22
    },
    {
      "id": "HR Defenders",
      "cluster": "MOVEMENT",
      "size": 22
    },
    {
      "id": "Climate Justice",
      "cluster": "MOVEMENT",
      "size": 20
    },
    {
      "id": "Labor Rights Movement",
      "cluster": "MOVEMENT",
      "size": 20
    },
    {
      "id": "Digital Rights Activism",
      "cluster": "MOVEMENT",
      "size": 20
    }
  ],
  "links": [
    {
      "source": "Human Dignity",
      "target": "Natural Rights",
      "weight": 5
    },
    {
      "source": "Human Dignity",
      "target": "Universalism",
      "weight": 5
    },
    {
      "source": "Human Dignity",
      "target": "Capabilities Approach",
      "weight": 4
    },
    {
      "source": "Natural Rights",
      "target": "Social Contract",
      "weight": 5
    },
    {
      "source": "Universalism",
      "target": "Cultural Relativism",
      "weight": 4
    },
    {
      "source": "Postcolonial Critique",
      "target": "Cultural Relativism",
      "weight": 4
    },
    {
      "source": "Postcolonial Critique",
      "target": "Self-Determination",
      "weight": 4
    },
    {
      "source": "UDHR",
      "target": "ICCPR",
      "weight": 5
    },
    {
      "source": "UDHR",
      "target": "ICESCR",
      "weight": 5
    },
    {
      "source": "UDHR",
      "target": "Treaty Bodies",
      "weight": 4
    },
    {
      "source": "ICCPR",
      "target": "State Responsibility",
      "weight": 4
    },
    {
      "source": "ICESCR",
      "target": "Progressive Realization",
      "weight": 4
    },
    {
      "source": "Rome Statute",
      "target": "Int'l Criminal Court",
      "weight": 5
    },
    {
      "source": "Rome Statute",
      "target": "Crimes Against Humanity",
      "weight": 4
    },
    {
      "source": "Geneva Conventions",
      "target": "War Crimes",
      "weight": 5
    },
    {
      "source": "Customary Intl. Law",
      "target": "State Responsibility",
      "weight": 4
    },
    {
      "source": "Non-Refoulement",
      "target": "Refugee Rights",
      "weight": 5
    },
    {
      "source": "Right to Life",
      "target": "Freedom from Torture",
      "weight": 4
    },
    {
      "source": "Freedom of Expression",
      "target": "Freedom of Assembly",
      "weight": 4
    },
    {
      "source": "Freedom of Expression",
      "target": "Right to Privacy",
      "weight": 3
    },
    {
      "source": "Freedom from Torture",
      "target": "Torture",
      "weight": 5
    },
    {
      "source": "Right to Health",
      "target": "Right to Food",
      "weight": 3
    },
    {
      "source": "Right to Food",
      "target": "Right to Water",
      "weight": 4
    },
    {
      "source": "Environmental Rights",
      "target": "Climate Justice",
      "weight": 5
    },
    {
      "source": "Indigenous Rights",
      "target": "Self-Determination",
      "weight": 5
    },
    {
      "source": "Genocide",
      "target": "Crimes Against Humanity",
      "weight": 5
    },
    {
      "source": "Crimes Against Humanity",
      "target": "War Crimes",
      "weight": 4
    },
    {
      "source": "Crimes Against Humanity",
      "target": "Forced Disappearances",
      "weight": 4
    },
    {
      "source": "Impunity",
      "target": "Transitional Justice",
      "weight": 5
    },
    {
      "source": "Transitional Justice",
      "target": "Truth Commissions",
      "weight": 5
    },
    {
      "source": "Transitional Justice",
      "target": "Reparations",
      "weight": 5
    },
    {
      "source": "Genocide",
      "target": "Int'l Criminal Court",
      "weight": 5
    },
    {
      "source": "UN Human Rights Council",
      "target": "Universal Periodic Review",
      "weight": 5
    },
    {
      "source": "UN Human Rights Council",
      "target": "Special Rapporteurs",
      "weight": 4
    },
    {
      "source": "NGOs & Civil Society",
      "target": "HR Defenders",
      "weight": 4
    },
    {
      "source": "NGOs & Civil Society",
      "target": "HR Monitoring",
      "weight": 4
    },
    {
      "source": "Women's Rights",
      "target": "Feminist Movements",
      "weight": 5
    },
    {
      "source": "Racial Equality",
      "target": "Civil Rights Movement",
      "weight": 5
    },
    {
      "source": "Human Dignity",
      "target": "UDHR",
      "weight": 5
    },
    {
      "source": "Right to Education",
      "target": "Children's Rights",
      "weight": 4
    },
    {
      "source": "Digital Rights Activism",
      "target": "Right to Privacy",
      "weight": 4
    },
    {
      "source": "Climate Justice",
      "target": "Environmental Rights",
      "weight": 4
    },
    {
      "source": "Treaty Bodies",
      "target": "Universal Periodic Review",
      "weight": 4
    },
    {
      "source": "Right to Work",
      "target": "Labor Rights Movement",
      "weight": 4
    },
    {
      "source": "Disability Rights",
      "target": "Right to Education",
      "weight": 3
    }
  ]
};
