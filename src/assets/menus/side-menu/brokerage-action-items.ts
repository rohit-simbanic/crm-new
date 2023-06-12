import { ObjectType } from 'types';

const brokerageActionItems: ObjectType = {

  'offer_make_offer': {
    'cancel_opportunity': 'Cancel Offer',
  },
  'offer_sent_to_seller': {
    'cancel_opportunity': 'Cancel Offer',
  },
  'offer_seller_received': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'opportunity_action_counter_offer': 'Counteroffer Receipt',
  },
  'offer_seller_countered': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'opportunity_action_counter_offer': 'Counteroffer Receipt',
    'buyer_counter_offer_confirmation': 'Buyer Counteroffer Confirmation',
  },
  'Offer_counter_updated': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'opportunity_action_counter_offer': 'Counteroffer Receipt',
    'buyer_counter_offer_confirmation': 'Buyer Counteroffer Confirmation',
  },
  'offer_rejected': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
  },
  'offer_canceled': {
    'cancel_opportunity': 'Cancel Offer',
  },
  'offer_lost_deal': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'opportunity_action_counter_offer': 'Counteroffer Receipt',
  },
  'offer_accepted': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'buyer_counter_offer_confirmation': 'Buyer Counteroffer Confirmation',
    'due_diligence_opportunity': 'Enter Due Diligence',
  },
  'offer_short_sale_offer_accepted': {
    'cancel_opportunity': 'Cancel Offer',
    'reject_opportunity': 'Reject Offer',
    'execute_contract': 'Accept Offer',
    'buyer_counter_offer_confirmation': 'Buyer Counteroffer Confirmation',
    'due_diligence_opportunity': 'Enter Due Diligence',
  },
  'closing_diligence_period': {
    'execute_contract': 'Accept Offer',
    'due_diligence_opportunity': 'Enter Due Diligence',
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
    'request_price_adjustment': 'Retrade Request',
    'extension_request': 'Extension Request',
    'clear_due_diligence': 'Clear Due Diligence',
    'termination_request': 'Termination Request',
  },
  'closing_diligence_amended': {
    'execute_contract': 'Accept Offer',
    'due_diligence_opportunity': 'Enter Due Diligence',
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
    'extension_request': 'Extension Request',
    'approve_extension_request': 'Extension Confirmation',
    'request_price_adjustment': 'Retrade Request',
    'retrade_approval': 'Retrade Complete',
    'clear_due_diligence': 'Clear Due Diligence',
    'termination_request': 'Termination Request',
    'termination_approval': 'Termination Approval',
  },
  'closing_sale_pending': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
    'request_price_adjustment': 'Retrade Request',
    'termination_request': 'Termination Request',
  },
  'closing_sale_pending_amended': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
    'request_price_adjustment': 'Retrade Request',
    'retrade_approval': 'Retrade Complete',
    'termination_request': 'Termination Request',
    'termination_approval': 'Termination Approval',
  },
  'closing_clear_to_close': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
  },
  'closing_termination_pending': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
    'termination_request': 'Termination Request',
    'termination_approval': 'Termination Approval',
  },
  'closed_purchased': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
  },
  'closing_cancel_contract': {
    'due_diligence_fees': 'Due Diligence Fees',
    'option_earnest_fee_status': 'Option / Earnest Fee Status',
  },
  'default': {

  }
};

export default brokerageActionItems;
