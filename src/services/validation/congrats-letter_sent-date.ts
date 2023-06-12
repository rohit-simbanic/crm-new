import { ObjectType } from 'types';
import { congrats_letter_sent_by } from './congrats-letter-sent-by';

export const congrats_letter_sent_date = {
  handleChange: (opportunity: ObjectType, originalOpportunity: ObjectType) => {
    let result = {
      congrats_letter_sent_by: congrats_letter_sent_by.calculate(
        opportunity,
        originalOpportunity
      ).id,
      congrats_letter_sent_name: congrats_letter_sent_by.calculate(
        opportunity,
        originalOpportunity
      ).name
    };

    return result;
  }
};
