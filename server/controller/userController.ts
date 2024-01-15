import { Request, Response, NextFunction } from "express";
import {
  UserRegisterData,
  userLoginValidator,
  userRegisterValidator,
  userUpdateIntroValidator,
  userUpdateAboutValidator,
  UserAddExpData,
  userAddExpValidator,
} from "../validators/userValidator";
import User from "../models/User_Model";
import bcrypt from "bcrypt";

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const currUser = await User.findOne({ _id: userId });
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
      "experience"
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

    const existingUser = await User.findOne({ email });
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
