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

async function createOffer(req, res) {
    try {
        const {
            entreprise_id,
            titre, 
            ville,
            typeContrat,
            datePublication,
            descriptionCourte,
            descriptionLongue,
            profileRecherche,
            lienCandidature,
            emailContract
        } = req.body

        const [result] = await db.execute(`INSERT INTO offre (
        entreprise_id, 
        titre, 
        ville, 
        typeContrat,
        datePublication,
        descriptionCourte,
        descriptionLongue,
        profileRecherche,
        lienCandidature,
        emailContract
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        [entreprise_id, 
        titre, 
        ville, 
        typeContrat,
        datePublication,
        descriptionCourte,
        descriptionLongue,
        profileRecherche,
        lienCandidature,
        emailContract]
    )

    const offerId = result.insertId

    let technologieIds = req.body.technologies || []

    if(!Array.isArray(technologieIds)){
        technologieIds = [technologieIds]
    }

    for (const technologieId of technologieIds) {
        await db.execute(`INSERT INTO offre_technologie(offer_id, technologie_id) 
            VALUES(?, ?)`
            [offerId, technologieId]
        )
    }
    res.redirect("/admin/offres")
    }
    catch(error) {
        console.log(error)
        res.status(500).send("error in creation")
    }
}
