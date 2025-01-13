import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
const mongoose = require("mongoose");

const PORT = 8000;
const app = express();
// const readMaterial =
//   "https://developers.arcgis.com/javascript/latest/sample-code/layers-csv/";

//1.Connecting MongoDB

configDotenv();
const URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(URI);
const FOOD_CATEGORY_SCHEMA = new mongoose.Schema({ categoryName: String });
const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

app.get("/", async (req: Request, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});

app.get("/create", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({ categoryName: "Drinks" });
  res.send({ messege: "New food category created successfully", newItem });
});

// app.get("/delete", async (req: Request, res: Response) => {
//   const deletedItem = await FoodCategoryModel.deleteOne({
//     categoryName: "Fruits",
//   });
//   res.send({ messege: "Food category deleted successfully", deletedItem });
// });

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
