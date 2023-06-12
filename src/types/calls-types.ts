import { ObjectType } from 'typescript';

export interface CallsListItem {
  id: string;
  name: string | null;
  direction: string | null;
  customer_user: string | null;
  report_parent_name: string | null;
  date_start: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface CallsListEntity {
  id: string;
  name: string | null;
  direction: string | null;
  customer_user: string | null;
  report_parent_name: string | null;
  date_start: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface CallsEntity {
  id: string;
  name: string | null;
  direction: string | null;
  customer_user: string | null;
  report_parent_name: string | null;
  date_start: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface CallsFilterEntity {
  subject_name: string | null;
}

export interface CallsListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: CallsListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface CallsEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: CallsEntity;
  errorMessage: any;
}
