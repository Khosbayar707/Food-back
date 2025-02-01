import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const foodRouter = Router();
export default foodRouter;

foodRouter.get("/", async (req: CustomRequest, res: Response) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter = { category: category };
    }

    const foods = await FoodModel.find(filter);
    res.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

foodRouter.get("/:_id", auth, async (req: CustomRequest, res: Response) => {
  const id = req.params._id;
  if (!id) {
    res.json({ messege: "error" });
  }
  const oneFood = await FoodModel.find({ category: id });
  res.json(oneFood);
});

foodRouter.post(
  "/",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const body = { ...req.body };

    try {
      const newFood = await FoodModel.create(body);
      res.json(newFood);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

foodRouter.delete(
  "/:_id",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const id = req.params._id;
    try {
      const deletedItem = await FoodModel.findByIdAndDelete({
        _id: id,
      });
      res.json(deletedItem);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

foodRouter.put("/:_id", auth, isAdmin, async (req: Request, res: Response) => {
  const id = req.params._id;
  const body = { ...req.body };
  const updatedItem = await FoodModel.findOneAndUpdate({ _id: id }, body);
  res.json(updatedItem);
});
