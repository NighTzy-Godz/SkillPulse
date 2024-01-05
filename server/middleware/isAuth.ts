import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwtSecretPass = "secretPass";
interface DecodedUser {
  _id: string;
  fullName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Forbidden. You're not authorized");

    const decoded = jwt.verify(token, jwtSecretPass) as JwtPayload;
    const user: DecodedUser = {
      _id: decoded._id,
      fullName: decoded.full_name,
    };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
