import { ICompany } from "./Company";
import { IUser, employmentType } from "./User";

export interface CreateJobData {
  title: string;
  description: string;
  salary: string;
  employmentType: employmentType;
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

export interface IJob {
  _id: string;
  title: string;
  company: ICompany;
  description: string;
  salary: string;
  employmentType: employmentType;
  location: string;

  savedBy: string[] | IUser[];
  applicants: string[] | IUser[];
  createdAt: Date;
  updatedAt: Date;
}
