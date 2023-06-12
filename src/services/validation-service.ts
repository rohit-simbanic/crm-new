import { buyer_commission_c } from './validation/buyer_commission_c';
import { cancel_reason } from './validation/cancel_reason';
import { offer_cancelled_date } from './validation/cancel_date';
import { close_date_c } from './validation/close_date';
import { commision_pending } from './validation/commision_pending';
import { contract_execution_date_c } from './validation/contract_execution_date_c';
import { contract_price_c } from './validation/contract_price_c';
import { contract_terminated_date } from './validation/contract_terminated_date';
import { contract_termination_reasons } from './validation/contract_termination_reasons';
import { counter_offer } from './validation/counter_offer';
import { counter_offer_price_c } from './validation/counter_offer_price_c';
import { deposit_amount } from './validation/deposit_amount';
import { due_diligence_end_c } from './validation/due_diligence_end_c';
import { due_diligence_start_c } from './validation/due_diligence_start_c';
import { earnest_amount_c } from './validation/earnest_amount_c';
import { earnest_money_due_date_c } from './validation/earnest_money_due_date_c';
import { final_commission_percentage } from './validation/final_commission_percentage';
import { final_commission } from './validation/final_commission';
import { initial_commission_amount } from './validation/initial_commission_amount';
import { lease_type } from './validation/lease_type';
import { next_seller_contact_date } from './validation/next_seller_contact_date';
import { offer_date_c } from './validation/offer_date_c';
import { offer_price_c } from './validation/offer_price_c';
import { offer_submit_by_date } from './validation/offer_submit_by_date';
import { opportunity_status_c } from './validation/opportunity_status_c';
import { option_period_days_c } from './validation/option_period_days_c';
import { parties_listing_agent_name } from './validation/parties_listing_agent_name';
import { reject_reason } from './validation/reject_reason';
import { rental_amount } from './validation/rental_amount';
import { restrictions_notes } from './validation/restrictions_notes';
import { sale_date } from './validation/sale_date';
import { seller_name_c } from './validation/seller_name_c';
import { seller_offer_response } from './validation/seller_offer_response';
import { short_sale_seller_accept_date } from './validation/short_sale_seller_accept_date';
import { sold_price } from './validation/sold_price';
import { cancel_request_received_date } from './validation/cancel_request_received_date';
import { escrow_company_contact_c } from './validation/escrow_company_contact_c';
import { escrow_company_email_c } from './validation/escrow_company_email_c';
import { escrow_company_name_c } from './validation/escrow_company_name_c';
import { escrow_company_phone_c } from './validation/escrow_company_phone_c';
import { em_paid_by_enatera_amount } from './validation/em_paid_by_enatera_amount';
import { em_recovery_amount } from './validation/em_recovery_amount';
import { forecasted_close_date } from './validation/forecasted_close_date';
import { forecasted_dd_end_date } from './validation/forecasted_dd_end_date';
import { has_post_occupancy } from './validation/has_post_occupancy';
import { hoa_addendum_received } from './validation/hoa_addendum_received';
import { lease_end_date } from './validation/lease_end_date';
import { tax_id_c } from './validation/tax_id_c';
import { entera_contribution_amount } from './validation/entera_contribution_amount';
import { entera_contribution } from './validation/entera_contribution';
import { extension_request_reason } from './validation/extension_request_reason';
import { buyer_requested_retrade_amount } from './validation/buyer_requested_retrade_amount';
import { vendor_name } from './validation/vendor_name';
import { option_days_type_c } from './validation/option_days_type_c';
import { reject_date } from './validation/reject_date';
import { ObjectType } from 'types';
import { earnest_recovered_by_buyer } from './validation/earnest_recovered_by_buyer';
import { earnest_paid_by_entera } from './validation/earnest_paid_by_entera';
import { sale_avm_c } from './validation/sale-avm-c';
import { offer_to_list_c } from './validation/offer-to-list-c';
import { offer_to_market_value_percentage_c } from './validation/offer-to-market-value-percentage-c';
import { offer_initialized_at } from './validation/offer-initialized-at';
import { offer_expiration_date_c } from './validation/offer-expiration-date-c';
import { offer_lost_date } from './validation/offer_lost_date';
import { has_leasing_restrictions } from './validation/has_leasing_restrictions';
import { balance_to_close_c } from './validation/balance_to_close_c';
import { purchase_price_c } from './validation/purchase_price_c';
import { financing_amount_c } from './validation/financing_amount_c';
import { option_amount_c } from './validation/option_amount_c';
import { list_price_c } from './validation/list_price_c';
import { initial_due_diligence_end } from './validation/initial_due_diligence_end';
import { access_requested_by } from './validation/access-requested-by';
import { access_requested_date } from './validation/access-requested-date';
import { congrats_letter_sent_by } from './validation/congrats-letter-sent-by';
import { congrats_letter_sent_date } from './validation/congrats-letter_sent-date';
import { name } from './validation/name';
import { lease_agreement_received } from './validation/lease-agreement-received';
import { internal_termination_feedback } from './validation/internal-termination-feedback';
import { earnest_recovery_amount } from './validation/earnest-recovery-amount';
import { earnest_paid_by_entera_amount } from './validation/earnest-paid-by-entera-amount';
import { retrade_reason } from './validation/retrade-reason';
import { negotiator_sent_retrade_amount } from './validation/negotiator-sent-retrade-amount';
import { actual_retrade_amount } from './validation/actual-retrade-amount';
import { parties_seller_representative_name } from './validation/parties-seller-representative-name';
import { parties_lead_source_name } from './validation/parties-lead-source-name';
import { parties_lead_owner_name } from './validation/parties-lead-owner-name';
import { parties_buyer_representative_name } from './validation/parties-buyer-representative-name';
import { parties_intended_buyer_name } from './validation/parties-intended-buyer-name';
import { parties_uploaded_by_name } from './validation/parties-uploaded-by-name';
import { commission_buyer_source } from './validation/commission-buyer-source';
import { commission_buyer_rep } from './validation/commission-buyer-rep';
import { commission_seller_source } from './validation/commission-seller-source';
import { commission_seller_rep } from './validation/commission-seller-rep';
import { cancellation_reason_subcategory } from './validation/cancellation-reason-subcategory';
import { termination_reason_subcategory } from './validation/termination-reason-subcategory';
import { municipal_inspection_notes } from './validation/municipal-inspection-notes';
import { municipal_inspection_types } from './validation/municipal-inspection-types';
import { commission_negotiator_commission_pct } from './validation/commission-negotiator-commission-pct';
import { commission_buyer_rep_pct } from './validation/commission-buyer-rep-pct';
import { commission_buyer_source_pct } from './validation/commission-buyer-source-pct';
import { commission_seller_source_pct } from './validation/commission-seller-source-pct';
import { commission_seller_rep_pct } from './validation/commission-seller-rep-pct';
import { parties_seller_type } from './validation/parties-seller-type';
import { parties_intended_buyer_type } from './validation/parties-intended-buyer-type';
import { parties_lead_source_type } from './validation/parties-lead-source-type';
import { parties_seller_representative_type } from './validation/parties-seller-representative-type';
import { parties_uploaded_by_type } from './validation/parties_uploaded_by_type';
import { active_primary_negotiator_user } from './validation/active-primary-negotiator-user';
import { type_c } from './validation/type-c';
import { buyer_contract_name_c } from './validation/buyer-contract-name-c';
import { initial_commission_percentage } from './validation/initial-commission-percentage';
import { buyer_bonus_c } from './validation/buyer-bonus-c';
import { commission_negotiator_commission_amount } from './validation/commission-negotiator-commission-amount';
import { total_commission_reductions } from './validation/total-commission-reductions';
import { hud_reductions } from './validation/hud_reductions';
import { initial_offer_price_c } from './validation/initial-offer-price-c';
import { hud_commission } from './validation/hud_commission';
import { account_buyer_id } from './validation/account-buyer-id';
import { commission_reduction_type2 } from './validation/commission-reduction-type2';
import { commission_reduction_type3 } from './validation/commission_reduction_type3';
import { reduction_type } from './validation/reduction-type';
import { commision_reduction } from './validation/commision-reduction';
import { commision_reduction2 } from './validation/commision_reduction2';
import { commision_reduction3 } from './validation/commision_reduction3';
import { benefitting_negotiator } from './validation/benefitting-negotiator';
import { msa_id_1 } from './validation/msa_id_1';
import { market_preference_id } from './validation/market_preference_id';
import { account_id_1 } from './validation/account_id_1';

interface ErrorType {
  [key: string]: boolean | string[];
}

let errors: ErrorType = {};
let opportunity: ObjectType = {};
let marketPreference: ObjectType = {};

const validationService = {
  validate: function (
    data: ObjectType,
    fields: string[],
    status: string,
    oldData?: ObjectType
  ): ErrorType {
    errors = {};
    opportunity = data;
    for (const field of fields) {
      let error = validation[field].validate(opportunity, status, oldData);
      if (error && error.length > 0) {
        errors['status'] = true;
        errors[field] = error;
      }
    }
    return errors;
  },

  backendValidate: function (data: any): ErrorType {
    errors = {};
    for (const error of data) {
      errors['status'] = true;
      errors[error['field']] = [error['message']];
    }
    return errors;
  }
};

export default validationService;

export const validation: { [key: string]: any } = {
  name,
  buyer_commission_c,
  cancel_reason,
  offer_cancelled_date,
  cancel_request_received_date,
  close_date_c,
  commision_pending,
  contract_execution_date_c,
  counter_offer_price_c,
  contract_price_c,
  contract_terminated_date,
  contract_termination_reasons,
  internal_termination_feedback,
  counter_offer,
  deposit_amount,
  due_diligence_end_c,
  due_diligence_start_c,
  earnest_amount_c,
  earnest_money_due_date_c,
  earnest_recovered_by_buyer,
  earnest_paid_by_entera,
  em_recovery_amount,
  em_paid_by_enatera_amount,
  escrow_company_contact_c,
  escrow_company_email_c,
  escrow_company_name_c,
  escrow_company_phone_c,
  entera_contribution_amount,
  entera_contribution,
  final_commission_percentage,
  final_commission,
  forecasted_close_date,
  forecasted_dd_end_date,
  has_post_occupancy,
  hoa_addendum_received,
  initial_commission_amount,
  lease_end_date,
  lease_type,
  next_seller_contact_date,
  offer_date_c,
  offer_price_c,
  offer_submit_by_date,
  opportunity_status_c,
  option_period_days_c,
  parties_listing_agent_name,
  reject_reason,
  rental_amount,
  restrictions_notes,
  sale_date,
  seller_name_c,
  seller_offer_response,
  short_sale_seller_accept_date,
  sold_price,
  tax_id_c,
  extension_request_reason,
  buyer_requested_retrade_amount,
  option_days_type_c,
  vendor_name,
  reject_date,
  sale_avm_c,
  offer_to_list_c,
  offer_to_market_value_percentage_c,
  offer_initialized_at,
  offer_expiration_date_c,
  offer_lost_date,
  has_leasing_restrictions,
  balance_to_close_c,
  purchase_price_c,
  financing_amount_c,
  option_amount_c,
  list_price_c,
  initial_due_diligence_end,
  access_requested_by,
  access_requested_date,
  congrats_letter_sent_by,
  congrats_letter_sent_date,
  lease_agreement_received,
  earnest_recovery_amount,
  earnest_paid_by_entera_amount,
  retrade_reason,
  negotiator_sent_retrade_amount,
  actual_retrade_amount,
  parties_seller_representative_name,
  parties_lead_source_name,
  parties_lead_owner_name,
  parties_buyer_representative_name,
  parties_intended_buyer_name,
  parties_uploaded_by_name,
  commission_buyer_source,
  commission_buyer_rep,
  commission_seller_source,
  commission_seller_rep,
  cancellation_reason_subcategory,
  termination_reason_subcategory,
  municipal_inspection_notes,
  municipal_inspection_types,
  commission_negotiator_commission_pct,
  commission_negotiator_commission_amount,
  commission_buyer_rep_pct,
  commission_buyer_source_pct,
  commission_seller_rep_pct,
  commission_seller_source_pct,
  parties_seller_type,
  parties_seller_representative_type,
  parties_lead_source_type,
  parties_intended_buyer_type,
  parties_uploaded_by_type,
  active_primary_negotiator_user,
  type_c,
  buyer_contract_name_c,
  initial_commission_percentage,
  buyer_bonus_c,
  total_commission_reductions,
  hud_reductions,
  initial_offer_price_c,
  hud_commission,
  account_buyer_id,
  reduction_type,
  commission_reduction_type2,
  commission_reduction_type3,
  commision_reduction,
  commision_reduction2,
  commision_reduction3,
  benefitting_negotiator,
  msa_id_1,
  market_preference_id,
  account_id_1
};
