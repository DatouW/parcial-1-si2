const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Imagen = sequelize.define(
  "Imagen",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cod_prod: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "imagen",
    timestamps: false,
  }
);

module.exports = Imagen;
