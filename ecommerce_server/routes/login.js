const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router.post("/loginadmin", loginController.postLoginAdmin);

router.post("/regUser", loginController.regUser);

router.post("/loginCustomer", loginController.postLoginCust);

router.post("/regCustomer", loginController.regCust);

module.exports = router;
