import { ObjectType } from 'types';
import { get, list, post, put, del } from './client-service';
import envConfig from 'config/env';

const CTSCallService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/calls`,

  ctsCall: async (data: ObjectType): Promise<ObjectType> => {
    const result: ObjectType = await post(`${CTSCallService.url}/cts`, data);
    return result;
  }
};

export default CTSCallService;
