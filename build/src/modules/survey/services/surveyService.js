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
const AppError_1 = require("../../../utils/AppError");
const surveyRepository_1 = __importDefault(require("../repositories/surveyRepository"));
const surveyService = {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return surveyRepository_1.default.findAll();
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSurvey = yield surveyRepository_1.default.findById(id);
            if (!existingSurvey) {
                throw new AppError_1.NotFoundError(`Survey with ID ${id} not found`);
            }
            return surveyRepository_1.default.findById(id);
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return surveyRepository_1.default.create(data);
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSurvey = yield surveyRepository_1.default.findById(id);
            if (!existingSurvey) {
                throw new AppError_1.NotFoundError(`Survey with ID ${id} not found`);
            }
            return surveyRepository_1.default.update(id, data);
        });
    },
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSurvey = yield surveyRepository_1.default.findById(id);
            if (!existingSurvey) {
                throw new AppError_1.NotFoundError(`Survey with ID ${id} not found`);
            }
            return surveyRepository_1.default.remove(id);
        });
    },
    publish(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield surveyRepository_1.default.update(id, {
                isPublished: true,
            });
        });
    },
    findBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSurvey = yield surveyRepository_1.default.findBySlug(slug);
            if (!existingSurvey) {
                throw new AppError_1.NotFoundError(`Survey with slug ${slug} not found`);
            }
            return existingSurvey;
        });
    },
};
exports.default = surveyService;
