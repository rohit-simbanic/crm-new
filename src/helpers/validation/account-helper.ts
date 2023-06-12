import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateAccount = (data: ObjectType): ObjectType => {
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

  if (isEmpty(data.entera_customer_id)) {
    validation = {
      ...validation,
      status: false,
      entera_customer_id: [missingField('Entera Customer ID')]
    };
  }

  if (isEmpty(data.company_name)) {
    validation = {
      ...validation,
      status: false,
      company_name: [missingField('Company Name')]
    };
  }

  if (isEmpty(data.contact_first_name)) {
    validation = {
      ...validation,
      status: false,
      contact_first_name: [missingField('Contact First Name')]
    };
  }

  if (isEmpty(data.contact_last_name)) {
    validation = {
      ...validation,
      status: false,
      contact_last_name: [missingField('Contact Last Name')]
    };
  }

  if (isEmpty(data.phone_office)) {
    validation = {
      ...validation,
      status: false,
      phone_office: [missingField('Company Phone')]
    };
  }

  return validation;
};
