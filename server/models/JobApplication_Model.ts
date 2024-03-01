import mongoose, { Schema, Document } from "mongoose";

const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - Job Application"))
  .catch((err) => console.log(`Error on Job Application, ${err}`));

export enum ApplicationStatus {
  PENDING = "PENDING",
  PROCEEDING = "PROCEEDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export interface IJobApplication extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  status: ApplicationStatus;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema: Schema<IJobApplication> = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },

    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model<IJobApplication>(
  "JobApplication",
  jobApplicationSchema
);

export default JobApplication;
