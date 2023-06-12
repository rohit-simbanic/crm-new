import { ObjectType } from 'types';

const cancelReasons: ObjectType = {
  excessive_rehab: 'Excessive Rehab',
  pre_offer_cancel: 'Pre Offer Cancel',
  duplicate_offer: 'Duplicate Offer',
  mls_pending: 'MLS Pending',
  financial_characteristic: 'Financial Characteristic',
  location_characteristic: 'Location Characteristic',
  physical_characteristic: 'Physical Characteristic',
  deal_term: 'Deal Term',
  hoa_rental_restriction: 'HOA Rental Restriction',
  firpta: 'FIRPTA',
  hoa_violation: 'HOA Violation',
  offer_submitted_with_other_broker: 'Offer Submitted with Other Broker'
};

export default cancelReasons;
