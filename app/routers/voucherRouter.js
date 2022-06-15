const express = require("express");

const router = express.Router();

const {
    createVoucher,
    getAllVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
} = require("../controllers/voucherController")

router.get("/vouchers", getAllVoucher);

router.get("/vouchers/:voucherId", getVoucherById)

router.post("/vouchers", createVoucher);

router.put("/vouchers/:voucherId", updateVoucherById);

router.delete("/vouchers/:voucherId", deleteVoucherById);

module.exports = router;