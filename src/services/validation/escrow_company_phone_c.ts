import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const escrow_company_phone_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    const stateList = [
      oppurtunityStatusList.offer_accepted,
      oppurtunityStatusList.closing_diligence_amended,
      oppurtunityStatusList.closing_sale_pending,
      oppurtunityStatusList.closing_sale_pending_amended,
      oppurtunityStatusList.closing_clear_to_close
    ];

    if (
      stateList.includes(oppurtunity?.opportunity_status_c) &&
      (!oppurtunity?.escrow_company_phone_c ||
        oppurtunity?.escrow_company_phone_c.trim().length === 0)
    ) {
      errors.push(missingField('Escrow Company Phone'));
    }

    return errors;
  }
};
