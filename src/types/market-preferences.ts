import { ObjectType } from 'typescript';

export interface MarketPreferencesListItem {
  id: string;
  name: string;
  date_entered: string;
  account_name: string;
  msa_name: string;
}

export interface MarketPreferenceEntity {
  id: string;
  name: string | null;
  account_id: string | null;
  msa_id: string | null;
  account_name: string | null;
  msa_name: string | null;
  broker_rep_firm: string | null;
  broker_rep_firm_license_number: string | null;
  broker_rep_mlsid: string | null;
  broker_rep_agent_license_number: string | null;
  broker_rep_agent_email: string | null;
  sqs_status_trigger: ObjectType[] | string[] | null | any;
  sqs_status_trigger_text_display: string | null;
  enable_mp_wise_contract: number;
  enable_generate_cgm_contract: number;
  enable_cgm_preview_contract: number;
  enable_cgm_multiple_generate_contract: number;
  enable_call_from_cts: number;
  enable_inbound_email: number;
  pre_close_notification: number;
  pre_close_notification_days: string | null;
  pre_close_notification_to_recipient: string | null;
  pre_close_notification_cc_recipient: string | null;
  entera_offer_defaults: string | null;
  generate_loi_email: number;
  crm_status: string | null;
  enable_to_upload_document_revision: number;
  get_msa: { id: string; name: string };
  get_account: { id: string; name: string };
  date_modified?: string | null;
}

export interface AssociatePDFTemplateMarketPreferenceEntity {
  contract_type: string | null;
  date_modified: string | null;

  deleted: string | null;

  homeowner_association: string | null;

  id: string | null;
  market_preference_id: string | null;
  offer_package: string | null;
  pdf_template_id: string | null;
}

export interface AssociateEmailTemplateMarketPreferenceEntity {
  email_template_id: string[] | null;
}
export interface MarketPreferencesListEntity {
  id: string;
  name: string;
  date_entered: string;
  account_name: string;
  msa_name: string;
}

export interface MarketPreferencesFilterEntity {
  name: string | null;
  account_id: string | null;
  msa_id: string | null;
}

export interface MarketPreferencesListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: MarketPreferencesListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface MarketPreferenceEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: MarketPreferenceEntity;
  errorMessage: any;
}
