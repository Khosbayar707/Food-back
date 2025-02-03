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
exports.foodOrderItemRouter = void 0;
const express_1 = require("express");
const food_order_item_1 = require("../models/food-order-item");
const auth_1 = require("../middleware/auth");
exports.foodOrderItemRouter = (0, express_1.Router)();
// foodRouter.get("/", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });
// foodOrderItemRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const { category } = req.query; // Extract category from query params
//     let filter = {};
//     if (category) {
//       filter = { category: category }; // Filter by category if provided
//     }
//     const foods = await FoodOrderItemModel.find(filter); // Apply filter in database query
//     res.json(foods);
//   } catch (error) {
//     console.error("Error fetching foods:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
exports.default = exports.foodOrderItemRouter;
// foodRouter.get("/?category", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });
exports.foodOrderItemRouter.get("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    if (!id) {
        res.json({ messege: "error" });
    }
    const oneItem = yield food_order_item_1.FoodOrderItemModel.find({ category: id });
    res.json(oneItem);
}));
exports.foodOrderItemRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newItem = yield food_order_item_1.FoodOrderItemModel.create(body);
        res.json(newItem);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.foodOrderItemRouter.delete("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    try {
        const deletedItem = yield food_order_item_1.FoodOrderItemModel.findByIdAndDelete({
            _id: id,
        });
        res.json(deletedItem);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
// foodOrderItemRouter.put("/:_id", async (req: Request, res: Response) => {
//   const id = req.params._id;
//   const body = { ...req.body };
//   const updatedItem = await FoodModel.findOneAndUpdate({ _id: id }, body);
//   res.json(updatedItem);
// });
