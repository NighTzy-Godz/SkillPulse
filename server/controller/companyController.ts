import { Request, Response, NextFunction } from "express";
import {
  RegisterCompanyData,
  registerCompanyValidator,
} from "../validators/companyValidator";
import Company from "../models/Company_Model";

export const registerCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, industry, size, location, email }: RegisterCompanyData =
      req.body;

    const { error } = registerCompanyValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res.status(409).send("This company already exists");

    const newCompany = new Company({
      name,
      industry,
      size,
      email,
      location,
    });

    await newCompany.save();

    res.send(newCompany);
  } catch (error) {
    next(error);
  }
};
