import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { offer_to_list_c } from './offer-to-list-c';
import { offer_to_market_value_percentage_c } from './offer-to-market-value-percentage-c';
import { convertNumber } from 'helpers/misc-helper';

export const offer_price_c = {
  validate: function (
    oppurtunity: ObjectType,
    status: string,
    originalOpportunity: ObjectType
  ) {
    let errors: string[] = [];

    const data = JSON.parse(localStorage.getItem('user') || '0');
    let is_admin = data?.user?.is_admin ? data?.user?.is_admin : 0;

    if (status === 'action') {
      if (
        (oppurtunity?.opportunity_status_c ===
          oppurtunityStatusList.closing_diligence_period &&
          oppurtunity?.offer_price_c.trim().length === 0) ||
        oppurtunity?.offer_price_c === 0.0
      ) {
        errors.push(missingField('Offer Price'));
      }
    }

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.closing_diligence_period &&
      convertNumber(oppurtunity?.offer_price_c) <
        convertNumber(oppurtunity?.contract_price_c)
    ) {
      errors.push(
        'Offer price cannot be lower the contract price, please update offer price before continuing!'
      );
    }

    if (
      oppurtunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_make_offer &&
      oppurtunity?.opportunity_status_c !==
        originalOpportunity.opportunity_status_c &&
      is_admin === 0
    ) {
      errors.push('Only Admin user can set this status - Offer: Make Offer');
    }

    return errors;
  },

  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    let result = {
      offer_to_list_c: offer_to_list_c.calculate(
        opportunity,
        originalOpportunity
      ),
      offer_to_market_value_percentage_c:
        offer_to_market_value_percentage_c.calculate(
          opportunity,
          originalOpportunity
        )
    };

    return result;
  }
};
