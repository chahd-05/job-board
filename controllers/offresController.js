const db = require("../config/db");

async function getOffers(req, res) {
    try {
        const search = req.query.search || "";
        const ville = req.query.ville || "";
        const typeContrat = req.query.typeContrat || "";
        const technologie = req.query.technologie || "";
        const sort = req.query.sort || "desc";

        let sql = `
            SELECT DISTINCT
                offre.*,
                entreprise.name AS entreprise_name
            FROM offre
            JOIN entreprise
                ON offre.entreprise_id = entreprise.id
            LEFT JOIN offre_technologie
                ON offre.id = offre_technologie.offre_id
            LEFT JOIN technologie
                ON offre_technologie.technologie_id = technologie.id
            WHERE 1 = 1
        `;

        const params = [];

        if (search) {
            sql += `
                AND (
                    offre.titre LIKE ?
                    OR offre.descriptionCourte LIKE ?
                    OR entreprise.name LIKE ?
                )
            `;

            const searchValue = `%${search}%`;

            params.push(
                searchValue,
                searchValue,
                searchValue
            );
        }

        if (ville) {
            sql += ` AND offre.ville = ?`;
            params.push(ville);
        }

        if (typeContrat) {
            sql += ` AND offre.typeContrat = ?`;
            params.push(typeContrat);
        }

        if (technologie) {
            sql += ` AND technologie.nom = ?`;
            params.push(technologie);
        }

        if (sort === "asc") {
            sql += ` ORDER BY offre.datePublication ASC`;
        } else {
            sql += ` ORDER BY offre.datePublication DESC`;
        }

        const [offres] = await db.execute(sql, params);

        res.render("offres/index", {
            offres,
            search,
            ville,
            typeContrat,
            technologie,
            sort
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}


async function getOfferDetail(req, res) {
    try {
        const id = req.params.id;

        const [offres] = await db.execute(
            `
            SELECT
                offre.*,
                entreprise.name AS entreprise_name
            FROM offre
            JOIN entreprise
                ON offre.entreprise_id = entreprise.id
            WHERE offre.id = ?
            `,
            [id]
        );

        if (offres.length === 0) {
            return res.status(404).send("Offre introuvable");
        }

        const [technologies] = await db.execute(
            `
            SELECT technologie.nom
            FROM technologie
            JOIN offre_technologie
                ON technologie.id = offre_technologie.technologie_id
            WHERE offre_technologie.offre_id = ?
            `,
            [id]
        );

        res.render("offres/detail", {
            offre: offres[0],
            technologies
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}


module.exports = {
    getOffers,
    getOfferDetail
};