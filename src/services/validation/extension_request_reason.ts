import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const extension_request_reason = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended
      // oppurtunityStatusList.closing_clear_to_close
    ];

    if (
      stateList.includes(oppurtunity?.opportunity_status_c) &&
      (!oppurtunity?.extension_request_reason ||
        oppurtunity?.extension_request_reason.trim().length === 0)
    ) {
      errors.push(missingField('Extension Request Reason'));
    }

    return errors;
  }
};
