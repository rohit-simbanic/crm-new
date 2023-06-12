import { AdminConfigListTypeResponse } from 'types/admin-config';
import { CallsListTypeResponse } from 'types/calls-types';
import { list } from './client-service';
import envConfig from 'config/env';

const adminConfigService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/admin_config`,

  get: async (): Promise<AdminConfigListTypeResponse> => {
    const result: AdminConfigListTypeResponse = await list(
      `${adminConfigService.url}`
    );
    return result;
  }
};

export default adminConfigService;
