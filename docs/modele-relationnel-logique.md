# Modèle relationnel logique

Le modèle correspond au schéma SQL existant. `PK` désigne une clé primaire et `FK` une clé étrangère.

- **entreprise** (`id` PK, `name`)
- **offre** (`id` PK, `entreprise_id` FK → `entreprise.id`, `titre`, `ville`, `typeContrat`, `datePublication`, `descriptionCourte`, `descriptionLongue`, `profilRecherche`, `lienCandidature`, `emailContact`)
- **technologie** (`id` PK, `nom`)
- **offre_technologie** (`offre_id` PK/FK → `offre.id`, `technologie_id` PK/FK → `technologie.id`)

Une entreprise peut proposer plusieurs offres. Une offre peut être associée à plusieurs technologies, et une technologie peut être associée à plusieurs offres. La table `offre_technologie` matérialise cette relation plusieurs-à-plusieurs avec une clé primaire composée de `offre_id` et `technologie_id`.