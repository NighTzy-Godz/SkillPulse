import { Router } from "express";
import { loginUser, registerJobSeeker } from "../controller/userController";

const router = Router();

router.post("/registerJobSeeker", registerJobSeeker);
router.post("/loginUser", loginUser);

export default router;
