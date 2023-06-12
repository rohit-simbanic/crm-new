import { MarketPreferenceEntity } from 'types/market-preferences';

export const initialMarketPreference: MarketPreferenceEntity = {
  id: '',
  name: '',
  account_id: '',
  msa_id: '',
  account_name: '',
  msa_name: '',
  broker_rep_firm: '',
  broker_rep_firm_license_number: '',
  broker_rep_mlsid: '',
  broker_rep_agent_license_number: '',
  broker_rep_agent_email: '',
  sqs_status_trigger: [],
  sqs_status_trigger_text_display: '',
  enable_mp_wise_contract: 0,
  enable_generate_cgm_contract: 0,
  enable_cgm_preview_contract: 0,
  enable_cgm_multiple_generate_contract: 0,
  enable_call_from_cts: 0,
  enable_inbound_email: 0,
  pre_close_notification: 0,
  pre_close_notification_days: '',
  pre_close_notification_to_recipient: '',
  pre_close_notification_cc_recipient: '',
  entera_offer_defaults: '',
  generate_loi_email: 0,
  crm_status: '',
  enable_to_upload_document_revision: 0,
  get_msa: {
    id: '',
    name: ''
  },
  get_account: {
    id: '',
    name: ''
  },
  date_modified: ''
};

export default initialMarketPreference;
