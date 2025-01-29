import { Request, Response, Router } from "express";
import { FoodOrderModel } from "../models/food-order";
import { auth, CustomRequest } from "./food-category";
import { Types } from "mongoose";

export const FoodOrderRouter = Router();
export default FoodOrderRouter;

FoodOrderRouter.post("/", auth, async (req: CustomRequest, res: Response) => {
  const { user, foodOrderItems, totalPrice } = req.body;
  try {
    const newOrder = await FoodOrderModel.create({
      user,
      foodOrderItems,
      totalPrice,
    });
    res.json(newOrder);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

FoodOrderRouter.get("/", async (req: Request, res: Response) => {
  // const id = req.params.id;
  const oneFoodOrder = await FoodOrderModel.find().populate("user");
  res.json(oneFoodOrder);
});

FoodOrderRouter.get("/:user", async (req: Request, res: Response) => {
  const { user } = req.params;
  const oneFoodOrder = await FoodOrderModel.find({ user }).populate("user");
  res.json(oneFoodOrder);
});

// FoodOrderRouter.post("/", async (req: Request, res: Response) => {
//   const body = req.body;
//   try {
//     const newItem = await FoodOrderModel.create(body);
//     res.json(newItem);
//   } catch (e) {
//     console.error(e, "aldaa");
//   }
// });

FoodOrderRouter.delete("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  try {
    const deletedItem = await FoodOrderModel.findByIdAndDelete({
      _id: id,
    });
    res.json(deletedItem);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

FoodOrderRouter.put("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  const body = { ...req.body };
  const updatedItem = await FoodOrderModel.findOneAndUpdate({ _id: id }, body);
  res.json(updatedItem);
});
