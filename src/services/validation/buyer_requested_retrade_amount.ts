import { missingField } from 'assets/validation-template';

export const buyer_requested_retrade_amount = {
  validate: function (opportunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      !opportunity?.buyer_requested_retrade_amount ||
      opportunity?.buyer_requested_retrade_amount?.toString().trim().length ===
        0
    ) {
      errors.push(missingField('Buyer Requested Retrade Amount'));
    }

    return errors;
  }
};
