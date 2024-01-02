import { Router } from "express";
import { registerJobSeeker } from "../controller/userController";

const router = Router();

router.post("/registerJobSeeker", registerJobSeeker);

export default router;
