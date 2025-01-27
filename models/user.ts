import mongoose from "mongoose";
import { UserRoleEnum } from "../enums";

const user = new mongoose.Schema(
  {
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
    },
    ttl: Date,
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", user, "user");

export { UserModel };
