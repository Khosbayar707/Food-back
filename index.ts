import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { FoodCategoryModel } from "./models/food-category";
import { foodCategoryRouter } from "./router/food-category";
import { FoodModel } from "./models/food";
import { foodRouter } from "./router/food";
import { foodOrderItemRouter } from "./router/food-order-item";
import FoodOrderRouter from "./router/food-order";
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();

const appetizer =
  "https://asset.cloudinary.com/dpyjpkzqg/f9910b43db0395803b0358cd37ec1363";

//1.Connecting MongoDB

configDotenv();
app.use(cors());
const URI = process.env.MONGODB_URI;

app.use(express.json());

const connectURI = async () => {
  if (!URI) {
    return console.log("URI error");
  }
  try {
    await mongoose.connect(URI);
    console.log("Successful");
  } catch (err) {
    console.error(err, "Error");
  }
};
connectURI();

//FOOD CATEGORY DB
app.use("/food-category/", foodCategoryRouter);

//FOOD DB
app.use("/food/", foodRouter);

//FOOD ORDER DB
app.use("/food-order/", FoodOrderRouter);

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
