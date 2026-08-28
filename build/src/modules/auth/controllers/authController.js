"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../../middlewares/asyncHandler"));
const authService_1 = __importDefault(require("../services/authService"));
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
const authController = {
    register: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user, token } = yield authService_1.default.register(req.body);
        res.cookie("accessToken", token, COOKIE_OPTIONS);
        res.status(201).json({
            success: true,
            data: user,
        });
    })),
    login: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { user, token } = yield authService_1.default.login(email, password);
        res.cookie("accessToken", token, COOKIE_OPTIONS);
        res.status(200).json({
            success: true,
            data: user,
        });
    })),
    logout: (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    })),
    getProfile: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authService_1.default.getProfile(req.user.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
};
exports.default = authController;
