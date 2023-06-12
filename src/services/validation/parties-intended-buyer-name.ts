import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const parties_intended_buyer_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      (!oppurtyunity?.parties_intended_buyer_name ||
        oppurtyunity?.parties_intended_buyer_name.trim().length === 0)
    ) {
      errors.push(missingField('Intended Buyer Name'));
    }

    return errors;
  }
};
