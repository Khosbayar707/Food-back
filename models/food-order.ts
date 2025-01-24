import mongoose, { Schema } from "mongoose";
import { FoodOrderStatusEnum } from "../enums";

const foodOrderItems = new Schema({
  foodOrderItems: {
    food: String,
    quantity: Number,
  },
});

const FOOD_ORDER_SCHEMA = new mongoose.Schema(
  {
    user: String,
    totalPrice: Number,
    foodOrderItems: [foodOrderItems],
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);
const FoodOrderModel = mongoose.model(
  "Food-Order",
  FOOD_ORDER_SCHEMA,
  "food-order"
);

export { FoodOrderModel };
