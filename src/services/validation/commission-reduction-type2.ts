import { missingField } from "assets/validation-template";
import { isEmpty } from "helpers/misc-helper";
import { ObjectType } from "types";
import { hud_commission } from "./hud_commission";
import oppurtunityStatusList from "assets/constants/oppurtunity-status-list";

export const commission_reduction_type2 = {

    validate: (opportunity: ObjectType, status: string, originalOpportunity: ObjectType) => {

        let errors = []
        if (!isEmpty(opportunity?.commision_reduction2) && isEmpty(opportunity?.commission_reduction_type2)) {
            errors.push(missingField("Reduction Type2"))
        }

        return errors

    },

    handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

        let result = {}

        if ([
            oppurtunityStatusList.closing_sale_pending,
            oppurtunityStatusList.closing_sale_pending_amended,
            oppurtunityStatusList.closing_clear_to_close,
            oppurtunityStatusList.closed_purchased,
            oppurtunityStatusList.closing_termination_pending
        ].includes(opportunity?.opportunity_status_c)) {
            const hudCommission = hud_commission.calculate(opportunity, {});

            result = {
                ...result,
                hud_commission: hudCommission
            }

        }

        return result
    }
}