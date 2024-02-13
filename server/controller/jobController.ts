import { Request, Response, NextFunction } from "express";
import {
  CreateJobData,
  JobUpdateData,
  createJobValidator,
  jobUpdateValidator,
} from "../validators/jobValidator";
import Company from "../models/Company_Model";
import Job from "../models/Job_Model";
import User from "../models/User_Model";
import { ObjectId } from "mongoose";
import JobApplication from "../models/JobApplication_Model";

export const getJobsCreated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCompanyId = req.userCompanyId;

    const jobsCreated = await Job.find({
      company: { $in: userCompanyId },
    }).populate("company");

    res.send(jobsCreated);
  } catch (error) {
    next(error);
  }
};

export const getAppliedJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;

    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    const appliedJobs = await JobApplication.find({
      userId: currUserId,
    }).populate({
      path: "jobId",
      populate: {
        path: "company",
        select: "name logo",
      },
    });

    res.send(appliedJobs);
  } catch (error) {
    next(error);
  }
};

export const getSavedJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;

    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    const savedJobs = await Job.find({
      savedBy: { $in: currUserId },
    }).populate("company");

    res.send(savedJobs);
  } catch (error) {
    next(error);
  }
};

export const getJobDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId }).populate(
      "company applicants"
    );
    if (!job) return res.status(404).send("Job did not found");

    res.send(job);
  } catch (error) {
    next(error);
  }
};

export const searchJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobSearch, page } = req.query;

    const LIMIT = 15;
    const pageNumber = parseInt(page as string) || 1;
    const skip = (pageNumber - 1) * LIMIT;

    const query = jobSearch
      ? {
          title: { $regex: new RegExp(jobSearch as string, "i") },
        }
      : {};

    const [jobResults, jobResultCount] = await Promise.all([
      Job.find(query).limit(LIMIT).skip(skip).populate("company"),
      Job.countDocuments(query),
    ]);

    const resContent = {
      totalCount: jobResultCount,
      data: jobResults,
      currPage: pageNumber,
    };

    res.send(resContent);
  } catch (error) {
    next(error);
  }
};

export const saveJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.body;

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    const job = await Job.findOne({ _id: jobId }).populate("company");
    if (!job)
      return res
        .status(404)
        .send("Job Post did not found. Cannot save this time");

    const isSaved = job.savedBy.find((item) => item.toString() === currUserId);
    if (isSaved) return res.status(409).send("You already saved this job");

    job.savedBy.push(currUserId as ObjectId);
    await job.save();

    res.send(job);
  } catch (error) {
    next(error);
  }
};

export const unsaveJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.body;

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
      },
      { $pull: { savedBy: currUserId } },
      { new: true }
    ).populate("company");

    if (!job) return res.status(400).send("Job did not found");

    res.send(job);
  } catch (error) {
    next(error);
  }
};

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

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    const {
      title,
      description,
      salary,
      employmentType,
      location,
    }: JobUpdateData = req.body;

    const { error } = jobUpdateValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const job = await Job.findOne({ _id: jobId }).populate(
      "company applicants"
    );
    if (!job) return res.status(404).send("Job did not found");

    job.set({
      title,
      description,
      salary,
      employmentType,
      location,
    });

    await job.save();

    res.send(job);
  } catch (error) {
    next(error);
  }
};
