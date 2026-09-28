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


async function showCreateForm(req, res) {

    try {

        const [entreprises] = await db.execute(`
            SELECT *
            FROM entreprise
            ORDER BY name
        `);

        const [technologies] = await db.execute(`
            SELECT *
            FROM technologie
            ORDER BY nom
        `);

        res.render("admin/create", {
            entreprises,
            technologies
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur serveur");
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
            profilRecherche,
            lienCandidature,
            emailContact
        } = req.body;


        const [result] = await db.execute(
            `
            INSERT INTO offre (
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
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
            ]
        );


        const offreId = result.insertId;


        let technologieIds = req.body.technologies || [];

        if (!Array.isArray(technologieIds)) {
            technologieIds = [technologieIds];
        }


        for (const technologieId of technologieIds) {

            await db.execute(
                `
                INSERT INTO offre_technologie (
                    offre_id,
                    technologie_id
                )
                VALUES (?, ?)
                `,
                [
                    offreId,
                    technologieId
                ]
            );

        }


        res.redirect("/admin/offres");

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur lors de la création");
    }
}


async function showEditForm(req, res) {

    try {

        const id = req.params.id;


        const [offres] = await db.execute(
            `
            SELECT *
            FROM offre
            WHERE id = ?
            `,
            [id]
        );


        if (offres.length === 0) {
            return res.status(404).send("Offre introuvable");
        }


        const [entreprises] = await db.execute(`
            SELECT *
            FROM entreprise
            ORDER BY name
        `);


        const [technologies] = await db.execute(`
            SELECT *
            FROM technologie
            ORDER BY nom
        `);


        const [selectedTechnologies] = await db.execute(
            `
            SELECT technologie_id
            FROM offre_technologie
            WHERE offre_id = ?
            `,
            [id]
        );


        res.render("admin/edit", {
            offre: offres[0],
            entreprises,
            technologies,
            selectedTechnologies
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur serveur");
    }
}


async function updateOffer(req, res) {

    try {

        const id = req.params.id;


        const {
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
        } = req.body;


        await db.execute(
            `
            UPDATE offre
            SET
                entreprise_id = ?,
                titre = ?,
                ville = ?,
                typeContrat = ?,
                datePublication = ?,
                descriptionCourte = ?,
                descriptionLongue = ?,
                profilRecherche = ?,
                lienCandidature = ?,
                emailContact = ?
            WHERE id = ?
            `,
            [
                entreprise_id,
                titre,
                ville,
                typeContrat,
                datePublication,
                descriptionCourte,
                descriptionLongue,
                profilRecherche,
                lienCandidature,
                emailContact,
                id
            ]
        );


        await db.execute(
            `
            DELETE FROM offre_technologie
            WHERE offre_id = ?
            `,
            [id]
        );


        let technologieIds = req.body.technologies || [];

        if (!Array.isArray(technologieIds)) {
            technologieIds = [technologieIds];
        }


        for (const technologieId of technologieIds) {

            await db.execute(
                `
                INSERT INTO offre_technologie (
                    offre_id,
                    technologie_id
                )
                VALUES (?, ?)
                `,
                [
                    id,
                    technologieId
                ]
            );

        }


        res.redirect("/admin/offres");

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur lors de la modification");
    }
}


async function deleteOffer(req, res) {

    try {

        const id = req.params.id;


        await db.execute(
            `
            DELETE FROM offre
            WHERE id = ?
            `,
            [id]
        );


        res.redirect("/admin/offres");

    } catch (error) {

        console.error(error);

        res.status(500).send("Erreur lors de la suppression");
    }
}


module.exports = {
    listOffers,
    showCreateForm,
    createOffer,
    showEditForm,
    updateOffer,
    deleteOffer
};