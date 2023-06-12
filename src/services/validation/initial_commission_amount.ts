import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { convertNumber, isEmpty } from 'helpers/misc-helper';
import opportunityHelper from 'helpers/opportunity-helper';
import { initial_commission_percentage } from './initial-commission-percentage';

export const initial_commission_amount = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    const statuses = [
      oppurtunityStatusList.offer_short_sale_offer_accepted,
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    let errors: string[] = [];

    if (
      statuses.includes(oppurtunity?.opportunity_status_c) &&
      isEmpty(oppurtunity?.initial_commission_amount)
    ) {
      errors.push(missingField('Initial Commission $'));
    }

    return errors;
  },

  handleChange: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {

    const initialCommissionPercentage = initial_commission_percentage.calculate(opportunity, originalOpportunity);

    opportunity = {
      ...opportunity,
      initial_commission_percentage: initialCommissionPercentage
    };

    const commissions = opportunityHelper.calculateCommission(opportunity);

    const result = {
      initial_commission_percentage: initialCommissionPercentage,
      ...commissions
    }

    return result;
  },

  calculate: function (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) {
    if (opportunity?.initial_commission_amount_changed) {
      return opportunity?.initial_commission_amount;
    }

    const buyer_bonus_c = convertNumber(opportunity?.buyer_bonus_c);
    let priceForCalculation = opportunityHelper.getCurrentClosingPrice(opportunity);
    const initial_commission_percentage = convertNumber(
      opportunity?.initial_commission_percentage
    );

    let result = (initial_commission_percentage * priceForCalculation) / 100;
    result += buyer_bonus_c;

    return result;

  }
};
