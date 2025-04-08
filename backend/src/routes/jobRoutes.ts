import express from "express";
import { postJob , getJobs, updateJob, deleteJob , getSingleJob } from "../controllers/JobControllers";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/",authenticate , authorizeRoles(["recruiter"]), postJob);
router.get("/", authenticate , authorizeRoles(["recruiter" , "student"]), getJobs);
router.put("/:id",authenticate, authorizeRoles(["recruiter"]), updateJob);
router.delete("/:id",authenticate , authorizeRoles(["recruiter"]), deleteJob);
router.get("/:id", authenticate , authorizeRoles(["recruiter" , "student"]), getSingleJob);;

export default router;
