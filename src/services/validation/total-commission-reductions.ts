import { convertNumber } from "helpers/misc-helper";
import { ObjectType } from "types";

export const total_commission_reductions = {

    calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {

        const commissionReduction = convertNumber(opportunity?.commision_reduction);
        const commissionReduction2 = convertNumber(opportunity?.commision_reduction2);
        const commissionReduction3 = convertNumber(opportunity?.commision_reduction3);

        const totalReduction = commissionReduction + commissionReduction2 + commissionReduction3;

        return totalReduction;

    }
}