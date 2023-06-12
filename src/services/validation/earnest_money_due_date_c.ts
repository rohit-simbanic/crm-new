import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { isEmpty } from 'helpers/misc-helper';

export const earnest_money_due_date_c = {
  validate: function (oppurtunity: any, status: string) {
    let errors: any = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      isEmpty(oppurtunity?.earnest_money_due_date_c)
    ) {
      errors.push(missingField('Earnest Money Due Date'));
    }

    return errors;
  }
};
