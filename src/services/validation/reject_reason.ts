import oppurtunityStatusOptions from 'assets/constants/oppurtunity-status-options';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const reject_reason = {
  validate: function (opportunity: any, status: string) {
    let errors: any = [];

    if (status === 'edit') {
      if (
        [
          oppurtunityStatusList.offer_rejected,
          oppurtunityStatusList.offer_lost_deal
        ].includes(opportunity?.opportunity_status_c) &&
        isEmpty(opportunity?.reject_reason)
      ) {
        errors.push(
          missingField(
            `Reject Reason must be completed before moving status to ${
              oppurtunityStatusOptions[opportunity?.opportunity_status_c]
            }`
          )
        );
      }
    }

    if (status === 'action') {
      if (
        oppurtunityStatusList.offer_rejected ===
          opportunity?.opportunity_status_c &&
        isEmpty(opportunity?.reject_reason)
      ) {
        errors.push(missingField(`Reject Reason`));
      }
    }

    return errors;
  }
};
