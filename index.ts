import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { FoodCategoryModel } from "./models/food-category";
import { foodCategoryRouter } from "./router/food-category";
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();

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

app.use("/food-category/", foodCategoryRouter);

//FOOD DB
const FOOD_SCHEMA = new mongoose.Schema(
  {
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: mongoose.Types.ObjectId,
  },
  { timestamp: true }
);
const FoodModel = mongoose.model("Food", FOOD_SCHEMA, "food");

app.get("/food/", async (req: Request, res: Response) => {
  const food = await FoodModel.find();
  res.json(food);
});

app.post("/food/", async (req: Request, res: Response) => {
  const newFood = await FoodModel.create({
    foodName: "Brie Crostini Appetizer",
    price: 12,
    image: "none",
    category: "O67861026d1aeed425237f5ca",
    ingredients:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  });
  res.send({ messege: "New food category created successfully", newFood });
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
