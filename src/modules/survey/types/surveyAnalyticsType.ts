export interface SurveyAnalyticsOverview {
  totalResponses: number;
  responsesToday: number;
  responsesThisWeek: number;
  responsesThisMonth: number;
}

export interface QuestionInsight {
  questionId: string;
  label: string;
  type: string;
  totalAnswers: number;

  // SINGLE_SELECT / MULTI_SELECT
  options?: {
    value: string;
    label: string;
    count: number;
    percentage: number;
  }[];

  // RATING
  average?: number;
  distribution?: {
    value: number;
    count: number;
    percentage: number;
  }[];

  // TEXT
  answers?: string[];
}

export interface ResponseTrend {
  date: string;
  responses: number;
}

export interface SurveyAnalytics {
  survey: {
    id: string;
    title: string;
    slug: string;
    isPublished: boolean;
  };

  overview: SurveyAnalyticsOverview;

  questions: QuestionInsight[];

  responseTrend: ResponseTrend[];
}