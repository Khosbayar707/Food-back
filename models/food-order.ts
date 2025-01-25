import mongoose, { Schema } from "mongoose";
import { FoodOrderStatusEnum } from "../enums";

const foodOrderItemsSchema = new Schema({
  food: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const FOOD_ORDER_SCHEMA = new mongoose.Schema(
  {
    user: String,
    totalPrice: Number,
    foodOrderItems: [foodOrderItemsSchema],
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
