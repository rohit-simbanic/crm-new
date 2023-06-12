import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { next_seller_contact_date } from './next_seller_contact_date';
import { ObjectType } from 'types';
import eventBus from 'helpers/event-bus-helper';

export const seller_offer_response = {
  validate: function (opportunity: ObjectType, status: string, originalOpportunity: ObjectType) {
    let errors: string[] = [];

    if (
      [
        oppurtunityStatusList.offer_seller_received,
        oppurtunityStatusList.pre_offer_loi_seller_received
      ].includes(opportunity?.opportunity_status_c) &&
      isEmpty(opportunity?.seller_offer_response)
    ) {
      errors.push(
        missingField(
          `Seller Response must be completed before moving status to ${oppurtunityStatusOptions[opportunity?.opportunity_status_c]
          }`
        )
      );
    }


    return errors;
  }
};
