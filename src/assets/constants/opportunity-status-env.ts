import { ObjectType } from 'types';

export const opportunityStatusEnv: ObjectType = {
  offer_make_offer: {
    offer_make_offer: 'Offer: Make Offer',
    offer_sent_to_seller: 'Offer: Sent to Seller',
    offer_canceled: 'Offer: Canceled',
    offer_lost_deal: 'Offer: Lost'
  },
  offer_sent_to_seller: {
    offer_make_offer: 'Offer: Make Offer',
    offer_sent_to_seller: 'Offer: Sent to Seller',
    offer_seller_received: 'Offer: Seller Received',
    offer_canceled: 'Offer: Canceled',
    offer_lost_deal: 'Offer: Lost'
  },
  offer_seller_received: {
    offer_make_offer: 'Offer: Make Offer',
    offer_sent_to_seller: 'Offer: Sent to Seller',
    offer_seller_received: 'Offer: Seller Received',
    offer_seller_countered: 'Offer: Seller Countered',
    offer_rejected: 'Offer: Rejected',
    offer_canceled: 'Offer: Canceled',
    offer_lost_deal: 'Offer: Lost',
    offer_accepted: 'Offer: Accepted',
    offer_short_sale_offer_accepted: 'Offer: Short Sale Offer Accepted'
  },
  offer_accepted: {
    offer_make_offer: 'Offer: Make Offer',
    offer_sent_to_seller: 'Offer: Sent to Seller',
    offer_seller_received: 'Offer: Seller Received',
    offer_seller_countered: 'Offer: Seller Countered',
    Offer_counter_updated: 'Offer: Counter Updated',
    offer_rejected: 'Offer: Rejected',
    offer_canceled: 'Offer: Canceled',
    offer_lost_deal: 'Offer: Lost',
    offer_accepted: 'Offer: Accepted',
    offer_short_sale_offer_accepted: 'Offer: Short Sale Offer Accepted',
    closing_diligence_period: 'Closing: Diligence Period'
  },
  closing_diligence_period: {
    offer_accepted: 'Offer: Accepted',
    offer_short_sale_offer_accepted: 'Offer: Short Sale Offer Accepted',
    closing_diligence_period: 'Closing: Diligence Period',
    closing_diligence_amended: 'Closing: Diligence Amended',
    closing_sale_pending: 'Closing: Sale Pending',
    closing_sale_pending_amended: 'Closing: Sale Pending Amended',
    closing_cancel_contract: 'Closing: Cancelled',
    closing_termination_pending: 'Closing: Termination Pending'
  }
};
