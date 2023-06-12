import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { OptionType } from 'types/option-type';

export const municipal_inspection_notes = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    if (
      oppurtunity?.municipal_inspection_types
        .map((x: OptionType) => x.value)
        .includes('other') &&
      isEmpty(oppurtunity?.municipal_inspection_notes)
    ) {
      errors.push(missingField('Municipal Inspection Notes'));
    }

    return errors;
  }
};
