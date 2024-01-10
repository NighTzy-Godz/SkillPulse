import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controller/userController";

const router = Router();

router.get("/getUserData/:userId", getUserData);

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

export default router;
