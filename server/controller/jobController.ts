import { Request, Response, NextFunction } from "express";
import { CreateJobData, createJobValidator } from "../validators/jobValidator";
import Company from "../models/Company_Model";
import Job from "../models/Job_Model";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;

    const {
      title,
      description,
      salary,
      employmentType,
      location,
    }: CreateJobData = req.body;

    const { error } = createJobValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundCompany = await Company.findOne({ _id: companyId });
    if (!foundCompany) return res.status(404).send("Company did not found");

    const newJob = new Job({
      title,
      description,
      salary,
      employmentType,
      location,

      company: companyId,
    });

    await newJob.save();

    res.send(newJob);
  } catch (error) {
    next(error);
  }
};
