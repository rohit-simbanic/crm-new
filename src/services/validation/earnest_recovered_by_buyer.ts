import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const earnest_recovered_by_buyer = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_cancel_contract &&
      (!oppurtunity?.earnest_recovered_by_buyer ||
        oppurtunity?.earnest_recovered_by_buyer.trim().length === 0)
    ) {
      errors.push(missingField('EM Recovered by Buyer'));
    }

    return errors;
  }
};
