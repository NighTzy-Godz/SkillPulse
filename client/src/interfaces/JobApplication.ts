import { IJob } from "./Job";
import { IUser } from "./User";

export enum ApplicationStatus {
  PENDING = "PENDING",
  PROCEEDING = "PROCEEDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export interface JobApplicationUpdateStatusData {
  status: ApplicationStatus;
  userId: string;
}

export interface IJobApplication {
  _id: string;
  jobId: IJob;
  userId: IUser;
  status: ApplicationStatus;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}
