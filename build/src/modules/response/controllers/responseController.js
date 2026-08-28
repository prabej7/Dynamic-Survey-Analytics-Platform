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
const responseService_1 = __importDefault(require("../services/responseService"));
const responseController = {
    getAll: (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield responseService_1.default.getAll();
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
    getById: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield responseService_1.default.getById(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
    getBySurveyId: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield responseService_1.default.getBySurveyId(req.params.surveyId);
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
    create: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield responseService_1.default.create({
            surveyId: req.params.surveyId,
            answers: req.body.answers,
        });
        res.status(201).json({
            success: true,
            data: result,
        });
    })),
    update: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield responseService_1.default.update(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: result,
        });
    })),
    remove: (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield responseService_1.default.remove(req.params.id);
        res.status(204).send();
    })),
};
exports.default = responseController;
