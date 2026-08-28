"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../../middlewares/authMiddleware"));
const sanitize_1 = require("../../../middlewares/sanitize");
const authController_1 = __importDefault(require("../controllers/authController"));
const authValidation_1 = require("../validation/authValidation");
const router = (0, express_1.Router)();
router.post("/register", (0, sanitize_1.sanitize)(authValidation_1.registerSchema), authController_1.default.register);
router.post("/login", (0, sanitize_1.sanitize)(authValidation_1.loginSchema), authController_1.default.login);
router.post("/logout", authMiddleware_1.default, authController_1.default.logout);
router.get("/me", authMiddleware_1.default, authController_1.default.getProfile);
exports.default = router;
