import { MsaEntityResponse, MsaListTypeResponse } from 'types/msa-types';
import { get, list, post, put } from './client-service';
import envConfig from 'config/env';

const msaService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/msa`,

  getList: async (query: string): Promise<MsaListTypeResponse> => {
    const result: MsaListTypeResponse = await list(`${msaService.url}${query}`);
    return result;
  },

  get: async (id: string): Promise<MsaEntityResponse> => {
    const result: MsaEntityResponse = await get(`${msaService.url}/${id}`);
    return result;
  },

  create: async (payload: any) => {
    const result: MsaEntityResponse = await post(`${msaService.url}`, payload);
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: MsaEntityResponse = await put(
      `${msaService.url}/${id}`,
      payload
    );
    return result;
  }
};

export default msaService;
