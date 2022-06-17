const express = require("express");

const router = express.Router();

const {diceHandler} = require("../controllers/diceController");

router.post("/devcamp-lucky-dice/dice", diceHandler);

module.exports = router;