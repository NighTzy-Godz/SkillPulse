import { ICompany } from "./Company";

export enum GENDER {
  Male = "Male",
  Female = "Female",
}

export enum JobType {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: GENDER;

  password: string;
  confirmPassword: string;
}

export interface UserIntroEditData {
  firstName: string;
  lastName: string;
  gender: GENDER;
  bio: string;
  dateOfBirth?: Date;
  contact: string;
  location: string;
  email: string;
}

export interface IUser {
  _id: string;
  role: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  location: string;
  about: string;
  pfp: string;
  gender: GENDER;
  coverPhoto: string;
  company?: ICompany;
  firstName: string;
  lastName: string;
  contact: string;
  currPosition?: string;
  bio?: string;
  skills?: string[];
  generateAuthToken(): string;

  education?: {
    schoolName: string;
    degree: string;
    graduateYear: string;
  }[];

  experience?: {
    jobType: JobType;
    company: ICompany;
    position: string;
    startDate: Date;
    endDate: Date;
    desc: string;
  }[];

  projects?: {
    projectName: string;
    link: string;
    desc: string;
    startDate: Date;
    endDate: Date | string;
  }[];

  certifications?: {
    name: string;
    organization: string;
    issueDate: Date;
  }[];
}
