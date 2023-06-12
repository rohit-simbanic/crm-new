import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const entera_contribution = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    let stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended
    ];

    if (
      stateList.includes(oppurtunity?.opportunity_status_c) &&
      (!oppurtunity?.entera_contribution ||
        oppurtunity?.entera_contribution.trim().length === 0)
    ) {
      errors.push(missingField('Entera Contribution'));
    }

    return errors;
  }
};
