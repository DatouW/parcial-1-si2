const express = require("express");
const router = express.Router();
const bookController = require("../controllers/producto");

router.get("", bookController.getBookList);

router.post("", bookController.postAddBook);

router.put("", bookController.updateBook);

router.get("/search", bookController.getSearch);

module.exports = router;
