import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const sold_price = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_lost_deal &&
      (!oppurtunity?.sold_price || oppurtunity?.sold_price.trim().length === 0)
    ) {
      errors.push(
        missingField(
          'Sold Price must be completed before moving status to Offer: Lost.'
        )
      );
    }

    return errors;
  }
};
