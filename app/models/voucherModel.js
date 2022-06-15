// khai báo mongoose
const mongoose = require('mongoose');

// khởi tạo schema
const schema = mongoose.Schema;

const voucherSchema = new schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    note : {
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
module.exports = mongoose.model("Voucher", voucherSchema)