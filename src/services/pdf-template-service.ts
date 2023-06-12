import {
  PdfTemplateEntityResponse,
  PdfTemplateListTypeResponse
} from 'types/pdf-template-type';
import { list, get, post, put } from './client-service';
import envConfig from 'config/env';

const pdfTemplateService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/contracts`,

  getList: async (query: string): Promise<PdfTemplateListTypeResponse> => {
    const result: PdfTemplateListTypeResponse = await list(
      `${pdfTemplateService.url}${query}`
    );
    return result;
  },

  get: async (id: string): Promise<PdfTemplateEntityResponse> => {
    const result: PdfTemplateEntityResponse = await get(
      `${pdfTemplateService.url}/${id}`
    );
    return result;
  },

  create: async (payload: any) => {
    const result: PdfTemplateEntityResponse = await post(
      `${pdfTemplateService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: PdfTemplateEntityResponse = await put(
      `${pdfTemplateService.url}/${id}`,
      payload
    );
    return result;
  }
};

export default pdfTemplateService;
