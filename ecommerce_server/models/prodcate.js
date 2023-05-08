const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Producto = require("./producto");
const Categoria = require("./categoria");

const ProdCate = sequelize.define(
  "prodcate",
  {
    id_cate: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: Categoria,
        key: "id_cate",
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
  },
  {
    timestamps: false,
    tableName: "producto_categoria",
  }
);

module.exports = ProdCate;
