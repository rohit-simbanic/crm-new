import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateMarketPreferenceBrockrageUser = (
  data: ObjectType
): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data.brokerage_transaction_role_id)) {
    validation = {
      ...validation,
      status: false,
      brokerage_transaction_role_id: [missingField('Brokerage Transaction')]
    };
  }

  if (isEmpty(data.brokerage_user_id)) {
    validation = {
      ...validation,
      status: false,
      brokerage_user_id: [missingField('Brockerage User')]
    };
  }

  if (isEmpty(data.status)) {
    validation = {
      ...validation,
      status: false,
      Status: [missingField('Status')]
    };
  }

  return validation;
};
