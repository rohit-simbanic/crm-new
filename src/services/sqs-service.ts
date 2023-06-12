import { SQSListTypeResponse, SQSEntityResponse } from 'types/sqs-types';
import { get, list, post, put } from './client-service';
import envConfig from 'config/env';

const sqsService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/sqs-messages`,

  getList: async (query: string): Promise<SQSListTypeResponse> => {
    const result: SQSListTypeResponse = await list(`${sqsService.url}${query}`);
    return result;
  },

  get: async (id: string): Promise<SQSEntityResponse> => {
    const result: SQSEntityResponse = await get(`${sqsService.url}/${id}`);
    return result;
  },

  create: async (payload: any) => {
    const result: SQSEntityResponse = await post(`${sqsService.url}`, payload);
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: SQSEntityResponse = await put(
      `${sqsService.url}/${id}`,
      payload
    );
    return result;
  }
};

export default sqsService;
