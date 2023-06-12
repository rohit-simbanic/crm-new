import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateService = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    hasValidationError: false
  };

  if (isEmpty(data.inspection_type)) {
    validation = {
      ...validation,
      hasValidationError: true,
      inspection_type: [missingField('Service Type')]
    };
  }

  return validation;
};
