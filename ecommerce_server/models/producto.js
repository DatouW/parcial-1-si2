const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Categoria = require("./categoria");
const ProdCate = require("./prodcate");

const Producto = sequelize.define(
  "Producto",
  {
    cod_prod: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    editorial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    año_pub: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    en_venta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    autor: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "producto",
    timestamps: false,
  }
);

Producto.belongsToMany(Categoria, {
  through: ProdCate,
  foreignKey: "cod_prod",
});

Categoria.belongsToMany(Producto, { through: ProdCate, foreignKey: "id_cate" });

module.exports = Producto;
