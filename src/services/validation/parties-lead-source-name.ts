import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const parties_lead_source_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      (!oppurtyunity?.parties_lead_source_name ||
        oppurtyunity?.parties_lead_source_name.trim().length === 0)
    ) {
      errors.push(missingField('Lead Source Name'));
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
