import { ObjectType } from 'typescript';

export interface SQSListItem {
  id: string;
  name: string | null;
  opportunity_name: string | null;
  market_preference_name: string | null;
  brokerage_transaction_role_name: string | null;
  brokerage_user_name: string | null;
  last_activated_at: string | null;
  last_deactivated_at: string | null;
  date_entered: string;
  date_modified: string;
}

export interface SQSListEntity {
  id: string;
  name: string | null;
  opportunity_name: string | null;
  market_preference_name: string | null;
  status: string | null;
  origin: string | null;
  queue: string | null;
  date_entered: string | null;
  date_modified: string | null;
  date_sent: string | null;
  assigned_to: { first_name: string | null; last_name: string | null };
}

export interface SQSEntity {
  id: string;
  name: string | null;
  date_entered: string | null;
  date_modified: string | null;
  status: string | null;
  assigned_user_id: string | null;
  queue: string | null;
  attempts: string | null;
  message_id: string | null;
  origin: string | null;
  description: string | null;
  date_sent: string | null;
  receipt_handle: string | null;
  message: object | null;
  opportunity: { name: string | null };
  opportunity_id: string | null;
  market_preference_id: string | null;
  market_preference: {
    name: string | null;
  };
}

export interface SQSFilterEntity {
  event: string | null;
  opportunity_id: string | null;
  opportunity_name: string | null;
  market_preference_id: string | null;
  market_preference_name: string | null;
}

export interface SQSListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: SQSListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface SQSEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: SQSEntity;
  errorMessage: any;
}
