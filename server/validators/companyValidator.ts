import { INDUSTRY } from "../models/Company_Model";
import Joi, { Schema, object } from "joi";
export interface RegisterCompanyData {
  name: string;
  industry: INDUSTRY;
  size: string;
  location: string;
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
