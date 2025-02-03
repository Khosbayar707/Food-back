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
exports.foodRouter = void 0;
const express_1 = require("express");
const food_1 = require("../models/food");
const auth_1 = require("../middleware/auth");
exports.foodRouter = (0, express_1.Router)();
exports.default = exports.foodRouter;
exports.foodRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) {
            filter = { category: category };
        }
        const foods = yield food_1.FoodModel.find(filter);
        res.json(foods);
    }
    catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.foodRouter.get("/:_id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    if (!id) {
        res.json({ messege: "error" });
    }
    const oneFood = yield food_1.FoodModel.find({ category: id });
    res.json(oneFood);
}));
exports.foodRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign({}, req.body);
    try {
        const newFood = yield food_1.FoodModel.create(body);
        res.json(newFood);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.foodRouter.delete("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    try {
        const deletedItem = yield food_1.FoodModel.findByIdAndDelete({
            _id: id,
        });
        res.json(deletedItem);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.foodRouter.put("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const body = Object.assign({}, req.body);
    const updatedItem = yield food_1.FoodModel.findOneAndUpdate({ _id: id }, body);
    res.json(updatedItem);
}));
