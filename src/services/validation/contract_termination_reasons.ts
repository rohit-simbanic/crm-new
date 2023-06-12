import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { isEmpty } from 'helpers/misc-helper';

export const contract_termination_reasons = {
  validate: function (oppurtunity: any, status: string) {
    let errors: any = [];

    if (status === 'edit') {
      if (
        [
          oppurtunityStatusList.closing_cancel_contract,
          oppurtunityStatusList.closing_termination_pending
        ].includes(oppurtunity?.opportunity_status_c) &&
        isEmpty(oppurtunity?.contract_termination_reasons)
      ) {
        errors.push(missingField('Contract Termination Reasons'));
      }
    }

    if (status === 'action') {
      // let stateList = [
      //     oppurtunityStatusList.closing_diligence_period,
      //     oppurtunityStatusList.closing_diligence_amended,
      //     oppurtunityStatusList.closing_termination_pending,
      // ];

      if (
        !oppurtunity?.contract_termination_reasons ||
        oppurtunity?.contract_termination_reasons?.trim().length === 0
      ) {
        errors.push(missingField('Contract Termination Reasons'));
      }
    }

    return errors;
  }
};
