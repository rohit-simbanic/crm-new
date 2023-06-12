import { ObjectType } from 'typescript';

export interface TransactionHistoryListItem {
  id: string;
  name: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
}

export interface TransactionHistoryListEntity {
  id: string;
  name: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
}

export interface TransactionHistoryEntity {
  id: string;
  name: string | null;
  date_entered: string | null;
  date_modified: string | null;
  assigned_user_id: string | null;
  description: string | null;
  closings: string | null;
  opportunity: { name: string | null };
  opportunity_id: string | null;
}

export interface TransactionHistoryFilterEntity {
  name: string | null;
}

export interface TransactionHistoryListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: TransactionHistoryListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface TransactionHistoryEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: TransactionHistoryEntity;
  errorMessage: any;
}
