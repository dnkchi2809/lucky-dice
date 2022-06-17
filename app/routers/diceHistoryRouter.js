const express = require("express");

const router = express.Router();

const {
    createDiceHistory,
    getAllDiceHistory,
    getDiceHistoryById,
    updateDiceHistoryById,
    deleteDiceHistoryById,
    getDiceHistoryByUsername
} = require("../controllers/diceHistoryController")

router.get("/dice-histories", getAllDiceHistory);

router.get("/dice-histories/:diceHistoryId", getDiceHistoryById)

router.post("/dice-histories", createDiceHistory);

router.put("/dice-histories/:diceHistoryId", updateDiceHistoryById);

router.delete("/dice-histories/:diceHistoryId", deleteDiceHistoryById);

router.get("/devcamp-lucky-dice/dice-history", getDiceHistoryByUsername);

module.exports = router;