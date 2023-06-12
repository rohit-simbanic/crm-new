import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const active_primary_negotiator_user = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originalOpportunity: ObjectType
  ) => {
    let errors: string[] = [];


    if (isEmpty(opportunity.active_primary_negotiator_user_id)) {
      errors.push(missingField('Primary Negotiator'));
    }

    return errors;
  }
};
