import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const lease_end_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      oppurtunity?.has_post_occupancy !== 'no' &&
      oppurtunity?.lease_end_date.trim().length === 0
    ) {
      errors.push(missingField('Lease End Date'));
    }

    return errors;
  }
};
