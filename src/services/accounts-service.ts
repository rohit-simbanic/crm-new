import { AccountListTypeResponse } from 'types/account-types';
import { AccountEntityResponse } from 'types/account-types';
import { get, list, post, put, del } from './client-service';
import envConfig from 'config/env';

const accountService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/accounts`,

  getList: async (query: string): Promise<AccountListTypeResponse> => {
    const result: AccountListTypeResponse = await list(
      `${accountService.url}${query}`
    );
    return result;
  },

  get: async (id: string): Promise<AccountEntityResponse> => {
    const result: AccountEntityResponse = await get(
      `${accountService.url}/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: AccountEntityResponse = await post(
      `${accountService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: AccountEntityResponse = await put(
      `${accountService.url}/${id}`,
      payload
    );
    return result;
  },

  associateMSA: async (id: string, payload: any) => {
    const result: AccountEntityResponse = await post(
      `${accountService.url}/${id}/msa`,
      payload
    );
    return result;
  },

  deleteAssociatedMSA: async (account_id: string, msa_id: string) => {
    const result = await del(
      `${accountService.url}/${account_id}/msa/${msa_id}`
    );

    return result;
  },

  accountBuyerName: async (query: string) => {
    const result: AccountListTypeResponse = await list(
      `/${envConfig.REACT_APP_API_VERSION_1}/account_buyer_name/${query}`
    );
    return result;
  }
};

export default accountService;
