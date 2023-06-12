import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { missingField } from 'assets/validation-template';

export const short_sale_seller_accept_date = {
  validate: function (oppurtunity: any, status: string, oldOppurtunity: any) {
    let errors: any = [];
    if (
      [oppurtunityStatusList.offer_short_sale_offer_accepted].includes(
        oppurtunity?.opportunity_status_c
      ) &&
      (!oppurtunity?.short_sale_seller_accept_date ||
        oppurtunity?.short_sale_seller_accept_date?.trim().length === 0)
    ) {
      errors.push(
        missingField(
          'Short Sale Seller Accept Date must be completed before moving status to Offer: Short Sale Offer Accepted.'
        )
      );
    }

    return errors;
  }
};
