import { ObjectType } from 'types';
import { list, get, post, put } from './client-service';
import envConfig from 'config/env';

const service = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/parties`,

  getParties: async (query: string) => {
    const response = await list(`${service.url}${query}`);
    return response;
  },

  getById: async (id: string) => {
    const response = await get(`${service.url}/${id}`);
    return response;
  },

  createParties: async (data: any) => {
    const response = await post(`${service.url}`, data);
    return response;
  },

  update: async (id: string, data: any) => {
    const response = await put(`${service.url}/${id}`, data);
    return response;
  },

  getListingAgent: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const listing_agent = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_listing_agent_id
    );

    if (listing_agent && listing_agent !== null) {
      let listingAgent: any = {
        list_agent_broker_name_c: listing_agent?.company,
        list_broker_address_c: listing_agent?.address,
        list_brokerage_license: listing_agent?.brokerage_license,
        parties_listing_agent_name: listing_agent?.name,
        list_agent_email_c: listing_agent?.email,
        list_agent_phone_c: listing_agent?.mobile,
        listing_agent_license_number_c: listing_agent?.license
      };
      return listingAgent;
    } else return {};
  },

  getCoListingAgent: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const co_listing_agent = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_co_listing_agent_id
    );

    if (co_listing_agent && co_listing_agent !== null) {
      let coListingAgent = {
        parties_co_listing_agent_name: co_listing_agent?.name,
        parties_co_listing_agent_email: co_listing_agent?.email,
        parties_co_listing_agent_phone: co_listing_agent?.mobile
      };
      return coListingAgent;
    } else return {};
  },

  getBuyerRepresentative: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const buyer_representative = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_buyer_representative_id
    );

    if (buyer_representative && buyer_representative !== null) {
      let buyerRepresentative = {
        parties_buyer_representative_name: buyer_representative.name,
        parties_buyer_representative_email: buyer_representative.email,
        parties_buyer_representative_type: buyer_representative.type,
        parties_buyer_representative_sub_type: buyer_representative.sub_type
      };

      return buyerRepresentative;
    } else return {};
  },

  getEscrow: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const escrow = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_escrow_company_id
    );
    if (escrow && escrow !== null) {
      let escrowCompany = {
        escrow_company_contact_c: escrow.name,
        escrow_company_name_c: escrow.company,
        escrow_company_email_c: escrow.email,
        escrow_company_phone_c: escrow.mobile,
        escrow_company_address_c: escrow.address
      };

      return escrowCompany;
    } else return {};
  },

  getTransactionCoOrdinator: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const transaction_coordinator = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_transaction_coordinator_id
    );
    if (transaction_coordinator && transaction_coordinator !== null) {
      let transactionCoordinator = {
        parties_transaction_coordinator_name: transaction_coordinator.name,
        transaction_coordinator_email: transaction_coordinator.email
      };
      return transactionCoordinator;
    } else return {};
  },

  getTenant: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const tenant = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_tenant_id
    );
    if (tenant && tenant !== null) {
      let party = {
        parties_tenant_id: tenant.id,
        parties_tenant_name: tenant.name,
        parties_tenant_phone: tenant.mobile,
        parties_tenant_email: tenant.email
      };

      return party;
    } else return {};
  },

  getSeller: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const seller = data.find(
      (x: ObjectType) => x.type == 'seller' && x.id == opportunity?.seller_id
    );
    if (seller && seller !== null) {
      let party = {
        seller_name_c: seller.name,
        seller_email_c: seller.email,
        seller_notice_address_c: seller.address,
        seller_phone_c: seller.mobile,
        seller_name2_c: seller.name_2,
        parties_seller_type: seller.type,
        parties_seller_sub_type: seller.sub_type
      };
      return party;
    } else return {};
  },

  getSellerOffMarket: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const seller = data.find(
      (x: ObjectType) =>
        x.type == 'seller' && x.id == opportunity?.parties_seller_id
    );
    if (seller && seller !== null) {
      let party = {
        offmarket_seller_name_c: seller.name,
        offmarket_seller_email_c: seller.email,
        offmarket_seller_notice_address_c: seller.address,
        offmarket_seller_phone_c: seller.mobile,
        offmarket_seller_name2_c: seller.name_2,
        offmarket_parties_seller_type: seller.type,
        offmarket_parties_seller_sub_type: seller.sub_type
      };
      return party;
    } else return {};
  },

  getSellerRepresentative: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const sellerRepresentative = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_seller_representative_id
    );

    if (sellerRepresentative && sellerRepresentative !== null) {
      let party = {
        parties_seller_representative_name: sellerRepresentative.name,
        parties_seller_representative_email: sellerRepresentative.email,
        parties_seller_representative_company: sellerRepresentative.company,
        parties_seller_representative_type: sellerRepresentative.type,
        parties_seller_representative_sub_type: sellerRepresentative.sub_type
      };
      return party;
    } else return {};
  },

  getIntendedBuyer: (
    data: ObjectType[],
    opportunity: ObjectType
  ): ObjectType => {
    const intended_buyer = data.find(
      (x: ObjectType) => x.id === opportunity?.parties_intended_buyer_id
    );
    if (intended_buyer && intended_buyer !== null) {
      let party = {
        parties_intended_buyer_name: intended_buyer.name,
        parties_intended_buyer_email: intended_buyer.email,
        parties_intended_buyer_type: intended_buyer.type,
        parties_intended_buyer_sub_type: intended_buyer.sub_type
      };
      return party;
    } else return {};
  },

  getLeadOwner: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const lead_owner = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_lead_owner_id
    );
    if (lead_owner && lead_owner !== null) {
      let party = {
        parties_lead_owner_name: lead_owner.name,
        parties_lead_owner_email: lead_owner.email,
        parties_lead_owner_type: lead_owner.type,
        parties_lead_owner_sub_type: lead_owner.sub_type
      };
      return party;
    } else return {};
  },

  getLeadSource: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const lead_source = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_lead_source_id
    );
    if (lead_source && lead_source !== null) {
      let party = {
        parties_lead_source_name: lead_source.name,
        parties_lead_source_email: lead_source.email,
        parties_lead_source_type: lead_source.type,
        parties_lead_source_sub_type: lead_source.sub_type
      };
      return party;
    } else return {};
  },

  getUploadedBy: (data: ObjectType[], opportunity: ObjectType): ObjectType => {
    const uploaded_by = data.find(
      (x: ObjectType) => x.id == opportunity?.parties_uploaded_by_id
    );
    if (uploaded_by && uploaded_by !== null) {
      let party = {
        parties_uploaded_by_name: uploaded_by.name,
        parties_uploaded_by_email: uploaded_by.email,
        parties_uploaded_by_type: uploaded_by.type,
        parties_uploaded_by_sub_type: uploaded_by.sub_type
      };
      return party;
    } else return {};
  }
};

export default service;
