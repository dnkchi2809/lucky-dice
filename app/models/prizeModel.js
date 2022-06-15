// khai báo mongoose
const mongoose = require('mongoose');

// khởi tạo schema
const schema = mongoose.Schema;

const prizeSchema = new schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

//export thành một modules
module.exports = mongoose.model("Prize", prizeSchema)