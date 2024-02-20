import { Router } from "express";

import { storage } from "../cloudinary";
import multer from "multer";
const upload = multer({ storage });

import {
  addUserEducation,
  addUserExp,
  getUserData,
  loginUser,
  registerUser,
  updateUserAbout,
  updateUserCoverPhoto,
  updateUserEducation,
  updateUserIntro,
  updateUserPfp,
  userJobApplied,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";
import isUserExist from "../middleware/isUserExist";

const router = Router();

router.get("/getUserData/:userId", getUserData);

router.put("/updateUserIntro", [isAuth], updateUserIntro);
router.put("/updateUserAbout", [isAuth], updateUserAbout);
router.put(
  "/updateUserPfp",
  upload.single("pfp"),
  [isAuth, isUserExist],
  updateUserPfp
);
router.put("/updateUserEducation", [isAuth], updateUserEducation);

router.put(
  "/updateUserCoverPhoto",
  upload.single("coverPhoto"),
  [isAuth, isUserExist],
  updateUserCoverPhoto
);

router.post(
  "/applyJob/:jobId",
  upload.single("resume"),
  [isAuth],
  userJobApplied
);

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/addUserExp", [isAuth], addUserExp);
router.post("/addUserEducation", [isAuth], addUserEducation);

export default router;
