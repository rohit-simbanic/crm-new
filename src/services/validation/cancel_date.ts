import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import DateUtility from 'helpers/date-helper';
import { isValueChanged } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const offer_cancelled_date = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      opportunity?.cancel_reason !== '' &&
      opportunity?.offer_cancelled_date !== null &&
      opportunity?.offer_cancelled_date?.toString().trim().length === 0
    ) {
      errors.push('Missing required field: Cancel Date');
    }

    return errors;
  },
  calculate: (opportunity: ObjectType, originalOIpportunity: ObjectType) => {
    if (
      oppurtunityStatusList.offer_canceled ===
        opportunity.opportunity_status_c &&
      isValueChanged(opportunity, originalOIpportunity, 'opportunity_status_c')
    ) {
      return DateUtility.getTodayDateString();
    }

    return opportunity.offer_cancelled_date;
  }
};
