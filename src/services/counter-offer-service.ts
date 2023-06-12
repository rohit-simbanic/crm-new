import { ObjectType } from 'types';
import { list, get, post, put } from './client-service';
import envConfig from 'config/env';
const counterOfferService = {
  getList: async (query: string): Promise<ObjectType> => {
    const result: ObjectType = await list(
      `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_counteroffers${query}`
    );
    return result;
  },

  get: async (id: string): Promise<ObjectType> => {
    const result: ObjectType = await get(
      `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_counteroffers/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: ObjectType = await post(
      `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_counteroffers`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: ObjectType = await put(
      `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_counteroffers/${id}`,
      payload
    );
    return result;
  }
};

export default counterOfferService;
