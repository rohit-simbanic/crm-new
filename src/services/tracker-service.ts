import { ObjectType } from 'types';
import { get, list, post, put } from './client-service';
import envConfig from 'config/env';

const trackerService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/trackers`,

  getList: async () => {
    const result: ObjectType = await list(
      `${trackerService.url}/recently-viewed`
    );
    return result;
  },

  createRecentlyViewed: async (data: ObjectType) => {
    const result: ObjectType = await post(`${trackerService.url}`, data);
    return result;
  }
};

export default trackerService;
