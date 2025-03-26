import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection";
import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import recruiterRoutes from "./routes/recruiterRoutes";
import jobRoutes from "./routes/jobRoutes";
const app = express();
const port: number = 3000;
dotenv.config();
connectDB();
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/jobs", jobRoutes);

// Routes to be added here ----> app.use("/api", apiRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



