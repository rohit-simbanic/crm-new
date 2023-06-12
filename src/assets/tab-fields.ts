import { ObjectType } from 'types';

const tabFields: ObjectType = {
  basic: [
    'type_c',
    'offer_price_c',
    'seller_offer_response',
    'next_seller_contact_date',
    'msa_id_1',
    'market_preference_id',
  ],
  primary_information: [
    'offer_date_c',
    'contract_execution_date_c',
    'earnest_money_due_date_c',
    'due_diligence_start_c',
    'due_diligence_end_c',
    'close_date_c',
    'option_period_days_c',
    'contract_termination_reasons',
    'contract_terminated_date',
    'reject_reason',
    'offer_submit_by_date',
    'short_sale_seller_accept_date',
    'cancel_reason',
    'restrictions_notes',
    'account_buyer_id',
    'cancellation_reason_subcategory',
    'termination_reason_subcategory',
    'has_leasing_restrictions',
    'account_id_1'
  ],
  characteristics: ['tax_id_c'],
  notes_terms_provisions: [],
  contact_information: [
    'escrow_company_contact_c',
    'parties_listing_agent_name',
    'seller_name_c',
    'active_primary_negotiator_user'
  ],
  financial_information: [
    'counter_offer',
    'earnest_amount_c',
    'sale_date',
    'sold_price',
    'earnest_recovered_by_buyer',
    'earnest_paid_by_entera',
    'em_recovery_amount',
    'em_paid_by_enatera_amount'
  ],
  diligence_period: ['municipal_inspection_types'],
  settlement: [
    'buyer_commission_c',
    'purchase_price_c',
    'has_post_occupancy',
    'final_commission_percentage',
    'final_commission',
    'contract_price_c',
    'commision_pending',
    'initial_commission_amount',
    'reduction_type',
    'commission_reduction_type3',
    'commission_reduction_type2'
  ],
  off_market: [
    'close_date_c',
    'seller_name_c',
    'parties_seller_representative_name',
    'parties_lead_source_name',
    'parties_lead_owner_name',
    'parties_buyer_representative_name',
    'parties_intended_buyer_name',
    'parties_uploaded_by_name',
    'commission_buyer_source',
    'commission_buyer_rep',
    'commission_seller_source',
    'commission_seller_rep',
    'parties_seller_type',
    'parties_seller_representative_type',
    'parties_intended_buyer_type',
    'parties_uploaded_by_type',
    'contract_price_c'
  ]
};

export default tabFields;
