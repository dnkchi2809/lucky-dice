const mongoose = require("mongoose");

const prizeHistorySchema = require("../models/prizeHistoryModel");
const UserSchema = require("../models/userModel");

const createPrizeHistory  = (req, res) => {
    let bodyRequest = req.body;
    console.log(bodyRequest);

    if(!bodyRequest.user){
        return res.status(400).json({
            status : "Error 400",
            message :  "user is required"
        })
    }

    if(!bodyRequest.prize){
        return res.status(400).json({
            status : "Error 400",
            message :  "prize is required"
        })
    }

    let newPrizeHistory = {
        _id : mongoose.Types.ObjectId(),
        user : bodyRequest.user,
        prize : bodyRequest.prize
    }

    prizeHistorySchema.create(newPrizeHistory, (err,data) => {
        if(err){
            return res.status(500).json({
                status : "Status 500",
                message : err.message
            })
        }
        else{
            return res.status(201).json({
                status: "Status 201",
                data: data
            })
        }
    })
}

const getAllPrizeHistory  = (req, res) => {

    let condition = {};

    let userRequest = req.query.user;

    if(userRequest){
        condition.user = userRequest
    }

    prizeHistorySchema.find(condition, (err,data) => {
        if(err){
            return res.status(500).json({
                status : "Status 500",
                message : err.message
            })
        }
        else{
            return res.status(200).json({
                status: "Status 200",
                data: data
            })
        }
    })
}

const getPrizeHistoryById  = (req, res) => {
    let historyId = req.params.historyId;
    console.log(historyId);

    prizeHistorySchema.findById(historyId, (err,data) => {
        if(err){
            return res.status(500).json({
                status : "Status 500",
                message : err.message
            })
        }
        else{
            return res.status(200).json({
                status: "Status 200",
                data: data
            })
        }
    })
}

const updatePrizeHistoryById  = (req, res) => {
    let historyId = req.params.historyId;
    console.log(historyId);

    let bodyRequest = req.body;
    console.log(bodyRequest);

    if(!(mongoose.Types.ObjectId.isValid(historyId))){
        return res.status(400).json({
            status : "Error 400",
            message :  "historyId is required"
        })
    }

    let updatePrizeHistory = {
        user : bodyRequest.user,
        prize : bodyRequest.prize
    }

    prizeHistorySchema.findByIdAndUpdate(historyId, updatePrizeHistory, (err,data) => {
        if(err){
            return res.status(500).json({
                status : "Status 500",
                message : err.message
            })
        }
        else{
            return res.status(200).json({
                status: "Status 200",
                data: data
            })
        }
    })
}

const deletePrizeHistoryById  = (req, res) => {
    let historyId = req.params.historyId;
    console.log(historyId);

    prizeHistorySchema.findByIdAndDelete(historyId, (err,data) => {
        if(err){
            return res.status(500).json({
                status : "Status 500",
                message : err.message
            })
        }
        else{
            return res.status(204).json({
                status: "Status 204",
            })
        }
    })
}

const getPrizeHistoryByUsername = (req, res) => {
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
            prizeHistorySchema.find(conditionUserId, (err, data) => {
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
    createPrizeHistory,
    getAllPrizeHistory,
    getPrizeHistoryById,
    updatePrizeHistoryById,
    deletePrizeHistoryById,
    getPrizeHistoryByUsername
}