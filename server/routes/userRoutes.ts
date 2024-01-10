import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
  updateUserIntro,
} from "../controller/userController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/getUserData/:userId", getUserData);

router.put("/updateUserIntro", [isAuth], updateUserIntro);
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

export default router;
