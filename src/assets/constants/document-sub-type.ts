import { ObjectType } from 'types';

const documentSubType: ObjectType = {
  proof_of_funds: [
    {
      label: 'Client Name POF Date Received',
      value: 'client_name_pof_date_received'
    },
    { label: 'EMD Receipt', value: 'emd_receipt' },
    { label: 'Option Fee Receipt', value: 'option_fee_receipt' },
    { label: 'DD Fee Receipt', value: 'dd_fee_receipt' }
  ],
  purchase_contract: [
    { label: 'PSA', value: 'psa' },
    { label: 'PSA_SPD_HOA', value: 'psa_spd_hoa' },
    { label: 'Counteroffer', value: 'counteroffer' }
  ],
  hoa_documents: [
    { label: 'HOA CC&Rs', value: 'hoa_cc_rs' },
    { label: 'HOA Bylaws', value: 'hoa_bylaws' },
    { label: 'HOA Violation', value: 'hoa_violation' },
    { label: 'HOA Closing Letter', value: 'hoa_closing_letter' },
    { label: 'HOA W9', value: 'hoa_w9' },
    { label: 'HOA Application', value: 'hoa_application' },
    { label: 'Misc HOA doc', value: 'misc_hoa_doc' }
  ],
  inspection_reports: [
    { label: 'General Inspection', value: 'general_inspection' },
    { label: 'WDIR', value: 'wdir' },
    { label: 'Roof Inspection', value: 'roof_inspection' },
    { label: 'Municipal Inspection', value: 'municipal_inspection' },
    { label: 'Sewer Inspection', value: 'sewer_inspection' },
    { label: 'Misc Inspection', value: 'misc_inspection' }
  ],
  disclosures: [
    { label: 'Seller Disclosure', value: 'seller_disclosure' },
    { label: 'HOA Disclosure', value: 'hoa_disclosure' },
    { label: 'LBP Disclosure', value: 'lbp_disclosure' },
    { label: 'MOG Disclosure', value: 'mog_disclosure' },
    { label: 'Misc Disclosure', value: 'misc_disclosure' },
    { label: 'Agency Disclosure', value: 'agency_disclosure' }
  ],
  commission_instructions: [
    {
      label: 'Commission Instruction',
      value: 'commission_instruction'
    },
    { label: 'Commission Agreement', value: 'commission_agreement' },
    { label: 'CDA', value: 'cda' }
  ],
  addendums: [
    { label: 'Buyer Add', value: 'buyer_add' },
    { label: 'Misc Add', value: 'misc_add' },
    { label: 'LBP Add', value: 'lbp_add' }
  ],
  amendments: [
    { label: 'COE Ext', value: 'coe_ext' },
    { label: 'Name Change', value: 'name_change' },
    { label: 'Address Correction', value: 'address_correction' },
    { label: 'DD Ext', value: 'dd_ext' },
    { label: 'Price Reduction', value: 'price_reduction' },
    { label: 'EMD Period Ext', value: 'emd_period_ext' },
    { label: 'Misc Amendment', value: 'misc_amendment' }
  ],
  notice_to_terminate: [{ label: 'Termination', value: 'termination' }],
  closing: [
    { label: 'Prelim HUD', value: 'prelim_hud' },
    { label: 'Prelim HUD V1', value: 'prelim_hud_v1' },
    { label: 'Final HUD', value: 'final_hud' },
    { label: 'Lien Search', value: 'lien_search' },
    { label: 'Unrecorded Deed', value: 'unrecorded_deed' },
    { label: 'Recorded Deed', value: 'recorded_deed' },
    { label: 'Survey', value: 'survey' },
    { label: 'Misc Closing Doc', value: 'misc_closing_doc' },
    { label: 'Misc Title Doc', value: 'misc_title_doc' },
    { label: 'Prelim Title Policy', value: 'prelim_title_policy' },
    { label: 'Final Title Policy', value: 'final_title_policy' }
  ],
  warranty: [
    { label: 'Builder Warranty', value: 'builder_warranty' },
    { label: 'Roof Warranty', value: 'roof_warranty' },
    { label: 'Misc Warranty', value: 'misc_warranty' },
    { label: 'Foundation Warranty', value: 'foundation_warranty' }
  ],
  invoice: [
    { label: 'Inspectify Invoice', value: 'inspectify_invoice' },
    { label: 'WDIR Invoice', value: 'wdir_invoice' },
    { label: 'Roof Invoice', value: 'roof_invoice' },
    { label: 'Showami Invoice', value: 'showami_invoice' }
  ],
  sales: [
    { label: 'MLS Printout', value: 'mls_printout' },
    { label: 'Off Market Printout', value: 'off_market_printout' }
  ],
  compliance: [
    { label: 'EMD Dispute', value: 'emd_dispute' },
    { label: 'Commission Dispute', value: 'commission_dispute' },
    { label: 'Complaint', value: 'complaint' },
    { label: 'Price Reduction Approval', value: 'price_reduction_approval' },
    { label: 'EMDR/Late Communication', value: 'emdr_late_communication' }
  ]
};

export default documentSubType;
