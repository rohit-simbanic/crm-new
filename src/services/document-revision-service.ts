import { ObjectType } from 'types';
import {
  DocumentRevisionEntityResponse,
  DocumentRevisionlListType
} from 'types/documents-types';
import { get, list } from './client-service';
import envConfig from 'config/env';

const documentRevisionService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/document_revision`,

  getDocumentsRevisions: async (
    query: string
  ): Promise<DocumentRevisionlListType> => {
    const response: DocumentRevisionlListType = await list(
      `${documentRevisionService.url}${query}`
    );
    return response;
  },

  getDocumentsRevision: async (
    id: string
  ): Promise<DocumentRevisionEntityResponse> => {
    const response: DocumentRevisionEntityResponse = await get(
      `${documentRevisionService.url}/${id}`
    );
    return response;
  },
  getPresignUrl: async (id: string): Promise<ObjectType> => {
    const response: ObjectType = await get(
      `${documentRevisionService.url}/${id}/presigned_url`
    );
    return response;
  }
};

export default documentRevisionService;
