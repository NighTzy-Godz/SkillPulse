import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import jobRoutes from "./routes/jobRoutes";

const PORT = process.env.PORT;
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

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
