import accountBuyerTypes from 'assets/constants/account-buyer-types';
import { ObjectType } from 'types';
import { isEmpty } from 'helpers/misc-helper';
import envConfig from 'config/env';
import { get } from './client-service';

const accountBuyerService = {

    getOpportunityAccountBuyers: async (id: string) => {
        const result: ObjectType = await get(
            `/${envConfig.REACT_APP_API_VERSION_1}/opportunities/${id}/account_buyers`
        );
        return result.data;
    },

    getBuyers: (data: ObjectType[]) => {

        let result = {};

        let buyers: ObjectType = {};

        for (const type of accountBuyerTypes) {
            let user = data.filter(
                (x: ObjectType) => x.account_buyer_role_for_opportunity === type
            );
            buyers = { ...buyers, [type]: user[0] };
        }

        if (!isEmpty(buyers?.buyer_contract_name_at_offer_sent_id)) {
            let buyer_contract_name_at_offer_sent = {
                buyer_contract_name_at_offer_sent_name: `${buyers?.buyer_contract_name_at_offer_sent_id.name}`
            }

            result = { ...result, ...buyer_contract_name_at_offer_sent }
        }

        if (!isEmpty(buyers?.buyer_contract_name_at_diligence_start_id)) {
            let buyer_contract_name_at_diligence_start = {
                buyer_contract_name_at_diligence_start_name: `${buyers?.buyer_contract_name_at_diligence_start_id.name}`
            }

            result = { ...result, ...buyer_contract_name_at_diligence_start }
        }

        if (!isEmpty(buyers?.buyer_contract_name_at_closing_id)) {
            let buyer_contract_name_at_closing = {
                buyer_contract_name_at_closing_name: `${buyers?.buyer_contract_name_at_closing_id.name}`
            }

            result = { ...result, ...buyer_contract_name_at_closing }
        }

        return result;
    }

}

export default accountBuyerService