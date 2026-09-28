const db = require("../config/db");

async function getOffers(filters) {
    let sql = `
        SELECT DISTINCT
            offre.*,
            entreprise.name AS entreprise_name
        FROM offre
        JOIN entreprise ON offre.entreprise_id = entreprise.id
        LEFT JOIN offre_technologie ON offre.id = offre_technologie.offre_id
        LEFT JOIN technologie ON offre_technologie.technologie_id = technologie.id
        WHERE 1 = 1
    `;
    const params = [];

    if (filters.search) {
        sql += ` AND (
            offre.titre LIKE ?
            OR offre.descriptionCourte LIKE ?
            OR entreprise.name LIKE ?
        )`;
        const searchValue = `%${filters.search}%`;
        params.push(searchValue, searchValue, searchValue);
    }

    if (filters.ville) {
        sql += " AND offre.ville = ?";
        params.push(filters.ville);
    }

    if (filters.typeContrat) {
        sql += " AND offre.typeContrat = ?";
        params.push(filters.typeContrat);
    }

    if (filters.technologie) {
        sql += " AND technologie.nom = ?";
        params.push(filters.technologie);
    }

    sql += filters.sort === "asc"
        ? " ORDER BY offre.datePublication ASC"
        : " ORDER BY offre.datePublication DESC";

    const [rows] = await db.execute(sql, params);
    return rows;
}

async function getOfferById(id) {
    const [rows] = await db.execute(
        `SELECT offre.*, entreprise.name AS entreprise_name
        FROM offre
        JOIN entreprise ON offre.entreprise_id = entreprise.id
        WHERE offre.id = ?`,
        [id]
    );
    return rows[0];
}

async function getOfferTechnologies(id) {
    const [rows] = await db.execute(
        `SELECT technologie.nom
        FROM technologie
        JOIN offre_technologie ON technologie.id = offre_technologie.technologie_id
        WHERE offre_technologie.offre_id = ?`,
        [id]
    );
    return rows;
}

async function getAdminOffers() {
    const [rows] = await db.execute(`
        SELECT offre.*, entreprise.name AS entreprise_name
        FROM offre
        JOIN entreprise ON offre.entreprise_id = entreprise.id
        ORDER BY offre.datePublication DESC
    `);
    return rows;
}

async function getEntreprises() {
    const [rows] = await db.execute("SELECT * FROM entreprise ORDER BY name");
    return rows;
}

async function getTechnologies() {
    const [rows] = await db.execute("SELECT * FROM technologie ORDER BY nom");
    return rows;
}

async function getOfferTechnologyIds(id) {
    const [rows] = await db.execute(
        "SELECT technologie_id FROM offre_technologie WHERE offre_id = ?",
        [id]
    );
    return rows;
}

async function createOffer(offer, technologyIds) {
    const [result] = await db.execute(
        `INSERT INTO offre (
            entreprise_id, titre, ville, typeContrat, datePublication,
            descriptionCourte, descriptionLongue, profilRecherche,
            lienCandidature, emailContact
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            offer.entreprise_id,
            offer.titre,
            offer.ville,
            offer.typeContrat,
            offer.datePublication,
            offer.descriptionCourte,
            offer.descriptionLongue,
            offer.profilRecherche,
            offer.lienCandidature,
            offer.emailContact
        ]
    );

    for (const technologyId of technologyIds) {
        await db.execute(
            "INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)",
            [result.insertId, technologyId]
        );
    }
}

async function updateOffer(id, offer, technologyIds) {
    await db.execute(
        `UPDATE offre SET
            entreprise_id = ?, titre = ?, ville = ?, typeContrat = ?,
            datePublication = ?, descriptionCourte = ?, descriptionLongue = ?,
            profilRecherche = ?, lienCandidature = ?, emailContact = ?
        WHERE id = ?`,
        [
            offer.entreprise_id,
            offer.titre,
            offer.ville,
            offer.typeContrat,
            offer.datePublication,
            offer.descriptionCourte,
            offer.descriptionLongue,
            offer.profilRecherche,
            offer.lienCandidature,
            offer.emailContact,
            id
        ]
    );

    await db.execute("DELETE FROM offre_technologie WHERE offre_id = ?", [id]);

    for (const technologyId of technologyIds) {
        await db.execute(
            "INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)",
            [id, technologyId]
        );
    }
}

async function deleteOffer(id) {
    await db.execute("DELETE FROM offre WHERE id = ?", [id]);
}

module.exports = {
    getOffers,
    getOfferById,
    getOfferTechnologies,
    getAdminOffers,
    getEntreprises,
    getTechnologies,
    getOfferTechnologyIds,
    createOffer,
    updateOffer,
    deleteOffer
};