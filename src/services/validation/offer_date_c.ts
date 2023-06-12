import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const offer_date_c = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (status === 'edit') {
      if (
        new Date(opportunity?.offer_date_c).getTime() > new Date().getTime()
      ) {
        errors.push('Offer Date should not be in future');
      }

      const stateList = [
        oppurtunityStatusList.offer_rejected,
        oppurtunityStatusList.offer_accepted
      ];

      if (
        stateList.includes(opportunity?.opportunity_status_c) &&
        (!opportunity?.offer_date_c ||
          opportunity?.offer_date_c?.trim().length === 0)
      ) {
        errors.push(missingField(`Offer Date`));
      }
    }

    if (status === 'action') {
      const stateList = [
        oppurtunityStatusList.offer_rejected,
        oppurtunityStatusList.offer_accepted
      ];

      if (
        stateList.includes(opportunity?.opportunity_status_c) &&
        (!opportunity?.offer_date_c ||
          opportunity?.offer_date_c?.trim().length === 0)
      ) {
        errors.push(missingField(`Offer Date`));
      }
    }
    return errors;
  }
};
