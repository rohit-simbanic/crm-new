import { missingField } from 'assets/validation-template';

export const em_recovery_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.earnest_recovered_by_buyer === 'yes' &&
      (!oppurtunity?.earnest_recovery_amount ||
        oppurtunity?.earnest_recovery_amount.trim().length === 0)
    ) {
      errors.push(missingField('EM Recovery Amount'));
    }

    return errors;
  }
};
