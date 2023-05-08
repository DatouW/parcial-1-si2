const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Rol = sequelize.define(
  "Rol",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permisos: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    tableName: "rol",
    timestamps: false,
  }
);

module.exports = Rol;
