import { isEditable } from '@testing-library/user-event/dist/utils';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const type_c = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originalOpportunity: ObjectType
  ) => {
    let errors: string[] = [];

    if (isEmpty(opportunity?.type_c)) {
      errors.push(missingField('Type'));
    }
    return errors;
  }
};
