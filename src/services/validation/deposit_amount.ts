import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const deposit_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status === 'edit') {
      if (oppurtunity?.deposit_amount < 0) {
        errors.push('No negative numbers allowed');
      }
    }

    if (status === 'action') {
      if (
        // oppurtunity?.opportunity_status_c === oppurtunityStatusList.closing_diligence_period
        // &&
        oppurtunity?.has_post_occupancy !== 'no' &&
        oppurtunity?.deposit_amount.trim().length === 0
      ) {
        errors.push(missingField('Deposit Amount'));
      }
    }

    return errors;
  }
};
