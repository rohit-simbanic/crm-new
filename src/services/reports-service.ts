import { ReportListTypeResponse } from 'types/report';
import { list } from './client-service';
import envConfig from 'config/env';

const reportService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/reports`,

  getList: async (query: string): Promise<ReportListTypeResponse> => {
    const result: ReportListTypeResponse = await list(
      `${reportService.url}${query}`
    );
    return result;
  }
};

export default reportService;
