import express, { json, urlencoded } from "express";
import cors from "cors";
const PORT = 8080;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Im the TS HOME");
});

app.listen(PORT, () => console.log(`Connected to PORT ${PORT}`));
