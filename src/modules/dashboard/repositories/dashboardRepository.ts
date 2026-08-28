import { prisma } from "../../../config/prisma";

const dashboardRepository = {
  async getAnalytics(userId: string) {
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

    const [
      totalSurveys,
      publishedSurveys,
      totalResponses,
      responsesToday,
      responsesThisWeek,
      responsesThisMonth,
      responsesBySurvey,
      recentResponses,
    ] = await Promise.all([
      // Total surveys
      prisma.survey.count({
        where: {
          userId,
        },
      }),

      // Published surveys
      prisma.survey.count({
        where: {
          userId,
          isPublished: true,
        },
      }),

      // Total responses
      prisma.response.count({
        where: {
          survey: {
            userId,
          },
        },
      }),

      // Today
      prisma.response.count({
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
      prisma.response.count({
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
      prisma.response.count({
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
      prisma.response.groupBy({
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
      prisma.response.findMany({
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

    const surveys = await prisma.survey.findMany({
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

      responsesBySurvey: responsesBySurvey.map((item) => ({
        surveyId: item.surveyId,
        title: surveyMap.get(item.surveyId)?.title ?? "Unknown Survey",
        responses: item._count.id,
      })),

      recentResponses: recentResponses.map((response) => ({
        id: response.id,
        surveyId: response.surveyId,
        surveyTitle: response.survey.title,
        submittedAt: response.submittedAt,
      })),
    };
  },
};

export default dashboardRepository;
