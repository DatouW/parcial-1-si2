const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Cliente = sequelize.define(
  "Cliente",
  {
    id_cl: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registro: DataTypes.DATE,
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

module.exports = Cliente;
