const { Cliente } = require("../models");
const { Op } = require("sequelize");

exports.getCustomerList = async (req, res) => {
  try {
    const cust = await Cliente.findAll({
      attributes: { exclude: ["password"] },
    });
    res.send({ status: 0, data: cust });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.getSearch = async (req, res) => {
  const { str } = req.query;
  let regex = `%${str}%`;
  //   console.log(regex);
  try {
    const cust = await Cliente.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: regex } },
          { nombre: { [Op.iLike]: regex } },
        ],
      },
    });
    res.send({ status: 0, data: cust });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
