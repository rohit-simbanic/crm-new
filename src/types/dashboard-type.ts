export interface OpportunityStatusItem {
  value: string | null;
  label: string | null;
}

export interface DashboardFilterEntity {
  opportunity_status_c: OpportunityStatusItem[] | null;
  property_address_c: string | null;
  entera_opportunity_id: string | null;
  mls_c: string | null;
  street_name: string | null;
  mls_status_c: string | null;
  account_id: string[] | null;
  msa_id: string[] | null;
  seller_offer_response: string | null;
  offer_date_c_range: string | null;
  offer_date_c: string | null;
  offer_date_to_c: string | null;
}
