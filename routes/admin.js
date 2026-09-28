const express = require("express");

const router = express.Router();

const {
    listOffers,
    showCreateForm,
    createOffer,
    showEditForm,
    updateOffer,
    deleteOffer
} = require("../controllers/adminController");


router.get("/offres", listOffers);

router.get("/offres/create", showCreateForm);

router.post("/offres/create", createOffer);

router.get("/offres/:id/edit", showEditForm);

router.post("/offres/:id/edit", updateOffer);

router.post("/offres/:id/delete", deleteOffer);


module.exports = router;