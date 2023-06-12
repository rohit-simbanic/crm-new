import { ObjectType } from 'types';

const rejectReasons: ObjectType = {
  excessive_rehab: 'Excessive Rehab',
  low_rent_avm_confidence: 'Low Rent AVM Confidence',
  low_sale_avm_confidence: 'Low Sale AVM Confidence',
  seller_type: 'Seller Type',
  transaction_type: 'Transaction Type',
  neighborhood: 'Neighborhood',
  rent_restrictions: 'Rent Restrictions',
  hazardous_conditions: 'Hazardous Conditions',
  pre_offer_cancel: 'Pre Offer Cancel',
  duplicate_offer: 'Duplicate Offer',
  not_in_buy_box: 'Not in Buy-box',
  mls_pending: 'MLS Pending',
  contract_terms_and_restrictions: 'Contract Terms and Restrictions',
  solar_lease_must_be_assumed: 'Solar lease must be assumed',
  long_term_lease_in_place: 'Long term lease in place',
  seller_leaseback_required: 'Seller leaseback required Rehab',
  subject_to_firpta: 'Subject to Firpta',
  other_see_notes_below: 'Other - See Notes Below',
  septic: 'Septic',
  sinkhole: 'Sinkhole'
};

export default rejectReasons;
