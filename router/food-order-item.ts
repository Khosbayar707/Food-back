import { Request, Response, Router } from "express";
import { FoodOrderItemModel } from "../models/food-order-item";
import { auth, CustomRequest, isAdmin } from "../middleware/auth";

export const foodOrderItemRouter = Router();
// foodRouter.get("/", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });

// foodOrderItemRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const { category } = req.query; // Extract category from query params

//     let filter = {};
//     if (category) {
//       filter = { category: category }; // Filter by category if provided
//     }

//     const foods = await FoodOrderItemModel.find(filter); // Apply filter in database query
//     res.json(foods);
//   } catch (error) {
//     console.error("Error fetching foods:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

export default foodOrderItemRouter;

// foodRouter.get("/?category", async (req: Request, res: Response) => {
//   const query = req.query;
//   const food = await FoodModel.find();
//   res.json(food);
// });

foodOrderItemRouter.get("/:_id", async (req: CustomRequest, res: Response) => {
  const id = req.params._id;
  if (!id) {
    res.json({ messege: "error" });
  }
  const oneItem = await FoodOrderItemModel.find({ category: id });
  res.json(oneItem);
});

foodOrderItemRouter.post(
  "/",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const body = req.body;
    try {
      const newItem = await FoodOrderItemModel.create(body);
      res.json(newItem);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

foodOrderItemRouter.delete(
  "/:_id",
  auth,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const id = req.params._id;
    try {
      const deletedItem = await FoodOrderItemModel.findByIdAndDelete({
        _id: id,
      });
      res.json(deletedItem);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

// foodOrderItemRouter.put("/:_id", async (req: Request, res: Response) => {
//   const id = req.params._id;
//   const body = { ...req.body };
//   const updatedItem = await FoodModel.findOneAndUpdate({ _id: id }, body);
//   res.json(updatedItem);
// });
