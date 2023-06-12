import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const buyer_contract_name_c = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (isEmpty(opportunity?.buyer_contract_name_c)) {
      errors.push(missingField('Contarct Buyer Name'));
    }

    return errors;
  }
};
