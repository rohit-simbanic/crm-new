import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';

export const lease_type = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (status === 'edit') {
      if (
        oppurtunity?.has_post_occupancy === 'yes' &&
        isEmpty(oppurtunity?.lease_type)
      ) {
        errors.push(missingField('Lease Type'));
      }
    }

    if (status === 'action') {
      //oppurtunity?.oppurtunity_status_c === oppurtunityStatusList.closing_diligence_period
      // &&
      if (
        oppurtunity?.has_post_occupancy === 'yes' || oppurtunity?.has_post_occupancy === '' && 
        oppurtunity?.lease_type.trim().length === 0
      ) {
        errors.push(missingField('Lease Type'));
      }
    }

    return errors;
  }
};
