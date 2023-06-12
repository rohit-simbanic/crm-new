import { missingField } from 'assets/validation-template';
import { ObjectType } from 'types';

export const negotiator_sent_retrade_amount = {
  validate: (opporutnity: ObjectType, status: string) => {
    let errors: string[] = [];

    if (status == 'action') {
      if (opporutnity.negotiator_sent_retrade_amount.trim().length === 0) {
        errors.push(missingField('Negotiator Sent Retrade Amount'));
      }
    }

    return errors;
  }
};
