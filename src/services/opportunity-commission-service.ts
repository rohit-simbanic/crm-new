import { ObjectType } from 'types';
import { list, get, post, put } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_commissions`,

  getOpportunityCommission: async (query: string) => {
    const result = await list(`${service.url}${query}`);
    return result;
  },

  updateCommission: async (id: string, data: ObjectType) => {
    const result = await put(`${service.url}/${id}`, data);
    return result;
  },
  createCommission: async (data: ObjectType) => {
    const result = await post(`${service.url}`, data);
    return result;
  }
};

export default service;
