const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

const Usuario = require("../models/usuario");
const Cliente = require("../models/cliente");
const Rol = require("../models/rol");

exports.postLoginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Usuario.findOne({
      where: { username, habilitado: true },
    });
    if (user) {
      // console.log(user,typeof user);
      const result = bcrypt.compareSync(password, user.password);
      if (!result) return res.send({ status: 1, msg: "Contraseña incorrecta" });
      //"eliminar" contraseña del user
      user.password = undefined;
      let rol = await Rol.findOne({
        attributes: ["permisos"],
        where: { id: user.id_rol },
      });
      user.dataValues.permisos = rol.permisos;

      const tokenStr = jwt.sign(user.toJSON(), config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });
      user.dataValues.token = "Bearer " + tokenStr;
      res.send({ status: 0, data: user });
    } else {
      res.send({ status: 1, msg: "usuario incorrecto o no existe el usuario" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error.name });
  }
};

exports.postLoginCust = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Cliente.findOne({
      where: { username },
    });
    if (user) {
      // console.log(user,typeof user);
      const result = bcrypt.compareSync(password, user.password);
      if (!result) return res.send({ status: 1, msg: "Contraseña incorrecta" });
      //"eliminar" contraseña del user
      user.password = undefined;

      const tokenStr = jwt.sign(user.toJSON(), config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });
      user.dataValues.token = "Bearer " + tokenStr;
      res.send({ status: 0, data: user });
    } else {
      res.send({ status: 1, msg: "Usuario incorrecto o no existe el usuario" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error.name });
  }
};

exports.regUser = async (req, res) => {
  const { username, password, id_rol } = req.body;
  console.log(req.body);
  try {
    const user = await Usuario.findOne({
      // where nombre_usuario = nombre_usuario OR (tipo_usuario AND id_persona)
      where: {
        username,
      },
    });
    if (user) {
      res.send({
        status: 1,
        msg: "Este nombre de usuario ya esta en uso o ya esta registrado. Prueba otro.",
      });
    } else {
      const u = await Usuario.create({
        username,
        password: bcrypt.hashSync(password, 10),
        id_rol,
      });
      res.send({ status: 0, msg: "Se creo el usuario exitosamente", data: u });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.regCust = async (req, res) => {
  const { username, password, email, telefono, nombre } = req.body;

  try {
    const user = await Cliente.findOne({
      // where nombre_usuario = nombre_usuario OR (tipo_usuario AND id_persona)
      where: {
        username,
      },
    });
    if (user) {
      res.send({
        status: 1,
        msg: "Este nombre de usuario ya esta en uso o ya esta registrado. Prueba otro.",
      });
    } else {
      await Cliente.create({
        username,
        password: bcrypt.hashSync(password, 10),
        email,
        telefono,
        nombre,
      });
      res.send({ status: 0, msg: "Se creo el usuario exitosamente" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
