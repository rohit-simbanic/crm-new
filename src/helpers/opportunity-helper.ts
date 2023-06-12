import { ObjectType } from "types";
import { convertNumber, isEmpty } from "./misc-helper";
import { isNumber } from "@mui/x-data-grid/internals";
import { commision_pending } from "services/validation/commision_pending";
import { buyer_commission_c } from "services/validation/buyer_commission_c";
import { final_commission } from "services/validation/final_commission";
import { final_commission_percentage } from "services/validation/final_commission_percentage";
import { hud_commission } from "services/validation/hud_commission";
import oppurtunityStatusList from "assets/constants/oppurtunity-status-list";


const opportunityHelper = {

    getCurrentClosingPrice: (opportunity: ObjectType): number => {

        let priceForCalculation = 0;

        if (!isEmpty(opportunity?.purchase_price_c)) {
            priceForCalculation = convertNumber(opportunity?.purchase_price_c)
        } else if (!isEmpty(opportunity?.contract_price_c)) {
            priceForCalculation = convertNumber(opportunity?.contract_price_c);
        } else if (!isEmpty(opportunity?.initial_offer_price_c)) {
            priceForCalculation = convertNumber(opportunity?.initial_offer_price_c);
        }


        return priceForCalculation
    },

    calculateCommission: (opportunity: ObjectType) => {

        const commissionPending = commision_pending.calculate(opportunity, {});

        opportunity = {
            ...opportunity,
            commision_pending: commissionPending
        };

        const pendingCommission = buyer_commission_c.calculate(opportunity, {});

        opportunity = {
            ...opportunity,
            buyer_commission_c: pendingCommission
        };

        let result: ObjectType = {
            commision_pending: commissionPending,
            buyer_commission_c: pendingCommission,
        }

        if (
            [oppurtunityStatusList.closing_sale_pending,
            oppurtunityStatusList.closing_sale_pending_amended,
            oppurtunityStatusList.closing_clear_to_close,
            oppurtunityStatusList.closed_purchased,
            oppurtunityStatusList.closing_termination_pending
            ].includes(opportunity?.opportunity_status_c)) {

            const finalCommission = final_commission.calculate(opportunity, {});
            opportunity = {
                ...opportunity,
                final_commission: finalCommission,
            };

            const finalCommissionPercentage = final_commission_percentage.calculate(opportunity, {});
            opportunity = {
                ...opportunity,
                final_commission_percentage: finalCommissionPercentage,
            };

            const hudCommission = hud_commission.calculate(opportunity, {});
            opportunity = {
                ...opportunity,
                hud_commission: hudCommission,
            };

            result = {
                ...result,
                final_commission: finalCommission,
                final_commission_percentage: finalCommissionPercentage,
                hud_commission: hudCommission,
            }
        }

        return result

    }


}

export default opportunityHelper;
