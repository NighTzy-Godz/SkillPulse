import { employmentType } from "./User";

export interface CreateJobData {
  title: string;
  description: string;
  salary: string;
  employmentType: employmentType;
  location: string;
}
