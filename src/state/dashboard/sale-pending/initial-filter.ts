const initialFilter = {
  opportunity_status_c: [
    { value: 'closing_sale_pending', label: 'Closing: Sale Pending' },
    {
      value: 'closing_sale_pending_amended',
      label: 'Closing: Sale Pending Amended'
    },
    {
      value: 'closing_clear_to_close',
      label: 'Closing: Clear to Close'
    }
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
