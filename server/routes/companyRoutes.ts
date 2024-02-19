import { Router } from "express";
import {
  getCompanyData,
  registerCompany,
  searchCompany,
  updateCompanyLogo,
} from "../controller/companyController";
import isAuth from "../middleware/isAuth";
import isCompanyOwned from "../middleware/isCompanyOwned";
import multer from "multer";

const router = Router();
import { storage } from "../cloudinary";
const upload = multer({ storage });

router.get("/getCompanyData/:companyId", getCompanyData);
router.get("/search/:searchTerm", searchCompany);

router.put(
  "/updateCompanyLogo",
  upload.single("pfp"),
  [isAuth, isCompanyOwned],
  updateCompanyLogo
);
router.post("/registerCompany", [isAuth], registerCompany);
export default router;
