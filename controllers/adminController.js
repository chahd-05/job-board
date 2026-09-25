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

async function showCreateFrom(req, res) {
    try {
        const [entreprises] = await db.execute(`SELECT * FROM entreprise ORDER BY name`)

        const [technologies] = await db.execute(`SELECT * FROM technologie ORDER BY nom `)

        res.render("admin / create", {
            entreprises, 
            technologies
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
