import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const forecasted_dd_end_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closing_cancel_contract,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_termination_pending
    ];

    if (
      stateList.includes(oppurtunity?.opportunity_status_c) &&
      oppurtunity?.forecasted_dd_end_date.trim().length === 0
    ) {
      errors.push(missingField('Forecasted End Date'));
    }
    // else if (stateList.includes(oppurtunity?.opportunity_status_c) &&
    //     oppurtunity?.forecasted_dd_end_date != oppurtunity?.due_diligence_end_c
    // ) {
    //     errors.push('    l')
    // }

    return errors;
  }
};
