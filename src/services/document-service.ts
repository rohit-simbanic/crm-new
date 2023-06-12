import { ObjectType } from 'types';
import {
  DocumentEntityResponse,
  DocumentslListType
} from 'types/documents-types';
import { get, list, post, put } from './client-service';
import envConfig from 'config/env';

const documentService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/documents`,

  getDocuments: async (query: string): Promise<DocumentslListType> => {
    const response: DocumentslListType = await list(
      `${documentService.url}${query}`
    );
    return response;
  },

  getDocument: async (id: string): Promise<DocumentEntityResponse> => {
    const response: DocumentEntityResponse = await get(
      `${documentService.url}/${id}`
    );

    return response;
  },

  postDocuments: async (data: FormData) => {
    const response = await post(`${documentService.url}`, data);
    return response;
  },

  updateDocument: async (id: string, data: ObjectType) => {
    const response = await put(`${documentService.url}/${id}`, data);
    return response;
  },

  postDocumentsWithRevision: async (data: ObjectType) => {
    const response = await post(`${documentService.url}/revisions`, data);
    return response;
  },

  generateContract: async (data: ObjectType) => {
    const response = await post(`${documentService.url}/cgm`, data);
    return response;
  }
};

export default documentService;
