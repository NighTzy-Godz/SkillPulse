import { Router } from "express";
import {
  addUserExp,
  getUserData,
  loginUser,
  registerUser,
  updateUserAbout,
  updateUserIntro,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/getUserData/:userId", getUserData);

router.put("/updateUserIntro", [isAuth], updateUserIntro);
router.put("/updateUserAbout", [isAuth], updateUserAbout);

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/addUserExp", [isAuth], addUserExp);

export default router;
