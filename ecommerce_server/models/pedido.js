const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Producto = require("./producto");
const { Detalle } = require("./prodcate");

const Pedido = sequelize.define(
  "Pedido",
  {
    nro: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinatario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    hora: DataTypes.TIME,
    estado_pago: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    estado_envio: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: "P",
    },
    total: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    nota: DataTypes.STRING,
    id_cl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    telefono: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "pedido",
    timestamps: false,
  }
);

module.exports = Pedido;
