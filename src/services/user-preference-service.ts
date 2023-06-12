import envConfig from 'config/env';
import { list, post } from './client-service';
import {
  UserPreferenceEntityResponse,
  UserPreferenceListTypeResponse
} from 'types/user-preference-type';

const userPreferenceService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/user-preferences`,

  getItem: async (data: any): Promise<UserPreferenceEntityResponse> => {
    let response: UserPreferenceListTypeResponse =
      await userPreferenceService.getList(data);

    return {
      data: response?.data?.data[0] ? response?.data?.data[0] : null,
      isSuccess: response.isSuccess,
      isError: response.isSuccess,
      errorMessage: response.errorMessage
    };
  },

  getList: async (data: any): Promise<UserPreferenceListTypeResponse> => {
    const url = `${userPreferenceService.url}?filter[category]=${data.category}&filter[subcategory]=${data.subcategory}`;
    const result: UserPreferenceListTypeResponse = await list(url);
    return result;
  },

  save: async (data: any) => {
    const result: UserPreferenceEntityResponse = await post(
      `${userPreferenceService.url}`,
      data
    );
    return result;
  }
};

export default userPreferenceService;
