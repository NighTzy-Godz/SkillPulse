import { Request, Response, NextFunction } from "express";
import Company from "../models/Company_Model";
import User from "../models/User_Model";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userCompanyId: mongoose.ObjectId;
    }
  }
}

const isCompanyOwned = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const foundUser = await User.findOne({ _id: currUserId }).select("company");
    if (!foundUser) return res.status(404).send("User did not found");

    const isCompanyOwned = await Company.findOne({ _id: foundUser.company });
    if (!isCompanyOwned)
      return res
        .status(403)
        .send(
          "Sorry but you are not the company owner. You cannot do this action"
        );

    req.userCompanyId = isCompanyOwned._id;

    next();
  } catch (error) {
    next(error);
  }
};

export default isCompanyOwned;
