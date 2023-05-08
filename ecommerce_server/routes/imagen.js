const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");
const Imagen = require("../models/imagen");
const router = express.Router();

const dirPath = path.join(__dirname, "..", "public/upload");
console.log(dirPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage }).single("image");

router.post("/upload", (req, res) => {
  upload(req, res, async (error) => {
    const { cod_prod } = req.body;
    if (error) {
      return res.send({
        status: 1,
        msg: "Error al cargar el archivo",
      });
    }

    const file = req.file;
    const image = {
      name: file.filename,
      path: file.filename,
      cod_prod,
    };
    const img = await Imagen.create(image);
    res.send({
      status: 0,
      data: img,
    });
  });
});

router.post("/delete", (req, res) => {
  const { name } = req.body;
  fs.unlink(path.join(dirPath, name), async (err) => {
    if (err) {
      console.log(err);
      res.send({
        status: 1,
        msg: "Error al eliminar la imagen",
      });
    } else {
      await Imagen.destroy({ where: { name } });
      res.send({
        status: 0,
        msg: "Imagen eliminada con exito",
      });
    }
  });
});

module.exports = router;
