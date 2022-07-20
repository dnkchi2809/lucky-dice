// import thư viện express
const express = require('express');
const path = require('path');

// import mongoose
const mongoose = require('mongoose');
// import model
const userModel = require('./app/models/userModel');
const DiceHistoryModel = require('./app/models/diceHistoryModel');
const prizeModel = require('./app/models/prizeModel');
const voucherModel = require('./app/models/voucherModel');
const voucherHistoryModel = require('./app/models/voucherHistoryModel');
const prizeHistoryModel = require('./app/models/prizeHistoryModel')

const userRouter = require("./app/routers/userRouter");
const diceHistoryRouter = require("./app/routers/diceHistoryRouter");
const prizeRouter = require("./app/routers/prizeRouter");
const voucherRouter = require("./app/routers/voucherRouter");
const prizeHistoryRouter = require("./app/routers/prizeHistoryRouter");
const voucherHistoryRouter = require("./app/routers/voucherHistoryRouter");
const diceRouter = require("./app/routers/diceRouter");

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

app.use("/", userRouter);
app.use("/", diceHistoryRouter);
app.use("/", prizeRouter);
app.use("/", voucherRouter);
app.use("/", prizeHistoryRouter);
app.use("/", voucherHistoryRouter);
app.use("/", diceRouter);

// chạy app
app.listen(process.env.PORT || port, () => {
    console.log(`app listen on port (app đang chạy)`)
})