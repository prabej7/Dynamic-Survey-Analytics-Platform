// src/modules/dashboard/services/dashboardService.ts

import dashboardRepository from "../repositories/dashboardRepository";

const dashboardService = {
  async getAnalytics(userId: string) {
    return dashboardRepository.getAnalytics(
      userId
    );
  },
};

export default dashboardService;