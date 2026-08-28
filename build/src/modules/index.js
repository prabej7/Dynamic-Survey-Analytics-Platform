"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./auth/routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./dashboard/routes/dashboardRoutes"));
const responseRoutes_1 = __importDefault(require("./response/routes/responseRoutes"));
const surveyRoutes_1 = __importDefault(require("./survey/routes/surveyRoutes"));
const router = (0, express_1.Router)();
router.use("/v1/auth", authRoutes_1.default);
router.use("/v1/surveys", surveyRoutes_1.default);
router.use("/v1/responses", responseRoutes_1.default);
router.use("/v1/dashboard", dashboardRoutes_1.default);
exports.default = router;
