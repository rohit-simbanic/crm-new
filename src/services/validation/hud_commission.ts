import { convertNumber, isEmpty } from "helpers/misc-helper";
import { ObjectType } from "types";
import { hud_reductions } from "./hud_reductions";
import oppurtunityStatusList from "assets/constants/oppurtunity-status-list";

export const hud_commission = {

    calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

        if (![
            oppurtunityStatusList.closing_sale_pending,
            oppurtunityStatusList.closing_sale_pending_amended,
            oppurtunityStatusList.closing_clear_to_close,
            oppurtunityStatusList.closed_purchased,
            oppurtunityStatusList.closing_termination_pending
        ].includes(opportunity?.opportunity_status_c)) {
            return convertNumber(opportunity?.hud_commission)
        }

        if (opportunity?.hud_commission_changed) {
            return opportunity?.hud_commission;
        }

        let hudReductions: number = hud_reductions.calculate(opportunity, originalOpportunity);

        let finalCommission: number = convertNumber(opportunity?.final_commission);

        let hudCommission = finalCommission - hudReductions;

        return hudCommission;

    }

}