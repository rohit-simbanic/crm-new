import { ObjectType } from 'types';

const oppurtunityStatusList: ObjectType = {
  '': '',
  new: 'new',
  pre_offer_request: 'pre_offer_request',
  pre_offer_incomplete: 'pre_offer_incomplete',
  pre_offer_need_signature: 'pre_offer_need_signature',
  pre_offer_make_loi: 'pre_offer_make_loi',
  pre_offer_loi_sent_to_seller: 'pre_offer_loi_sent_to_seller',
  pre_offer_loi_seller_received: 'pre_offer_loi_seller_received',
  pre_offer_loi_rejected: 'pre_offer_loi_rejected',
  pre_offer_loi_ready_for_offer: 'pre_offer_loi_ready_for_offer',
  offer_make_offer: 'offer_make_offer',
  offer_sent_to_seller: 'offer_sent_to_seller',
  offer_seller_received: 'offer_seller_received',
  offer_seller_countered: 'offer_seller_countered',
  Offer_counter_updated: 'Offer_counter_updated',
  offer_rejected: 'offer_rejected',
  offer_canceled: 'offer_canceled',
  offer_lost_deal: 'offer_lost_deal',
  offer_accepted: 'offer_accepted',
  offer_short_sale_offer_accepted: 'offer_short_sale_offer_accepted',
  closing_diligence_period: 'closing_diligence_period',
  closing_diligence_amended: 'closing_diligence_amended',
  closing_sale_pending: 'closing_sale_pending',
  closing_sale_pending_amended: 'closing_sale_pending_amended',
  closing_clear_to_close: 'closing_clear_to_close',
  closing_cancel_contract: 'closing_cancel_contract',
  closed_purchased: 'closed_purchased',
  closing_termination_pending: 'closing_termination_pending'
};

export default oppurtunityStatusList;
