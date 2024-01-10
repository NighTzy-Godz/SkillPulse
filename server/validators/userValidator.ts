import Joi, { Schema } from "joi";
import { GENDER } from "../models/User_Model";

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

export interface UserLoginData {
  email: string;
  password: string;
}

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

    dateofBirth: Joi.date().iso().messages({
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

    bio: Joi.string().min(5).max(250).trim().messages({
      "string.empty": "Bio cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Bio should have atleast 6 characters",
      "string.max": "Bio should only contain 250 characters",
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
