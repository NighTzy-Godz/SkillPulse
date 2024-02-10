import { Router } from "express";
import {
  createJob,
  getAppliedJobs,
  getJobsCreated,
  getJobDescription,
  getSavedJobs,
  saveJob,
  searchJobs,
  unsaveJob,
} from "../controller/jobController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";
import isUserExist from "../middleware/isUserExist";

const router = Router();
router.get("/getJobDescription/:jobId", getJobDescription);
router.get("/searchJobs", searchJobs);

router.get(
  "/getJobsCreated",
  [isAuth, isUserExist, isCompanyOwned],
  getJobsCreated
);
router.get("/getAppliedJobs", [isAuth], getAppliedJobs);
router.get("/getSavedJobs", [isAuth], getSavedJobs);

router.post("/saveJob", [isAuth], saveJob);
router.post("/unsaveJob", [isAuth], unsaveJob);
router.post("/:companyId/createJob", [isAuth, isCompanyOwned], createJob);

export default router;
