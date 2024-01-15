require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

const db_password = process.env.DB_PASSWORD;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose
  .connect(
    `mongodb+srv://anoopezhap:${db_password}@ecommerce.mpd6zsu.mongodb.net/`
  )
  .then(() => console.log("DB Connection Successful"));

app.listen(3001, () => console.log("Server Started"));
