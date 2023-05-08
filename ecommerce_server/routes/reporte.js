const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reporte");

router.get("", reportController.getSalesByDate);

router.get("/sales", reportController.getSales);
router.get("/books", reportController.getBooks);

router.get("/all", reportController.getAll);

module.exports = router;
