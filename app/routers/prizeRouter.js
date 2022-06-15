const express = require("express");

const router = express.Router();

const {
    createPrize,
    getAllPrize,
    getPrizeById,
    updatePrizeById,
    deletePrizeById
} = require("../controllers/prizeController")

router.get("/prizes", getAllPrize);

router.get("/prizes/:prizeId", getPrizeById)

router.post("/prizes", createPrize);

router.put("/prizes/:prizeId", updatePrizeById);

router.delete("/prizes/:prizeId", deletePrizeById);

module.exports = router;