const Pedido = require("./pedido");
const Producto = require("./producto");
const Detalle = require("./detalle");
const Cliente = require("./cliente");

Pedido.belongsToMany(Producto, {
  through: Detalle,
  foreignKey: "nro_pedido",
});

Producto.belongsToMany(Pedido, {
  through: Detalle,
  foreignKey: "cod_prod",
});

Cliente.hasMany(Pedido, { foreignKey: "id_cl" });
Pedido.belongsTo(Cliente, { foreignKey: "id_cl" });

module.exports = {
  Pedido,
  Producto,
  Detalle,
  Cliente,
};
