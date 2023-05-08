const { QueryTypes, NOW } = require("sequelize");
const sequelize = require("../db");
const { Pedido, Cliente } = require("../models");
const moment = require("moment");

exports.getSalesByDate = async (req, res) => {
  const { start, end } = req.query;
  let sql =
    "SELECT d.cod_prod, titulo, SUM(d.cantidad) cantidad,ROUND(SUM(d.precio * d.precio),2) total " +
    "FROM detalle d " +
    "INNER JOIN producto p " +
    "ON d.cod_prod = p.cod_prod " +
    "INNER JOIN pedido pd " +
    "ON d.nro_pedido = pd.nro " +
    `WHERE pd.fecha BETWEEN '${start}' AND '${end}'` +
    "GROUP BY d.cod_prod,titulo " +
    "ORDER BY d.cod_prod";
  try {
    const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
    res.send({ status: 0, data: records });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "Tiempo de espera agotado de conexión" });
  }
};

exports.getAll = async (req, res) => {
  const date = moment().format("YYYY-MM-DD");
  try {
    let totalAll = await Pedido.findAll({
      where: { confirmado: true },
      attributes: [[sequelize.fn("SUM", sequelize.col("total")), "total"]],
    });
    let totalToday = await Pedido.findAll({
      where: { confirmado: true, fecha: date },
      attributes: [[sequelize.fn("SUM", sequelize.col("total")), "total"]],
    });
    const TransAll = await Pedido.count({
      where: { confirmado: true },
      attributes: [[sequelize.fn("COUNT", sequelize.col("total")), "numero"]],
    });
    const TransToday = await Pedido.count({
      where: { confirmado: true, fecha: date },
      attributes: [[sequelize.fn("COUNT", sequelize.col("total")), "numero"]],
    });
    const OrderAll = await Pedido.count({
      where: { confirmado: true, estado_envio: "P" },
      attributes: [[sequelize.fn("COUNT", sequelize.col("total")), "numero"]],
    });
    const OrderToday = await Pedido.count({
      where: { confirmado: true, fecha: date },
      attributes: [[sequelize.fn("COUNT", sequelize.col("total")), "numero"]],
    });

    const userAll = await Cliente.count({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_cl")), "cantida"]],
    });
    const userToday = await Cliente.count({
      where: { registro: date },
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_cl")), "cantidad"]],
    });
    totalAll = totalAll[0].total;
    totalToday =
      parseInt(totalToday[0].total) === null
        ? 0
        : parseInt(totalToday[0].total);
    console.log(totalAll);
    res.send({
      status: 0,
      data: {
        totalAll,
        totalToday,
        TransAll,
        TransToday,
        OrderAll,
        OrderToday,
        userAll,
        userToday,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "Tiempo de espera agotado de conexión" });
  }
};

exports.getSales = async (req, res) => {
  const { intervalo, unidad } = req.query;
  let sql =
    `SELECT TO_CHAR(fecha, '${unidad}') dia, SUM(total) total ` +
    "FROM pedido " +
    `WHERE fecha >= CURRENT_DATE - INTERVAL '${intervalo} days' ` +
    "GROUP BY fecha;";
  try {
    const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
    res.send({ status: 0, data: records });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "Tiempo de espera agotado de conexión" });
  }
};

exports.getBooks = async (req, res) => {
  const { intervalo } = req.query;
  let sql =
    "SELECT d.cod_prod,pr.titulo,SUM(d.cantidad) cantidad " +
    "FROM detalle d, pedido pd, producto pr " +
    "WHERE d.cod_prod = pr.cod_prod AND d.nro_pedido = pd.nro " +
    `AND pd.fecha >= CURRENT_DATE - INTERVAL '${intervalo} days' ` +
    "GROUP BY d.cod_prod,pr.titulo " +
    "ORDER BY cantidad DESC " +
    "LIMIT 7;";
  try {
    const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
    res.send({ status: 0, data: records });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "Tiempo de espera agotado de conexión" });
  }
};
