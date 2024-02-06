import { Router } from "express";
import {
  createJob,
  getJobDescription,
  saveJob,
  searchJobs,
  unsaveJob,
} from "../controller/jobController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";

const router = Router();
router.get("/getJobDescription/:jobId", getJobDescription);
router.get("/searchJobs", searchJobs);

router.post("/saveJob", [isAuth], saveJob);
router.post("/unsaveJob", [isAuth], unsaveJob);
router.post("/:companyId/createJob", [isAuth, isCompanyOwned], createJob);

export default router;
