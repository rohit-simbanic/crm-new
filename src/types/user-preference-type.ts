import { ObjectType } from 'typescript';

export interface UserPreferenceEntity {
  id: String | null;
  module: string | null;
  category: string | null;
  subcategory: string | null;
  deleted: number | null;
  date_entered: string | null;
  date_modified: string | null;
  assigned_user_id: string | null;
  contents: string[];
}

export interface UserPreferenceListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data: { data: UserPreferenceEntity[] };
  errorMessage: any;
}

export interface UserPreferenceEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: UserPreferenceEntity | null;
  errorMessage: any;
}
