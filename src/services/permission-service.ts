import envConfig from 'config/env';
import { get, list } from 'services/client-service';
import { PermissionEntityResponseType } from 'types/permission-type';

const permissionService = {
  url: `${envConfig.REACT_APP_API_VERSION_1}/me/permissions`,

  get: async (model: string): Promise<PermissionEntityResponseType> => {
    const result: PermissionEntityResponseType = await get(
      permissionService.url + `?${model}`
    );
    return result;
  },

  list: async () => {
    const result: PermissionEntityResponseType = await list(
      permissionService.url
    );
    return result;
  }
};

export default permissionService;
