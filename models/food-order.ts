import mongoose, { Schema } from "mongoose";
import { FoodOrderStatusEnum } from "../enums";

const foodOrderItem = new Schema({
  item: {
    food: mongoose.Schema.Types.ObjectId,
    quantity: Number,
  },
});

const FOOD_ORDER_SCHEMA = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    foodOrderItems: [foodOrderItem],
    status: { type: String, enum: Object.values(FoodOrderStatusEnum) },
  },
  { timestamps: true }
);
const FoodOrderModel = mongoose.model(
  "Food-Order",
  FOOD_ORDER_SCHEMA,
  "food-order"
);

export { FoodOrderModel };
