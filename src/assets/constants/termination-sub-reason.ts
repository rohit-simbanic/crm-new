const terminationSubReason: any = {
  price_reduction: [
    { value: 'exceeds_rehab', label: 'Exceeds Rehab' },
    { value: 'overvalue', label: 'Overvalue' }
  ],
  seller_canceled_contract: [
    { value: 'financing', label: 'Financing' },
    { value: 'hardship', label: 'Hardship' },
    { value: 'acquisition', label: 'Acquisition' },
    { value: 'casualty_loss', label: 'Casualty Loss' }
  ],

  hoa_rental_restrictions: [
    { value: 'strict_hoa_regulations', label: 'Strict HOA Regulations' },
    { value: 'min_owner_time', label: 'Min Owner Time' },
    { value: 'no_rentals_allowed', label: 'No Rentals Allowed' }
  ],
  financial_characteristic: [
    { value: 'underwriting_hoa_fee', label: 'Underwriting HOA Fee' },
    { value: 'underwriting_tax', label: 'Underwriting Tax' },
    {
      value: 'underwriting_rent',
      label: 'Underwriting Rent'
    },
    {
      value: 'underwriting_market_value',
      label: 'Underwriting Market Value'
    },
    { value: 'underwriting_rehab', label: 'Underwriting Rehab' },
    { value: 'bulk_termination', label: 'Bulk Termination' },
    { value: 'casualty_loss', label: 'Casualty Loss' },
    {
      value: 'no_longer_meets_client_yield_targets',
      label: 'No Longer Meets Client Yield Targets'
    }
  ],
  location_characteristic: [
    { value: 'zip_not_in_buy_box', label: 'ZIP Not in Buy Box' },
    { value: 'flood_zone', label: 'Flood Zone' },
    { value: 'school_score', label: 'School Score' },
    { value: 'crime_score', label: 'Crime Score' }
  ],
  physical_characteristic: [
    { value: 'septic_tank', label: 'Septic Tank' },
    { value: 'wood_frame', label: 'Wood Frame' },
    { value: 'number_of_rooms', label: 'Number of Rooms' },
    { value: 'other', label: 'Other' }
  ]
};

export default terminationSubReason;
