import { NextFunction, Request, Response } from "express";
import User from "../models/User_Model";

const isUserExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currUserId = req.user?._id;

    const currUser = await User.findOne({ _id: currUserId }).select("_id");
    if (!currUser) return res.status(404).send("User did not found");

    next();
  } catch (error) {
    next(error);
  }
};
export default isUserExist;
