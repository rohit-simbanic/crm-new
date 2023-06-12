import {
  MarketPreferenceBrokerageUserListTypeResponse,
  MarketPreferenceBrokerageUserEntityResponse
} from 'types/market-preference-brokerage-user-types';
import { list, get, post, put, del } from './client-service';
import envConfig from 'config/env';

const marketPreferenceBrokerageUserService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/market_preference_brokerage_users`,

  getList: async (
    query: string
  ): Promise<MarketPreferenceBrokerageUserListTypeResponse> => {
    const result: MarketPreferenceBrokerageUserListTypeResponse = await list(
      `${marketPreferenceBrokerageUserService.url}${query}`
    );
    return result;
  },

  get: async (
    id: string
  ): Promise<MarketPreferenceBrokerageUserEntityResponse> => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await get(
      `${marketPreferenceBrokerageUserService.url}/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await post(
      `${marketPreferenceBrokerageUserService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await put(
      `${marketPreferenceBrokerageUserService.url}/${id}`,
      payload
    );
    return result;
  },

  replace: async (id: string, payload: any) => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await put(
      `${marketPreferenceBrokerageUserService.url}/${id}/replace`,
      payload
    );
    return result;
  },

  terminate: async (id: string, payload: any) => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await put(
      `${marketPreferenceBrokerageUserService.url}/${id}/terminate`,
      payload
    );
    return result;
  },

  delete: async (id: string) => {
    const result: MarketPreferenceBrokerageUserEntityResponse = await del(
      `${marketPreferenceBrokerageUserService.url}/${id}`
    );
    return result;
  }
};

export default marketPreferenceBrokerageUserService;
