import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const parties_seller_representative_type = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originaOpportunity: ObjectType
  ) => {
    let errors: string[] = [];
    if (
      !isEmpty(opportunity?.parties_seller_representative_name) &&
      isEmpty(opportunity?.parties_seller_representative_type)
    ) {
      errors.push(missingField('Parties Seller Representative Type'));
    }

    return errors;
  }
};
