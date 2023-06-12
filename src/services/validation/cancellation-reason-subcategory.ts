import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const cancellation_reason_subcategory = {
  validate: function (
    opportunity: any,
    status: string,
    originalOpourtunity: any
  ) {
    let errors: any = [];

    let reasons = [
      'financial_characteristic',
      'physical_characteristic',
      'location_characteristic',
      'deal_term',
      'hoa_rental_restriction'
    ];

    if (
      reasons.includes(opportunity?.cancel_reason) &&
      isEmpty(opportunity?.cancellation_reason_subcategory)
    ) {
      errors.push(missingField('Cancel Reason Subcategory'));
    }

    return errors;
  }
};
