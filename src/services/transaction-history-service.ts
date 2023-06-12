import {
  TransactionHistoryListTypeResponse,
  TransactionHistoryEntityResponse
} from 'types/transaction-history-types';
import { get, list } from './client-service';
import envConfig from 'config/env';

const transactionHistoryService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/transaction_history`,

  getList: async (
    query: string
  ): Promise<TransactionHistoryListTypeResponse> => {
    const result: TransactionHistoryListTypeResponse = await list(
      `${transactionHistoryService.url}${query}`
    );
    return result;
  },

  get: async (id: string): Promise<TransactionHistoryEntityResponse> => {
    const result: TransactionHistoryEntityResponse = await get(
      `${transactionHistoryService.url}/${id}`
    );
    return result;
  }
};

export default transactionHistoryService;
