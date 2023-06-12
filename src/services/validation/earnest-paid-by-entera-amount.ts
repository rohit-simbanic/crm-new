import { missingField } from 'assets/validation-template';

export const earnest_paid_by_entera_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.earnest_paid_by_entera_amount.trim().length === 0 &&
      oppurtunity?.earnest_paid_by_entera === 'yes'
    ) {
      errors.push(missingField('EM Paid by Entera Amount'));
    }

    return errors;
  }
};
