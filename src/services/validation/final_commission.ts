import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commision_pending } from './commision_pending';
import { ObjectType } from 'types';
import { convertNumber } from 'helpers/misc-helper';
import { buyer_commission_c } from './buyer_commission_c';
import { total_commission_reductions } from './total-commission-reductions';
import { hud_commission } from './hud_commission';

export const final_commission = {
  validate: function (opppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      [
        oppurtunityStatusList.closed_purchased,
        oppurtunityStatusList.closing_clear_to_close
      ].includes(opppurtunity?.opportunity_status_c) &&
      (!opppurtunity?.final_commission ||
        opppurtunity?.final_commission.trim().length === 0)
    ) {
      errors.push(missingField('Actual Commission'));
    }

    return errors;
  },
  calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    if (![
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close,
      oppurtunityStatusList.closed_purchased,
      oppurtunityStatusList.closing_termination_pending
    ].includes(opportunity?.opportunity_status_c)) {
      return convertNumber(opportunity?.final_commission)
    }

    if (opportunity?.final_commission_changed) {
      return convertNumber(opportunity?.final_commission)
    }

    let commissionPending = commision_pending.calculate(opportunity, originalOpportunity);

    return commissionPending;

  },

  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

    let data = { ...opportunity };

    const commissionPending = convertNumber(opportunity?.final_commission);
    data = {
      ...data,
      commision_pending: commissionPending,
    }

    const pendingCommission = buyer_commission_c.calculate(data, {});
    data = {
      ...data,
      buyer_commission_c: pendingCommission,
    }

    const initialCommissionAmount = convertNumber(opportunity?.initial_commission_amount);

    const commisionReduction = initialCommissionAmount - commissionPending;
    data = {
      ...data,
      commision_reduction: commisionReduction
    }

    const totalCommissionReduction = total_commission_reductions.calculate(data, {});

    const hudCommission = hud_commission.calculate(data, {})

    let result = {
      commision_pending: commissionPending,
      buyer_commission_c: pendingCommission,
      commision_reduction: commisionReduction,
      total_commission_reductions: totalCommissionReduction,
      hud_commission: hudCommission,
    }

    return result





  }
};
