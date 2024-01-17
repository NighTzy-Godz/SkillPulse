import { Router } from "express";
import {
  getCompanyData,
  registerCompany,
  searchCompany,
} from "../controller/companyController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/getCompanyData/:companyId", getCompanyData);
router.get("/search/:searchTerm", searchCompany);

router.post("/registerCompany", [isAuth], registerCompany);
export default router;
