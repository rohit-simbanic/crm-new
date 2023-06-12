import { ObjectType } from 'types';
import { get, post, put } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/oauth/password`,

  send: async (data: ObjectType) => {
    const result: ObjectType = await post(`${service.url}/email`, data);
    return result;
  },
  show: async (token: String) => {
    const result: ObjectType = await get(`${service.url}/reset/${token}`);
    return result;
  },
  reset: async (token: string, data: ObjectType) => {
    const result: ObjectType = await post(
      `${service.url}/reset/${token}`,
      data
    );
    return result;
  }
};

export default service;
