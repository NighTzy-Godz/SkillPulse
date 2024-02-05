import mongoose, { Schema, Document } from "mongoose";

const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Database - Job Application"))
  .catch((err) => console.log(`Error on Job Application, ${err}`));

enum ApplicationStatus {
  PENDING = "Pending",
  REVIEWING = "Reviewing",
  PROCEEDING = "Proceeding",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
}

interface IJobApplication extends Document {
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
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
