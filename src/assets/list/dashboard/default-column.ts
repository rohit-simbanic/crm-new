import { ObjectType } from "types";

const DefaultDashboardFields: ObjectType = {
  NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'list_price_c',
    'offer_price_c',
    'max_offer_price_c',
    'offer_to_list_c',
    'date_entered',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_SELLER_SENT_RECEIVED: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'list_price_c',
    'offer_price_c',
    'max_offer_price_c',
    'offer_to_list_c',
    'offer_date_c',
    'list_date_c',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_COUNTERED_OFFER: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'list_price_c',
    'offer_price_c',
    'max_offer_price_c',
    'offer_to_list_c',
    'offer_date_c',
    'list_date_c',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_ACCEPTED_OFFER: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'list_price_c',
    'offer_price_c',
    'max_offer_price_c',
    'offer_to_list_c',
    'offer_date_c',
    'list_date_c',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_DD_ENDING: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_SALE_PENDING: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiator_note'
  ],

  NEGOTIATOR_DASHBOARD_TERMINATION: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiator_note'
  ],

  CLOSING_DASHBOARD_DILIGENCE_PERIOD: [
    'action',
    'name',
    'account_name',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'close_date_c',
    'list_date_c',
    'list_price_c',
    'offer_price_c',
    'offer_date_c',
    'forecasted_close_date'
  ],

  CLOSING_DASHBOARD_SALE_PENDING: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'close_date_c',
    'list_date_c',
    'list_price_c',
    'offer_price_c',
    'offer_date_c',
    'forecasted_close_date'
  ],

  CLOSING_DASHBOARD_CLEAR_TO_CLOSE: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'mls_c',
    'mls_status_c',
    'close_date_c',
    'list_date_c',
    'list_price_c',
    'offer_price_c',
    'offer_date_c',
    'forecasted_close_date'
  ],

  CLOSING_DASHBOARD_TERMINATIONS: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiator_note'
  ],

  CLOSING_DASHBOARD_CLOSED_PURCHASED: [
    'action',
    'name',
    'property_address_c',
    'account',
    'msa_name',
    'market',
    'opportunity_status_c',
    'primary_negotiator_name',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiator_note'
  ],


  TRANSACTION_DASHBOARD_EARNEST_MONEY: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'earnest_amount_c',
    'earnest_money_status_c',
    'earnest_money_due_date_c',
    'option_amount_c',
    'option_fee_delivery_date_c'
  ],

  TRANSACTION_DASHBOARD_OPTION_FEE: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'earnest_amount_c',
    'earnest_money_status_c',
    'earnest_money_due_date_c',
    'option_amount_c',
    'option_fee_delivery_date_c'
  ],

  TRANSACTION_DASHBOARD_DD_ENDING: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'earnest_amount_c',
    'earnest_money_status_c',
    'earnest_money_due_date_c',
    'option_amount_c',
    'option_fee_delivery_date_c'
  ],

  TRANSACTION_DASHBOARD_REVIEW_CONTRACT: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'buyer_contract_name_c',
    'opportunity_status_c',
    'mls_c',
    'contract_execution_date_c',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiation_note',
    'contract_review_complete',
    'sellers_disclosure_received'
  ],

  TRANSACTION_DASHBOARD_FORCSTED_COE: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'property_address_c',
    'date_modified',
    'closing_attorney',
    'escrow_company_name_c',
    'escrow_company_contact_c',
    'congrats_letter_sent_date',
    'congrats_letter_sent_by',
    'name',
    'account_name',
    'msa_name',
    'market',
    'opportunity_status_c',
    'close_date_c',
    'special_instructions'
  ],

  TRANSACTION_DASHBOARD_CLOSING_TODAY: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'date_modified',
    'closing_attorney',
    'escrow_company_name_c',
    'escrow_company_contact_c',
    'congrats_letter_sent_date',
    'congrats_letter_sent_by',
    'close_date_c',
    'special_instructions'
  ],

  TRANSACTION_DASHBOARD_TERMINATION_PENDING: [
    'action',
    'name',
    'property_address_c',
    'account',
    'account_name',
    'msa_name',
    'market',
    'buyer_contract_name_c',
    'opportunity_status_c',
    'mls_c',
    'contract_execution_date_c',
    'due_diligence_end_c',
    'close_date_c',
    'contract_price_c',
    'latest_negotiation_note',
    'contract_review_complete',
    'contract_terminated_date',
    'initial_commission_amount',
    'contract_termination_reasons'
  ]
};

export default DefaultDashboardFields;