import { isEmpty, isValueChanged } from 'helpers/misc-helper';
import moment from 'moment-timezone';

export const next_seller_contact_date = {
  validate: function (oppurtunity: any, status: string, originalOppurtunity: any) {
    let errors: string[] = [];

    const sellerResponseList = ['in_negotiation', 'highest_and_best_requested']

    const isSellerResponseChanged = isValueChanged(oppurtunity, originalOppurtunity, 'seller_offer_response');
    const isNextSellerContactDate = isValueChanged(oppurtunity, originalOppurtunity, 'next_seller_contact_date');

    const nextSellerDateNotInFuture = moment(oppurtunity?.next_seller_contact_date).unix() <= moment().unix();

    const isDirty = (isSellerResponseChanged || isNextSellerContactDate) &&
      !isEmpty(oppurtunity?.seller_offer_response) &&
      !sellerResponseList.includes(oppurtunity?.seller_offer_response) &&
      (isEmpty(oppurtunity?.next_seller_contact_date) || nextSellerDateNotInFuture);

    if (isDirty) {
      errors.push('Next Seller Contact Date Must be in Future');
    }

    return errors;
  }
};
