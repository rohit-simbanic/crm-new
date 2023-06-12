import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const counter_offer_price_c = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      opportunity?.opportunity_status_c ===
      oppurtunityStatusList.offer_seller_countered &&
      (isEmpty(opportunity?.counter_offer_price_c) ||
        opportunity.counter_offer_price_c === 0.0)
    ) {
      errors.push(missingField('Counter Offer Price'));
    }

    return errors;
  }
};
