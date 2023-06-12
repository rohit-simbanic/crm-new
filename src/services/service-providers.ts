import envConfig from 'config/env';
import { get, post } from './client-service';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/service_providers`,

  getServiceProvides: async () => {
    const response = await get(
      `${service.url}?page=1&per_page=500&sort[field]=name&sort[direction]=asc`
    );
    return response;
  },
  createServiceProvides: async (data: any) => {
    const response = await post(`${service.url}`, data);
    return response;
  }
};

export default service;
