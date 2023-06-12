import envConfig from 'config/env';
import { list, get, post, put, del } from './client-service';

const servicesService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/services`,

  getServices: async (query: string) => {
    const response = await list(`${servicesService.url}${query}`);
    return response;
  },

  getById: async (id: string) => {
    const response = await get(`${servicesService.url}/${id}`);

    return response;
  },

  createServices: async (data: any) => {
    const response = await post(`${servicesService.url}`, data);
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await put(`${servicesService.url}/${id}`, data);
    return response;
  },

  delete: async (id: string) => {
    const response = await del(`${servicesService.url}/${id}`);
    return response;
  }
};

export default servicesService;
