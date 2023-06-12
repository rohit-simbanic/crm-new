import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const sale_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_lost_deal &&
      (!oppurtunity?.sale_date || oppurtunity?.sale_date.trim().length === 0)
    ) {
      errors.push(
        missingField(
          'Sale Date must be completed before moving status to Offer: Lost.'
        )
      );
    }

    return errors;
  }
};
