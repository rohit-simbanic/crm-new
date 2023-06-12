import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateParty = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  const typeList = [
    'seller',
    'seller_representative',
    'lead_source',
    'lead_owner',
    'buyer_representative',
    'intended_buyer',
    'uploaded_by'
  ];

  if (isEmpty(data.name)) {
    validation = {
      ...validation,
      status: false,
      name: [missingField('Name')]
    };
  }

  if (isEmpty(data.email) && data?.type !== 'seller') {
    validation = {
      ...validation,
      status: false,
      email: [missingField('Email')]
    };
  }

  if (isEmpty(data.type)) {
    validation = {
      ...validation,
      status: false,
      type: [missingField('Type')]
    };
  }

  if (isEmpty(data.mobile) && data?.type === 'escrow') {
    validation = {
      ...validation,
      status: false,
      mobile: [missingField('Mobile')]
    };
  }

  if (
    !isEmpty(data.type) &&
    typeList.includes(data.type) &&
    isEmpty(data.sub_type) &&
    data.type !== 'seller'
  ) {
    validation = {
      ...validation,
      status: false,
      sub_type: [missingField('Sub Type')]
    };
  }

  return validation;
};
