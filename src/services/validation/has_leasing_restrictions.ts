import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const has_leasing_restrictions = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];
    if (status === 'edit') {
      const stateList = [
        oppurtunityStatusList.closing_diligence_period,
        oppurtunityStatusList.closing_diligence_amended
      ];

      if (
        stateList.includes(oldOppurtunity?.opportunity_status_c) &&
        opportunity?.opportunity_status_c ===
          oppurtunityStatusList.closing_sale_pending &&
        isEmpty(opportunity?.has_leasing_restrictions)
      ) {
        errors.push(missingField('Leasing Restrictions'));
      }
    }

    return errors;
  }
};
