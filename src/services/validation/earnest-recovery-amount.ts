import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const earnest_recovery_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      isEmpty(oppurtunity?.earnest_recovery_amount) &&
      oppurtunity?.earnest_recovered_by_buyer === 'yes'
    ) {
      errors.push(missingField('EM Recovery Amount'));
    }

    return errors;
  }
};
