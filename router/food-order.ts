import { Request, Response, Router } from "express";
import { FoodOrderModel } from "../models/food-order";

export const FoodOrderRouter = Router();
export default FoodOrderRouter;

FoodOrderRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newItem = await FoodOrderModel.create(body);
    res.json(newItem);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

FoodOrderRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newItem = await FoodOrderModel.create(body);
    res.json(newItem);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

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
