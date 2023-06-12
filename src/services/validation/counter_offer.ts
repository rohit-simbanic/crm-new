import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const counter_offer = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_seller_countered &&
      (!oppurtunity?.counter_offer ||
        oppurtunity?.counter_offer.trim().length === 0)
    ) {
      errors.push(missingField('Counter Offer'));
    }

    return errors;
  }
};
