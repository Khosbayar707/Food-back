import { Request, Response, Router } from "express";
import { FoodModel } from "../models/food";

export const foodRouter = Router();

foodRouter.get("/", async (req: Request, res: Response) => {
  const food = await FoodModel.find();
  res.json(food);
});

foodRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const oneFood = await FoodModel.find({ category: id });
  res.json(oneFood);
});

foodRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const newFood = await FoodModel.create(body);
  res.send({ messege: "New food category created successfully", newFood });
});

// foodRouter.delete("/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const deletedItem = await FoodModel.deleteOne({ _id: id });
//   res.send({ messege: "Food category deleted successfully", deletedItem });
// });

// foodRouter.put("/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedItem = await FoodModel.findOneAndUpdate(
//     { _id: id },
//     {
//       categoryName: "Soup",
//     }
//   );
//   res.send({ messege: "Food category updated successfully", updatedItem });
// });
