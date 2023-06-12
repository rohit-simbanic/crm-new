import {
  EmailTemplateEntityResponse,
  EmailTemplateListTypeResponse
} from 'types/email-template';
import { list, get, post, put } from 'services/client-service';
import envConfig from 'config/env';

const emailTemplateService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/email_templates`,

  getList: async (query: string): Promise<EmailTemplateListTypeResponse> => {
    const result: EmailTemplateListTypeResponse = await list(
      `${emailTemplateService.url}${query}`
    );
    return result;
  },

  get: async (id: string): Promise<EmailTemplateEntityResponse> => {
    const result: EmailTemplateEntityResponse = await get(
      `${emailTemplateService.url}/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: EmailTemplateEntityResponse = await post(
      `${emailTemplateService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: EmailTemplateEntityResponse = await put(
      `${emailTemplateService.url}/${id}`,
      payload
    );
    return result;
  }
};

export default emailTemplateService;
