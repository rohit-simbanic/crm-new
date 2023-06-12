import { ObjectType } from 'types';
import { list, post, put } from './client-service';
import envConfig from 'config/env';

const opportunityServiceProvidersService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/opportunity_service_providers`,

  create: async (data: ObjectType) => {
    const result: ObjectType = await post(
      `${opportunityServiceProvidersService.url}`,
      data
    );
    return result.data;
  },

  update: async (id: string, data: ObjectType) => {
    const result: ObjectType = await put(
      `${opportunityServiceProvidersService.url}/${id}`,
      data
    );
    return result.data;
  },

  get: async (query: string) => {
    const result: ObjectType = await list(
      `${opportunityServiceProvidersService.url}${query}`
    );
    return result.data;
  },

  getFeeAdvances: (data: ObjectType[]): ObjectType => {
    let result = {};

    const fee_advances = data.filter(
      (x: ObjectType) =>
        x?.service_provider && x?.service_provider?.type == 'fee_advance'
    );

    for (let index = 0; index < fee_advances.length; index++) {
      const fee_advance = fee_advances[index];

      let obj = {
        [`fee_advance_id_${index + 1}`]: fee_advance?.id,
        [`fee_advance_service_providers_id_${index + 1}`]:
          fee_advance?.service_provider_id,
        [`fee_advance_service_providers_name_${index + 1}`]:
          fee_advance?.service_provider.name,
        [`fee_advance_type_${index + 1}`]: fee_advance?.service_type,
        [`fee_advance_amount_${index + 1}`]: fee_advance?.service_amount,
        [`fee_advance_date_${index + 1}`]: fee_advance?.service_date
      };

      result = { ...result, ...obj };
    }

    return result;
  },

  getExpense: (data: ObjectType[]): ObjectType => {
    let result = {};
    const expences = data.filter(
      (x: ObjectType) => x.service_provider.type == 'expense'
    );

    if (expences?.[0]) {
      let obj = {
        expanse_id: expences[0].id,
        expense_service_providers_id: expences[0].service_provider_id,
        expense_service_providers_name: expences[0].service_provider.name,
        expense_type: expences[0].service_type,
        expense_amount: expences[0].service_amount,
        expense_date: expences[0].service_date
      };

      result = { ...result, ...obj };
    }

    return result;
  }
};

export default opportunityServiceProvidersService;
