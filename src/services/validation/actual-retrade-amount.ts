import { missingField } from 'assets/validation-template';

export const actual_retrade_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (oppurtunity?.actual_retrade_amount.trim().length === 0) {
      errors.push(missingField('Actual Retrade Amount'));
    }

    return errors;
  }
};
