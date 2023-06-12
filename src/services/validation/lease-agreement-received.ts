import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const lease_agreement_received = {
  validate: (opporutnity: ObjectType, status: string) => {
    let errors: string[] = [];

    if (
      !isEmpty(opporutnity.lease_type) &&
      opporutnity.lease_agreement_received === 0
    ) {
      errors.push(missingField('Lease Agreement Received'));
    }

    return errors;
  }
};
