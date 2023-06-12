import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { ObjectType } from 'types';
import { isValueChanged } from 'helpers/misc-helper';

export const original_close_of_escrow_date = {
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    if (
      opportunity.opportunity_status_c &&
      opportunity.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      isValueChanged(opportunity, originalOpportunity, 'opportunity_status_c')
    ) {
      return opportunity.close_date_c;
    }
  }
};
