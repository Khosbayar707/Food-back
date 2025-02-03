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
exports.FoodOrderRouter = void 0;
const express_1 = require("express");
const food_order_1 = require("../models/food-order");
const auth_1 = require("../middleware/auth");
exports.FoodOrderRouter = (0, express_1.Router)();
exports.default = exports.FoodOrderRouter;
exports.FoodOrderRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, foodOrderItems, totalPrice } = req.body;
    try {
        const newOrder = yield food_order_1.FoodOrderModel.create({
            user,
            foodOrderItems,
            totalPrice,
        });
        res.json(newOrder);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.FoodOrderRouter.get("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id;
    const oneFoodOrder = yield food_order_1.FoodOrderModel.find().populate("user");
    res.json(oneFoodOrder);
}));
exports.FoodOrderRouter.get("/:user", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    const oneFoodOrder = yield food_order_1.FoodOrderModel.find({ user }).populate("user");
    res.json(oneFoodOrder);
}));
exports.FoodOrderRouter.delete("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    try {
        const deletedItem = yield food_order_1.FoodOrderModel.findByIdAndDelete({
            _id: id,
        });
        res.json(deletedItem);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.FoodOrderRouter.put("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const body = Object.assign({}, req.body);
    const updatedItem = yield food_order_1.FoodOrderModel.findOneAndUpdate({ _id: id }, body);
    res.json(updatedItem);
}));
