import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

interface validationError {
  hasValidationError: boolean;
  email?: string[];
  password?: string[];
}

const validateLogin = (data: ObjectType): ObjectType => {
  let validation: validationError = {
    hasValidationError: false
  };

  if (isEmpty(data.email)) {
    validation = {
      ...validation,
      hasValidationError: true,
      email: [missingField('Email')]
    };
  }

  if (isEmpty(data.password)) {
    validation = {
      ...validation,
      hasValidationError: true,
      password: [missingField('Password')]
    };
  }

  return validation;
};

export default validateLogin;
