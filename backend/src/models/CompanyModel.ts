import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  email: string;
  industry: string;
  recruiters: mongoose.Types.ObjectId[]; 
  jobOpenings: mongoose.Types.ObjectId[];
}

const CompanySchema: Schema<ICompany> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    industry: { type: String, required: true },
    recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Reference to users who are recruiters
    jobOpenings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export const Company = mongoose.model<ICompany>("Company", CompanySchema);
