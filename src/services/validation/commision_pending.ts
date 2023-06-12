import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { convertNumber, isEmpty } from 'helpers/misc-helper';
import opportunityHelper from 'helpers/opportunity-helper';
import { total_commission_reductions } from './total-commission-reductions';

export const commision_pending = {
  validate: function (opppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.offer_short_sale_offer_accepted,
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.offer_seller_countered
    ];

    if (
      stateList.includes(opppurtunity?.opportunity_status_c) &&
      isEmpty(opppurtunity?.commision_pending)
    ) {
      errors.push(missingField('Commission Pending'));
    }

    return errors;
  },

  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {


    let initialCommissionAmount = convertNumber(opportunity?.initial_commission_amount);

    let commissionPending = initialCommissionAmount;

    let totalCommissionReduction = convertNumber(opportunity?.total_commission_reductions);

    commissionPending = commissionPending - totalCommissionReduction;

    return commissionPending;

  }
};
