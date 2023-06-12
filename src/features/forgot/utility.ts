import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateLogin = (data: ObjectType): ObjectType => {
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

  return validation;
};

export const validateForgotReset = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data.password)) {
    validation = {
      ...validation,
      status: false,
      password: [missingField('Password')]
    };
  }

  if (isEmpty(data.confirm_password)) {
    validation = {
      ...validation,
      status: false,
      confirm_password: [missingField('Confirm Password')]
    };
  }

  if (data.confirm_password !== data.password) {
    validation = {
      ...validation,
      status: false,
      confirm_password: [
        missingField('Your password and confirmation password do not match.')
      ]
    };
  }

  return validation;
};
