import fieldLabel from 'assets/constants/fieldLabel';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const msa_id_1 = {
  validate: (
    opportunity: ObjectType,
    status: string,
    originalOpportunit: ObjectType
  ) => {
    let errors = [];

    if (isEmpty(opportunity?.msa_id_1)) {
      errors.push(missingField(fieldLabel.msa));
    }

    return errors;
  }
};
