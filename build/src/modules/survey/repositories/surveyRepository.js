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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const pagination_1 = require("../../../utils/pagination");
const surveyRepository = {
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, pagination_1.paginate)(prisma_1.prisma.survey, {
                page,
                limit,
            }, {
                orderBy: {
                    createdAt: "desc",
                },
            });
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.survey.findUnique({
                where: { id },
            });
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.survey.create({
                data,
            });
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.survey.update({
                where: { id },
                data,
            });
        });
    },
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.survey.delete({
                where: { id },
            });
        });
    },
    findBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.survey.findUnique({
                where: { slug },
            });
        });
    },
    getResponsesForAnalytics(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.response.findMany({
                where: {
                    surveyId,
                },
                select: {
                    id: true,
                    answers: true,
                    submittedAt: true,
                },
                orderBy: {
                    submittedAt: "asc",
                },
            });
        });
    },
};
exports.default = surveyRepository;
