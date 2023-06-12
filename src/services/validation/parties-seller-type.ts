import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const parties_seller_type = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originaOpportunity: ObjectType
  ) => {
    let errors: string[] = [];
    if (
      !isEmpty(opportunity?.offmarket_seller_name_c) &&
      isEmpty(opportunity?.offmarket_parties_seller_sub_type)
    ) {
      errors.push(missingField('Parties Seller Type'));
    }

    return errors;
  }
};
