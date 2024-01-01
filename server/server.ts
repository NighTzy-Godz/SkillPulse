import express, { json, urlencoded } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
