import { ObjectType } from 'typescript';

export interface AccountListItem {
  id: string;
  name: string;
  date_entered: string;
  company_name: string;
}

export interface AccountEntity {
  id: string;
  name: string | null;
  company_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  website: string | null;
  phone_office: string | null;
  phone_fax: string | null;
  finance: string | null;
  account_type: string | null;
  account_status: string | null;
  whitelist_email_domains: string | null;
  enable_to_update_escrow_party: number;
  enable_account_specific_email_template: number;
  use_jacksonville_nefar_contract: number;
  enable_negotiator_dashboard_new_actions: number;
  entera_customer_id: string | null;
  description: string | null;
  created_by: string | null;
  modified_user_id: string | null;
  assigned_user_id: string | null;
  allowed_opportunity_actions: Array<string>;
  initial_commission: string | null;
  email1: string | null;
}

export interface AccountListEntity {
  id: string;
  name: string | null;
  company_name: string | null;
  phone_office: string | null;
  account_status: string | null;
  enable_negotiator_dashboard_new_actions: number;
  date_entered: string;
}

export interface AccountFilterEntity {
  name: string | null;
  company_name: string | null;
}

export interface AccountListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: AccountListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface AccountEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: AccountEntity;
  errorMessage: any;
}
