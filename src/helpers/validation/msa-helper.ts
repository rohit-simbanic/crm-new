import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateMSA = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data.name)) {
    validation = {
      ...validation,
      status: false,
      name: [missingField('Name')]
    };
  }

  if (isEmpty(data.entera_market_id)) {
    validation = {
      ...validation,
      status: false,
      entera_market_id: [missingField('Entera Market ID')]
    };
  }

  if (isEmpty(data.code)) {
    validation = {
      ...validation,
      status: false,
      code: [missingField('Code')]
    };
  }

  if (isEmpty(data.state)) {
    validation = {
      ...validation,
      status: false,
      state: [missingField('State')]
    };
  }

  if (isEmpty(data.mls_code)) {
    validation = {
      ...validation,
      status: false,
      mls_code: [missingField('MLS Code')]
    };
  }

  return validation;
};
