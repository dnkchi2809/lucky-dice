const express = require("express");

const router = express.Router();

const {createUser,getAllUser,getUserById,updateUserById,deleteUserById} = require("../controllers/userController")

router.get("/users", getAllUser);

router.get("/users/:userId", getUserById)

router.post("/users", createUser);

//router.post("/users/:userId/dice-histories", createDiceHistoryOfUser);

router.put("/users/:userId", updateUserById);

router.delete("/users/:userId", deleteUserById);

module.exports = router;