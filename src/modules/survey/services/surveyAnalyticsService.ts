import {
  NotFoundError,
} from "../../../utils/AppError";

import surveyRepository from "../repositories/surveyRepository";

interface SurveyQuestion {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
}

interface SurveySchema {
  questions?: SurveyQuestion[];
}

const surveyAnalyticsService = {
  async getAnalytics(surveyId: string) {
    const survey = await surveyRepository.findById(surveyId);

    if (!survey) {
      throw new NotFoundError("Survey not found");
    }

    const responses =
      await surveyRepository.getResponsesForAnalytics(surveyId);

    const schema = survey.schema as SurveySchema;

    const questions = schema.questions || [];

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(
      now.getDate() - now.getDay()
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const responsesToday = responses.filter(
      (response) =>
        new Date(response.submittedAt) >= startOfToday
    ).length;

    const responsesThisWeek = responses.filter(
      (response) =>
        new Date(response.submittedAt) >= startOfWeek
    ).length;

    const responsesThisMonth = responses.filter(
      (response) =>
        new Date(response.submittedAt) >= startOfMonth
    ).length;

    const questionInsights = questions.map(
      (question) => {
        const values = responses
          .map((response) => {
            const answers = response.answers as Record<
              string,
              unknown
            >;

            return answers?.[question.id];
          })
          .filter(
            (value) =>
              value !== undefined &&
              value !== null &&
              value !== ""
          );

        switch (question.type) {
          case "SINGLE_SELECT":
            return buildSingleSelectInsight(
              question,
              values
            );

          case "MULTI_SELECT":
            return buildMultiSelectInsight(
              question,
              values
            );

          case "RATING":
            return buildRatingInsight(
              question,
              values
            );

          case "TEXT":
          default:
            return buildTextInsight(
              question,
              values
            );
        }
      }
    );

    const responseTrend =
      buildResponseTrend(responses);

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
  },
};

function buildSingleSelectInsight(
  question: SurveyQuestion,
  values: unknown[]
) {
  const options = question.options || [];

  const totalAnswers = values.length;

  return {
    questionId: question.id,
    label: question.label,
    type: question.type,
    totalAnswers,

    options: options.map((option) => {
      const count = values.filter(
        (value) => value === option.value
      ).length;

      return {
        value: option.value,
        label: option.label,
        count,
        percentage:
          totalAnswers > 0
            ? Number(
                ((count / totalAnswers) * 100).toFixed(1)
              )
            : 0,
      };
    }),
  };
}

function buildMultiSelectInsight(
  question: SurveyQuestion,
  values: unknown[]
) {
  const options = question.options || [];

  const selections = values.flatMap((value) =>
    Array.isArray(value) ? value : []
  );

  return {
    questionId: question.id,
    label: question.label,
    type: question.type,
    totalAnswers: values.length,

    options: options.map((option) => {
      const count = selections.filter(
        (value) => value === option.value
      ).length;

      return {
        value: option.value,
        label: option.label,
        count,
        percentage:
          values.length > 0
            ? Number(
                ((count / values.length) * 100).toFixed(1)
              )
            : 0,
      };
    }),
  };
}

function buildRatingInsight(
  question: SurveyQuestion,
  values: unknown[]
) {
  const ratings = values
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));

  const average =
    ratings.length > 0
      ? Number(
          (
            ratings.reduce(
              (sum, value) => sum + value,
              0
            ) / ratings.length
          ).toFixed(2)
        )
      : 0;

  const distribution = [1, 2, 3, 4, 5].map(
    (rating) => {
      const count = ratings.filter(
        (value) => value === rating
      ).length;

      return {
        value: rating,
        count,
        percentage:
          ratings.length > 0
            ? Number(
                (
                  (count / ratings.length) *
                  100
                ).toFixed(1)
              )
            : 0,
      };
    }
  );

  return {
    questionId: question.id,
    label: question.label,
    type: question.type,
    totalAnswers: ratings.length,
    average,
    distribution,
  };
}

function buildTextInsight(
  question: SurveyQuestion,
  values: unknown[]
) {
  return {
    questionId: question.id,
    label: question.label,
    type: question.type,
    totalAnswers: values.length,

    answers: values
      .filter(
        (value): value is string =>
          typeof value === "string"
      ),
  };
}

function buildResponseTrend(responses: any[]) {
  const grouped: Record<string, number> = {};

  responses.forEach((response) => {
    const date = new Date(
      response.submittedAt
    )
      .toISOString()
      .split("T")[0];

    grouped[date] =
      (grouped[date] || 0) + 1;
  });

  return Object.entries(grouped).map(
    ([date, responseCount]) => ({
      date,
      responses: responseCount,
    })
  );
}

export default surveyAnalyticsService;