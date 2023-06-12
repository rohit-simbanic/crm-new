import { ObjectType } from 'types';

import {
  OpportunityListResponseType,
  OpportunityByIdResponseType
} from 'types/api-response';
import { list, get, put, del } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/opportunities`,

  get: async (query: string): Promise<OpportunityListResponseType> => {
    const url = `${service.url}${query}`;
    const result: OpportunityListResponseType = await list(url);
    return result;
  },

  getProperties: async (query: string) => {
    const response = await list(`${service.url}${query}`);
    return response.data;
  },

  getById: async (id: string) => {
    const result: OpportunityByIdResponseType = await get(
      `${service.url}/${id}`
    );
    return result;
  },

  update: async (id: string, data: any) => {
    const response = await put(`${service.url}/${id}`, data);
    return response;
  },

  performAction: async (id: string, data: any, action: string) => {
    const response = await put(
      `/${envConfig.REACT_APP_API_VERSION_1}/actions/${action}/${id}`,
      data
    );
    return response;
  },

  getOpportunityBrokerageUsers: async (id: string) => {
    const result: ObjectType = await get(
      `${service.url}/${id}/brokerage_users`
    );
    return result.data;
  },

  getFields: async () => {
    const result: ObjectType = await list(`${service.url}/fields`);
    return result;
  },

  deleteAssociatedDocument: async (
    opportunity_id: string,
    document_id: string
  ) => {
    const result = await del(
      `${service.url}/${opportunity_id}/documents/${document_id}`
    );

    return result;
  }
};

export default service;
