const express = require("express");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoute = require("./Routes/Auth");
const MarqueRoute = require("./Routes/Marque");
const ProductRoute = require("./Routes/Product");
const OrderRoute = require("./Routes/Order");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/Assets", express.static(path.join(__dirname, "Assets")));
app.use("/auth", AuthRoute);
app.use("/marque", MarqueRoute);
app.use("/product", ProductRoute);
app.use("/order", OrderRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log("server connected");
});
