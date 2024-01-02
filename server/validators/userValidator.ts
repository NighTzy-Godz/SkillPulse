import Joi, { Schema } from "joi";
import { GENDER, ROLE } from "../models/User_Model";

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: GENDER;
  role: ROLE;
  password: string;
  confirmPassword: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export const jobSeekerRegisterValidator = (
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

    role: Joi.string()
      .valid(...Object.values(ROLE))
      .messages({
        "string.empty": "User Role is required.",
        "any.only": "Invalid User Role selected.",
        "any.required": "User Role is required.",
        "string.base": "User Role should be a string.",
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
