import { Router } from "express";
import {
  registerCompany,
  searchCompany,
} from "../controller/companyController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/registerCompany", [isAuth], registerCompany);
router.get("/search/:searchTerm", searchCompany);

export default router;
