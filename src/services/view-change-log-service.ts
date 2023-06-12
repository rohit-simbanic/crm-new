import { ObjectType } from 'types';
import { list } from './client-service';

const service = {
  url: `/${process.env.REACT_APP_API_VERSION_1}`,

  get: async (action: any, query: string) => {
    const result: ObjectType = await list(`${service.url}/${action}${query}`);
    return result;
  }
};

export default service;
