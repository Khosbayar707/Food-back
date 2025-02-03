"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../enums");
const user = new mongoose_1.default.Schema({
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    role: {
        type: String,
        enum: Object.values(enums_1.UserRoleEnum),
        default: enums_1.UserRoleEnum.USER,
    },
    ttl: Date,
}, { timestamps: true });
const UserModel = mongoose_1.default.model("user", user, "user");
exports.UserModel = UserModel;
