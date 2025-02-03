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
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) {
            filter = { category: category };
        }
        const users = yield user_1.UserModel.find(filter);
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = exports.userRouter;
exports.userRouter.get("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    if (!id) {
        res.json({ messege: "error" });
    }
    const oneUser = yield user_1.UserModel.find({ category: id });
    res.json(oneUser);
}));
exports.userRouter.post("/", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign({}, req.body);
    try {
        const newUser = yield user_1.UserModel.create(body);
        res.json(newUser);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.userRouter.delete("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    try {
        const deletedUser = yield user_1.UserModel.findByIdAndDelete({
            _id: id,
        });
        res.json(deletedUser);
    }
    catch (e) {
        console.error(e, "aldaa");
    }
}));
exports.userRouter.put("/:_id", auth_1.auth, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params._id;
    const body = Object.assign({}, req.body);
    const updatedUser = yield user_1.UserModel.findOneAndUpdate({ _id: id }, body);
    res.json(updatedUser);
}));
