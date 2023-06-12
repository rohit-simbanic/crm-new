import { ObjectType } from 'types';

import { opportunity_status_c } from './filters/oppurtunity-status-c';
import { seller_offer_response } from './filters/seller-offer-response';
import { mls_status_c } from './filters/mls-status-c';
import { msa_id } from './filters/msa_id';
import { account_id } from './filters/account-id';
import { offer_date_c_range } from './filters/offer-date-c-range';
import { offer_date_c } from './filters/offer-date-c';
import { offer_date_to_c } from './filters/offer-date-to-c';
import { close_date_c_range } from './filters/close-date-c-range';
import { close_date_c } from './filters/close-date-c';
import { close_date_to_c } from './filters/close-date-to-c';
import { next_seller_contact_date_range } from './filters/next-seller-contact-date-range';
import { next_seller_contact_date } from './filters/next-seller-contact-date';
import { next_seller_contact_date_to } from './filters/next-seller-contact-date-to';
import { property_address_c } from './filters/property-address-c';
import { entera_opportunity_id } from './filters/entera-opportunity-id';
import { mls_c } from './filters/mls-c';
import { street_name } from './filters/street-name';

export default (filter: any, action: string) => {
  let response = ``;
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      if (prepareFilter[key]) {
        const element = prepareFilter[key](filter[key], action, filter);
        response += element;
      }
    }
  }
  return response;
};

const prepareFilter: { [key: string]: any } = {
  opportunity_status_c,
  seller_offer_response,
  mls_status_c,
  msa_id,
  account_id,
  offer_date_c_range,
  offer_date_c,
  offer_date_to_c,
  close_date_c_range,
  close_date_c,
  close_date_to_c,
  next_seller_contact_date_range,
  next_seller_contact_date,
  next_seller_contact_date_to,
  property_address_c,
  entera_opportunity_id,
  mls_c,
  street_name
};

export const isValidFilter = (filter: ObjectType) => {
  let valid: boolean = false;
  for (const key in filter) {
    const value = filter[key];
    if (key.includes('range')) {
      continue;
    }
    if (value && value.length !== 0) {
      valid = true;
      break;
    }
  }
  return valid;
};
