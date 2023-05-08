const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuario");

router.get("", userController.getUserList);

router.put("/disable", userController.putDisable);

router.put("/pwd", userController.putPwd);

module.exports = router;
