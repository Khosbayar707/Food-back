import { NextFunction, Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";
import { verifyToken } from "@clerk/backend";

export const foodCategoryRouter = Router();

export type CustomRequest = Request & {
  userId?: string;
};

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.get("authentication");
  try {
    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const userId = verified.sub;
    // console.log({ userId });
    req.userId = userId;
    next();
  } catch {
    res.json({ status: "Failed" });
  }
};

foodCategoryRouter.get("/", auth, async (req: Request, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});

foodCategoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const oneFoodCategories = await FoodCategoryModel.find({ _id: id });
  res.send({ messege: "Found one category", oneFoodCategories });
});

foodCategoryRouter.post("/", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.json(newItem);
});

foodCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedItem = await FoodCategoryModel.deleteOne({ _id: id });
  res.send({ messege: "Food category deleted successfully", deletedItem });
});

foodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedItem = await FoodCategoryModel.findOneAndUpdate(
    { _id: id },
    {
      categoryName: "Soup",
    }
  );
  res.send({ messege: "Food category updated successfully", updatedItem });
});
