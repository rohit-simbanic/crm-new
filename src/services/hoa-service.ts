import { ObjectType } from 'types';
import { get, post, put } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/hoa_management_company`,

  get: async (query: string) => {
    const result: ObjectType = await get(`${service.url}${query}`);
    return result;
  },
  create: async (data: ObjectType) => {
    const result: ObjectType = await post(`${service.url}`, data);
    return result.data;
  },

  update: async (id: string, data: ObjectType) => {
    const result: ObjectType = await put(`${service.url}/${id}`, data);
    return result.data;
  },

  getHoaDetails: (data: ObjectType): ObjectType => {
    if (data?.id) {
      let hoacompany = {
        hoa_name: data.name,
        hoa_management_company_is_self_managed: data.is_self_managed,
        hoa_management_company_contact_name: data.contact_name,
        hoa_management_company_contact_email: data.contact_email,
        hoa_management_company_contact_phone: data.contact_phone,
        hoa_management_company_contact_address: data.contact_address,
        hoa_management_company_phone: data.company_phone,
        hoa_management_company_name: data.name,
        hoa_management_company_id: data?.id
      };
      return hoacompany;
    } else return {};
  }
};

export default service;
