import { ObjectType } from 'types';

export interface OpportunityBrokerageUserListItem {
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
  brokerage_user?: ObjectType;
}

export interface OpportunityBrokerageUserListEntity {
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

export interface OpportunityBrokerageUserEntity {
  id: string;
  name: string | null;
  date_entered: string | null;
  date_modified: string | null;
  description: string | null;
  status: string | null;
  last_activated_at: string | null;
  last_deactivated_at: string | null;
  brokerage_user_id: string | null;
  opportunity_id: string | null;
  brokerage_transaction_role_id: string | null;
  market_preference_id: string | null;
  primary_user: number | null;
  opportunity_name: string | null;
  market_preference_name: string | null;
  brokerage_transaction_role_name: string | null;
  brokerage_user_name: string | null;
  market_preference: { id: string; name: string | null };
  brokerage_user: { first_name: string | null; last_name: string | null };
  brokerage_transaction_role: { id: string | null; name: string | null };
  opportunity: { name: string | null };
}

export interface OpportunityBrokerageUserFilterEntity {
  status: string | null;
  market_preference_name: string | null;
  market_preference_id: string | null;
  brokerage_user_name: string | null;
  brokerage_user_id: string | null;
  brokerage_transaction_role_name: string | null;
  brokerage_transaction_role_id: string | null;
  opportunity_name: string | null;
  opportunity_id: string | null;
}

export interface OpportunityBrokerageUserListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: ObjectType[];
    total: number;
  };

  errorMessage: any;
}

export interface OpportunityBrokerageUserEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: OpportunityBrokerageUserEntity;
  errorMessage: any;
}
