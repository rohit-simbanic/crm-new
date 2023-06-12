import { opportunityStatusEnv } from 'assets/constants/opportunity-status-env';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import moment from 'moment';

export const escrow_company_name_c = {
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
      (!oppurtunity?.escrow_company_name_c ||
        oppurtunity?.escrow_company_name_c.trim().length === 0)
    ) {
      errors.push(missingField('Escrow Company Name'));
    }

    let user = JSON.parse(localStorage.getItem('user') || '');
    if (
      !isEmpty(user?.user?.status_restriction_offer_date) &&
      !isEmpty(oppurtunity?.offer_finalized_at)
    ) {
      const offerFinalizeDate = moment(oppurtunity?.offer_finalized_at).unix();
      const statusRestrictionDate = moment(
        user.user.status_restriction_offer_date
      ).unix();

      if (
        offerFinalizeDate > statusRestrictionDate &&
        !isEmpty(opportunityStatusEnv[oppurtunity?.opportunity_status_c]) &&
        isEmpty(oppurtunity.escrow_company_name_c)
      ) {
        errors.push(missingField(`Escrow Company Name`));
      }
    }
    return errors;
  }
};
