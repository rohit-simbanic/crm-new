import { missingField } from 'assets/validation-template';

export const restrictions_notes = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      opportunity?.has_leasing_restrictions === 'yes' &&
      (!opportunity?.restrictions_notes ||
        opportunity?.restrictions_notes.trim().length === 0)
    ) {
      errors.push(missingField('Restrictions Notes'));
    }

    return errors;
  }
};
