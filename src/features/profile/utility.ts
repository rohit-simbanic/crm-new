import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateProfile = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data.user_name)) {
    validation = {
      ...validation,
      status: false,
      user_name: [missingField('User Name')]
    };
  }

  if (isEmpty(data.first_name)) {
    validation = {
      ...validation,
      status: false,
      first_name: [missingField('First Name')]
    };
  }

  if (isEmpty(data.email)) {
    validation = {
      ...validation,
      status: false,
      email: [missingField('email')]
    };
  }

  if (isEmpty(data.last_name)) {
    validation = {
      ...validation,
      status: false,
      last_name: [missingField('Last Name')]
    };
  }

  if (isEmpty(data.status)) {
    validation = {
      ...validation,
      status: false,
      user_status: [missingField('Status')]
    };
  }

  if (isEmpty(data.employee_status)) {
    validation = {
      ...validation,
      status: false,
      employee_status: [missingField('Employee Status')]
    };
  }

  if (isEmpty(data.address_street)) {
    validation = {
      ...validation,
      status: false,
      address_street: [missingField('Address Street')]
    };
  }

  if (isEmpty(data.address_city)) {
    validation = {
      ...validation,
      status: false,
      address_city: [missingField('Address City')]
    };
  }

  if (isEmpty(data.address_state)) {
    validation = {
      ...validation,
      status: false,
      address_state: [missingField('Address State')]
    };
  }

  if (isEmpty(data.address_postalcode)) {
    validation = {
      ...validation,
      status: false,
      address_postalcode: [missingField('Address postalcode')]
    };
  }

  if (isEmpty(data.address_country)) {
    validation = {
      ...validation,
      status: false,
      address_country: [missingField('Address Country')]
    };
  }

  if (isEmpty(data.timezone)) {
    validation = {
      ...validation,
      status: false,
      timezone: [missingField('Time Zone')]
    };
  }
  return validation;
};
