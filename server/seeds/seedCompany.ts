import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Company, { INDUSTRY } from "../models/Company_Model";
const DB_URL = process.env.DB_URL as string;
import { faker, fakerEN } from "@faker-js/faker";
import { RegisterCompanyData } from "../validators/companyValidator";
import industries from "../data/industries";
import companySize from "../data/companySize";
import User from "../models/User_Model";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Datebase (SEED)- Company "))
  .catch((err) => console.log("Error on Company (SEED)- ", err));

const generateCompanyData = (): RegisterCompanyData => {
  return {
    name: fakerEN.company.name(),
    industry: industries[Math.floor(Math.random() * industries.length)]
      .value as INDUSTRY,
    location: `${fakerEN.location.streetAddress()} ${fakerEN.location.city()} ${fakerEN.location.country()}`,
    email: faker.internet.email(),
    size: `${
      companySize[Math.floor(Math.random() * companySize.length)].value
    }`,
  };
};

const seedCompanies = async (qty: number) => {
  try {
    const userIds = await User.find({}).select("_id company");

    for (let i = 0; i < qty; i++) {
      const user = userIds[Math.floor(Math.random() * userIds.length)];
      const newCompany = new Company(generateCompanyData());

      newCompany.owner =
        userIds[Math.floor(Math.random() * userIds.length)]._id;

      user.company = newCompany._id;
      await newCompany.save();
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};

seedCompanies(100);
