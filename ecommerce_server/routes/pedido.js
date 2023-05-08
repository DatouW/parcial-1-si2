const express = require("express");

const router = express.Router();
const orderController = require("../controllers/pedido");

router.get("", orderController.getOrderList);
router.put("/shipping", orderController.changeShipping);
router.put("/payment", orderController.changePayment);
router.get("/search", orderController.getSearch);

module.exports = router;
