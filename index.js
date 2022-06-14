// import thư viện express
const express = require('express');
const path = require('path');

// import mongoose
const mongoose = require('mongoose');
// import model
const userModel = require('./app/models/userModel')
const DiceHistoryModel = require('./app/models/diceHistoryModel')

// khởi tạo app
const app = express();

// thiết lập app đọc được hình ảnh
app.use(express.static(__dirname + '/view'))

// khai báo middleware đọc được json
app.use(express.json());


// khai báo middleware đọc dữ liệu utf-8
app.use(express.urlencoded({
    extended: true
}))

//khai báo cổng chạy app
const port = 8000;

mongoose.connect("mongodb://localhost:27017/CRUD_Lucky_Dice", (err) => {    
    if (err) {
        throw err;
    }
    console.log("Connect mongoDB successfully")
})

// khai báo middle ware
app.use((request, response, next) => {
    console.log("Time:", new Date)
    next()
})
app.use((request, response, next) => {
    console.log("Method: ", request.method)
    next()
})


app.use("/view", (request, response) => {
    console.log(__dirname);
    response.sendFile(path.join(__dirname + "/view/index.html"))
})


// chạy app
app.listen(port, () => {
    console.log(`app listen on port (app đang chạy trên cổng ${port})`)
})