import { ObjectType } from 'types';
import { list } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/`,

  getFields: async (action: string) => {
    const result: ObjectType = await list(`${service.url}${action}/fields`);
    return result;
  }
};

export default service;
