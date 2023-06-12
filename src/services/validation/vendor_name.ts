import { missingField } from 'assets/validation-template';

export const vendor_name = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (opportunity?.name?.trim().length === 0) {
      errors.push(missingField('Name.'));
    }

    return errors;
  }
};
