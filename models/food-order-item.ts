import mongoose from "mongoose";

const FOOD_ORDER_ITEM_SCHEMA = new mongoose.Schema({
  food: mongoose.Schema.Types.ObjectId,
  quantity: Number,
});
const FoodOrderItemModel = mongoose.model(
  "FoodOrderItem",
  FOOD_ORDER_ITEM_SCHEMA,
  "foodOrderItem"
);

export { FoodOrderItemModel };
