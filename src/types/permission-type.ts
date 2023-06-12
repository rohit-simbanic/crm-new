export interface PermissionEntityType {
  access: boolean;
  list: boolean;
  edit: boolean;
  view: boolean;
  delete: boolean;
}

export interface PermissionEntityResponseType {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: PermissionEntityType;
  errorMessage: any;
}
