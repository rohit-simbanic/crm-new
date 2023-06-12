import {
  OpportunityBrokerageUserListTypeResponse,
  OpportunityBrokerageUserEntityResponse
} from 'types/opportunity-brokerage-user-types';
import { get, list, post, put } from './client-service';
import envConfig from 'config/env';

const opportunityBrokerageUserService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_brokerage_users`,

  getList: async (
    query: string
  ): Promise<OpportunityBrokerageUserListTypeResponse> => {
    const result: OpportunityBrokerageUserListTypeResponse = await list(
      `${opportunityBrokerageUserService.url}${query}`
    );
    return result;
  },

  get: async (id: string): Promise<OpportunityBrokerageUserEntityResponse> => {
    const result: OpportunityBrokerageUserEntityResponse = await get(
      `${opportunityBrokerageUserService.url}/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: OpportunityBrokerageUserEntityResponse = await post(
      `${opportunityBrokerageUserService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: OpportunityBrokerageUserEntityResponse = await put(
      `${opportunityBrokerageUserService.url}/${id}`,
      payload
    );
    return result;
  },

  refresh: async (
    id: string
  ): Promise<OpportunityBrokerageUserEntityResponse> => {
    const result: OpportunityBrokerageUserEntityResponse = await get(
      `${opportunityBrokerageUserService.url}/refresh/opportunities/${id}`
    );
    return result;
  }
};

export default opportunityBrokerageUserService;
