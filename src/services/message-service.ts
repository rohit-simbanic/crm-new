import { ObjectType } from 'types';
import { post, list, get, put, del } from './client-service';
import envConfig from 'config/env';

const service = {
  messageUrl: `/${envConfig.REACT_APP_API_VERSION_1}/messages`,

  brokerageNotesUrl: `/${envConfig.REACT_APP_API_VERSION_1}/brokerage_notes`,

  negotiationNotesUrl: `/${envConfig.REACT_APP_API_VERSION_1}/negotiation_notes`,

  transactionUrl: `/${envConfig.REACT_APP_API_VERSION_1}/transaction_notes`,

  postMessage: async (data: ObjectType) => {
    const response = await post(`${service.messageUrl}`, data);
    return response;
  },
  getMessages: async (id: string) => {
    const response = await list(
      `${service.messageUrl}?filter[opportunity_id]=${id}&sort[direction]=desc&sort[field]=date_entered&page=1&per_page=100`
    );
    return response;
  },

  deleteMessage: async (messages_id: string) => {
    const result = await del(`${service.messageUrl}/${messages_id}`);

    return result;
  },

  postTransactionNote: async (data: ObjectType) => {
    const response = await post(`${service.transactionUrl}`, data);
    return response;
  },
  getTransactionNotes: async (id: string) => {
    const response = await list(
      `${service.transactionUrl}?filter[opportunity_id]=${id}&sort[field]=date_entered&sort[direction]=desc`
    );
    return response;
  },

  postNegotiatorNote: async (data: ObjectType) => {
    const response = await post(`${service.negotiationNotesUrl}`, data);
    return response;
  },
  getNegotiatorNotes: async (id: string) => {
    const response = await list(
      `${service.negotiationNotesUrl}?filter[opportunity_id]=${id}&sort[field]=date_entered&sort[direction]=desc`
    );
    return response;
  },

  postBrokerageNote: async (data: ObjectType) => {
    const response = await post(`${service.brokerageNotesUrl}`, data);
    return response;
  },
  getBrokerageNotes: async (id: string) => {
    const response = await list(
      `${service.brokerageNotesUrl}?filter[opportunity_id]=${id}&sort[field]=date_entered&sort[direction]=desc`
    );
    return response;
  }
};

export default service;
