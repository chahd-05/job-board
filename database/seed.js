require("dotenv").config();
const mysql = require("mysql2/promise");

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log("✅ Connected to MySQL");

  try {
    // Nettoyer les anciennes données
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");

    await connection.query("TRUNCATE TABLE offre_technologie");
    await connection.query("TRUNCATE TABLE offre");
    await connection.query("TRUNCATE TABLE technologie");
    await connection.query("TRUNCATE TABLE entreprise");

    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("🧹 Old data deleted");

    // =========================
    // ENTREPRISES
    // =========================

    const entreprises = [
      "TechCorp",
      "Maroc Digital",
      "Web Solutions",
      "Atlas IT",
      "NextGen"
    ];

    const entrepriseIds = {};

    for (const name of entreprises) {
      const [result] = await connection.execute(
        "INSERT INTO entreprise (name) VALUES (?)",
        [name]
      );

      entrepriseIds[name] = result.insertId;
    }

    console.log("✅ Entreprises inserted");

    // =========================
    // TECHNOLOGIES
    // =========================

    const technologies = [
      "JavaScript",
      "PHP",
      "Node.js",
      "React",
      "Vue.js",
      "MySQL",
      "Python",
      "Laravel"
    ];

    const technologieIds = {};

    for (const name of technologies) {
      const [result] = await connection.execute(
        "INSERT INTO technologie (nom) VALUES (?)",
        [name]
      );

      technologieIds[name] = result.insertId;
    }

    console.log("✅ Technologies inserted");

    // =========================
    // OFFRES
    // =========================

    const offres = [
      {
        entreprise: "TechCorp",
        titre: "Développeur JavaScript",
        ville: "Casablanca",
        typeContrat: "CDI",
        datePublication: "2026-09-01",
        descriptionCourte: "Développement d'applications web modernes.",
        descriptionLongue:
          "Vous participerez au développement et à la maintenance de plusieurs applications web.",
        profilRecherche:
          "Maîtrise de JavaScript et bonnes bases en développement web.",
        lienCandidature: "https://example.com/apply",
        emailContact: "recrutement@techcorp.ma"
      },

      {
        entreprise: "Maroc Digital",
        titre: "Développeur PHP Laravel",
        ville: "Rabat",
        typeContrat: "CDI",
        datePublication: "2026-09-02",
        descriptionCourte: "Développement backend avec PHP et Laravel.",
        descriptionLongue:
          "Développement de nouvelles fonctionnalités backend et maintenance des applications.",
        profilRecherche: "PHP, Laravel, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@marocdigital.ma"
      },

      {
        entreprise: "Web Solutions",
        titre: "Développeur React",
        ville: "Casablanca",
        typeContrat: "CDD",
        datePublication: "2026-09-03",
        descriptionCourte: "Création d'interfaces web avec React.",
        descriptionLongue:
          "Vous développerez des interfaces modernes et responsives.",
        profilRecherche: "React, JavaScript, HTML, CSS.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@websolutions.ma"
      },

      {
        entreprise: "Atlas IT",
        titre: "Développeur Node.js",
        ville: "Marrakech",
        typeContrat: "CDI",
        datePublication: "2026-09-04",
        descriptionCourte: "Développement d'API avec Node.js.",
        descriptionLongue:
          "Conception et développement d'API REST.",
        profilRecherche: "Node.js, JavaScript, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@atlasit.ma"
      },

      {
        entreprise: "NextGen",
        titre: "Développeur Python",
        ville: "Tanger",
        typeContrat: "CDI",
        datePublication: "2026-09-05",
        descriptionCourte: "Développement backend Python.",
        descriptionLongue:
          "Développement de services backend et automatisation.",
        profilRecherche: "Python, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@nextgen.ma"
      },

      {
        entreprise: "TechCorp",
        titre: "Frontend Developer",
        ville: "Casablanca",
        typeContrat: "Stage",
        datePublication: "2026-09-06",
        descriptionCourte: "Stage en développement frontend.",
        descriptionLongue:
          "Participation au développement des interfaces utilisateur.",
        profilRecherche: "JavaScript, React.",
        lienCandidature: "https://example.com/apply",
        emailContact: "stage@techcorp.ma"
      },

      {
        entreprise: "Maroc Digital",
        titre: "Backend Developer",
        ville: "Rabat",
        typeContrat: "CDI",
        datePublication: "2026-09-07",
        descriptionCourte: "Développement backend.",
        descriptionLongue:
          "Conception et maintenance des services backend.",
        profilRecherche: "PHP, Laravel, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@marocdigital.ma"
      },

      {
        entreprise: "Web Solutions",
        titre: "Full Stack Developer",
        ville: "Agadir",
        typeContrat: "CDI",
        datePublication: "2026-09-08",
        descriptionCourte: "Développement frontend et backend.",
        descriptionLongue:
          "Développement complet d'applications web.",
        profilRecherche:
          "JavaScript, Node.js, React, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@websolutions.ma"
      },

      {
        entreprise: "Atlas IT",
        titre: "Développeur Vue.js",
        ville: "Marrakech",
        typeContrat: "CDD",
        datePublication: "2026-09-09",
        descriptionCourte: "Développement frontend avec Vue.js.",
        descriptionLongue:
          "Création d'interfaces web avec Vue.js.",
        profilRecherche: "Vue.js, JavaScript.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@atlasit.ma"
      },

      {
        entreprise: "NextGen",
        titre: "Développeur JavaScript Junior",
        ville: "Tanger",
        typeContrat: "Stage",
        datePublication: "2026-09-10",
        descriptionCourte:
          "Stage pour développeur JavaScript junior.",
        descriptionLongue:
          "Participation aux projets web de l'entreprise.",
        profilRecherche: "JavaScript, HTML, CSS.",
        lienCandidature: "https://example.com/apply",
        emailContact: "stage@nextgen.ma"
      },

      {
        entreprise: "TechCorp",
        titre: "Ingénieur Backend",
        ville: "Casablanca",
        typeContrat: "CDI",
        datePublication: "2026-09-11",
        descriptionCourte:
          "Développement de services backend.",
        descriptionLongue:
          "Conception d'architectures backend performantes.",
        profilRecherche:
          "Node.js, MySQL, JavaScript.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@techcorp.ma"
      },

      {
        entreprise: "Maroc Digital",
        titre: "Développeur Web",
        ville: "Rabat",
        typeContrat: "CDI",
        datePublication: "2026-09-12",
        descriptionCourte:
          "Développement d'applications web.",
        descriptionLongue:
          "Participation au développement de nouvelles plateformes web.",
        profilRecherche:
          "JavaScript, PHP, MySQL.",
        lienCandidature: "https://example.com/apply",
        emailContact: "jobs@marocdigital.ma"
      }
    ];

    const offreIds = [];

    for (const offre of offres) {
      const [result] = await connection.execute(
        `INSERT INTO offre
        (
          entreprise_id,
          titre,
          ville,
          typeContrat,
          datePublication,
          descriptionCourte,
          descriptionLongue,
          profilRecherche,
          lienCandidature,
          emailContact
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entrepriseIds[offre.entreprise],
          offre.titre,
          offre.ville,
          offre.typeContrat,
          offre.datePublication,
          offre.descriptionCourte,
          offre.descriptionLongue,
          offre.profilRecherche,
          offre.lienCandidature,
          offre.emailContact
        ]
      );

      offreIds.push(result.insertId);
    }

    console.log("✅ 12 offres inserted");

    // =========================
    // OFFRE <-> TECHNOLOGIE
    // =========================

    const relations = [
      [0, ["JavaScript", "React"]],
      [1, ["PHP", "Laravel", "MySQL"]],
      [2, ["JavaScript", "React"]],
      [3, ["Node.js", "JavaScript", "MySQL"]],
      [4, ["Python", "MySQL"]],
      [5, ["JavaScript", "React"]],
      [6, ["PHP", "Laravel", "MySQL"]],
      [7, ["JavaScript", "Node.js", "React", "MySQL"]],
      [8, ["Vue.js", "JavaScript"]],
      [9, ["JavaScript"]],
      [10, ["Node.js", "JavaScript", "MySQL"]],
      [11, ["JavaScript", "PHP", "MySQL"]]
    ];

    for (const [index, techs] of relations) {
      for (const tech of techs) {
        await connection.execute(
          `INSERT INTO offre_technologie
          (offre_id, technologie_id)
          VALUES (?, ?)`,
          [
            offreIds[index],
            technologieIds[tech]
          ]
        );
      }
    }

    console.log("✅ Offer-technologie relations inserted");
    console.log("🎉 Seed terminé avec succès !");
  } catch (error) {
    console.error("❌ Seed error :", error);
  } finally {
    await connection.end();
  }
}

seed();