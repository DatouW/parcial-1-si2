const { Op } = require("sequelize");
const Producto = require("../models/producto");
const { customAlphabet } = require("nanoid/async");
const { Detalle } = require("../models/prodcate");
const { Pedido, Cliente } = require("../models");

const generateOrderCode = async () => {
  const alphabet = "0123456789"; // Define a custom alphabet with only digits
  const nanoid = customAlphabet(alphabet, 10); // Generate a random ID with a length of 10 and the custom alphabet
  const id = await nanoid();
  const number = `${id}`; // Add a prefix to the ID to create the book code
  return number;
};

exports.getOrderList = async (req, res) => {
  try {
    const list = await Pedido.findAll({
      where: { confirmado: true },
      order: ["fecha", "hora"],
      include: [
        {
          model: Producto,
          attributes: ["cod_prod", "titulo"],
          through: {
            attributes: ["cantidad", "precio"], // to exclude join table attributes from the result
          },
        },
        {
          model: Cliente,
          attributes: ["username"],
        },
      ],
    });
    // console.log(list);
    res.send({ status: 0, data: list });
  } catch (error) {
    console.log("orderlist:", error);
    res.send({ status: 1, msg: error });
  }
};

//cambiar estado de envio
exports.changeShipping = async (req, res) => {
  const { nro, estado_envio } = req.body;
  try {
    const order = await Pedido.findByPk(nro);
    console.log(new Date());
    if (order) {
      order.estado_envio = estado_envio;
      await order.save();
      res.send({
        status: 0,
        msg: "El estado de envio del pedido ha sido modificado exitosamente",
      });
    } else {
      res.send({ status: 1, msg: "Error al modificar el estado de envio" });
    }
  } catch (error) {
    console.log("ordershipping: ", error);
    res.send({ status: 1, msg: "Error al modificar el estado de envio" });
  }
};

//cambiar estado de pago
exports.changePayment = async (req, res) => {
  const { nro, estado_pago } = req.body;
  try {
    const order = await Pedido.findByPk(nro);
    console.log(new Date());
    if (order) {
      order.estado_pago = estado_pago;
      await order.save();
      res.send({
        status: 0,
        msg: "El modo de pago del pedido ha sido modificado exitosamente",
      });
    } else {
      res.send({ status: 1, msg: "Error al modificar el estado de envio" });
    }
  } catch (error) {
    console.log("payment: ", error);
    res.send({ status: 1, msg: "Error al modificar el estado de envio" });
  }
};

//
exports.getSearch = async (req, res) => {
  const { str } = req.query;
  let regex = `%${str}%`;
  //   console.log(regex);
  try {
    const orders = await Pedido.findAll({
      where: {
        [Op.or]: [
          { nro: { [Op.iLike]: regex } },
          { destinatario: { [Op.iLike]: regex } },
        ],
      },
      order: ["fecha", "hora"],
      include: [
        {
          model: Producto,
          attributes: ["cod_prod", "titulo"],
          through: {
            attributes: ["cantidad", "precio"], // to exclude join table attributes from the result
          },
        },
        {
          model: Cliente,
          attributes: ["username"],
        },
      ],
    });

    // console.log(orders);
    res.send({ status: 0, data: orders });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
