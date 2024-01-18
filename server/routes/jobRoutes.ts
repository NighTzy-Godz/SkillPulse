import { Router } from "express";
import { createJob } from "../controller/jobController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";

const router = Router();

router.post("/:companyId/createJob", [isAuth, isCompanyOwned], createJob);

export default router;
