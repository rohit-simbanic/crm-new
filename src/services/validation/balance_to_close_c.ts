export const balance_to_close_c = {
  calculate: (opportunity: any) => {
    if (parseFloat(opportunity.purchase_price_c) > 0) {
      return (
        opportunity.purchase_price_c -
        opportunity.earnest_amount_c -
        opportunity.financing_amount_c -
        opportunity.option_amount_c
      );
    } else if (parseFloat(opportunity.contract_price_c) > 0) {
      return (
        opportunity.contract_price_c -
        opportunity.earnest_amount_c -
        opportunity.financing_amount_c -
        opportunity.option_amount_c
      );
    } else if (parseFloat(opportunity.offer_price_c) > 0) {
      return (
        opportunity.offer_price_c -
        opportunity.earnest_amount_c -
        opportunity.financing_amount_c -
        opportunity.option_amount_c
      );
    }

    return opportunity.balance_to_close_c;
  }
};
