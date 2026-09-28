const offresRepository = require("../repositories/offresRepository");

async function getOffers(req, res) {
    try {
        const filters = {
            search: req.query.search || "",
            ville: req.query.ville || "",
            typeContrat: req.query.typeContrat || "",
            technologie: req.query.technologie || "",
            sort: req.query.sort || "desc"
        };

        const offres = await offresRepository.getOffers(filters);
        res.render("offres/index", { offres, ...filters });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}

async function getOfferDetail(req, res) {
    try {
        const offre = await offresRepository.getOfferById(req.params.id);

        if (!offre) {
            return res.status(404).send("Offre introuvable");
        }

        const technologies = await offresRepository.getOfferTechnologies(req.params.id);
        res.render("offres/detail", { offre, technologies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
}

function showFollowedOffers(req, res) {
    res.render("offres/suivies");
}

module.exports = {
    getOffers,
    getOfferDetail,
    showFollowedOffers
};