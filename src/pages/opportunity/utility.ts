import partiesService from 'services/parties-service';
import opportunityCommissionService from 'services/opportunity-commission-service';
import userService from 'services/user-service';
import HOAService from 'services/hoa-service';
import opportunityServiceProvidersService from 'services/opportunity-service-providers';
import UtilityProviderService from 'services/utility-provider-service';
import validationService from 'services/validation-service';
import { ObjectType } from 'types';
import oppurtunityService from 'services/oppurtunity-service';
import { OptionType } from 'types/option-type';
import { commission_negotiator_commission_pct } from 'services/validation/commission-negotiator-commission-pct';
import { commission_negotiator_commission_amount } from 'services/validation/commission-negotiator-commission-amount';
import { commission_buyer_rep_pct } from 'services/validation/commission-buyer-rep-pct';
import { commission_buyer_source_pct } from 'services/validation/commission-buyer-source-pct';
import { commission_seller_rep_pct } from 'services/validation/commission-seller-rep-pct';
import { commission_seller_source_pct } from 'services/validation/commission-seller-source-pct';
import { isEmpty } from 'helpers/misc-helper';
import DateUtility from 'helpers/date-helper';
import municipalInspectionTypes from 'assets/constants/municipal-inspection-types';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import accountBuyerService from 'services/account-buyer-service';

export const getAdditionalInfo = async (oppurtunity: any) => {
  let result = {};

  try {
    let { data } = await partiesService.getParties(
      `?page=1&filter[opportunity_id]=${oppurtunity.id}`
    );

    data = data.data;

    const listingAgent: ObjectType = partiesService.getListingAgent(
      data,
      oppurtunity
    );
    result = { ...result, ...listingAgent };

    const coListingAgent: ObjectType = partiesService.getCoListingAgent(
      data,
      oppurtunity
    );
    result = { ...result, ...coListingAgent };

    const buyerRepresentative: ObjectType =
      partiesService.getBuyerRepresentative(data, oppurtunity);
    result = { ...result, ...buyerRepresentative };

    const escrow: ObjectType = partiesService.getEscrow(data, oppurtunity);
    result = { ...result, ...escrow };

    const transactionCoordinator: ObjectType =
      partiesService.getTransactionCoOrdinator(data, oppurtunity);
    result = { ...result, ...transactionCoordinator };

    const tenant: ObjectType = partiesService.getTenant(data, oppurtunity);
    result = { ...result, ...tenant };

    const seller: ObjectType = partiesService.getSeller(data, oppurtunity);
    result = { ...result, ...seller };

    const sellerOffMarket: ObjectType = partiesService.getSellerOffMarket(
      data,
      oppurtunity
    );
    result = { ...result, ...sellerOffMarket };

    const sellerRepresentative: ObjectType =
      partiesService.getSellerRepresentative(data, oppurtunity);
    result = { ...result, ...sellerRepresentative };

    const intendedBuyer: ObjectType = partiesService.getIntendedBuyer(
      data,
      oppurtunity
    );
    result = { ...result, ...intendedBuyer };

    const leadOwner: ObjectType = partiesService.getLeadOwner(
      data,
      oppurtunity
    );
    result = { ...result, ...leadOwner };

    const leadSource: ObjectType = partiesService.getLeadSource(
      data,
      oppurtunity
    );
    result = { ...result, ...leadSource };

    const uploadedBy: ObjectType = partiesService.getUploadedBy(
      data,
      oppurtunity
    );
    result = { ...result, ...uploadedBy };

    const hoa: ObjectType = await HOAService.get(
      `?opportunity_id=${oppurtunity?.id}`
    );

    const hoacompany = HOAService.getHoaDetails(hoa.data);
    result = { ...result, ...hoacompany };

    const utilityProvider: ObjectType = await UtilityProviderService.get(
      `?filter[opportunity_id]=${oppurtunity?.id}`
    );

    const utilityProviderDetails =
      UtilityProviderService.getUtilityProviderDetails(utilityProvider?.data);
    result = { ...result, ...utilityProviderDetails };

    let opportunityServiceProviders =
      await opportunityServiceProvidersService.get(
        `?filter[opportunity_id]=${oppurtunity?.id}`
      );

    if (
      opportunityServiceProviders.data &&
      opportunityServiceProviders.data.length > 0
    ) {
      opportunityServiceProviders = opportunityServiceProviders.data;

      let feeAdvances = opportunityServiceProvidersService.getFeeAdvances(
        opportunityServiceProviders
      );
      result = { ...result, ...feeAdvances };

      let expences = opportunityServiceProvidersService.getExpense(
        opportunityServiceProviders
      );
      result = { ...result, ...expences };
    }

    let brokerageUsers = await oppurtunityService.getOpportunityBrokerageUsers(
      oppurtunity?.id
    );

    if (brokerageUsers && brokerageUsers.length > 0) {
      brokerageUsers = brokerageUsers;

      let users = userService.getUsers(brokerageUsers);
      result = { ...result, ...users };
    }

    let accountBuyers = await accountBuyerService.getOpportunityAccountBuyers(
      oppurtunity?.id
    );

    if (accountBuyers && accountBuyers.length > 0) {
      let buyers = accountBuyerService.getBuyers(accountBuyers);

      result = { ...result, ...buyers };
    }

    if (
      isEmpty(oppurtunity?.commision_pending) &&
      !isEmpty(oppurtunity?.initial_commission_amount)
    ) {
      oppurtunity = {
        ...oppurtunity,
        commision_pending: oppurtunity?.initial_commission_amount
      };
    }

    if (
      isEmpty(oppurtunity?.buyer_commission_c) &&
      !isEmpty(oppurtunity?.initial_commission_percentage)
    ) {
      oppurtunity = {
        ...oppurtunity,
        buyer_commission_c: oppurtunity?.initial_commission_percentage
      };
    }

    if (
      !isEmpty(oppurtunity?.municipal_inspection_types) &&
      typeof oppurtunity?.municipal_inspection_types != 'string'
    ) {
      let municipal_inspection_types = getObjectEntriesAsArray(
        municipalInspectionTypes
      ).filter((x: OptionType) =>
        oppurtunity?.municipal_inspection_types.includes(x.value)
      );

      result = {
        ...result,
        municipal_inspection_types: municipal_inspection_types,
        municipal_inspection_types_text_disply: municipal_inspection_types
          .map((x: OptionType) => x.label)
          .join(', ')
      };
    } else {
      result = {
        ...result,
        municipal_inspection_types: []
      };
    }

    if (oppurtunity.data_source === 'off_market') {
      const opportunityCommission =
        await opportunityCommissionService.getOpportunityCommission(
          `?page=1&per_page=100&sort[field]=entered_date&sort[direction]=desc&filter[opportunity_id]=${oppurtunity.id}`
        );

      if (opportunityCommission.data?.data[0]?.id) {
        let data = opportunityCommission.data.data[0];

        const commission = {
          opportunity_commission_id: data?.id,
          commission_buyer_source: data.buyer_source || '',
          commission_buyer_rep: data.buyer_rep || '',
          commission_seller_source: data.seller_source || '',
          commission_seller_rep: data.seller_rep || '',

          commission_buyer_source_pct: data.buyer_source_pct || '',
          commission_buyer_rep_pct: data.buyer_rep_pct || '',
          commission_seller_source_pct: data.seller_source_pct || '',
          commission_seller_rep_pct: data.seller_rep_pct || '',
          commission_negotiator_commission_pct:
            data.negotiator_commission_pct || '',
          commission_negotiator_commission_amount:
            data.negotiator_commission_amount || ''
        };

        result = {
          ...result,
          ...commission
        };
      } else {
        result = {
          ...result,
          opportunity_commission_id: null
        };
      }
    }

    result = {
      ...result,
      reduction_type_display: !isEmpty(oppurtunity?.commision_reduction),
      commission_reduction_type2_display: !isEmpty(
        oppurtunity?.commision_reduction2
      ),
      commission_reduction_type3_display: !isEmpty(
        oppurtunity?.commision_reduction3
      )
    };
  } catch (error) {}

  let response = { ...oppurtunity, ...result };

  return response;
};

export const validateOpportunity = (
  opportunity: ObjectType,
  oldOppurtunity: ObjectType
) => {
  let fields = [
    'offer_price_c',
    'offer_date_c',
    'contract_execution_date_c',
    'earnest_money_due_date_c',
    'due_diligence_start_c',
    'due_diligence_end_c',
    'close_date_c',
    'option_period_days_c',
    'contract_termination_reasons',
    'contract_terminated_date',
    'reject_reason',
    'seller_offer_response',
    'next_seller_contact_date',
    'offer_submit_by_date',
    'short_sale_seller_accept_date',
    'cancel_reason',
    'restrictions_notes',
    'escrow_company_contact_c',
    'parties_listing_agent_name',
    'seller_name_c',
    'counter_offer',
    'earnest_amount_c',
    'sale_date',
    'sold_price',
    'earnest_recovered_by_buyer',
    'earnest_paid_by_entera',
    'em_recovery_amount',
    'em_paid_by_enatera_amount',
    'commision_pending',
    'contract_price_c',
    'deposit_amount',
    'initial_commission_amount',
    'lease_type',
    'rental_amount',
    'parties_listing_agent_name',
    'sale_date',
    'sold_price',
    'earnest_recovered_by_buyer',
    'earnest_paid_by_entera',
    'em_recovery_amount',
    'em_paid_by_enatera_amount',
    'buyer_commission_c',
    'tax_id_c',
    'type_c',
    'account_buyer_id',
    'cancellation_reason_subcategory',
    'termination_reason_subcategory',
    'purchase_price_c',
    'has_post_occupancy',
    'has_leasing_restrictions',
    'municipal_inspection_types',
    'reduction_type',
    'commission_reduction_type2',
    'commission_reduction_type3',
    'active_primary_negotiator_user',
    'msa_id_1',
    'market_preference_id',
    'account_id_1'
  ];

  if (opportunity.data_source === 'off_market') {
    const off_market_fields = [
      'parties_seller_representative_name',
      'parties_lead_source_name',
      'parties_lead_owner_name',
      'parties_buyer_representative_name',
      'parties_intended_buyer_name',
      'parties_uploaded_by_name',
      'commission_buyer_source',
      'commission_buyer_rep',
      'commission_seller_source',
      'commission_seller_rep',
      'final_commission_percentage',
      'final_commission',
      'parties_seller_representative_type',
      'parties_lead_source_type',
      'parties_intended_buyer_type',
      'parties_uploaded_by_type'
    ];
    fields = [...fields, ...off_market_fields];
  }

  const result = validationService.validate(
    opportunity,
    fields,
    'edit',
    oldOppurtunity
  );

  return result;
};

export const transformOpportunity = (opportunity: ObjectType) => {
  let result = {};

  const convertTimeZoneToUtc = () => {
    const dateTimeArr = [
      'offer_initialized_at',
      'offer_finalized_at',
      'due_diligence_start_c',
      'due_diligence_end_c',
      'list_price_updated_date_c',
      'mls_updated_timestamp_c',
      'initial_due_diligence_end',
      'offer_documents_created_at',
      'benefitting_negotiator_changed_at'
    ];

    let dateTimeResult: ObjectType = {};
    for (let dateTimeValue of dateTimeArr) {
      if (opportunity[dateTimeValue] && opportunity[dateTimeValue] != '') {
        dateTimeResult[dateTimeValue] = DateUtility.convertTimeZoneToUTC(
          opportunity[dateTimeValue]
        );
      } else {
        dateTimeResult[dateTimeValue] = opportunity[dateTimeValue];
      }
    }

    return dateTimeResult;
  };

  result = {
    ...opportunity,
    ...convertTimeZoneToUtc(),
    municipal_inspection_types: opportunity.municipal_inspection_types.map(
      (x: OptionType) => x.value
    )
  };

  return result;
};

export const saveOpportunityCommission = async (data: ObjectType) => {
  let result: ObjectType;
  let reqBody = {
    name: data.name,
    description: data.description,
    opportunity_id: data.id,

    buyer_source: data.commission_buyer_source || '',
    buyer_rep: data.commission_buyer_rep || '',
    seller_source: data.commission_seller_source || '',
    seller_rep: data.commission_seller_rep || '',
    buyer_source_pct: commission_buyer_source_pct.calculate(data, {}),
    buyer_rep_pct: commission_buyer_rep_pct.calculate(data, {}),
    seller_source_pct: commission_seller_source_pct.calculate(data, {}),
    seller_rep_pct: commission_seller_rep_pct.calculate(data, {}),
    negotiator_commission_pct: commission_negotiator_commission_pct.calculate(
      data,
      {}
    ),
    negotiator_commission_amount:
      commission_negotiator_commission_amount.calculate(data, {})
  };

  if (!isEmpty(data.opportunity_commission_id)) {
    result = await opportunityCommissionService.updateCommission(
      data.opportunity_commission_id,
      reqBody
    );
  } else {
    result = await opportunityCommissionService.createCommission(reqBody);
  }
};
