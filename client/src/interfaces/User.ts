export enum GENDER {
  Male = "Male",
  Female = "Female",
}

export enum ROLE {
  JobSeeker = "JobSeeker",
  Employer = "Employer",
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
