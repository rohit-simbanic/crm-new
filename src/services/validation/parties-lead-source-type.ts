import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const parties_lead_source_type = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originaOpportunity: ObjectType
  ) => {
    let errors: string[] = [];
    if (
      !isEmpty(opportunity?.parties_lead_source_name) &&
      isEmpty(opportunity?.parties_lead_source_type)
    ) {
      errors.push(missingField('Parties Lead Source Type'));
    }

    return errors;
  }
};
