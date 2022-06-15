const PrizeSchema = require("../models/prizeModel");

const mongoose = require("mongoose");

const createPrize = (req,res) => {
    let bodyReq = req.body;

    if(!bodyReq.name){
        return res.status(400).json({
            status : "Error 400",
            message :  "name is required"
        })
    }

    let newPrizeObj = {
        _id: mongoose.Types.ObjectId(),
        name : bodyReq.name,
        description : bodyReq.description
    }

    PrizeSchema.create(newPrizeObj, (err,data) =>{
        if (err) {
            return res.status(500).json({
                status: "EROR 500",
                message: err.message
            })
        }
        else {
            return res.status(201).json({
                status: "Success: Create Prize Sucess",
                data: data
            })
        }
    })
}

const getAllPrize = (req,res) => {
    PrizeSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET All Prize success",
                data: data
            })
        }
    })
}

const getPrizeById = (req,res) => {
    //b1: thu thập
    let paramPrizeId = req.params.prizeId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramPrizeId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "prizeId is required"
        })
    }

    //b3: csdl
    PrizeSchema.findById(paramPrizeId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET prize by prizeId = " + paramPrizeId,
                data: data
            })
        }
    })
}

const updatePrizeById = (req,res) => {
    //b1: thu thập
    let bodyReq = req.body;
    console.log(bodyReq);

    let paramPrizeId = req.params.prizeId;
    console.log(paramPrizeId);
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramPrizeId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "prizeId is required"
        })
    }

    //b3: csdl
    //b3.1: tạo object lưu thông tin bodyRequest update
    let updatePrizeObj = {
        name : bodyReq.name,
        description : bodyReq.description
    }

    //b3.2: tực hiện xử lý và trả về res
    PrizeSchema.findByIdAndUpdate(paramPrizeId, updatePrizeObj, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: Update Prize Sucess",
                data: data
            })
        }
    })
}

const deletePrizeById = (req,res) => {
    //b1: thu thập
    let paramPrizeId = req.params.prizeId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramPrizeId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "prizeId is required"
        })
    }

    //b3: csdl
    PrizeSchema.findByIdAndDelete(paramPrizeId, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(204).json({
                status: "Success: Delete Prize Sucess",
                data: data
            })
        }
    })
}

module.exports = {
    createPrize,
    getAllPrize,
    getPrizeById,
    updatePrizeById,
    deletePrizeById
}
