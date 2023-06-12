import axios from 'axios';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from '../types';
import envConfig from 'config/env';
import { getItem } from 'helpers/src/helpers/local-storage-helper';
import authService from './auth-service';

export const baseURL = envConfig.REACT_APP_BACKEND;

let headers: ObjectType = {
  Accept: 'application/json'
};

let axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: headers
});

const client = () => {
  let token = localStorage.getItem('accessToken')!;
  token = token?.substring(1, token.length - 1);

  if (!isEmpty(token)) {
    axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  axiosClient.interceptors.request.use(
    function (config: any) {
      const token = getItem('accessToken');
      if (token) {
        config['headers']['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      let originalRequest = error.config;

      if (error.response.status === 401) {
        const refreshToken = getItem('refreshToken');
        if (isEmpty(refreshToken)) {
          eventBus.dispatch('LOGOUT', {});
          window.location.replace('/app/login');
        }
        await authService.refreshToken();
        const token = getItem('accessToken');

        if (!token) {
          window.location.replace('/app/login');
        }
        originalRequest = {
          ...originalRequest,
          headers: {
            ...originalRequest?.headers,
            Authorization: 'Bearer ' + token
          }
        };

        return axiosClient(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosClient;
};

export default client;
