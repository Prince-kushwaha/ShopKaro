const express = require("express");
const YAML = require("yamljs");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const fileUploader = require("express-fileupload");
const paymentRoutes = require("./routes/paymentRoutes");
const swaggerUI = require("swagger-ui-express");
const app = express();
const path = require("path");
const swaggerJsDocs = YAML.load(path.join(__dirname, "apiDocs.yml"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploader());
const staticPath = path.join(__dirname, "../Frontend/build");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.get("/api-docs", (req, resp) => {
  resp.redirect("/api-docs");
});

app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);

app.use(express.static(staticPath));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
});

app.use(errorMiddleware);
module.exports = app;
module.exports.express = express;
