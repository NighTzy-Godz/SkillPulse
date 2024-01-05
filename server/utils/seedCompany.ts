import mongoose from "mongoose";
import Company, { ICompany, INDUSTRY } from "../models/Company_Model";
const DB_URL = "mongodb://localhost:27017/skillpulse";
import { faker, fakerEN } from "@faker-js/faker";
import { RegisterCompanyData } from "../validators/companyValidator";
import industries from "../data/industries";
import companySize from "../data/companySize";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Datebase - Company "))
  .catch((err) => console.log("Error on Company - ", err));

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
    for (let i = 0; i < qty; i++) {
      const newCompany = new Company(generateCompanyData());
      await newCompany.save();
      console.log(newCompany);
    }
  } catch (error) {
    console.log(error);
  }
};

seedCompanies(40);
