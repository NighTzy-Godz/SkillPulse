import { Router } from "express";

import { storage } from "../cloudinary";
import multer from "multer";
const upload = multer({ storage });

import {
  addUserExp,
  getUserData,
  loginUser,
  registerUser,
  updateUserAbout,
  updateUserIntro,
  userJobApplied,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/getUserData/:userId", getUserData);

router.put("/updateUserIntro", [isAuth], updateUserIntro);
router.put("/updateUserAbout", [isAuth], updateUserAbout);

router.post("/applyJob", upload.single("resume"), [isAuth], userJobApplied);
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/addUserExp", [isAuth], addUserExp);

export default router;
