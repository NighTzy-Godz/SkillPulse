import { ICompany, INDUSTRY } from "./Company";

export enum GENDER {
  Male = "Male",
  Female = "Female",
}

export enum employmentType {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
}

export interface UserApplyJobData {
  resume: FileList;
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

export interface UserAddExpData {
  position: string;
  employmentType: employmentType;
  company: string;

  startDate: Date;
  endDate: Date | string;
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

export interface UserAboutEditData {
  about: string;
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
    employmentType: employmentType;
    company: string;
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
