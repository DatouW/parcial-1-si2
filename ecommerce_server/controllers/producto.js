const { Op } = require("sequelize");
const Producto = require("../models/producto");
const { customAlphabet } = require("nanoid/async");
const Categoria = require("../models/categoria");
const { ProdCate } = require("../models/prodcate");

const generateBookCode = async () => {
  const alphabet = "0123456789"; // Define a custom alphabet with only digits
  const nanoid = customAlphabet(alphabet, 8); // Generate a random ID with a length of 10 and the custom alphabet
  const id = await nanoid();
  const number = `B-${id}`; // Add a prefix to the ID to create the book code
  return number;
};

exports.getBookList = async (req, res) => {
  try {
    const list = await Producto.findAll({
      order: ["cod_prod"],
      include: [
        {
          model: Categoria,
          through: {
            attributes: [], // to exclude join table attributes from the result
          },
        },
      ],
    });
    // console.log(list);
    res.send({ status: 0, data: list });
  } catch (error) {
    console.log("booklist:", error);
    res.send({ status: 1, msg: error });
  }
};

exports.postAddBook = async (req, res) => {
  const {
    titulo,
    autor,
    año_pub,
    cantidad,
    descripcion,
    editorial,
    en_venta,
    precio,
    categoria,
  } = req.body;
  const cod_prod = await generateBookCode();
  //   console.log(cod_prod);
  try {
    const book = await Producto.findOne({
      where: { titulo },
    });
    if (book) {
      res.send({ status: 1, msg: `Ya existe el libro ${titulo}` });
    } else {
      await Producto.create({
        titulo,
        autor,
        año_pub,
        cantidad,
        descripcion,
        editorial,
        en_venta,
        precio,
        cod_prod,
      });
      await ProdCate.bulkCreate(
        categoria.map((c) => {
          return { cod_prod, id_cate: c };
        })
      );
      //   console.log(c, prodcate);
      res.send({ status: 0, msg: "Libro agregado con éxito" });
    }
  } catch (error) {
    console.log("addbook:", error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateBook = async (req, res) => {
  const {
    titulo,
    autor,
    año_pub,
    cantidad,
    descripcion,
    editorial,
    en_venta,
    precio,
    categoria,
    cod_prod,
  } = req.body;
  try {
    const book = await Producto.findOne({
      where: { cod_prod },
    });
    if (book) {
      book.set({
        titulo,
        autor,
        año_pub,
        cantidad,
        descripcion,
        editorial,
        en_venta,
        precio,
        categoria,
      });
      await book.save();
      res.send({ status: 0, msg: "Libro modificado con éxito" });
    } else {
      res.send({ status: 1, msg: "No se encontró el libro" });
    }
  } catch (error) {
    console.log("addbook:", error);
    res.send({ status: 1, msg: error });
  }
};

exports.getSearch = async (req, res) => {
  const { str } = req.query;
  let regex = `%${str}%`;
  //   console.log(regex);
  try {
    const books = await Producto.findAll({
      where: {
        [Op.or]: [
          { cod_prod: { [Op.iLike]: regex } },
          { titulo: { [Op.iLike]: regex } },
          { autor: { [Op.iLike]: regex } },
        ],
      },
    });
    // console.log(products);
    res.send({ status: 0, data: books });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
