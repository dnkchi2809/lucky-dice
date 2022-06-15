// khai báo mongoose
const mongoose = require('mongoose');

// khởi tạo schema
const schema = mongoose.Schema;

const DiceHistorySchema = new schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required :  true,
        ref: "User"
    },
    dice : {
        type: Number,
        required :  true
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
module.exports = mongoose.model("DiceHistory", DiceHistorySchema )