const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "postgres", "abc123", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-04:00",
});

module.exports = sequelize;
