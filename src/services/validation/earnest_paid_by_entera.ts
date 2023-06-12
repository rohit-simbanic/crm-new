import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const earnest_paid_by_entera = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_cancel_contract &&
      (!oppurtunity?.earnest_paid_by_entera ||
        oppurtunity?.earnest_paid_by_entera.trim().length === 0)
    ) {
      errors.push(missingField('EM Paid by Entera'));
    }

    return errors;
  }
};
