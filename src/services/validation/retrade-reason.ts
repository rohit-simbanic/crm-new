import { missingField } from 'assets/validation-template';
import { ObjectType } from 'types';

export const retrade_reason = {
  validate: (opporutnity: ObjectType, status: string) => {
    let errors: string[] = [];

    if (status == 'action') {
      if (opporutnity.retrade_reason.trim().length === 0) {
        errors.push(missingField('Retrade Reason'));
      }
    }

    return errors;
  }
};
