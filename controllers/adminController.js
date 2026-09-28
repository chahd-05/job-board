const offresRepository = require("../repositories/offresRepository");

function getTechnologyIds(value) {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}

function hasRequiredFields(offer) {
    const requiredFields = [
        "entreprise_id",
        "titre",
        "ville",
        "typeContrat",
        "datePublication"
    ];

    return requiredFields.every((field) => String(offer[field] || "").trim() !== "");
}

async function listOffers(req, res) {
    try {
        const offres = await offresRepository.getAdminOffers();
        res.render("admin/index", { offres });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}

async function showCreateForm(req, res) {
    try {
        const entreprises = await offresRepository.getEntreprises();
        const technologies = await offresRepository.getTechnologies();
        res.render("admin/create", { entreprises, technologies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}

async function createOffer(req, res) {
    if (!hasRequiredFields(req.body)) {
        return res.status(400).send("Veuillez remplir les champs obligatoires");
    }

    try {
        await offresRepository.createOffer(
            req.body,
            getTechnologyIds(req.body.technologies)
        );
        res.redirect("/admin/offres");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création");
    }
}

async function showEditForm(req, res) {
    try {
        const id = req.params.id;
        const offre = await offresRepository.getOfferById(id);

        if (!offre) {
            return res.status(404).send("Offre introuvable");
        }

        const entreprises = await offresRepository.getEntreprises();
        const technologies = await offresRepository.getTechnologies();
        const selectedTechnologies = await offresRepository.getOfferTechnologyIds(id);

        res.render("admin/edit", {
            offre,
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
    if (!hasRequiredFields(req.body)) {
        return res.status(400).send("Veuillez remplir les champs obligatoires");
    }

    try {
        await offresRepository.updateOffer(
            req.params.id,
            req.body,
            getTechnologyIds(req.body.technologies)
        );
        res.redirect("/admin/offres");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la modification");
    }
}

async function deleteOffer(req, res) {
    try {
        await offresRepository.deleteOffer(req.params.id);
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