import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import DateUtility from 'helpers/date-helper';

export const offer_initialized_at = {
  calculate: (opportunity: any) => {
    if (
      [
        oppurtunityStatusList.pre_offer_incomplete,
        oppurtunityStatusList.pre_offer_need_signature
      ].includes(opportunity.opportunity_status_c)
    ) {
      return DateUtility.getTodayDateTimeString();
    }

    return opportunity.offer_initialized_at;
  }
};
