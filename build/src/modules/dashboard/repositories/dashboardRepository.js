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
const dashboardRepository = {
    getAnalytics(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            // Start of today
            const startOfToday = new Date(now);
            startOfToday.setHours(0, 0, 0, 0);
            // Start of week
            const startOfWeek = new Date(now);
            const day = startOfWeek.getDay();
            startOfWeek.setDate(startOfWeek.getDate() - day);
            startOfWeek.setHours(0, 0, 0, 0);
            // Start of month
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const [totalSurveys, publishedSurveys, totalResponses, responsesToday, responsesThisWeek, responsesThisMonth, responsesBySurvey, recentResponses,] = yield Promise.all([
                // Total surveys
                prisma_1.prisma.survey.count({
                    where: {
                        userId,
                    },
                }),
                // Published surveys
                prisma_1.prisma.survey.count({
                    where: {
                        userId,
                        isPublished: true,
                    },
                }),
                // Total responses
                prisma_1.prisma.response.count({
                    where: {
                        survey: {
                            userId,
                        },
                    },
                }),
                // Today
                prisma_1.prisma.response.count({
                    where: {
                        survey: {
                            userId,
                        },
                        submittedAt: {
                            gte: startOfToday,
                        },
                    },
                }),
                // This week
                prisma_1.prisma.response.count({
                    where: {
                        survey: {
                            userId,
                        },
                        submittedAt: {
                            gte: startOfWeek,
                        },
                    },
                }),
                // This month
                prisma_1.prisma.response.count({
                    where: {
                        survey: {
                            userId,
                        },
                        submittedAt: {
                            gte: startOfMonth,
                        },
                    },
                }),
                // Responses grouped by survey
                prisma_1.prisma.response.groupBy({
                    by: ["surveyId"],
                    where: {
                        survey: {
                            userId,
                        },
                    },
                    _count: {
                        id: true,
                    },
                    orderBy: {
                        _count: {
                            id: "desc",
                        },
                    },
                }),
                // Recent responses
                prisma_1.prisma.response.findMany({
                    where: {
                        survey: {
                            userId,
                        },
                    },
                    include: {
                        survey: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                    orderBy: {
                        submittedAt: "desc",
                    },
                    take: 10,
                }),
            ]);
            // Get survey information for grouped responses
            const surveyIds = responsesBySurvey.map((item) => item.surveyId);
            const surveys = yield prisma_1.prisma.survey.findMany({
                where: {
                    id: {
                        in: surveyIds,
                    },
                    userId,
                },
                select: {
                    id: true,
                    title: true,
                },
            });
            const surveyMap = new Map(surveys.map((survey) => [survey.id, survey]));
            return {
                overview: {
                    totalSurveys,
                    publishedSurveys,
                    totalResponses,
                    responsesToday,
                    responsesThisWeek,
                    responsesThisMonth,
                },
                responsesBySurvey: responsesBySurvey.map((item) => {
                    var _a, _b;
                    return ({
                        surveyId: item.surveyId,
                        title: (_b = (_a = surveyMap.get(item.surveyId)) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "Unknown Survey",
                        responses: item._count.id,
                    });
                }),
                recentResponses: recentResponses.map((response) => ({
                    id: response.id,
                    surveyId: response.surveyId,
                    surveyTitle: response.survey.title,
                    submittedAt: response.submittedAt,
                })),
            };
        });
    },
};
exports.default = dashboardRepository;
