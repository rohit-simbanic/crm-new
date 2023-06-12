import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const escrow_company_contact_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    const isDirty = stateList.includes(oppurtunity?.opportunity_status_c) &&
      !isEmpty(oppurtunity?.offer_finalized_at)
      && isEmpty(oppurtunity.escrow_company_contact_c)

    if (isDirty) {
      errors.push(missingField('Escrow Company Conatct'));
    }

    return errors;
  }
};
