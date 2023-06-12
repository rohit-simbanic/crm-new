import { ObjectType } from 'types';

const opportunityStatus: ObjectType = {
  new: 'New',
  pre_offer_request: 'Pre-Offer: Request',
  pre_offer_incomplete: 'Pre-Offer: Incomplete',
  pre_offer_need_signature: 'Pre Offer: Need Signature',
  pre_offer_make_loi: 'Pre Offer: Make LOI',
  pre_offer_loi_sent_to_seller: 'Pre Offer: LOI Sent to Seller',
  pre_offer_loi_seller_received: 'Pre Offer: LOI Seller Received',
  pre_offer_loi_rejected: 'Pre Offer: LOI Rejected',
  pre_offer_loi_ready_for_offer: 'Pre Offer: LOI Ready for Offer',
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
  closing_diligence_period: 'Closing: Diligence Period',
  closing_diligence_amended: 'Closing: Diligence Amended',
  closing_sale_pending: 'Closing: Sale Pending',
  closing_sale_pending_amended: 'Closing: Sale Pending Amended',
  closing_clear_to_close: 'Closing: Clear to Close',
  closing_cancel_contract: 'Closing: Cancelled',
  closed_purchased: 'Closed:  Purchased',
  closing_termination_pending: 'Closing: Termination Pending'
};

export default opportunityStatus;
