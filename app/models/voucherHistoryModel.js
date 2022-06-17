const mongoose = require("mongoose");

const schema = mongoose.Schema;

const voucherHistorySchema = new schema({
    _id : {
        type :  mongoose.Types.ObjectId
    },
    user : {
        type :  mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    voucher : {
        type :  mongoose.Types.ObjectId,
        ref : "Voucher",
        required : true
    },
    createAt : {
        type :  Date,
        default : Date.now()
    },
    updateAt : {
        type :  Date,
        default : Date.now()
    },
})

module.exports = mongoose.model("VoucherHistory", voucherHistorySchema);