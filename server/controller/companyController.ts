import { Request, Response, NextFunction } from "express";
import {
  RegisterCompanyData,
  registerCompanyValidator,
} from "../validators/companyValidator";
import Company from "../models/Company_Model";
import User from "../models/User_Model";

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

    const currUser = req.user?._id;
    const user = await User.findOne({ _id: currUser });
    if (!user) return res.status(404).send("User did not found");

    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res.status(409).send("This company already exists");

    const newCompany = new Company({
      name,
      industry,
      size,
      email,
      location,
      owner: currUser,
    });

    await newCompany.save();

    res.send(newCompany);
  } catch (error) {
    next(error);
  }
};

export const searchCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchTerm } = req.params;

    let companies;

    if (!searchTerm) {
      companies = await Company.find({}).sort({ name: 1 }).limit(20);
    } else {
      companies = await Company.find({
        name: { $regex: new RegExp(searchTerm, "i") },
      }).sort({ name: 1 });
    }
    console.log(searchTerm);
    res.send(companies);
  } catch (error) {
    next(error);
  }
};
