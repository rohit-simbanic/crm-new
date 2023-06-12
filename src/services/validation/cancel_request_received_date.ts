import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const cancel_request_received_date = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (status === 'action') {
      if (
        opportunity?.opportunity_status_c ===
          oppurtunityStatusList.offer_canceled &&
        opportunity?.cancel_request_received_date?.trim().length === 0
      ) {
        errors.push(missingField('Cancel Request Received Date'));
      }
    }

    return errors;
  }
};
