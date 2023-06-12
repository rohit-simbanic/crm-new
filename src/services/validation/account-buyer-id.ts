import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const account_buyer_id = {
    validate: function (opportunity: any, status: string, oldOppurtunity: any) {
        let errors: any = [];

        if (isEmpty(opportunity?.account_buyer_id)) {
            errors.push(missingField('Account Buyer'));
        }

        return errors;
    }
};
