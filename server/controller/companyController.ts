import { Request, Response, NextFunction } from "express";
import {
  RegisterCompanyData,
  UpdateCompanyIntroData,
  UpdateCompanyOverviewData,
  registerCompanyValidator,
  updateCompanyIntroValidator,
  updateCompanyOverviewValidator,
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

export const updateCompanyLogo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currCompanyId = req.userCompanyId;
    const currCompany = await Company.findOne({ _id: currCompanyId });
    if (!currCompany) return res.status(404).send("Company did not found");

    if (!req.file) return res.status(400).send("Company Logo cannot be empty");

    const logo: Express.Multer.File = req.file;

    currCompany.logo = logo.path;

    await currCompany.save();
    res.send(currCompany);
  } catch (error) {
    next(error);
  }
};

export const updateCompanyCoverPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currCompanyId = req.userCompanyId;
    const currCompany = await Company.findOne({ _id: currCompanyId });
    if (!currCompany) return res.status(404).send("Company did not found");

    if (!req.file) return res.status(400).send("Company Logo cannot be empty");

    const coverPhoto: Express.Multer.File = req.file;

    currCompany.coverPhoto = coverPhoto.path;

    await currCompany.save();
    res.send(currCompany);
  } catch (error) {
    next(error);
  }
};

export const updateCompanyIntro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      industry,
      size,
      location,
      email,
      description,
    }: UpdateCompanyIntroData = req.body;

    const { error } = updateCompanyIntroValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currCompanyId = req.userCompanyId;
    const company = await Company.findOne({ _id: currCompanyId });
    if (!company) return res.status(404).send("Company did not found");

    const isEmailUsed = await Company.findOne({
      email,
      _id: { $ne: currCompanyId },
    });
    if (isEmailUsed)
      return res.status(409).send("Company with this email has been used");

    company.set({
      name,
      industry,
      size,
      location,
      email,
      description,
    });

    await company.save();

    res.send(company);
  } catch (error) {
    next(error);
  }
};

export const updateCompanyOverview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { about }: UpdateCompanyOverviewData = req.body;

    const { error } = updateCompanyOverviewValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currCompanyId = req.userCompanyId;
    const company = await Company.findOne({ _id: currCompanyId });
    if (!company) return res.status(404).send("Company did not found");

    company.about = about;

    await company.save();

    res.send(company);
  } catch (error) {
    next(error);
  }
};
