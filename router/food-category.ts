import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const foodCategoryRouter = Router();

foodCategoryRouter.get("/", auth, async (req: CustomRequest, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});

foodCategoryRouter.get(
  "/:id",
  auth,
  async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    const oneFoodCategories = await FoodCategoryModel.find({ _id: id });
    res.send({ messege: "Found one category", oneFoodCategories });
  }
);

foodCategoryRouter.post(
  "/",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const newItem = await FoodCategoryModel.create({
      categoryName: req.body.categoryName,
    });
    res.json(newItem);
  }
);

foodCategoryRouter.delete(
  "/:id",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    const deletedItem = await FoodCategoryModel.deleteOne({ _id: id });
    res.send({ messege: "Food category deleted successfully", deletedItem });
  }
);

foodCategoryRouter.put(
  "/:id",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const id = req.params.id;

    const updatedItem = await FoodCategoryModel.findOneAndUpdate(
      { _id: id },
      {
        categoryName: "Soup",
      }
    );
    res.send({ messege: "Food category updated successfully", updatedItem });
  }
);
