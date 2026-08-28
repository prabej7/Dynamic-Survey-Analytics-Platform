"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const modules_1 = __importDefault(require("./modules"));
require("./types/express");
dotenv_1.default.config({ path: "../.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://survey-puce-five.vercel.app"],
    credentials: true,
}));
app.use("/api", modules_1.default);
app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to Express Template with Typescript" });
});
app.use(errorMiddleware_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
