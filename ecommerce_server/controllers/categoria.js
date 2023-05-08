const Categoria = require("../models/categoria");

exports.getCateList = async (req, res) => {
  try {
    const list = await Categoria.findAll({ order: ["id_cate"] });
    // console.log(list);
    res.send({ status: 0, data: list });
  } catch (error) {
    console.log("getcatelist:", error);
    res.send({ status: 1, msg: error });
  }
};

exports.addCate = async (req, res) => {
  let { nombre } = req.body;
  //   nombre = nombre.toLowerCase();
  try {
    const cate = await Categoria.findOne({
      where: { nombre },
    });
    if (cate) {
      res.send({ status: 1, msg: `Ya existe el Género ${nombre}` });
    } else {
      const c = await Categoria.create({
        nombre,
      });
      res.send({ status: 0, msg: "Género agregado con éxito", data: c });
    }
  } catch (error) {
    console.log("addcate:", error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateCate = async (req, res) => {
  let { id_cate, nombre } = req.body;
  //   nombre = nombre.toLowerCase();
  try {
    const cate = await Categoria.findOne({
      where: { id_cate },
    });
    if (cate) {
      const c = await Categoria.update(
        {
          nombre,
        },
        {
          where: { id_cate },
        }
      );
      res.send({ status: 0, msg: "Género agregado con éxito" });
    } else {
      res.send({ status: 1, msg: `No se ha encontrado el Género ${nombre}` });
    }
  } catch (error) {
    console.log("update:", error);
    res.send({ status: 1, msg: error });
  }
};
