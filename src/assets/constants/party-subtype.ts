const partySubtype: any = {
  seller: [
    { value: 'individual_seller', label: 'Individual Seller' },
    { value: 'institutional_seller', label: 'Institutional Seller' },
    { value: 'ibuyer', label: 'iBuyer' },
    { value: 'municipality/government', label: 'Municipality / Government' },
    { value: 'bank/reo', label: 'Bank / REO' },
    { value: 'developer/builder', label: 'Developer / Builder' }
  ],
  seller_representative: [
    { value: 'seller(self)', label: 'seller(Self)' },
    { value: 'listing_agent', label: 'Listing Agent' },
    { value: 'co_listing_agent', label: 'Co Listing Agent' }
  ],
  lead_source: [
    { value: 'entera_client', label: 'Entera Client' },
    { value: 'seller_representative', label: 'Seller Representative' },
    { value: 'entera_friends_and_family', label: 'Entera Friends and Family' },
    { value: 'wholesaler', label: 'WholeSaler' },
    { value: 'attorney', label: 'Attorney' },
    { value: 'auction', label: 'Auction' }
  ],
  lead_owner: [
    { value: 'entera_customer', label: 'Entera Customer' },
    { value: 'entera_employee', label: 'Entera Employee' },
    { value: 'api', label: 'API' }
  ],
  buyer_representative: [
    { value: 'entera_customer', label: 'Entera Customer' },
    { value: 'entera_employee', label: 'Entera Employee' },
    { value: 'api', label: 'API' }
  ],
  intended_buyer: [
    { value: 'entera_client', label: 'Entera Client' },
    { value: 'entera_Known', label: 'Entera Known' },
    { value: 'direct(unknown_to_entera)', label: 'Direct(Unknown To Entera)' }
  ],
  uploaded_by: [
    { value: 'entera_customer', label: 'Entera Customer' },
    { value: 'entera_employee', label: 'Entera Employee' },
    { value: 'api', label: 'API' }
  ]
};

export default partySubtype;

export const allPartySubtypeOptions: any = {
  individual_seller: 'Individual Seller',
  institutional_seller: 'Institutional Seller',
  ibuyer: 'iBuyer',
  'municipality/government': 'Municipality / Government',
  'bank/reo': 'Bank / REO',
  'developer/builder': 'Developer / Builder',
  'seller(self)': 'seller(Self)',
  listing_agent: 'Listing Agent',
  co_listing_agent: 'Co Listing Agent',
  entera_client: 'Entera Client',
  seller_representative: 'Seller Representative',
  entera_friends_and_family: 'Entera Friends and Family',
  wholesaler: 'WholeSaler',
  attorney: 'Attorney',
  auction: 'Auction',
  entera_customer: 'Entera Customer',
  entera_employee: 'Entera Employee',
  api: 'API',
  entera_Known: 'Entera Known',
  'direct(unknown_to_entera)': 'Direct(Unknown To Entera)'
};
