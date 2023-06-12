import { missingField } from 'assets/validation-template';

export const rental_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status === 'edit') {
      if (oppurtunity?.rental_amount < 0) {
        errors.push('No negative values allowed');
      }
    }

    if (status === 'action') {
      if (
        oppurtunity?.has_post_occupancy !== 'no' &&
        oppurtunity?.deposit_amount.trim().length === 0
      ) {
        errors.push(missingField('Deposit Amount'));
      }
    }

    return errors;
  }
};
