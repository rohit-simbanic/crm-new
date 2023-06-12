import { CallsListTypeResponse } from 'types/calls-types';
import { list } from './client-service';
import envConfig from 'config/env';

const callsService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/calls`,

  getList: async (query: string): Promise<CallsListTypeResponse> => {
    const result: CallsListTypeResponse = await list(
      `${callsService.url}${query}`
    );
    return result;
  }
};

export default callsService;
