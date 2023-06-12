import { ObjectType } from 'types';
import { inspection_confirmation_by } from './inspection-confirmation-by';

export const inspection_confirmation_date = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let result = {
      inspection_confirmation_by: inspection_confirmation_by.calculate(
        opportunity,
        originalOpportunity
      ).id,
      access_requested_name: inspection_confirmation_by.calculate(
        opportunity,
        originalOpportunity
      ).name
    };

    return result;
  }
};
