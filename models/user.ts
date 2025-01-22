import mongoose from "mongoose";
import { UserRoleEnum } from "../enums";

const USER_SCHEMA = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    role: { enum: Object.values(UserRoleEnum) },
    ttl: Date,
    isVerified: Boolean,
  },
  { timestamps: true }
);
const UserModel = mongoose.model("Food", USER_SCHEMA, "food");

export { UserModel };
