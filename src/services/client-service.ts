import sessionHelper from 'helpers/session-helper';
import { AxiosError } from 'axios';
import eventBus from 'helpers/event-bus-helper';
import client from 'services/client';
import { ObjectType } from 'types';
import { unAuthorizedMessage } from 'assets/constants/messages';

type APIResponse = {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: boolean;
  data: any;
  errorMessage: any;
};

const NETWORK_ERROR_RESPONSE = {
  isSuccess: false,
  isError: true,
  isValidationError: false,
  data: null,
  errorMessage: 'You Are Offline'
};

export const list = async (
  url: string,
  payload?: any
): Promise<APIResponse> => {
  let response;
  let errorMessage: any = '';
  let isError: boolean = false;
  let isSuccess: boolean = true;

  if (!checkConnectivity()) {
    return NETWORK_ERROR_RESPONSE;
  }

  try {
    response = await client().get(url);
    response = response.data;
  } catch (error: any) {
    response = {};
    errorMessage = error.message || error;
    isSuccess = false;
    isError = true;

    logout(error);

    if (checkUnAuthorized(error)) {
      errorMessage = unAuthorizedMessage
    }

  }

  return {
    isSuccess,
    isError,
    data: response,
    errorMessage
  };
};

export const get = async (url: string, payload?: any): Promise<APIResponse> => {
  let response;
  let errorMessage: any = '';
  let isError: boolean = false;
  let isSuccess: boolean = true;
  let isValidationError: boolean = false;

  if (!checkConnectivity()) {
    return NETWORK_ERROR_RESPONSE;
  }

  try {
    response = await client().get(url);
    response = response.data;

    sessionHelper.setRecord(response.data);
  } catch (error: any) {
    response = {};
    errorMessage = error.message || error;
    isSuccess = false;
    isError = true;

    logout(error);

    if (hasValidationError(error)) {
      errorMessage = validationService(error?.response?.data?.errors);

      isValidationError = true;
    }

    if (checkUnAuthorized(error)) {
      errorMessage = unAuthorizedMessage
    }

  }

  return {
    isSuccess,
    isError,
    isValidationError,
    data: response.data,
    errorMessage
  };
};

export const post = async (url: string, payload: any): Promise<APIResponse> => {
  let response;
  let errorMessage: any = '';
  let isError: boolean = false;
  let isSuccess: boolean = true;
  let isValidationError: boolean = false;

  if (!checkConnectivity()) {
    return NETWORK_ERROR_RESPONSE;
  }

  try {
    response = await client().post(url, payload);

    response = response.data;
  } catch (error: any) {
    response = {};
    errorMessage = error.message || error;
    isSuccess = false;
    isError = true;

    if (isUseCredentialError(error)) {
      errorMessage = error.response.data.message;
    }

    logout(error);

    if (hasValidationError(error)) {
      errorMessage = validationService(error?.response?.data?.errors);

      isValidationError = true;
    }
  }

  return {
    isSuccess,
    isError,
    isValidationError,
    data: response.data ?? response,
    errorMessage
  };
};

export const put = async (url: string, payload: any): Promise<APIResponse> => {
  let response;
  let errorMessage: any = '';
  let isError: boolean = false;
  let isSuccess: boolean = true;
  let isValidationError: boolean = false;

  if (!checkConnectivity()) {
    return NETWORK_ERROR_RESPONSE;
  }

  try {
    response = await client().put(url, payload);
    response = response.data;
  } catch (error: any) {
    response = {};
    errorMessage = error.message || error;
    isSuccess = false;
    isError = true;

    logout(error);

    if (hasValidationError(error)) {
      errorMessage = validationService(error?.response?.data?.errors);
      isValidationError = true;
    }
  }

  return {
    isSuccess,
    isError,
    isValidationError,
    data: response.data,
    errorMessage
  };
};

export const del = async (url: string): Promise<APIResponse> => {
  let response;
  let errorMessage: any = '';
  let isError: boolean = false;
  let isSuccess: boolean = true;
  let isValidationError: boolean = false;

  if (!checkConnectivity()) {
    return NETWORK_ERROR_RESPONSE;
  }

  try {
    response = await client().delete(url);
    response = response.data;
  } catch (error: any) {
    response = {};
    errorMessage = error.message || error;
    isSuccess = false;
    isError = true;

    logout(error);

    if (hasValidationError(error)) {
      errorMessage = validationService(error?.response?.data?.errors);
      isValidationError = true;
    }
  }

  return {
    isSuccess,
    isError,
    isValidationError,
    data: response.data,
    errorMessage
  };
};

const isUseCredentialError = (error: any) => {
  return (
    error.response &&
    error.response.status === 400 &&
    error.response.data &&
    error.response.data?.error === 'invalid_grant'
  );
};

const isTokenExpiredError = (error: ObjectType) => {
  return error.response && error.response.status === 401;
};

const hasValidationError = (error: ObjectType) => {
  return error.response && error.response.status === 422;
};

const validationService = (errors: []) => {
  type resultType = {
    [key: string]: [];
  };

  const result: resultType = {};

  for (let i = 0; i < errors.length; i++) {
    const { field, message } = errors[i];

    if (typeof result[field] === 'undefined') {
      result[field] = [];
    }
    result[field].push(message);
  }

  return result;
};

const logout = (error: ObjectType) => {
  if (isTokenExpiredError(error)) {
    eventBus.dispatch('LOGOUT', {});
  }
};

const checkConnectivity = () => navigator.onLine;

const checkUnAuthorized = (error: ObjectType) => {
  return error.response.status === 403
}