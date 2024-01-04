import { Router } from "express";
import {
  registerCompany,
  searchCompany,
} from "../controller/companyController";

const router = Router();

router.post("/registerCompany", registerCompany);
router.get("/search/:searchTerm", searchCompany);

export default router;
