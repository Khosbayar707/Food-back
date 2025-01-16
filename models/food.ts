import mongoose from "mongoose";

const FOOD_SCHEMA = new mongoose.Schema(
  {
    foodName: String,
    price: String,
    image: String,
    ingredients: String,
    category: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);
const FoodModel = mongoose.model("Food", FOOD_SCHEMA, "food");

export { FoodModel };
