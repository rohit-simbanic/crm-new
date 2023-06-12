const initialFilter = {
  opportunity_status_c: [
    { value: 'offer_sent_to_seller', label: 'Offer: Sent to Seller' },
    { value: 'offer_seller_received', label: 'Offer: Seller Received' }
  ],
  property_address_c: '',
  entera_opportunity_id: '',
  mls_c: '',
  street_name: '',
  mls_status_c: '',
  account_id: [],
  msa_id: [],
  seller_offer_response: '',
  offer_date_c_range: 'equal',
  offer_date_c: '',
  offer_date_to_c: ''
};
export default initialFilter;
