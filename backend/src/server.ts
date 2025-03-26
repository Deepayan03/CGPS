import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConnection";
import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import recruiterRoutes from "./routes/applicationRoutes";
import jobRoutes from "./routes/jobRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();
const port: number = 3000;
dotenv.config();
connectDB();
app.use(morgan("dev"));
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());
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



process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});

