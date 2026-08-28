"use strict";
// src/modules/dashboard/controllers/dashboardController.ts
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
const dashboardService_1 = __importDefault(require("../services/dashboardService"));
const dashboardController = {
    getAnalytics: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboardService_1.default.getAnalytics(req.user.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
};
exports.default = dashboardController;
