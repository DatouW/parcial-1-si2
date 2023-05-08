const express = require("express");
const cors = require("cors");
const { expressjwt: expressJWT } = require("express-jwt");
const { config } = require("./config");
const sequelize = require("./db/index");
const app = express();
const PORT = 5000;
process.env.TZ = "America/La_Paz";

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

app.use(cors());

app.use("/api", require("./routes/login"));
app.use("/admin/cate", require("./routes/categoria"));
app.use("/admin/user", require("./routes/usuario"));
app.use("/admin/role", require("./routes/rol"));
app.use("/admin/book", require("./routes/producto"));
app.use("/admin/order", require("./routes/pedido"));
app.use("/admin/customer", require("./routes/cliente"));
app.use("/admin/images", require("./routes/imagen"));
app.use("/admin/report", require("./routes/reporte"));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
