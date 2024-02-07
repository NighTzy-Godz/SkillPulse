import { IJob } from "./Job";
import { IUser } from "./User";

export enum ApplicationStatus {
  PENDING = "Pending",
  REVIEWING = "Reviewing",
  PROCEEDING = "Proceeding",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
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
