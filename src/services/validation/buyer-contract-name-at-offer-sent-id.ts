import oppurtunityStatusList from "assets/constants/oppurtunity-status-list";
import { isEmpty, isValueChanged } from "helpers/misc-helper";
import { ObjectType } from "types";

export const buyer_contract_name_at_offer_sent_id = {

    calculate: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
        if (
            opportunity.opportunity_status_c ===
            oppurtunityStatusList.offer_sent_to_seller &&
            isValueChanged(opportunity, originalOpportunity, 'opportunity_status_c') &&
            isEmpty(opportunity?.buyer_contract_name_at_offer_sent_id)
        ) {
            return {
                buyer_contract_name_at_offer_sent_id:
                    opportunity?.account_buyer_id,
                buyer_contract_name_at_offer_sent_name: opportunity?.account_buyer_name,
            };
        } else {
            return {
                buyer_contract_name_at_offer_sent_id:
                    originalOpportunity?.buyer_contract_name_at_offer_sent_id,
                buyer_contract_name_at_offer_sent_name: originalOpportunity?.buyer_contract_name_at_offer_sent_name,
            };
        }

    }
}