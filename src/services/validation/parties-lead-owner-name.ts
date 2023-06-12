import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commission_buyer_rep } from './commission-buyer-rep';

export const parties_lead_owner_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      (!oppurtyunity?.parties_lead_owner_name ||
        oppurtyunity?.parties_lead_owner_name.trim().length === 0)
    ) {
      errors.push(missingField('Lead Owner Name'));
    }

    return errors;
  },
  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      commission_buyer_rep: commission_buyer_rep.calculate(
        opportunity,
        originalOpportunity
      )
    };
    return result;
  }
};
