import { ObjectType } from 'types';
import { MarketPreferenceEntity } from 'types/market-preferences';

const setRequest = (marketPreferences: MarketPreferenceEntity): ObjectType => {
  return {
    id: marketPreferences.id,
    name: marketPreferences.name,
    account_id: marketPreferences.account_id,
    msa_id: marketPreferences.msa_id,
    account_name: marketPreferences.account_name,
    msa_name: marketPreferences.msa_name,
    broker_rep_firm: marketPreferences.broker_rep_firm,
    broker_rep_firm_license_number:
      marketPreferences.broker_rep_firm_license_number,
    broker_rep_mlsid: marketPreferences.broker_rep_mlsid,
    broker_rep_agent_license_number:
      marketPreferences.broker_rep_agent_license_number,
    broker_rep_agent_email: marketPreferences.broker_rep_agent_email,
    sqs_status_trigger: marketPreferences.sqs_status_trigger,
    enable_mp_wise_contract: marketPreferences.enable_mp_wise_contract,
    enable_generate_cgm_contract:
      marketPreferences.enable_generate_cgm_contract,
    enable_cgm_preview_contract: marketPreferences.enable_cgm_preview_contract,
    enable_cgm_multiple_generate_contract:
      marketPreferences.enable_cgm_multiple_generate_contract,
    enable_call_from_cts: marketPreferences.enable_call_from_cts,
    enable_inbound_email: marketPreferences.enable_inbound_email,
    pre_close_notification: marketPreferences.pre_close_notification,
    pre_close_notification_days: marketPreferences.pre_close_notification_days,
    pre_close_notification_to_recipient:
      marketPreferences.pre_close_notification_to_recipient,
    pre_close_notification_cc_recipient:
      marketPreferences.pre_close_notification_cc_recipient,
    generate_loi_email: marketPreferences.generate_loi_email,
    crm_status: marketPreferences.crm_status,
    enable_to_upload_document_revision:
      marketPreferences.enable_to_upload_document_revision
  };
};

export default setRequest;
