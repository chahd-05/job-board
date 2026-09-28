const express = require("express");

const router = express.Router();

const {
    getOffers,
    getOfferDetail,
    showFollowedOffers
} = require("../controllers/offresController");


router.get("/", getOffers);

router.get("/suivies", showFollowedOffers);

router.get("/:id", getOfferDetail);


module.exports = router;