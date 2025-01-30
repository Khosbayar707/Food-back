import { Request, Response, Router } from "express";
import { UserModel } from "../models/user";
import { auth, isAdmin } from "../middleware/auth";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter = { category: category };
    }

    const users = await UserModel.find(filter);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;

userRouter.get("/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  if (!id) {
    res.json({ messege: "error" });
  }
  const oneUser = await UserModel.find({ category: id });
  res.json(oneUser);
});

userRouter.post("/", auth, isAdmin, async (req: Request, res: Response) => {
  const body = { ...req.body };

  try {
    const newUser = await UserModel.create(body);
    res.json(newUser);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

userRouter.delete(
  "/:_id",
  auth,
  isAdmin,
  async (req: Request, res: Response) => {
    const id = req.params._id;
    try {
      const deletedUser = await UserModel.findByIdAndDelete({
        _id: id,
      });
      res.json(deletedUser);
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

userRouter.put("/:_id", auth, isAdmin, async (req: Request, res: Response) => {
  const id = req.params._id;
  const body = { ...req.body };
  const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, body);
  res.json(updatedUser);
});
