"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrderItemModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FOOD_ORDER_ITEM_SCHEMA = new mongoose_1.default.Schema({
    food: mongoose_1.default.Schema.Types.ObjectId,
    quantity: Number,
});
const FoodOrderItemModel = mongoose_1.default.model("FoodOrderItem", FOOD_ORDER_ITEM_SCHEMA, "foodOrderItem");
exports.FoodOrderItemModel = FoodOrderItemModel;
