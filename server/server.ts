import express, { json, urlencoded } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
