import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import jobRoutes from "./routes/jobRoutes";
import mongoose, { ConnectOptions } from "mongoose";
import axios from "axios";

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const PROD_URL = process.env.PROD_URL;

mongoose
  .connect(DB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);

app.get("/healthcheck", (req, res) => {
  res.send("Hi There");
});

const keepDBAlive = async () => {
  try {
    const db = mongoose.connection;
    await db.collection("jobs").findOne({});
    console.log("Keep-alive query executed successfully.");
  } catch (error) {
    console.log(error);
  }
};

const keepBackendAlive = async () => {
  try {
    await axios.get(`${PROD_URL}/healthcheck`);
    console.log("Backend keep-alive request executed successfully.");
  } catch (error) {
    console.error("Error executing backend keep-alive request:", error);
  }
};

const runWarmUp = () => {
  keepDBAlive();
  keepBackendAlive();
};

setInterval(runWarmUp, 300000);

runWarmUp();

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
