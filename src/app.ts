import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Express Template with Typescript" });
});

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
