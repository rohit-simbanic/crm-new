import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const parties_uploaded_by_type = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originaOpportunity: ObjectType
  ) => {
    let errors: string[] = [];
    if (
      !isEmpty(opportunity?.parties_uploaded_by_name) &&
      isEmpty(opportunity?.parties_uploaded_by_type)
    ) {
      errors.push(missingField('Parties Uploaded By Type'));
    }

    return errors;
  }
};
