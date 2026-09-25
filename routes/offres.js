const express = require("express");

const router = express.Router();

const {
    getOffers,
    getOfferDetail
} = require("../controllers/offresController");


router.get("/", getOffers);

router.get("/:id", getOfferDetail);


module.exports = router;