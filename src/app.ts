import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./modules";
import "./types/express";
dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Express Template with Typescript" });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
