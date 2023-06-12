import { ObjectType } from 'types';

const ActionName: ObjectType = {
  cancel_opportunity: 'Cancel Offer',
  reject_opportunity: 'Reject Offer',
  execute_contract: 'Accept Offer',
  opportunity_action_counter_offer: 'Counteroffer Receipt',
  buyer_counter_offer_confirmation: 'Buyer Counteroffer Confirmation',
  due_diligence_opportunity: 'Enter Due Diligence',
  due_diligence_fees: 'Due Diligence Fees',
  option_earnest_fee_status: 'Option / Earnest Fee Status',
  extension_request: 'Extension Request',
  extension_confirmation: 'Extension Confirmation',
  request_price_adjustment: 'Retrade Request',
  retrade_approval: 'Retrade Complete',
  clear_due_diligence: 'Clear Due Diligence',
  termination_request: 'Termination Request',
  termination_approval: 'Termination Approval'
};

export default ActionName;
