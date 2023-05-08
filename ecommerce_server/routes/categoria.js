const express = require("express");
const router = express.Router();
const cateController = require("../controllers/categoria");

router.get("", cateController.getCateList);

router.post("", cateController.addCate);

router.put("", cateController.updateCate);

module.exports = router;
