import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food";

export const foodRouter = Router();

// foodRouter.get("/", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });

foodRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query; // Extract category from query params

    let filter = {};
    if (category) {
      filter = { category: category }; // Filter by category if provided
    }

    const foods = await FoodModel.find(filter); // Apply filter in database query
    res.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default foodRouter;

// foodRouter.get("/?category", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });

foodRouter.get("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  if (!id) {
    res.json({ messege: "error" });
  }
  const oneFood = await FoodModel.find({ category: id });
  res.json(oneFood);
});

foodRouter.post("/", async (req: Request, res: Response) => {
  const body = { ...req.body };

  try {
    const newFood = await FoodModel.create(body);
    res.json(newFood);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

foodRouter.delete("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  try {
    const deletedItem = await FoodModel.findByIdAndDelete({
      _id: id,
    });
    res.json(deletedItem);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

foodRouter.put("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  const body = { ...req.body };
  const updatedItem = await FoodModel.findOneAndUpdate({ _id: id }, body);
  res.json(updatedItem);
});
