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
const surveyAnalyticsService = {
    getAnalytics(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield surveyRepository_1.default.findById(surveyId);
            if (!survey) {
                throw new AppError_1.NotFoundError("Survey not found");
            }
            const responses = yield surveyRepository_1.default.getResponsesForAnalytics(surveyId);
            const schema = survey.schema;
            const questions = schema.questions || [];
            const now = new Date();
            const startOfToday = new Date(now);
            startOfToday.setHours(0, 0, 0, 0);
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const responsesToday = responses.filter((response) => new Date(response.submittedAt) >= startOfToday).length;
            const responsesThisWeek = responses.filter((response) => new Date(response.submittedAt) >= startOfWeek).length;
            const responsesThisMonth = responses.filter((response) => new Date(response.submittedAt) >= startOfMonth).length;
            const questionInsights = questions.map((question) => {
                const values = responses
                    .map((response) => {
                    const answers = response.answers;
                    return answers === null || answers === void 0 ? void 0 : answers[question.id];
                })
                    .filter((value) => value !== undefined &&
                    value !== null &&
                    value !== "");
                switch (question.type) {
                    case "SINGLE_SELECT":
                        return buildSingleSelectInsight(question, values);
                    case "MULTI_SELECT":
                        return buildMultiSelectInsight(question, values);
                    case "RATING":
                        return buildRatingInsight(question, values);
                    case "TEXT":
                    default:
                        return buildTextInsight(question, values);
                }
            });
            const responseTrend = buildResponseTrend(responses);
            return {
                survey: {
                    id: survey.id,
                    title: survey.title,
                    slug: survey.slug,
                    isPublished: survey.isPublished,
                },
                overview: {
                    totalResponses: responses.length,
                    responsesToday,
                    responsesThisWeek,
                    responsesThisMonth,
                },
                questions: questionInsights,
                responseTrend,
            };
        });
    },
};
function buildSingleSelectInsight(question, values) {
    const options = question.options || [];
    const totalAnswers = values.length;
    return {
        questionId: question.id,
        label: question.label,
        type: question.type,
        totalAnswers,
        options: options.map((option) => {
            const count = values.filter((value) => value === option.value).length;
            return {
                value: option.value,
                label: option.label,
                count,
                percentage: totalAnswers > 0
                    ? Number(((count / totalAnswers) * 100).toFixed(1))
                    : 0,
            };
        }),
    };
}
function buildMultiSelectInsight(question, values) {
    const options = question.options || [];
    const selections = values.flatMap((value) => Array.isArray(value) ? value : []);
    return {
        questionId: question.id,
        label: question.label,
        type: question.type,
        totalAnswers: values.length,
        options: options.map((option) => {
            const count = selections.filter((value) => value === option.value).length;
            return {
                value: option.value,
                label: option.label,
                count,
                percentage: values.length > 0
                    ? Number(((count / values.length) * 100).toFixed(1))
                    : 0,
            };
        }),
    };
}
function buildRatingInsight(question, values) {
    const ratings = values
        .map((value) => Number(value))
        .filter((value) => !Number.isNaN(value));
    const average = ratings.length > 0
        ? Number((ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(2))
        : 0;
    const distribution = [1, 2, 3, 4, 5].map((rating) => {
        const count = ratings.filter((value) => value === rating).length;
        return {
            value: rating,
            count,
            percentage: ratings.length > 0
                ? Number(((count / ratings.length) *
                    100).toFixed(1))
                : 0,
        };
    });
    return {
        questionId: question.id,
        label: question.label,
        type: question.type,
        totalAnswers: ratings.length,
        average,
        distribution,
    };
}
function buildTextInsight(question, values) {
    return {
        questionId: question.id,
        label: question.label,
        type: question.type,
        totalAnswers: values.length,
        answers: values
            .filter((value) => typeof value === "string"),
    };
}
function buildResponseTrend(responses) {
    const grouped = {};
    responses.forEach((response) => {
        const date = new Date(response.submittedAt)
            .toISOString()
            .split("T")[0];
        grouped[date] =
            (grouped[date] || 0) + 1;
    });
    return Object.entries(grouped).map(([date, responseCount]) => ({
        date,
        responses: responseCount,
    }));
}
exports.default = surveyAnalyticsService;
