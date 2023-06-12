import { ObjectType } from 'types';

const offerRejectReasons: ObjectType = {
  low_offer: 'Low Offer',
  low_dd_fee: 'Low DD Fee',
  no_response: 'No Response',
  seller_type: 'Seller Type',
  transaction_type: 'Transaction Type',
  accepted_other_offer_price: 'Accepted Other Offer - Price',
  investor_buyer: 'Investor Buyer',
  tenant_in_place: 'Tenant In Place',
  due_diligence_period: 'Due Diligence Period',
  buyer_stipulations: 'Buyer Stipulations',
  rent_restrictions: 'Rent Restrictions',
  hoa_restrictions: 'HOA Restrictions',
  contract_terms_and_restrictions: 'Contract Terms and Restrictions',
  seller_withdrew_listing: 'Seller Withdrew Listing',
  accepted_another_offer_before_offer_made:
    'Accepted Another Offer Before Offer Made',
  accepted_another_counter_before_counter_response:
    'Accepted Another Counter Before Counter Response'
};

export default offerRejectReasons;
