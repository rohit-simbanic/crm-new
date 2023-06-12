import { ObjectType } from 'typescript';

export interface MarketPreferenceBrokerageUserListItem {
  id: string;
  name: string;
  date_entered: string;
}

export interface MarketPreferenceBrokerageUserEntity {
  id: string;
  name: string | null;
  brokerage_user_name: string | null;
  brokerage_user_id: string | null;
  market_preference_name: string | null;
  brokerage_transaction_role: any;
  brokerage_user: any;
  market_preference: any;
  last_activated_at: string | null;
  date_entered: string | null;
  date_modified: string | null;
  last_deactivated_at: string | null;
  status: string | null;
  brokerage_transaction_role_id: string | null;
  brokerage_transaction_role_name: string | null;
  replace_brokerage_user_id: string | null;
  replace_brokerage_user_name: string | null;
  // replace_brokerage_user_id: string | null;
  market_preference_id: string | null;
}

export interface MarketPreferenceBrokerageUserListEntity {
  id: string;
  name: string | null;
  status: string | null;
  brokerage_transaction_role: string | null;
  brokerage_user: string | null;
  market_preference_name: string | null;
  last_activated_at: string | null;
  last_deactivated_at: string | null;
  date_entered: string | null;
  date_modified: string | null;
}

export interface MarketPreferenceBrokerageUserFilterEntity {
  status: string | null;
  market_preference_name: string | null;
  market_preference_id: string | null;
  brokerage_user_name: string | null;
  brokerage_user_id: string | null;
  brokerage_transaction_role_name: string | null;
  brokerage_transaction_role_id: string | null;
}

export interface MarketPreferenceBrokerageUserListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: MarketPreferenceBrokerageUserListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}
export interface MarketPreferenceBrokerageUserEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: MarketPreferenceBrokerageUserEntity;
  errorMessage: any;
}
