import fieldLabel from 'assets/constants/fieldLabel';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const market_preference_id = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originalOpportunit: ObjectType
  ) => {
    let errors = [];

    if (isEmpty(opportunity?.market_preference_id)) {
      errors.push(missingField(fieldLabel.marketPreference));
    }

    return errors;
  }
};
