import { missingField } from 'assets/validation-template';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { isEmpty } from 'helpers/misc-helper';
import moment from 'moment';

export const has_post_occupancy = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    const stateList = [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended
    ];

    const isDirty = stateList.includes(oppurtunity?.opportunity_status_c) &&
      !isEmpty(oppurtunity?.offer_finalized_at) &&
      isEmpty(oppurtunity.has_post_occupancy)

    if (isDirty) {
      errors.push(missingField('Has Post Occupancy'));
    }

    return errors;
  }
};
