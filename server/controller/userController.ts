import { Request, Response, NextFunction } from "express";
import { jobSeekerRegisterValidator } from "../validators/userValidator";
import User, { ROLE } from "../models/User_Model";
import bcrypt from "bcrypt";

export const registerJobSeeker = async (
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
    } = req.body;

    const role = ROLE.JobSeeker;

    const { error } = jobSeekerRegisterValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email, role });
    if (existingUser)
      return res.status(409).send("User with this email already exist");

    if (password !== confirmPassword)
      return res
        .status(400)
        .send("Password and Confirm Password did not match");

    const newUser = new User({
      firstName,
      lastName,
      email,
      contact,
      role,
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
