const db = require("../config/db");


async function listOffers(req, res) {

    try {

        const [offres] = await db.execute(`
            SELECT
                offre.*,
                entreprise.name AS entreprise_name
            FROM offre
            JOIN entreprise
                ON offre.entreprise_id = entreprise.id
            ORDER BY offre.datePublication DESC
        `);

        res.render("admin/index", {
            offres
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur serveur");
    }
}
