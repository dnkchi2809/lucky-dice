const VouherSchema = require("../models/voucherModel");

const mongoose = require("mongoose");

const createVoucher = (req,res) => {
    let bodyReq = req.body;

    if(!bodyReq.code){
        return res.status(400).json({
            status : "Error 400",
            message :  "code is required"
        })
    }

    if(!bodyReq.discount){
        return res.status(400).json({
            status : "Error 400",
            message :  "discount is required"
        })
    }

    let newVoucherObj = {
        _id: mongoose.Types.ObjectId(),
        code : bodyReq.code,
        discount : bodyReq.discount,
        note : bodyReq.note
    }

    VouherSchema.create(newVoucherObj, (err,data) =>{
        if (err) {
            return res.status(500).json({
                status: "EROR 500",
                message: err.message
            })
        }
        else {
            return res.status(201).json({
                status: "Success: Create new voucher Success",
                data: data
            })
        }
    })
}

const getAllVoucher = (req,res) => {
    VouherSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET All Voucher success",
                data: data
            })
        }
    })
}

const getVoucherById = (req,res) => {
    //b1: thu thập
    let paramVoucherId = req.params.voucherId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramVoucherId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "voucherId is required"
        })
    }

    //b3: csdl
    VouherSchema.findById(paramVoucherId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET voucher by voucherId = " + paramVoucherId,
                data: data
            })
        }
    })
}

const updateVoucherById = (req,res) => {
    //b1: thu thập
    let bodyReq = req.body;
    console.log(bodyReq);

    let paramVoucherId = req.params.voucherId;
    console.log(paramVoucherId);
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramVoucherId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "voucherId is required"
        })
    }

    //b3: csdl
    //b3.1: tạo object lưu thông tin bodyRequest update
    let updateVoucherObj = {
        code : bodyReq.code,
        discount : bodyReq.discount,
        note : bodyReq.note
    }

    //b3.2: tực hiện xử lý và trả về res
    VouherSchema.findByIdAndUpdate(paramVoucherId, updateVoucherObj, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: Update Voucher Sucess",
                data: data
            })
        }
    })
}

const deleteVoucherById = (req,res) => {
    //b1: thu thập
    let paramVoucherId = req.params.voucherId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramVoucherId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "voucherId is required"
        })
    }

    //b3: csdl
    VouherSchema.findByIdAndDelete(paramVoucherId, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(204).json({
                status: "Success: Delete Voucher Success",
                data: data
            })
        }
    })
}

module.exports = {
    createVoucher,
    getAllVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
}
