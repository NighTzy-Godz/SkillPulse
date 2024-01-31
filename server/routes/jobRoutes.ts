import { Router } from "express";
import { createJob, searchJobs } from "../controller/jobController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";

const router = Router();

router.get("/searchJobs", searchJobs);
router.post("/:companyId/createJob", [isAuth, isCompanyOwned], createJob);

export default router;
