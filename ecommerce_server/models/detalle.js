const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Pedido = require("./pedido");
const Producto = require("./producto");

const Detalle = sequelize.define(
  "Detalle",
  {
    nro_pedido: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Pedido,
        key: "nro",
      },
    },
    cod_prod: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Producto,
        key: "cod_prod",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "detalle",
  }
);

module.exports = Detalle;
