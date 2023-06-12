import { missingField } from 'assets/validation-template';
import { OptionType } from 'types/option-type';

export const municipal_inspection_types = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];

    let value = oppurtunity?.municipal_inspection_types?.map(
      (x: OptionType) => x.value
    );

    if (value?.includes('none_required') && value.length > 1) {
      errors.push(
        missingField(
          'To select other value Please unselect empty or None Required value'
        )
      );
    }

    return errors;
  }
};
