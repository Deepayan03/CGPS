import express from "express";
import { register } from "../controllers/UserControllers";

const router = express.Router();

router.post("/register", register as express.RequestHandler);

export default router;
