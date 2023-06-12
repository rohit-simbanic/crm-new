import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commission_buyer_rep_pct } from './commission-buyer-rep-pct';
import { commission_negotiator_commission_pct } from './commission-negotiator-commission-pct';

export const commission_buyer_rep = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      oppurtyunity?.parties_seller_type !== 'ibuyer' &&
      oppurtyunity?.parties_lead_source_type !== 'entera_client' &&
      (!oppurtyunity?.commission_buyer_rep ||
        oppurtyunity?.commission_buyer_rep.trim().length === 0)
    ) {
      errors.push(missingField('Did You Represent the Buyer?'));
    }

    return errors;
  },
  calculate: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    if (
      opportunity.parties_lead_owner_id ==
      opportunity.parties_buyer_representative_id
    ) {
      return 'yes';
    }
    return 'no';
  },
  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      commission_buyer_rep_pct: commission_buyer_rep_pct.calculate(
        opportunity,
        originalOpportunity
      )
    };

    return result;
  }
};
