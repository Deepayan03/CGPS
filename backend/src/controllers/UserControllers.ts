import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/UserModel";
import { Student } from "../models/StudentModel";
import { Recruiter } from "../models/RecruiterModel";

// In the login page form fields will be decided based on the role of the user.
// If the user is a student, the form will have fields like roll number, department, cgpa, skills, etc.
// If the user is a recruiter, the form will have fields like company name, industry, etc.
// The register function will take the user details and based on the role, it will save the user details in the respective collection.
// If the role is student, it will save the user details in the student collection.
// If the role is recruiter, it will save the user details in the recruiter collection.
// The user details will be saved in the user collection.
export const register = async (req: Request, res: Response): Promise<Response | void> => {
  const {
    name,
    email,
    password,
    address,
    role,
    rollNumber,
    department,
    cgpa,
    skills,
    companyName,
    industry,
  } = req.body;

  if (!name || !email || !password || !role || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (role !== "student" && role !== "recruiter") {
    return res.status(400).json({
      message: "Invalid role. Only 'student' and 'recruiter' are allowed.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await user.save();

    if (role === "student") {
      if (!rollNumber || !department || !cgpa) {
        return res
          .status(400)
          .json({ message: "Missing required student details." });
      }
      await new Student({
        userId: user._id,
        rollNumber,
        department,
        cgpa,
        skills: skills || [],
        placementStatus: "not placed",
      }).save();
    } else if (role === "recruiter") {
      if (!companyName || !industry) {
        return res
          .status(400)
          .json({ message: "Missing required recruiter details." });
      }
      await new Recruiter({
        userId: user._id,
        companyName,
        industry,
      }).save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error?.message });
  }
};


