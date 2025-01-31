import { Request, Response, Router } from "express";
import { FoodOrderModel } from "../models/food-order";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const FoodOrderRouter = Router();
export default FoodOrderRouter;

FoodOrderRouter.post(
  "/",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
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
  }
);

FoodOrderRouter.get("/", auth, async (req: CustomRequest, res: Response) => {
  // const id = req.params.id;
  const oneFoodOrder = await FoodOrderModel.find().populate("user");
  res.json(oneFoodOrder);
});

FoodOrderRouter.get(
  "/:user",
  auth,
  async (req: CustomRequest, res: Response) => {
    const { user } = req.params;
    const oneFoodOrder = await FoodOrderModel.find({ user }).populate("user");
    res.json(oneFoodOrder);
  }
);

FoodOrderRouter.delete(
  "/:_id",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const id = req.params._id;
    try {
      const deletedItem = await FoodOrderModel.findByIdAndDelete({
        _id: id,
      });
      res.json(deletedItem);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

FoodOrderRouter.put(
  "/:_id",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const id = req.params._id;
    const body = { ...req.body };
    const updatedItem = await FoodOrderModel.findOneAndUpdate(
      { _id: id },
      body
    );
    res.json(updatedItem);
  }
);
