"use strict";
// src/modules/dashboard/routes/dashboardRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../../middlewares/authMiddleware"));
const roleMiddleware_1 = __importDefault(require("../../../middlewares/roleMiddleware"));
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const router = (0, express_1.Router)();
router.get("/analytics", authMiddleware_1.default, (0, roleMiddleware_1.default)("ADMIN"), dashboardController_1.default.getAnalytics);
exports.default = router;
