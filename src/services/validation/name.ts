import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const name = {
  validate: function (marketPreference: any, oldOppurtunity: any) {
    let errors: string[] = [];

    if (
      !marketPreference.data?.name ||
      marketPreference?.data.name.trim().length === 0
    ) {
      errors.push(missingField('Name'));
    }

    return errors;
  }
};
