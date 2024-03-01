import { ICompany } from "./Company";
import { ApplicationStatus } from "./JobApplication";
import { IUser, EmploymentType } from "./User";

export interface CreateJobData {
  title: string;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  location: string;
}

export interface SearchJobQuery {
  jobSearch: null | string;
  page: null | number;
}

export interface SearchJobResponse {
  jobs: IJob[];
  totalCount: number;
  currPage: number;
}

export interface SaveUnsaveJobData {
  jobId: string;
}

export interface CreatedJobUpdateData extends CreateJobData {}

export interface IJob {
  _id: string;
  title: string;
  company: ICompany;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  location: string;

  savedBy: string[] | IUser[];
  applicants: string[] | IUser[];
  createdAt: Date;
  updatedAt: Date;
}
