import { opportunityStatusEnv } from 'assets/constants/opportunity-status-env';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';
import { isChecked } from 'components/form/unit-switch';
import { isEmpty } from 'helpers/misc-helper';
import moment from 'moment';

export const tax_id_c = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status == "edit") {


      const stateList = [
        oppurtunityStatusList.offer_accepted,
        oppurtunityStatusList.closing_diligence_amended,
        oppurtunityStatusList.closing_sale_pending,
        oppurtunityStatusList.closing_sale_pending_amended,
        oppurtunityStatusList.closing_clear_to_close
      ];


      const isDirty = stateList.includes(oppurtunity?.opportunity_status_c) &&
        isChecked(oppurtunity?.new_construction_no_tax_id) == false &&
        !isEmpty(oppurtunity?.offer_finalized_at) &&
        isEmpty(oppurtunity.tax_id_c)

      if (isDirty) {
        errors.push(missingField(`Tax ID`));
      }
    }

    return errors;
  }
};
