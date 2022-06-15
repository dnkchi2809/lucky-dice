const UserSchema = require("../models/userModel");

const mongoose = require("mongoose");

const createUser = (req,res) => {
    let bodyReq = req.body;

    if(!bodyReq.username){
        return res.status(400).json({
            status : "Error 400",
            message :  "username is required"
        })
    }

    if(!bodyReq.firstname){
        return res.status(400).json({
            status : "Error 400",
            message :  "firstname is required"
        })
    }

    if(!bodyReq.lastname){
        return res.status(400).json({
            status : "Error 400",
            message :  "lastname is required"
        })
    }

    let newUserObj = {
        _id: mongoose.Types.ObjectId(),
        username : bodyReq.username,
        firstname : bodyReq.firstname,
        lastname : bodyReq.lastname,
    }

    UserSchema.create(newUserObj, (err,data) =>{
        if (err) {
            return res.status(500).json({
                status: "EROR 500",
                message: err.message
            })
        }
        else {
            return res.status(201).json({
                status: "Success: Create User Sucess",
                data: data
            })
        }
    })
}

const getAllUser = (req,res) => {
    UserSchema.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET All user success",
                data: data
            })
        }
    })
}

const getUserById = (req,res) => {
    //b1: thu thập
    let paramUserId = req.params.userId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramUserId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "userId is required"
        })
    }

    //b3: csdl
    UserSchema.findById(paramUserId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "EROR 500: Internal Server Error",
                message: err.message
            })
        }
        else {
            res.status(200).json({
                status: "Success: GET user by userId = " + paramUserId,
                data: data
            })
        }
    })
}

const updateUserById = (req,res) => {
    //b1: thu thập
    let bodyReq = req.body;
    console.log(bodyReq);

    let paramUserId = req.params.userId;
    console.log(paramUserId);
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramUserId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "userId is required"
        })
    }

    //b3: csdl
    //b3.1: tạo object lưu thông tin bodyRequest update
    let updateUserObj = {
        username : bodyReq.username,
        firstname : bodyReq.firstname,
        lastname : bodyReq.lastname,
    }

    //b3.2: tực hiện xử lý và trả về res
    UserSchema.findByIdAndUpdate(paramUserId, updateUserObj, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success: Update User Sucess",
                data: data
            })
        }
    })
}

const deleteUserById = (req,res) => {
    //b1: thu thập
    let paramUserId = req.params.userId;
    //b2: validate
    if (!(mongoose.Types.ObjectId.isValid(paramUserId))) {
        res.status(400).json({
            status: "ERROR 400: Bad Request",
            message: "userId is required"
        })
    }

    //b3: csdl
    UserSchema.findByIdAndDelete(paramUserId, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "EROR 400: Bad Request",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success: Delete User Sucess",
                data: data
            })
        }
    })
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}
