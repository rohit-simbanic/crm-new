import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commission_buyer_source_pct } from './commission-buyer-source-pct';

export const commission_buyer_source = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      oppurtyunity?.parties_seller_type !== 'ibuyer' &&
      oppurtyunity?.parties_lead_source_type !== 'entera_client' &&
      (!oppurtyunity?.commission_buyer_source ||
        oppurtyunity?.commission_buyer_source.trim().length === 0)
    ) {
      errors.push(missingField('Buyer Source'));
    }

    return errors;
  },
  handleChange: function (oppurtyunity: any, oldOppurtunity: any) {
    let result = {
      commission_buyer_source_pct: commission_buyer_source_pct.calculate(
        oppurtyunity,
        oldOppurtunity
      )
    };

    return result;
  }
};
