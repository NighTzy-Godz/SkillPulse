import { Router } from "express";
import { loginUser, registerUser } from "../controller/userController";

const router = Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

export default router;
