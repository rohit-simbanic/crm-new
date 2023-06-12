import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';

export const offer_price_at_acceptance = {
  calculate: (opportunity: any) => {
    if (
      oppurtunityStatusList.offer_accepted === opportunity?.opportunity_status_c
    ) {
      return opportunity.offer_price_c;
    }

    return opportunity?.offer_price_at_acceptance;
  }
};
