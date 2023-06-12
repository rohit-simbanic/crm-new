import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const parties_listing_agent_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
      oppurtunityStatusList.offer_sent_to_seller &&
      (!oppurtyunity?.parties_listing_agent_name ||
        oppurtyunity?.parties_listing_agent_name.trim().length === 0)
    ) {
      errors.push(missingField('Listing Agent'));
    }

    return errors;
  }
};
