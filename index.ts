import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
const mongoose = require("mongoose");

const PORT = 8000;
const app = express();
// const readMaterial =
//   "https://developers.arcgis.com/javascript/latest/sample-code/layers-csv/";

//1.Connecting MongoDB

configDotenv();
const URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(URI);
const Food_category = mongoose.model("food-category", { categoryName: String });
const Food = new Food_category({ categoryName: "drinks" });

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
