import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { balance_to_close_c } from './balance_to_close_c';

export const earnest_amount_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      isEmpty(oppurtunity?.earnest_amount_c)
    ) {
      errors.push(missingField('Earnest Amount'));
    }

    return errors;
  },
  handleChange: (opportunity: any) => {
    let result = {
      balance_to_close_c: balance_to_close_c.calculate(opportunity),
      earnest_amount_c: Math.round(opportunity.earnest_amount_c)
    };

    return result;
  }
};
