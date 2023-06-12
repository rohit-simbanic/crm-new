import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const termination_reason_subcategory = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    let reasons = [
      'financial_characteristic',
      'physical_characteristic',
      'location_characteristic',
      'price_reduction',
      'hoa_rental_restrictions',
      'seller_canceled_contract'
    ];

    if (
      reasons.includes(opportunity?.contract_termination_reasons) &&
      isEmpty(opportunity?.termination_reason_subcategory)
    ) {
      errors.push(missingField('Termination Reason Subcategory'));
    }

    return errors;
  }
};
