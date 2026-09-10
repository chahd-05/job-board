# 📑 Analyse du Cahier des Charges & Spécifications Fonctionnelles

## 1. Reformulation du Besoin Produit
La promotion Développeur MERN 2026/2027 a besoin d'un portail interne centralisé pour rassembler les offres de stage et d'alternance. Actuellement, ces opportunités sont dispersées sur plusieurs canaux (messages, liens, documents partagés). L'application résout ce problème en offrant un espace unique pour consulter, filtrer, trier et suivre les offres facilement.

---

## 2. Personas & Utilisateurs Cibles

### 👨‍🎓 Apprenant
- **Besoin :** Parcourir les offres, filtrer par ville/technologies/contrat, trier par date, consulter les fiches détaillées et enregistrer les offres suivies dans le navigateur.

### 🌐 Visiteur
- **Besoin :** Découvrir les opportunités publiques sans création de compte.

### 🛠️ Administrateur
- **Besoin :** Gérer les offres (création, modification, suppression, association des technologies).

---

## 3. Matrice de Traçabilité (Backlog Jira ↔️ HTML)

| Epic Jira | User Story Jira | Écran / Fichier HTML |
|---|---|---|
| **EPIC 1: Consultation & Filtres** | US-01: Affichage liste des offres | `index.html` |
| **EPIC 1: Consultation & Filtres** | US-02: Fiche détail d'une offre | `offre-detail.html` |
| **EPIC 1: Consultation & Filtres** | US-03: Recherche et filtres | `index.html` (Zone filtres) |
| **EPIC 1: Consultation & Filtres** | US-04: Tri des offres par date | `index.html` (Select Tri) |
| **EPIC 2: Suivi & Dépôt** | US-05: Gestion des offres suivies | `offres-suivies.html` |
| **EPIC 2: Suivi & Dépôt** | US-06: Formulaire de dépôt d'offre | `deposer-offre.html` |
| **EPIC 2: Suivi & Dépôt** | US-07: Administration des offres | `deposer-offre.html` / `offres-suivies.html` |