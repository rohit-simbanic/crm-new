import {
  MarketPreferencesListTypeResponse,
  MarketPreferenceEntityResponse
} from 'types/market-preferences';

import { list, get, post, put, del } from './client-service';
import envConfig from 'config/env';

const marketPreferenceService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/market_preferences`,

  getMarketPreferences: async (
    query: string
  ): Promise<MarketPreferencesListTypeResponse> => {
    const result: MarketPreferencesListTypeResponse = await list(
      `${marketPreferenceService.url}${query}`
    );
    return result;
  },

  getById: async (id: string): Promise<MarketPreferenceEntityResponse> => {
    const result: MarketPreferenceEntityResponse = await get(
      `${marketPreferenceService.url}/${id}`
    );
    return result;
  },

  createMarketPreferences: async (payload: any) => {
    const result: MarketPreferenceEntityResponse = await post(
      `${marketPreferenceService.url}`,
      payload
    );
    return result;
  },

  update: async (id: string, payload: any) => {
    const result: MarketPreferenceEntityResponse = await put(
      `${marketPreferenceService.url}/${id}`,
      payload
    );
    return result;
  },

  associatePDFTemplate: async (id: string, payload: any) => {
    const result: MarketPreferenceEntityResponse = await post(
      `${marketPreferenceService.url}/${id}/pdf_templates`,
      payload
    );
    return result;
  },

  associateEmailTemplate: async (id: string, payload: any) => {
    const result: MarketPreferenceEntityResponse = await post(
      `${marketPreferenceService.url}/${id}/email_templates`,
      payload
    );
    return result;
  },

  getAssociatedPDFTemplate: async (
    market_preference_id: string,
    pdf_template_id: string
  ) => {
    const result: any = await get(
      `${marketPreferenceService.url}/${market_preference_id}/pdf_templates/${pdf_template_id}`
    );

    return result;
  },

  getAssociatedEmailTemplate: async (
    market_preference_id: string,
    email_template_id: string
  ) => {
    const result: any = await get(
      `${marketPreferenceService.url}/${market_preference_id}/email_templates/${email_template_id}`
    );

    return result;
  },

  updateAssociatePDFTemplate: async (
    id: string,
    contract_id: string,
    data: any
  ) => {
    const result: any = await put(
      `${marketPreferenceService.url}/${id}/pdf_templates/${contract_id}`,
      data
    );
    return result;
  },

  updateAssociateEmailTemplate: async (
    id: string,
    email_template_id: string,
    data: any
  ) => {
    const result: any = await put(
      `${marketPreferenceService.url}/${id}/email_templates/${email_template_id}`,
      data
    );
    return result;
  },

  deleteAssociatedPDFTemplate: async (
    market_preference_id: string,
    pdf_template_id: string
  ) => {
    const result = await del(
      `${marketPreferenceService.url}/${market_preference_id}/pdf_templates/${pdf_template_id}`
    );

    return result;
  },

  deleteAssociatedEmailTemplate: async (
    market_preference_id: string,
    email_template_id: string
  ) => {
    const result = await del(
      `${marketPreferenceService.url}/${market_preference_id}/email_templates/${email_template_id}`
    );

    return result;
  },

  deleteAssociatedDocument: async (
    market_preference_id: string,
    document_id: string
  ) => {
    const result = await del(
      `/${envConfig.REACT_APP_API_VERSION_1}/market_preferences/${market_preference_id}/documents/${document_id}`
    );

    return result;
  }
};

export default marketPreferenceService;
