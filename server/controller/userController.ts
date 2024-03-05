import { Request, Response, NextFunction } from "express";
import {
  UserRegisterData,
  userLoginValidator,
  userRegisterValidator,
  userUpdateIntroValidator,
  userUpdateAboutValidator,
  UserAddExpData,
  userAddExpValidator,
  userAddEducationValidator,
  UserAddEducationData,
  UserUpdateEducationData,
  userUpdateEducationValidator,
  UserUpdateExpData,
  userUpdateExpValidator,
} from "../validators/userValidator";
import User from "../models/User_Model";
import bcrypt from "bcrypt";
import Job from "../models/Job_Model";
import JobApplication from "../models/JobApplication_Model";
import mongoose, { ObjectId } from "mongoose";

export const userJobApplied = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { jobId } = req.params;

    if (!req.file) {
      return res.status(400).send("Resume cannot be empty");
    }

    const resume: Express.Multer.File = req.file;

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select("_id");
    if (!currUser) return res.status(404).send("User did not found");

    const job = await Job.findOne({ _id: jobId }).select("applicants _id");
    if (!job) return res.status(404).send("Job Post did not found");

    const userApplied = await Job.findOne({
      _id: jobId,
      applicants: { $in: currUserId },
    }).select("_id");

    if (userApplied)
      return res.status(409).send("You already applied to this job posting");

    job.applicants.push(currUserId as ObjectId);

    const newJobApplication = new JobApplication({
      userId: currUserId,
      jobId,
      resume: resume.path,
    });

    await Promise.all([newJobApplication.save(), job.save()]);

    await session.commitTransaction();
    session.endSession();

    res.send(newJobApplication);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getSearchedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchTerm } = req.params;

    const foundUsers = await User.find({
      firstName: { $regex: new RegExp(searchTerm as string, "i") },
    })
      .limit(20)
      .select("firstName lastName pfp");

    res.send(foundUsers);
  } catch (error) {
    next(error);
  }
};

export const getUserJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select("_id");
    if (!currUser) return res.status(404).send("User did not found");

    const userJobs = await JobApplication.find({ userId: currUserId });

    res.send(userJobs);
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const currUser = await User.findOne({ _id: userId }).populate("company");
    if (!currUser) return res.status(404).send("User did not found");

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

export const addUserExp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      position,
      employmentType,
      company,
      endDate,
      startDate,
    }: UserAddExpData = req.body;

    const { error } = userAddExpValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const foundUser = await User.findOne({ _id: currUserId }).select(
      "experience company"
    );
    if (!foundUser) return res.status(404).send("User did not found");

    foundUser.experience?.push({
      position,
      company,
      employmentType,
      startDate,
      endDate,
    });

    await foundUser.save();

    res.send(foundUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserPfp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).populate(
      "company"
    );
    if (!currUser) return res.status(404).send("User did not found");

    if (!req.file)
      return res.status(400).send("Profile picture cannot be empty");

    const pfp: Express.Multer.File = req.file;

    currUser.pfp = pfp.path;

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserCoverPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).populate(
      "company"
    );
    if (!currUser) return res.status(404).send("User did not found");

    if (!req.file)
      return res.status(400).send("Profile picture cannot be empty");

    const coverPhoto: Express.Multer.File = req.file;

    currUser.coverPhoto = coverPhoto.path;

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserIntro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      bio,
      email,
      location,
      contact,
      dateOfBirth,
    } = req.body;

    const { error } = userUpdateIntroValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currentUserId = req.user?._id;
    const foundUser = await User.findOne({ _id: currentUserId });

    if (!foundUser) return res.status(404).send("User did not found");

    const usedEmail = await User.findOne({
      email,
      _id: { $ne: currentUserId },
    });
    if (usedEmail) return res.status(409).send("User with this email exists");

    const usedContact = await User.findOne({
      contact,
      _id: { $ne: currentUserId },
    });
    if (usedContact)
      return res.status(409).send("User with this contact exists");

    foundUser.set({
      firstName,
      lastName,
      gender,
      bio,
      email,
      location,
      contact,
      dateOfBirth,
    });

    await foundUser.save();

    res.send(foundUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { about } = req.body;

    const { error } = userUpdateAboutValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currentUserId = req.user?._id;
    const foundUser = await User.findOne({ _id: currentUserId }).select(
      "about"
    );
    if (!foundUser) return res.status(404).send("User did not found");

    foundUser.about = about;

    await foundUser.save();

    res.send(foundUser);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      gender,
      password,
      confirmPassword,
    }: UserRegisterData = req.body;

    const { error } = userRegisterValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail)
      return res.status(409).send("User with this email already exist");

    const existingUserContact = await User.findOne({ contact });
    if (existingUserContact)
      return res.status(409).send("User with this contact already exist");

    if (password !== confirmPassword)
      return res
        .status(400)
        .send("Password and Confirm Password did not match");

    const newUser = new User({
      firstName,
      lastName,
      email,
      contact,

      gender,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(confirmPassword, salt);

    await newUser.save();

    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).send("User did not found");

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword)
      return res.status(401).send("Credentials did not match");

    const token = existingUser.generateAuthToken();

    res.header("x-auth-token", token).send(token);
  } catch (error) {
    next(error);
  }
};

export const updateUserExp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      company,
      position,

      employmentType,
      startDate,
      endDate,
    }: UserUpdateExpData = req.body;

    const { error } = userUpdateExpValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select(
      "experience"
    );
    if (!currUser) return res.status(404).send("User did not found");

    const experience = currUser.experience?.find((item) => {
      return item._id?.toString() === _id;
    });
    if (!experience) return res.status(404).send("Experience did not found");

    experience.company = company;
    experience.employmentType = employmentType;
    experience.endDate = endDate;
    experience.position = position;
    experience.startDate = startDate;

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

// EDUCATION
export const addUserEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { schoolName, graduateYear, degree }: UserAddEducationData = req.body;

    const { error } = userAddEducationValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select(
      "education"
    );
    if (!currUser) return res.status(404).send("User did not found");

    currUser.education?.push({
      schoolName,
      graduateYear,
      degree,
    });

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, schoolName, graduateYear, degree }: UserUpdateEducationData =
      req.body;

    const { error } = userUpdateEducationValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select(
      "education"
    );
    if (!currUser) return res.status(404).send("User did not found");

    let education = currUser.education?.find((item) => {
      return item._id?.toString() === _id;
    });

    if (!education) return res.status(404).send("Education did not found");

    education.schoolName = schoolName;
    education.graduateYear = graduateYear;
    education.degree = degree;

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { educationId } = req.params;

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId }).select(
      "education"
    );
    if (!currUser) return res.status(404).send("User did not found");

    const educationIndex = currUser.education?.findIndex((item) => {
      return item._id?.toString() === educationId;
    });

    if (educationIndex === -1)
      return res.status(404).send("Education did not found");
    currUser.education?.splice(educationIndex as number, 1);

    await currUser.save();

    res.send(currUser);
  } catch (error) {
    next(error);
  }
};
