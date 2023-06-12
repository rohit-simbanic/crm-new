import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const parties_intended_buyer_type = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originaOpportunity: ObjectType
  ) => {
    let errors: string[] = [];
    if (
      !isEmpty(opportunity?.parties_intended_buyer_name) &&
      isEmpty(opportunity?.parties_intended_buyer_type)
    ) {
      errors.push(missingField('Parties Inteded Buyer Type'));
    }

    return errors;
  }
};
