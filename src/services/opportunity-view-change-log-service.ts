import { ObjectType } from 'types';
import { list } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_change_logs`,

  get: async (query: string) => {
    const result: ObjectType = await list(`${service.url}${query}`);
    return result;
  }
};

export default service;
