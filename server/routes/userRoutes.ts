import { Router } from "express";

import { storage } from "../cloudinary";
import multer from "multer";
const upload = multer({ storage });

import {
  addUserEducation,
  addUserExp,
  deleteUserEducation,
  getSearchedUsers,
  getUserData,
  loginUser,
  registerUser,
  updateUserAbout,
  updateUserCoverPhoto,
  updateUserEducation,
  updateUserExp,
  updateUserIntro,
  updateUserPfp,
  userJobApplied,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";
import isUserExist from "../middleware/isUserExist";

const router = Router();

router.get("/getUserData/:userId", getUserData);
router.get("/searchUser/:searchTerm", getSearchedUsers);

router.put("/updateUserIntro", [isAuth], updateUserIntro);
router.put("/updateUserAbout", [isAuth], updateUserAbout);
router.put(
  "/updateUserPfp",
  upload.single("pfp"),
  [isAuth, isUserExist],
  updateUserPfp
);
router.put("/updateUserEducation", [isAuth], updateUserEducation);
router.put("/updateUserExp", [isAuth], updateUserExp);
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

router.delete("/deleteEducation/:educationId", [isAuth], deleteUserEducation);
export default router;
