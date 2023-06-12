import { isNumber } from "@mui/x-data-grid/internals";
import { convertNumber, isEmpty } from "helpers/misc-helper";
import { ObjectType } from "types";

export const hud_reductions = {

    calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
        let hudReductions = 0;

        if (!isEmpty(opportunity?.commision_reduction) && opportunity?.reduction_type === "hud_concession"
        ) {
            hudReductions = hudReductions + convertNumber(opportunity?.commision_reduction)
        }

        if (!isEmpty(opportunity?.commision_reduction2) && opportunity?.commission_reduction_type2 === "hud_concession"
        ) {
            hudReductions = hudReductions + convertNumber(opportunity?.commision_reduction2)
        }

        if (!isEmpty(opportunity?.commision_reduction3) && opportunity?.commission_reduction_type3 === "hud_concession"
        ) {
            hudReductions = hudReductions + convertNumber(opportunity?.commision_reduction3)
        }

        return hudReductions;

    }

}