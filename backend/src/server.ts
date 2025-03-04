import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection";

const app = express();
const port: number = 3000;
dotenv.config();
connectDB();
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});


// Routes to be added here ----> app.use("/api", apiRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



