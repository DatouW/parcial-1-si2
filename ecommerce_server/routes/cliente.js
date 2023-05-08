const express = require("express");
const router = express.Router();
const customerController = require("../controllers/cliente");

router.get("", customerController.getCustomerList);

router.get("/search", customerController.getSearch);

module.exports = router;
