import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const due_diligence_start_c = {
  validate: function (oppurtunity: any, status: string) {
    let errors: any = [];
    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      isEmpty(oppurtunity?.due_diligence_start_c)
    ) {
      errors.push(missingField('Due Diligence Start Date'));
    }

    return errors;
  }
};
