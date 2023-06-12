import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';

export const hoa_addendum_received = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      oppurtunity?.hoa_addendum_received?.trim().length === 0
    ) {
      errors.push(missingField('HOA Addendum Received'));
    }
    return errors;
  }
};
