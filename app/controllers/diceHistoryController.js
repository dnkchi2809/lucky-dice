const DiceHistorySchema = require("../models/diceHistoryModel");

const UserSchema = require("../models/userModel");

const mongoose = require("mongoose");

const createDiceHistory = (req,res) => {
    let bodyReq = req.body;

    if(!bodyReq.user){
        return res.status(400).json({
            status : "Error 400",
            message :  "username is required"
        })
    }

    if(!bodyReq.dice){
        return res.status(400).json({
            status : "Error 400",
            message :  "dice is required"
        })
    }


    let newDiceHistoryObj = {
        _id: mongoose.Types.ObjectId(),
        user : bodyReq.user,
        dice : bodyReq.dice
    }

    DiceHistorySchema.create(newDiceHistoryObj, (err,data) =>{
        if (err) {
            return res.status(500).json({
                status: "EROR 500",
                message: err.message
            })
        }
        else {
            return res.status(201).json({
                status: "Success: Create Dice History Sucess",
                data: data
            })
        }
    })
}

const getAllDiceHistory = (req,res) => {
    let condition = {};

    let userRequest = req.query.user;

    if(userRequest){
        condition.user = userRequest
    }


    DiceHistorySchema.find(condition, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET All Dice History success",
                data: data
            })
        }
    })
}

const getDiceHistoryById = (req,res) => {
    //b1: thu thập
    let paramDiceHistoryId = req.params.diceHistoryId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramDiceHistoryId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "diceHistoryId is required"
        })
    }

    //b3: csdl
    DiceHistorySchema.findById(paramDiceHistoryId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET dice history by userId = " + paramDiceHistoryId,
                data: data
            })
        }
    })
}

const updateDiceHistoryById = (req,res) => {
    //b1: thu thập
    let bodyReq = req.body;
    console.log(bodyReq);

    let paramDiceHistoryId = req.params.diceHistoryId;
    console.log(paramDiceHistoryId);
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramDiceHistoryId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "diceHistoryId is required"
        })
    }

    //b3: csdl
    //b3.1: tạo object lưu thông tin bodyRequest update
    let updateDiceHistoryObj = {
        user : bodyReq.user,
        dice : bodyReq.dice
    }

    //b3.2: tực hiện xử lý và trả về res
    DiceHistorySchema.findByIdAndUpdate(paramDiceHistoryId, updateDiceHistoryObj, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success: Update Dice History Sucess",
                data: data
            })
        }
    })
}

const deleteDiceHistoryById = (req,res) => {
    //b1: thu thập
    let paramDiceHistoryId = req.params.diceHistoryId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramDiceHistoryId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "diceHistoryId is required"
        })
    }

    //b3: csdl
    DiceHistorySchema.findByIdAndDelete(paramDiceHistoryId, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success: Delete Dice History Sucess",
                data: data
            })
        }
    })
}

const getDiceHistoryByUsername = (req, res) => {
    let condition = {};
    let conditionUserId = {};

    let usernameRequest = req.query.username;
    console.log(usernameRequest);

    if(usernameRequest){
        condition.username = usernameRequest
    }

    UserSchema.find(condition, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 400: Bad request",
                message: err.message
            })
        }
        else {
            //console.log(data);
            conditionUserId.user = data;
            console.log(conditionUserId.user);
            DiceHistorySchema.find(conditionUserId, (err, data) => {
                if (err) {
                    res.status(500).json({
                        status: "EROR 500: Internal Server Error",
                        message: err.message
                    })
                }
                else {
                    res.status(200).json({
                        status: "Success: GET All Dice History success",
                        data: data
                    })
                }
            })
        }
    })
}

module.exports = {
    createDiceHistory,
    getAllDiceHistory,
    getDiceHistoryById,
    updateDiceHistoryById,
    deleteDiceHistoryById,
    getDiceHistoryByUsername
}
