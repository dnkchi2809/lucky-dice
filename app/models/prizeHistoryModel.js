const mongoose = require("mongoose");

const schema = mongoose.Schema;

const prizeHistorySchema = new schema({
    _id : {
        type :  mongoose.Types.ObjectId
    },
    user : {
        type :  mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    prize : {
        type :  mongoose.Types.ObjectId,
        ref : "Prize",
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

module.exports = mongoose.model("PrizeHistory", prizeHistorySchema);