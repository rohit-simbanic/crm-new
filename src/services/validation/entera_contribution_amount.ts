import { missingField } from 'assets/validation-template';

export const entera_contribution_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.entera_contribution_amount.trim().length === 0 &&
      oppurtunity?.entera_contribution === 'yes'
    ) {
      errors.push(missingField('Entera Contribution Amount'));
    }

    return errors;
  }
};
