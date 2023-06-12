import { missingField } from 'assets/validation-template';

export const em_paid_by_enatera_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.earnest_paid_by_entera === 'yes' &&
      (!oppurtunity?.earnest_paid_by_entera_amount ||
        oppurtunity?.earnest_paid_by_entera_amount.trim().length === 0)
    ) {
      errors.push(missingField('EM Paid by Entera Amount'));
    }

    return errors;
  }
};
