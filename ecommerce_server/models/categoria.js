const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Categoria = sequelize.define(
  "categoria",
  {
    id_cate: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categoria",
    timestamps: false,
  }
);

module.exports = Categoria;
