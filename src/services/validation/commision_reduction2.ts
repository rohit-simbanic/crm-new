import { ObjectType } from "types";
import { total_commission_reductions } from "./total-commission-reductions";
import { isEmpty } from "helpers/misc-helper";
import opportunityHelper from "helpers/opportunity-helper";

export const commision_reduction2 = {


    handleChange: (opportunity: ObjectType) => {

        const totalCommissionReduction = total_commission_reductions.calculate(opportunity, {});
        opportunity = {
            ...opportunity,
            total_commission_reductions: totalCommissionReduction,
        };


        const commissions = opportunityHelper.calculateCommission(opportunity);

        let result = {
            total_commission_reductions: totalCommissionReduction,
            commission_reduction_type2_display: !isEmpty(opportunity?.commision_reduction2),
            ...commissions

        }


        return result

    }
}