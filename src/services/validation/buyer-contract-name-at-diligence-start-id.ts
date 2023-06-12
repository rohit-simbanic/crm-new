import oppurtunityStatusList from "assets/constants/oppurtunity-status-list";
import { isEmpty, isValueChanged } from "helpers/misc-helper";
import { ObjectType } from "types";

export const buyer_contract_name_at_diligence_start_id = {

    calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
        if (
            opportunity.opportunity_status_c ===
            oppurtunityStatusList.closing_diligence_period &&
            isValueChanged(opportunity, originalOpportunity, 'opportunity_status_c') &&
            isEmpty(opportunity?.buyer_contract_name_at_diligence_start_id)
        ) {
            return {
                buyer_contract_name_at_diligence_start_id:
                    opportunity?.account_buyer_id,
                buyer_contract_name_at_diligence_start_name: opportunity?.account_buyer_name,
            };
        } else {
            return {
                buyer_contract_name_at_diligence_start_id:
                    originalOpportunity?.buyer_contract_name_at_diligence_start_id,
                buyer_contract_name_at_diligence_start_name: originalOpportunity?.buyer_contract_name_at_diligence_start_name,
            };
        }

    }
}