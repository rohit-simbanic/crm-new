import { ObjectType } from 'types';

const terminationReason: ObjectType = {
  price_reduction: 'Price Reduction',
  excessive_rehab: 'Excessive Rehab',
  hoa_violations: 'HOA Violations',
  open_permits: 'Open Permits',
  cloud_on_title: 'Cloud on Title',
  seller_canceled_contract: 'Seller Canceled Contract',
  earnest_money_delivery: 'Earnest Money Delivery',
  option_fee_delivery: 'Option Fee Delivery',
  hoa_rental_restrictions: 'HOA Rental Restrictions',
  financial_characteristic: 'Financial Characteristic',
  location_characteristic: 'Location Characteristic',
  physical_characteristic: 'Physical Characteristic',
  short_sale_issues: 'Short Sale Issues',
  closing_extension: 'Closing Extension',
  due_diligence_extension: 'Due Diligence Extension',
  firpta: 'FIRPTA'
};

export default terminationReason;
