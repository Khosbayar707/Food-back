import { Request, Response } from "express";
import { verifyToken } from "@clerk/backend";
import { NextFunction } from "express";

export type CustomRequest = Request & {
  userId?: string;
  userEmail?: string;
  role?: string;
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
    req.userId = userId;
    const { userEmail } = verified.email as { userEmail: string };
    req.userEmail = userEmail;
    const { role } = verified.metadata as { role: string };
    req.role = role;
    next();
  } catch {
    res.sendStatus(401);
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "admin") {
    res.sendStatus(403);
    return;
  }
  next();
};
