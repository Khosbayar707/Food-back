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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodCategoryRouter = void 0;
const express_1 = require("express");
const food_category_1 = require("../models/food-category");
const auth_1 = require("../middleware/auth");
exports.foodCategoryRouter = (0, express_1.Router)();
exports.foodCategoryRouter.get("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCategories = yield food_category_1.FoodCategoryModel.find();
    res.json(foodCategories);
}));
exports.foodCategoryRouter.get("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const oneFoodCategories = yield food_category_1.FoodCategoryModel.find({ _id: id });
    res.send({ messege: "Found one category", oneFoodCategories });
}));
exports.foodCategoryRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = yield food_category_1.FoodCategoryModel.create({
        categoryName: req.body.categoryName,
    });
    res.json(newItem);
}));
exports.foodCategoryRouter.delete("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedItem = yield food_category_1.FoodCategoryModel.deleteOne({ _id: id });
    res.send({ messege: "Food category deleted successfully", deletedItem });
}));
exports.foodCategoryRouter.put("/:id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedItem = yield food_category_1.FoodCategoryModel.findOneAndUpdate({ _id: id }, {
        categoryName: "Soup",
    });
    res.send({ messege: "Food category updated successfully", updatedItem });
}));
