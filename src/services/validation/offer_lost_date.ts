import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { ObjectType } from 'types';
import DateUtility from 'helpers/date-helper';
import { isValueChanged } from 'helpers/misc-helper';

export const offer_lost_date = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      oppurtunityStatusList.offer_lost_deal ===
        opportunity.opportunity_status_c &&
      isValueChanged(opportunity, originalOpportunity, 'opportunity_status_c')
    ) {
      return DateUtility.getTodayDateString();
    }

    return opportunity.offer_lost_date;
  }
};
