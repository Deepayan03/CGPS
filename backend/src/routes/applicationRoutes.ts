import express from "express";
import { applyToJob, cancelApplication, approveApplication, rejectApplication } from "../controllers/ApplicationController";
import { authenticate } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = express.Router();

// Student Routes
router.post("/apply", authenticate, authorizeRoles(["student"]) , applyToJob);
router.delete("/cancel/:applicationId", authenticate, authorizeRoles(["student"]), cancelApplication);

// Recruiter Routes
router.put("/approve/:applicationId", authenticate,authorizeRoles(["recruiter"]), approveApplication);
router.put("/reject/:applicationId", authenticate, authorizeRoles(["recruiter"]), rejectApplication);

export default router;

