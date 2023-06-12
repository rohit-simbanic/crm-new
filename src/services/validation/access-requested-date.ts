import { ObjectType } from 'types';
import { access_requested_by } from './access-requested-by';

export const access_requested_date = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let result = {
      access_requested_by: access_requested_by.calculate(
        opportunity,
        originalOpportunity
      ).id,
      access_requested_name: access_requested_by.calculate(
        opportunity,
        originalOpportunity
      ).name
    };

    return result;
  }
};
