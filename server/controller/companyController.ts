import { Request, Response, NextFunction } from "express";
import {
  RegisterCompanyData,
  registerCompanyValidator,
} from "../validators/companyValidator";
import Company from "../models/Company_Model";
import User from "../models/User_Model";
import mongoose from "mongoose";

export const getCompanyData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;

    const foundCompany = await Company.findOne({ _id: companyId });

    if (!foundCompany) return res.status(404).send("Company did not found");

    res.send(foundCompany);
  } catch (error) {
    next(error);
  }
};

export const registerCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { name, industry, size, location, email }: RegisterCompanyData =
      req.body;

    const { error } = registerCompanyValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUser = req.user?._id;
    const user = await User.findOne({ _id: currUser }).select("company");
    if (!user) return res.status(404).send("User did not found");
    if (user.company)
      return res
        .status(409)
        .send("You already registered your company with this user.");

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

    user.company = newCompany._id;

    await Promise.all([newCompany.save(), user.save()]);

    await session.commitTransaction();
    session.endSession();

    res.send(newCompany);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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

    res.send(companies);
  } catch (error) {
    next(error);
  }
};
