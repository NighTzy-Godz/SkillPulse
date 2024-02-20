import Joi, { Schema } from "joi";
import { EmploymentType, GENDER } from "../models/User_Model";

export interface UserRegisterData {
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
  dateOfBirth: Date;
  contact: string;
  location: string;
  email: string;
}

export interface UserAboutEditData {
  about: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserAddExpData {
  position: string;
  employmentType: EmploymentType;
  company: string;
  startDate: Date;
  endDate: Date | string;
}

export interface UserAddEducationData {
  schoolName: string;
  degree: string;
  graduateYear: Date;
}

export const userAddEducationValidator = (
  data: UserAddEducationData
): Joi.ValidationResult => {
  const schema = Joi.object({
    schoolName: Joi.string().required().messages({
      "string.required": "School Name is a required field",
      "string.base": "School Name should be a type of string",
      "any.required": "School Name is a required field",
    }),

    degree: Joi.string().required().messages({
      "string.required": "Degree is a required field",
      "string.base": "Degree should be a type of string",
      "any.required": "Degree is a required field",
    }),

    graduateYear: Joi.date().iso().required().messages({
      "date.base": "Graduate Year should be a type of Date",
      "date.format":
        "Invalid date format. Please use the ISO 8601 format (e.g., YYYY-MM-DD).",
    }),
  });

  return schema.validate(data);
};

export const userAddExpValidator = (
  data: UserAddExpData
): Joi.ValidationResult => {
  const schema = Joi.object({
    position: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Position cannot be empty",
      "string.base": "This input should be a type of string",
      "any.required": "Position is a required field",
      "string.min": "Position should only 3 letters minimum",
      "string.max": "Position should only contain 50 letters maximum",
    }),
    employmentType: Joi.string()
      .valid(...Object.values(EmploymentType))
      .messages({
        "string.empty": "Employment Type cannot be empty",
        "string.base": "Employment should be a type of string",
        "any.only": "Invalid Employment type selected",
        "any.required": "Employment Type is a required field",
      }),

    company: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Company Name cannot be empty",
      "string.base": "This input should be a type of string",
      "any.required": "Company Name is a required field",
      "string.min": "Company Name should only 3 letters minimum",
      "string.max": "Company Name should only contain 50 letters maximum",
    }),

    startDate: Joi.date().iso().messages({
      "date.base": "Invalid date format. Please use a valid date.",
      "date.format":
        "Invalid date format. Please use the ISO 8601 format (e.g., YYYY-MM-DD).",
    }),

    endDate: Joi.alternatives(
      Joi.string().valid("Present"),
      Joi.date()
    ).optional(),
  });

  return schema.validate(data);
};

export const userUpdateIntroValidator = (
  data: UserIntroEditData
): Joi.ValidationResult => {
  const schema: Schema<UserIntroEditData> = Joi.object({
    firstName: Joi.string().min(3).max(20).required().messages({
      "string.empty": "First Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "First Name should have atleast 3 characters",
      "string.max": "First Name should only contain 20 characters",
      "any.required": "First Name is a required field",
    }),

    lastName: Joi.string().min(3).max(20).required().messages({
      "string.empty": "Last Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Last Name should have atleast 3 characters",
      "string.max": "Last Name should only contain 20 characters",
      "any.required": "Last Name is a required field",
    }),

    gender: Joi.string()
      .valid(...Object.values(GENDER))
      .messages({
        "string.empty": "Gender is required.",
        "any.only": "Invalid Gender selected.",
        "any.required": "Gender is required.",
        "string.base": "Gender should be a string.",
      }),

    dateOfBirth: Joi.date().iso().messages({
      "date.base": "Invalid date format. Please use a valid date.",
      "date.format":
        "Invalid date format. Please use the ISO 8601 format (e.g., YYYY-MM-DD).",
    }),

    email: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Email cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Email should have atleast 3 characters",
      "string.max": "Email should only contain 30 characters",
      "any.required": "Email is a required field",
    }),

    contact: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .messages({
        "string.empty": "Contact cannot be empty",
        "string.pattern.base": "Contact should be 11 digits",
        "string.base": "Contact should be a type of string",
      }),

    location: Joi.string().min(10).max(50).trim().messages({
      "string.empty": "Location cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Location should have atleast 10 characters",
      "string.max": "Location should only contain 50 characters",
    }),

    bio: Joi.string().min(5).max(250).trim().allow("").messages({
      "string.base": "This input should be a type of string",
      "string.min": "Bio should have atleast 6 characters",
      "string.max": "Bio should only contain 250 characters",
    }),
  });

  return schema.validate(data);
};

export const userUpdateAboutValidator = (
  data: UserAboutEditData
): Joi.ValidationResult => {
  const schema: Schema<UserAboutEditData> = Joi.object({
    about: Joi.string().max(1000).messages({
      "string.max": "About Field can only contain 1000 characters",
      "string.base": "This input should be a type of string",
    }),
  });

  return schema.validate(data);
};

export const userRegisterValidator = (
  data: UserRegisterData
): Joi.ValidationResult => {
  const schema: Schema<UserRegisterData> = Joi.object({
    firstName: Joi.string().min(3).max(20).required().messages({
      "string.empty": "First Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "First Name should have atleast 3 characters",
      "string.max": "First Name should only contain 20 characters",
      "any.required": "First Name is a required field",
    }),

    lastName: Joi.string().min(3).max(20).required().messages({
      "string.empty": "Last Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Last Name should have atleast 3 characters",
      "string.max": "Last Name should only contain 20 characters",
      "any.required": "Last Name is a required field",
    }),

    email: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Email cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Email should have atleast 3 characters",
      "string.max": "Email should only contain 30 characters",
      "any.required": "Email is a required field",
    }),

    contact: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .messages({
        "string.empty": "Contact cannot be empty",
        "string.pattern.base": "Contact should be 11 digits",
        "string.base": "Contact should be a type of string",
      }),

    gender: Joi.string()
      .valid(...Object.values(GENDER))
      .messages({
        "string.empty": "Gender is required.",
        "any.only": "Invalid Gender selected.",
        "any.required": "Gender is required.",
        "string.base": "Gender should be a string.",
      }),

    password: Joi.string().min(8).max(25).messages({
      "string.empty": "Password cannot be empty",
      "string.base": "This input should be a type of string.",
      "string.min": "Password should have atleast 8 characters",
      "string.max": "Password should only contain 25 characters",
    }),

    confirmPassword: Joi.string().min(8).max(25).messages({
      "string.empty": "Confirm Password cannot be empty",
      "string.base": "This input should be a type of string.",
      "string.min": "Confirm Password should have atleast 8 characters",
      "string.max": "Confirm Password should only contain 25 characters",
    }),
  });

  return schema.validate(data);
};

export const userLoginValidator = (
  data: UserLoginData
): Joi.ValidationResult => {
  const schema: Schema<UserLoginData> = Joi.object({
    email: Joi.string().required().trim().messages({
      "string.empty": "Email Name cannot be empty",
      "string.base": "This input should be a type of string",
      "any.required": "Email is a required field",
    }),

    password: Joi.string().required().trim().messages({
      "string.empty": "Password Name cannot be empty",
      "string.base": "This input should be a type of string",
      "any.required": "Password is a required field",
    }),
  });

  return schema.validate(data);
};
