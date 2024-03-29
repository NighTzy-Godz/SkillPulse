import { INDUSTRY } from "../models/Company_Model";
import Joi, { Schema } from "joi";
export interface RegisterCompanyData {
  name: string;
  industry: INDUSTRY;
  size: string;
  location: string;
  email: string;
}

export interface UpdateCompanyIntroData {
  name: string;
  industry: INDUSTRY;
  size: string;
  location: string;
  email: string;
  description: string;
}

export interface UpdateCompanyOverviewData {
  about: string;
}

export const registerCompanyValidator = (
  data: RegisterCompanyData
): Joi.ValidationResult => {
  const schema: Schema<RegisterCompanyData> = Joi.object({
    name: Joi.string().min(3).max(30).trim().required().messages({
      "string.empty": "Company Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Company Name should have atleast 3 characters",
      "string.max": "Company Name should only contain 30 characters",
      "any.required": "Company Name is a required field",
    }),

    email: Joi.string().min(3).max(30).trim().required().messages({
      "string.empty": "Company Email cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Company Email should have atleast 3 characters",
      "string.max": "Company Email should only contain 30 characters",
      "any.required": "Company Email is a required field",
    }),

    industry: Joi.string()
      .valid(...Object.values(INDUSTRY))
      .required()
      .messages({
        "string.empty": "Industry is required.",
        "any.only": "Invalid Industry selected.",
        "any.required": "Industry is required.",
        "string.base": "Industry should be a string.",
      }),

    size: Joi.string().trim().required().messages({
      "string.empty": "Company Name cannot be empty",
      "string.base": "This input should be a type of string",

      "any.required": "Company Name is a required field",
    }),

    location: Joi.string().min(10).max(60).trim().required().messages({
      "string.empty": "Location cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Location should have atleast 10 characters",
      "string.max": "Location should only contain 60 characters",
      "any.required": "Location is a required field",
    }),
  });

  return schema.validate(data);
};

export const updateCompanyIntroValidator = (
  data: RegisterCompanyData
): Joi.ValidationResult => {
  const schema: Schema<RegisterCompanyData> = Joi.object({
    name: Joi.string().min(3).max(30).trim().required().messages({
      "string.empty": "Company Name cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Company Name should have atleast 3 characters",
      "string.max": "Company Name should only contain 30 characters",
      "any.required": "Company Name is a required field",
    }),

    email: Joi.string().min(3).max(30).trim().required().messages({
      "string.empty": "Company Email cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Company Email should have atleast 3 characters",
      "string.max": "Company Email should only contain 30 characters",
      "any.required": "Company Email is a required field",
    }),

    industry: Joi.string()
      .valid(...Object.values(INDUSTRY))
      .required()
      .messages({
        "string.empty": "Industry is required.",
        "any.only": "Invalid Industry selected.",
        "any.required": "Industry is required.",
        "string.base": "Industry should be a string.",
      }),

    size: Joi.string().trim().required().messages({
      "string.empty": "Company Name cannot be empty",
      "string.base": "This input should be a type of string",

      "any.required": "Company Name is a required field",
    }),

    location: Joi.string().min(10).max(60).trim().required().messages({
      "string.empty": "Location cannot be empty",
      "string.base": "This input should be a type of string",
      "string.min": "Location should have atleast 10 characters",
      "string.max": "Location should only contain 60 characters",
      "any.required": "Location is a required field",
    }),

    description: Joi.string().min(5).max(250).required().messages({
      "string.required": "Company Description is a required field",
      "string.base": "Company Description should be a type of string",
      "any.required": "Company Description is a required field",
      "string.max": "Company Description should only contain 250 characters",
      "string.min": "Company Description should have alteast 5 characters",
    }),
  });

  return schema.validate(data);
};

export const updateCompanyOverviewValidator = (
  data: UpdateCompanyOverviewData
): Joi.ValidationResult => {
  const schema = Joi.object({
    about: Joi.string().min(5).max(1000).required().messages({
      "string.required": "Company Overview is a required field",
      "string.base": "Company Overview should be a type of string",
      "any.required": "Company Overview is a required field",
      "string.min": "Company Overview should be atleast 5 characters",
      "string.max": "Company Overview should only contain 1000 characters",
    }),
  });

  return schema.validate(data);
};
