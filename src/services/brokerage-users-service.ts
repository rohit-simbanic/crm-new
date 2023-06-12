import { ObjectType } from 'types';
import { list } from './client-service';
import envConfig from 'config/env';

const service = {
  getBrokerageUsers: async (query: string) => {
    const result: ObjectType = await list(
      `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_brokerage_users?page=1&sort[field]=date_modified&sort[direction]=asc${query}`
    );
    return result.data;
  }
};

export default service;
