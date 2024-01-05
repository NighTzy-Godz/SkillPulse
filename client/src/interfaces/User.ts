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
