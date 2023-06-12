import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commission_seller_source_pct } from './commission-seller-source-pct';

export const commission_seller_source = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      oppurtyunity?.parties_seller_type !== 'ibuyer' &&
      oppurtyunity?.parties_lead_source_type !== 'entera_client' &&
      (!oppurtyunity?.commission_seller_source ||
        oppurtyunity?.commission_seller_source.trim().length === 0)
    ) {
      errors.push(missingField('Seller Source'));
    }

    return errors;
  },

  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      commission_seller_source_pct: commission_seller_source_pct.calculate(
        opportunity,
        originalOpportunity
      )
    };

    return result;
  }
};
