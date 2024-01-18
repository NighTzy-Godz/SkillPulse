import mongoose from "mongoose";

const DB_URL = process.env.DB_URL as string;
import { faker, fakerEN } from "@faker-js/faker";

import bcrypt from "bcrypt";

import { UserRegisterData } from "../validators/userValidator";
import gender from "../data/gender";
import User, { GENDER } from "../models/User_Model";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the Datebase - User "))
  .catch((err) => console.log("Error on User - ", err));

const generateUserData = (): UserRegisterData => {
  return {
    firstName: fakerEN.person.firstName(),
    lastName: fakerEN.person.lastName(),
    email: faker.internet.email(),
    gender: gender[Math.floor(Math.random() * gender.length)].value as GENDER,
    contact: fakerEN.phone.number(),
    password: "test12345",
    confirmPassword: "test12345",
  };
};

const seedUser = async (qty: number) => {
  try {
    const salt = await bcrypt.genSalt(10);
    for (let i = 0; i < qty; i++) {
      const newUser = await User.create(generateUserData());
      newUser.password = await bcrypt.hash(newUser.password, salt);

      await newUser.save();

      console.log(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

seedUser(30);
