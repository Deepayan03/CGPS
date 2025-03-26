import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection";
import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import recruiterRoutes from "./routes/recruiterRoutes";
import jobRoutes from "./routes/jobRoutes";
import morgan from "morgan";
const app = express();
const port: number = 3000;
dotenv.config();
connectDB();
app.use(morgan("dev"));
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/jobs", jobRoutes);


// Routes to be added here ----> app.use("/api", apiRoutes);
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});


