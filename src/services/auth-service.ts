import envConfig from 'config/env';
import { post } from './client-service';
import { UserType } from 'types';
import { AuthenticationEntityResponse } from 'types/authentication';
import { clearStorage, getItem, removeItem, setItem } from 'helpers/src/helpers/local-storage-helper';
import { baseURL } from './client';

const authService = {
  login: async (user: UserType): Promise<AuthenticationEntityResponse> => {
    const body = {
      grant_type: envConfig.REACT_APP_GRANT_TYPE,
      username: user.email,
      password: user.password,
      client_id: envConfig.REACT_APP_CLIENT_ID,
      client_secret: envConfig.REACT_APP_CLIENT_SECRET,
      scope: envConfig.REACT_APP_SCOPE
    };

    const response: AuthenticationEntityResponse = await post(
      '/oauth/token',
      body
    );

    if (response.isSuccess) {

      setItem('accessToken', response?.data?.access_token);
      setItem('refreshToken', response?.data?.refresh_token);
    }

    return response;
  },

  refreshToken: async () => {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: getItem('refreshToken'),
      client_id: envConfig.REACT_APP_CLIENT_ID,
      client_secret: envConfig.REACT_APP_CLIENT_SECRET,
      scope: envConfig.REACT_APP_SCOPE
    };

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(`${baseURL}oauth/token`, request);
      const result = await response.json();

      if (response.status === 200) {
        setItem('accessToken', result?.access_token);
        setItem('refreshToken', result?.refresh_token);
      }

      if (response.status === 401) {
        removeItem('accessToken');
        removeItem('refreshToken');
        clearStorage();
      }

    } catch (error: any) {
      removeItem('accessToken');
      removeItem('refreshToken');
    }

    return new Promise(resolve => setTimeout(resolve, 1000))
  }
};

export default authService;
