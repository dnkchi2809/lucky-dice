const express = require("express");

const router = express.Router();

const {
    createPrizeHistory,
    getAllPrizeHistory,
    getPrizeHistoryById,
    updatePrizeHistoryById,
    deletePrizeHistoryById,
    getPrizeHistoryByUsername
} = require("../controllers/prizeHistoryController");

router.post("/prize-histories", createPrizeHistory);

router.get("/prize-histories", getAllPrizeHistory);

router.get("/prize-histories/:historyId", getPrizeHistoryById);

router.put("/prize-histories/:historyId", updatePrizeHistoryById);

router.delete("/prize-histories/:historyId", deletePrizeHistoryById);

router.get("/devcamp-lucky-dice/prize-history", getPrizeHistoryByUsername);

module.exports = router;
