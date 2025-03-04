import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId; 
  rollNumber: string;
  department: string;
  cgpa: number;
  skills: string[];
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // Links to User
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    skills: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
