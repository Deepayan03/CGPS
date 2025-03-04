import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  description: string;
  salary: number;
  skillsRequired: string[];
  applications: mongoose.Types.ObjectId[];
  postedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The recruiter
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    skillsRequired: { type: [String], required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);
