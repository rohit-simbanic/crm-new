import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { commission_seller_rep } from './commission-seller-rep';

export const parties_seller_representative_name = {
  validate: function (oppurtyunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtyunity?.opportunity_status_c ===
        oppurtunityStatusList.offer_sent_to_seller &&
      oppurtyunity?.data_source === 'off_market' &&
      (!oppurtyunity?.parties_seller_representative_name ||
        oppurtyunity?.parties_seller_representative_name.trim().length === 0)
    ) {
      errors.push(missingField('Seller Representative'));
    }

    return errors;
  },

  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let result = {
      commission_seller_rep: commission_seller_rep.calculate(
        opportunity,
        originalOpportunity
      )
    };

    return result;
  }
};
