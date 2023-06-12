import { balance_to_close_c } from './balance_to_close_c';
import { ObjectType } from 'types';
import { initial_commission_amount } from './initial_commission_amount';
import opportunityHelper from 'helpers/opportunity-helper';

export const initial_offer_price_c = {

    handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

        const closeBalance = balance_to_close_c.calculate(opportunity);

        const initialCommissionAmount = initial_commission_amount.calculate(opportunity, originalOpportunity);
        opportunity = {
            ...opportunity,
            initial_commission_amount: initialCommissionAmount
        };

        const commissions = opportunityHelper.calculateCommission(opportunity);

        const result = {
            balance_to_close_c: closeBalance,
            initial_commission_amount: initialCommissionAmount,
            ...commissions
        };

        return result;
    }
};
