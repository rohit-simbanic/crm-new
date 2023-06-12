import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import moment from 'moment';
import { opportunityStatusEnv } from 'assets/constants/opportunity-status-env';

export const seller_name_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors = [];

    const stateList = [
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    const isDirty = stateList.includes(oppurtunity?.opportunity_status_c) &&
      !isEmpty(oppurtunity?.offer_finalized_at) &&
      isEmpty(oppurtunity.seller_name_c)


    if (isDirty) {
      errors.push(missingField('Seller Name'));
    }



    return errors;
  },

  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let fields = [
      'commission_buyer_rep',
      'commission_buyer_source',
      'commission_seller_source',
      'commission_seller_rep',
      'commission_buyer_source_pct',
      'commission_buyer_rep_pct',
      'commission_seller_source_pct',
      'commission_seller_rep_pct',
      'commission_negotiator_commission_pct',
      'commission_negotiator_commission_amount',
      'label_field_commission_input',
      'label_field_commission_output'
    ];

    if (
      opportunity?.parties_seller_sub_type == 'ibuyer' ||
      opportunity?.parties_lead_source_sub_type == 'entera_client'
    ) {
      for (const field of fields) {
        document.getElementById(`box-${field}`)!.style.display = 'none';
      }
    } else {
      for (const field of fields) {
        document.getElementById(`box-${field}`)!.style.display = 'block';
      }
    }

    return {};
  }
};
