import { UserType } from './index';

export type Authentication = {
  isAuthenticated: boolean;
  user: null | UserType;
  token: null | string;
};

export interface AuthEntity {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface AuthenticationEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: AuthEntity;
  errorMessage: any;
}