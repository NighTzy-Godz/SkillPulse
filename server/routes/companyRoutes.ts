import { Router } from "express";
import {
  getCompanyData,
  registerCompany,
  searchCompany,
  updateCompanyOverview,
  updateCompanyCoverPhoto,
  updateCompanyIntro,
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

router.put(
  "/updateCompanyCoverPhoto",
  upload.single("coverPhoto"),
  [isAuth, isCompanyOwned],
  updateCompanyCoverPhoto
);

router.put("/updateCompanyIntro", [isAuth, isCompanyOwned], updateCompanyIntro);
router.put(
  "/updateCompanyOverview",
  [isAuth, isCompanyOwned],
  updateCompanyOverview
);
router.post("/registerCompany", [isAuth], registerCompany);
export default router;
