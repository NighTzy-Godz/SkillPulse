import Joi, { Schema } from "joi";
import { EmploymentType } from "../models/User_Model";

export interface CreateJobData {
  title: string;
  description: string;
  salary: string;
  employmentType: EmploymentType;
  location: string;
}

export interface JobUpdateData extends CreateJobData {}

export const createJobValidator = (
  data: CreateJobData
): Joi.ValidationResult => {
  const schema: Schema<CreateJobData> = Joi.object({
    title: Joi.string().min(5).max(100).required().messages({
      "any.required": "Job Title is a required field",
      "string.base": "Job Title should be a type of string",
      "string.min": "Job Title should contain atleast 5 characters",
      "string.max": "Job Title should only contain 100 characters",
      "string.empty": "Job Title cannot be empty",
    }),

    description: Joi.string().min(30).max(3000).required().messages({
      "any.required": "Job Description is a required field",
      "string.base": "Job Description should be a type of string",
      "string.min": "Job Description should contain atleast 30 characters",
      "string.max": "Job Description should only contain 3000 characters",
      "string.empty": "Job Description cannot be empty",
    }),

    salary: Joi.string()
      .pattern(/^[0-9]/)
      .required()
      .messages({
        "any.required": "Job Salary is a required field",
        "string.base": "Job Salary should be a type of string",
        "string.pattern.base": "Job Salary should only contain numbers",
        "string.empty": "Job Salary cannot be empty",
      }),

    location: Joi.string().min(10).max(60).trim().required().messages({
      "string.empty": "Job Location cannot be empty",
      "string.base": "Job Location should be a type of string",
      "string.min": "Job Location should have atleast 10 characters",
      "string.max": "Job Location should only contain 60 characters",
      "any.required": "Job Location is a required field",
    }),

    employmentType: Joi.string()
      .valid(...Object.values(EmploymentType))
      .required()
      .messages({
        "string.empty": "Employment Type cannot be empty",
        "string.base": "Employment Type should be a type of string",
        "any.required": "Employment Type is a required field",
        "any.only": "Invalid Employment Type",
      }),
  });

  return schema.validate(data);
};

export const jobUpdateValidator = (
  data: CreateJobData
): Joi.ValidationResult => {
  const schema: Schema<CreateJobData> = Joi.object({
    title: Joi.string().min(5).max(100).required().messages({
      "any.required": "Job Title is a required field",
      "string.base": "Job Title should be a type of string",
      "string.min": "Job Title should contain atleast 5 characters",
      "string.max": "Job Title should only contain 100 characters",
      "string.empty": "Job Title cannot be empty",
    }),

    description: Joi.string().min(30).max(3000).required().messages({
      "any.required": "Job Description is a required field",
      "string.base": "Job Description should be a type of string",
      "string.min": "Job Description should contain atleast 30 characters",
      "string.max": "Job Description should only contain 3000 characters",
      "string.empty": "Job Description cannot be empty",
    }),

    salary: Joi.string()
      .pattern(/^[0-9]/)
      .required()
      .messages({
        "any.required": "Job Salary is a required field",
        "string.base": "Job Salary should be a type of string",
        "string.pattern.base": "Job Salary should only contain numbers",
        "string.empty": "Job Salary cannot be empty",
      }),

    location: Joi.string().min(10).max(60).trim().required().messages({
      "string.empty": "Job Location cannot be empty",
      "string.base": "Job Location should be a type of string",
      "string.min": "Job Location should have atleast 10 characters",
      "string.max": "Job Location should only contain 60 characters",
      "any.required": "Job Location is a required field",
    }),

    employmentType: Joi.string()
      .valid(...Object.values(EmploymentType))
      .required()
      .messages({
        "string.empty": "Employment Type cannot be empty",
        "string.base": "Employment Type should be a type of string",
        "any.required": "Employment Type is a required field",
        "any.only": "Invalid Employment Type",
      }),
  });

  return schema.validate(data);
};
