"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const food_category_1 = require("./router/food-category");
const food_1 = require("./router/food");
const food_order_1 = __importDefault(require("./router/food-order"));
const user_1 = __importDefault(require("./router/user"));
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = (0, express_1.default)();
const appetizer = "https://asset.cloudinary.com/dpyjpkzqg/f9910b43db0395803b0358cd37ec1363";
//1.Connecting MongoDB
(0, dotenv_1.configDotenv)();
app.use(cors());
const URI = process.env.MONGODB_URI;
app.use(express_1.default.json());
const connectURI = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!URI) {
        return console.log("URI error");
    }
    try {
        yield mongoose.connect(URI);
        console.log("Successful");
    }
    catch (err) {
        console.error(err, "Error");
    }
});
connectURI();
//FOOD CATEGORY DB
app.use("/food-category/", food_category_1.foodCategoryRouter);
//FOOD DB
app.use("/food/", food_1.foodRouter);
//FOOD ORDER DB
app.use("/food-order/", food_order_1.default);
//USER DB
app.use("/user/", user_1.default);
app.listen(PORT, () => {
    console.log(`Server is runnig on http://localhost:${PORT}`);
});
