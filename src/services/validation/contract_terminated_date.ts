import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';

export const contract_terminated_date = {
  validate: function (oppurtunity: any, status: string) {
    let errors: any = [];

    if (
      [
        oppurtunityStatusList.closing_cancel_contract,
        oppurtunityStatusList.closing_termination_pending
      ].includes(oppurtunity?.opportunity_status_c) &&
      (!oppurtunity?.contract_terminated_date ||
        oppurtunity?.contract_terminated_date?.trim().length === 0)
    ) {
      errors.push(missingField('Contract Termination Date'));
    }

    return errors;
  }
};
