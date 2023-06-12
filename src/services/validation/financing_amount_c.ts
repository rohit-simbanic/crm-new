import { balance_to_close_c } from './balance_to_close_c';

export const financing_amount_c = {
  handleChange: (opportunity: any) => {
    let result = {
      balance_to_close_c: balance_to_close_c.calculate(opportunity)
    };

    return result;
  }
};
