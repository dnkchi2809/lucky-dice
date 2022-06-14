// khai báo mongoose
const mongoose = require('mongoose');

// khởi tạo schema
const schema = mongoose.Schema;

const UserSchema = new schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
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
module.exports = mongoose.model("User", UserSchema)