import { Router } from "express";
import {
  createJob,
  getJobDescription,
  searchJobs,
} from "../controller/jobController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";

const router = Router();
router.get("/getJobDescription/:jobId", getJobDescription);
router.get("/searchJobs", searchJobs);
router.post("/:companyId/createJob", [isAuth, isCompanyOwned], createJob);

export default router;
