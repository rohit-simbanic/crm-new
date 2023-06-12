import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validatePdfTemplate = (
  data: ObjectType,
  market_preference_id: string | undefined
): ObjectType => {
  let validation: ObjectType = {
    hasValidationError: false
  };

  if (isEmpty(data.name) && isEmpty(market_preference_id)) {
    validation = {
      ...validation,
      hasValidationError: true,
      name: [missingField('Name')]
    };
  }

  if (isEmpty(data.type) && isEmpty(market_preference_id)) {
    validation = {
      ...validation,
      hasValidationError: true,
      type: [missingField('Name')]
    };
  }

  return validation;
};
