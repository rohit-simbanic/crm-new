import { ObjectType } from 'types';
import { list, put, post } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/property_utility_providers`,

  create: async (data: ObjectType) => {
    const result: ObjectType = await post(`${service.url}`, data);
    return result;
  },

  update: async (id: string, data: ObjectType) => {
    const result: ObjectType = await put(`${service.url}/${id}`, data);
    return result.data;
  },

  get: async (query: string) => {
    const result: ObjectType = await list(`${service.url}${query}`);
    return result.data;
  },

  getUtilityProviderDetails: (data: ObjectType): ObjectType => {
    if (data[0]?.id) {
      let providers = {
        utility_provider_id: data[0].id,
        utility_provider_name: data[0].name,
        electric_provider: data[0].electric_provider,
        gas_provider: data[0].gas_provider,
        is_electric: data[0].is_electric,
        water_well_provider: data[0].water_well_provider,
        is_well: data[0].is_well,
        sewer_provider: data[0].sewer_provider,
        is_septic: data[0].is_septic,
        trash_provider: data[0].trash_provider
      };
      return providers;
    } else return {};
  }
};

export default service;
