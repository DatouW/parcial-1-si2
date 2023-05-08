const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Rol = require("./rol");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_user: {
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
    habilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Rol,
      //   key: "id",
      // },
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);
Rol.hasMany(Usuario, {
  foreignKey: "id_rol",
});
Usuario.belongsTo(Rol, {
  foreignKey: "id_rol",
  // targetKey: "id",
});
module.exports = Usuario;
