import { ObjectType } from 'types';

let allowedBrokerageActions: ObjectType = {
  negotiator: {
    offer_make_offer: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_sent_to_seller: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_seller_received: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt'
    },
    offer_seller_countered: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation'
    },
    Offer_counter_updated: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation'
    },
    offer_rejected: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer'
    },
    offer_canceled: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_lost_deal: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt'
    },
    offer_accepted: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation',
      due_diligence_opportunity: 'Enter Due Diligence'
    },
    offer_short_sale_offer_accepted: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      execute_contract: 'Accept Offer',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation',
      due_diligence_opportunity: 'Enter Due Diligence'
    },
    closing_diligence_period: {
      execute_contract: 'Accept Offer',
      due_diligence_opportunity: 'Enter Due Diligence',
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status',
      clear_due_diligence: 'Clear Due Diligence'
    },
    closing_diligence_amended: {
      execute_contract: 'Accept Offer',
      due_diligence_opportunity: 'Enter Due Diligence',
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status',
      clear_due_diligence: 'Clear Due Diligence'
    },
    closing_sale_pending: {
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_sale_pending_amended: {
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_clear_to_close: {
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_cancel_contract: {
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete'
    },
    closing_termination_pending: {
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete'
    },
    default: {}
  },
  closing: {
    offer_make_offer: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_sent_to_seller: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_seller_received: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt',
      execute_contract: 'Accept Offer'
    },
    offer_seller_countered: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation',
      execute_contract: 'Accept Offer'
    },
    Offer_counter_updated: {
      cancel_opportunity: 'Cancel Offer',
      reject_opportunity: 'Reject Offer',
      opportunity_action_counter_offer: 'Counteroffer Receipt',
      buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation',
      execute_contract: 'Accept Offer'
    },
    offer_rejected: {
      cancel_opportunity: 'Cancel Offer',
      execute_contract: 'Accept Offer'
    },
    offer_canceled: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_lost_deal: {
      cancel_opportunity: 'Cancel Offer'
    },
    offer_accepted: {
      cancel_opportunity: 'Cancel Offer',
      due_diligence_opportunity: 'Enter Due Diligence'
    },
    offer_short_sale_offer_accepted: {
      cancel_opportunity: 'Cancel Offer',
      due_diligence_opportunity: 'Enter Due Diligence'
    },
    closing_diligence_period: {
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status',
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      clear_due_diligence: 'Clear Due Diligence',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete'
    },
    closing_diligence_amended: {
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status',
      extension_request: 'Extension Request',
      extension_confirmation: 'Extension Confirmation',
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      clear_due_diligence: 'Clear Due Diligence',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete'
    },
    closing_sale_pending: {
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_sale_pending_amended: {
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_cancel_contract: {
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closing_termination_pending: {
      request_price_adjustment: 'Retrade Request',
      retrade_approval: 'Retrade Complete',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete',
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status'
    },
    closed_purchased: {
      due_diligence_fees: 'Due Diligence Fees',
      option_earnest_fee_status: 'Option / Earnest Fee Status',
      termination_request: 'Termination Request',
      termination_approval: 'Termination Complete'
    },
    default: {}
  },
  transaction: {
    default: {}
  }
};

export default allowedBrokerageActions;
