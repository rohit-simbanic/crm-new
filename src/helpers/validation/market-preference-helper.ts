import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateMarketPreference = (data: ObjectType): ObjectType => {
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

  if (isEmpty(data.account_name)) {
    validation = {
      ...validation,
      status: false,
      account_name: [missingField('Account')]
    };
  }

  return validation;
};
