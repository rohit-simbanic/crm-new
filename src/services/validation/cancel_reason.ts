import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const cancel_reason = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      opportunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_canceled &&
      (!opportunity?.cancel_reason ||
        opportunity?.cancel_reason?.trim().length === 0)
    ) {
      errors.push(
        missingField(
          'Cancel Reason must be completed before moving status to Offer: Canceled.'
        )
      );
    }

    return errors;
  }
};
