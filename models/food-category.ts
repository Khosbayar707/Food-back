import mongoose from "mongoose";

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  { categoryName: String },
  { timestamps: true }
);
const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

export { FoodCategoryModel };
