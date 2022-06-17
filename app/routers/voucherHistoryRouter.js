const express = require("express");

const router = express.Router();

const {
    createVoucherHistory,
    getAllVoucherHistory,
    getVoucherHistoryById,
    updateVoucherHistoryById,
    deleteVoucherHistoryById,
    getVoucherHistoryByUsername
} = require("../controllers/voucherHistoryController");

router.post("/voucher-histories", createVoucherHistory);

router.get("/voucher-histories", getAllVoucherHistory);

router.get("/voucher-histories/:historyId", getVoucherHistoryById);

router.put("/voucher-histories/:historyId", updateVoucherHistoryById);

router.delete("/voucher-histories/:historyId", deleteVoucherHistoryById);

router.get("/devcamp-lucky-dice/voucher-history", getVoucherHistoryByUsername);

module.exports = router;
