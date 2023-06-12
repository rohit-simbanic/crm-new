import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { ObjectType } from 'types';
import { due_diligence_end_c } from './due_diligence_end_c';

export const option_days_type_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      oppurtunity?.option_days_type_c?.trim().length === 0
    ) {
      errors.push(missingField('Option Days Type'));
    }

    return errors;
  },

  handleChange: (opportunity: ObjectType, oldOpportunity: ObjectType) => {
    let result = {
      due_diligence_end_c: due_diligence_end_c.calculate(
        opportunity,
        oldOpportunity
      )
    };

    return result;
  }
};
