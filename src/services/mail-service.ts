import { ObjectType } from 'types';
import {
  EmailListType,
  EmailThreadListType,
  TemplateListType,
  TemplateType
} from 'types/email-types';
import { list, get, post } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/emails`,

  getEmailTemplates: async (query: string): Promise<TemplateListType> => {
    const response: TemplateListType = await list(
      `/${envConfig.REACT_APP_API_VERSION_1}/email_templates${query}`
    );
    return response;
  },
  getEmailTemplatesById: async (id: string): Promise<TemplateType> => {
    const response: TemplateType = await get(
      `/${envConfig.REACT_APP_API_VERSION_1}/email_templates/${id}`
    );
    return response;
  },

  getEmails: async (query: string): Promise<EmailListType> => {
    const response: EmailListType = await list(`${service.url}${query}`);
    return response;
  },

  getInbox: async (query: string): Promise<ObjectType> => {
    const response: ObjectType = await list(`${service.url}${query}`);
    return response;
  },

  getDraft: async (query: string): Promise<ObjectType> => {
    const response: ObjectType = await list(`${service.url}${query}`);
    return response;
  },

  getEmailLatestThred: async (query: string): Promise<EmailListType> => {
    const response: EmailListType = await list(
      `${service.url}/group_by_thread_latest${query}`
    );
    return response;
  },

  getEmailThread: async (
    thread_id: string,
    query: string
  ): Promise<EmailThreadListType> => {
    const response: EmailThreadListType = await list(
      `${service.url}/thread/${thread_id}${query}`
    );
    return response;
  },
  sentEmail: async (data: ObjectType): Promise<ObjectType> => {
    const response: ObjectType = await post(`${service.url}/send`, data);
    return response;
  },

  draftMail: async (data: ObjectType): Promise<ObjectType> => {
    const response: ObjectType = await post(`${service.url}/draft`, data);
    return response;
  },
  getEmail: async (id: string): Promise<ObjectType> => {
    const response: EmailListType = await list(`${service.url}/${id}`);
    return response;
  },
  getEmailPreview: async (data: ObjectType) => {
    const response: ObjectType = await post(`${service.url}/preview`, data);
    return response;
  }
};

export default service;
