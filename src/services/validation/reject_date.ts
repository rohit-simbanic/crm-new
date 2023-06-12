import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import DateUtility from 'helpers/date-helper';

export const reject_date = {
  validate: function (opportunity: any, status: string) {
    let errors: any = [];

    const stateList = [
      oppurtunityStatusList.offer_rejected,
      oppurtunityStatusList.offer_accepted
    ];

    if (
      stateList.includes(opportunity?.opportunity_status_c) &&
      opportunity?.reject_date?.trim().length === 0
    ) {
      errors.push(missingField(`Reject Date`));
    }

    return errors;
  },
  calculate: (opportunity: any) => {
    if (
      oppurtunityStatusList.offer_rejected === opportunity.opportunity_status_c
    ) {
      return DateUtility.getTodayDateString();
    }

    return opportunity.reject_date;
  }
};
