import { Router } from "express";
import { registerCompany } from "../controller/companyController";

const router = Router();

router.post("/registerCompany", registerCompany);

export default router;
