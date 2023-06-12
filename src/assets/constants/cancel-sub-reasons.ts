const cancelSubReasons: any = {
  financial_characteristic: [
    { value: 'rehab_estimate', label: 'Rehab Estimate' },
    { value: 'low_rent_avm_confidence', label: 'Low Rent AVM Confidence' },
    { value: 'low_sale_avm_confidence', label: 'Low Sale AVM Confidence' },
    { value: 'hoa_fees', label: 'HOA Fees' },
    { value: 'underwritten_taxes', label: 'Underwritten Taxes' }
  ],
  location_characteristic: [
    { value: 'neighborhood', label: 'Neighborhood' },
    { value: 'zip_not_in_buy_box', label: 'ZIP Not in Buy Box' },
    { value: 'school_score', label: 'School Score' },
    { value: 'flood_zone', label: 'Flood Zone' },
    { value: 'crime_score', label: 'Crime Score' }
  ],

  physical_characteristic: [
    { value: 'foundation', label: 'Foundation' },
    { value: 'wood_frame', label: 'Wood Frame' },
    { value: 'number_of_rooms', label: 'Number of Rooms' },
    { value: 'cloth_wiring', label: 'Cloth Wiring' },
    { value: 'poly_b', label: 'Poly B' },
    { value: 'square_feet', label: 'Square Feet' },
    { value: 'attached_residence', label: 'Attached Residence' },
    { value: 'sloped_lot', label: 'Sloped Lot' },
    { value: 'septic', label: 'Septic' },
    { value: 'sinkhole', label: 'Sinkhole' }
  ],
  deal_term: [
    { value: 'seller_type', label: 'Seller Type' },
    { value: 'transaction_type', label: 'Transaction Type' },
    {
      value: 'contract_terms_and_restrictions',
      label: 'Contract Terms and Restrictions'
    },
    {
      value: 'solar_lease_must_be_assumed',
      label: 'Solar Lease Must Be Assumed'
    },
    { value: 'has_solar_panels', label: 'Has Solar Panels' },
    { value: 'long_term_lease_in_place', label: 'Long Term Lease in Place' },
    { value: 'seller_leaseback_required', label: 'Seller Leaseback Required' }
  ],
  hoa_rental_restriction: [
    { value: 'hoa_application_required', label: 'HOA Application Required' },
    { value: 'min_owner_time', label: 'Min Owner Time' },
    { value: 'no_rentals_allowed', label: 'No Rentals Allowed' }
  ]
};

export default cancelSubReasons;
