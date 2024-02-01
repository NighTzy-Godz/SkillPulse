import mongoose, { Schema, Document } from "mongoose";
import { EmploymentType } from "./User_Model";
const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - Job"))
  .catch((err) => console.log("Error on Job -", err));

interface IJob extends Document {
  title: string;
  company: mongoose.Schema.Types.ObjectId;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  location: string;

  savedBy: mongoose.Schema.Types.ObjectId[];
  applicants: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema: Schema<IJob> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
