const mongoose = require("mongoose");

const voucherHistorySchema = require("../models/voucherHistoryModel");
const UserSchema = require("../models/userModel");

const createVoucherHistory  = (req, res) => {
    let bodyRequest = req.body;
    console.log(bodyRequest);

    if(!bodyRequest.user){
        return res.status(400).json({
            status : "Error 400",
            message :  "user is required"
        })
    }

    if(!bodyRequest.voucher){
        return res.status(400).json({
            status : "Error 400",
            message :  "voucher is required"
        })
    }

    let newVoucherHistory = {
        _id : mongoose.Types.ObjectId(),
        user : bodyRequest.user,
        voucher : bodyRequest.voucher
    }

    voucherHistorySchema.create(newVoucherHistory, (err,data) => {
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

const getAllVoucherHistory  = (req, res) => {

    let condition = {};

    let userRequest = req.query.user;

    if(userRequest){
        condition.user = userRequest
    }

    voucherHistorySchema.find(condition, (err,data) => {
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

const getVoucherHistoryById  = (req, res) => {
    let historyId = req.params.historyId;
    console.log(historyId);

    voucherHistorySchema.findById(historyId, (err,data) => {
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

const updateVoucherHistoryById  = (req, res) => {
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

    let updateVoucherHistory = {
        user : bodyRequest.user,
        voucher : bodyRequest.voucher
    }

    voucherHistorySchema.findByIdAndUpdate(historyId, updateVoucherHistory, (err,data) => {
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

const deleteVoucherHistoryById  = (req, res) => {
    let historyId = req.params.historyId;
    console.log(historyId);

    voucherHistorySchema.findByIdAndDelete(historyId, (err,data) => {
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

const getVoucherHistoryByUsername = (req, res) => {
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
            voucherHistorySchema.find(conditionUserId, (err, data) => {
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
    createVoucherHistory,
    getAllVoucherHistory,
    getVoucherHistoryById,
    updateVoucherHistoryById,
    deleteVoucherHistoryById,
    getVoucherHistoryByUsername
}