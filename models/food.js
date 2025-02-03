"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FOOD_SCHEMA = new mongoose_1.default.Schema({
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: mongoose_1.default.Schema.Types.ObjectId,
}, { timestamps: true });
const FoodModel = mongoose_1.default.model("Food", FOOD_SCHEMA, "food");
exports.FoodModel = FoodModel;
