export enum GENDER {
  Male = "Male",
  Female = "Female",
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

export interface IUser {
  role: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  location: string;
  about: string;
  pfp: string;
  gender: GENDER;
  coverPhoto: string;
  company?: string;
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
