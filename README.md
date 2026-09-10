# 🎓 Portail Stages & Alternances — Promotion MERN 2026/2027

Projet d'application web centralisant les offres de stage et d'alternance pour les apprenants de la formation Développeur Fullstack MERN.

---

## 🎯 Contexte & Objectifs du Projet

Aujourd'hui, les opportunités professionnelles pour les apprenants sont souvent dispersées sur plusieurs canaux (messages, liens solennels, réseaux sociaux). Ce portail web vise à **centraliser, filtrer et suivre** facilement les opportunités de stage et d'alternance au sein d'une interface claire et accessible sans authentification obligatoire.

### Fonctionnalités principales (Sprint 1)
- 📋 **Liste des offres :** Consultation des offres disponibles avec leurs caractéristiques clés.
- 🔍 **Filtres & Recherche :** Interface visuelle préparée pour filtrer par ville, technologie et type de contrat.
- 📄 **Fiche détail :** Affichage de la mission complète, du profil recherché et des modalités de candidature.
- ➕ **Dépôt d'offre :** Formulaire de saisie d'une nouvelle opportunité par un recruteur.
- ⭐ **Offres suivies :** Espace de consultation des opportunités sauvegardées dans le navigateur.

---

## 🛠️ Stack Technique & Contraintes Respectées

- **HTML5 Sémantique :** Utilisation structurée des balises (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<form>`).
- **CSS3 Natif :** Utilisation de variables CSS (`:root`), Flexbox, CSS Grid et design responsive (Mobile, Tablette, Desktop).
- **Git & GitHub :** Workflow propre avec branches thématiques (`brief-1/project-setup`, `brief-1/static-templates`).
- **Conception UI/UX :** Respect d'une charte graphique simple, sobre et accessible.

---

## 📂 Structure du Dépôt

```text
job-board/
│── index.html             # Page d'accueil : Liste des offres & filtres
│── offre-detail.html      # Fiche détail d'une offre
│── deposer-offre.html     # Formulaire de dépôt d'offre
│── offres-suivies.html    # Zone des offres favoris/suivies
│── css/
│   └── style.css          # Fichier de styles global (Variables CSS, Grid, Flexbox)
│── docs/
│   │── analyse-cahier-des-charges.md  # Analyse du besoin et User Stories
│   │── jira-export.md                # Structure du backlog Jira (Epics/Tasks)
│   └── figma-link.md                 # Liens vers l'arborescence et les maquettes Figma
└── README.md              # Documentation globale du projet
