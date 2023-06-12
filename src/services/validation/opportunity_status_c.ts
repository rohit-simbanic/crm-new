import { ObjectType } from 'types';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import { offer_initialized_at } from './offer-initialized-at';
import { reject_date } from './reject_date';
import { offer_lost_date } from './offer_lost_date';
import { offer_cancelled_date } from './cancel_date';
import { offer_price_at_acceptance } from './offer_price_at_acceptance';
import { original_close_of_escrow_date } from './original-close-of-escrow-date';
import { final_commission } from './final_commission';
import { final_commission_percentage } from './final_commission_percentage';
import { hud_commission } from './hud_commission';
import { buyer_contract_name_at_offer_sent_id } from './buyer-contract-name-at-offer-sent-id';
import { buyer_contract_name_at_diligence_start_id } from './buyer-contract-name-at-diligence-start-id';
import { buyer_contract_name_at_closing_id } from './buyer-contract-name-at-closing-id';
import { benefitting_negotiator } from './benefitting-negotiator';

export const opportunity_status_c = {
  validate: (
    opportunity: ObjectType,
    status: string,
    oldOppurtunity: ObjectType
  ) => {
    let errors: any = [];

    if (
      ![
        oppurtunityStatusList.offer_accepted,
        oppurtunityStatusList.offer_short_sale_offer_accepted
      ].includes(oldOppurtunity?.opportunity_status_c) &&
      opportunity?.opportunity_status_c ===
      oppurtunityStatusList.closing_diligence_period
    ) {
      errors.push(
        'You are moving a closing to Due Diligence from an improper status. Proceed anyway?'
      );
    }

    return errors;
  },

  handleChange: async (
    opportunity: ObjectType,
    originalOpportunity: ObjectType
  ) => {


    const finalCommission = final_commission.calculate(opportunity, originalOpportunity);
    opportunity = {
      ...opportunity,
      final_commission: finalCommission
    }

    const finalCommissionPercentage = final_commission_percentage.calculate(opportunity, originalOpportunity);
    opportunity = {
      ...opportunity,
      final_commission_percentage: finalCommissionPercentage
    }

    const hudCommission = hud_commission.calculate(opportunity, originalOpportunity);

    const buyer_contract_name_at_offer_sent = buyer_contract_name_at_offer_sent_id.calculate(opportunity, originalOpportunity);
    const buyer_contract_name_at_diligence_start = buyer_contract_name_at_diligence_start_id.calculate(opportunity, originalOpportunity);
    const buyer_contract_name_at_closing = buyer_contract_name_at_closing_id.calculate(opportunity, originalOpportunity);

    const benefittingNegotiator = benefitting_negotiator.calculate(opportunity, originalOpportunity);

    let result = {
      offer_initialized_at: offer_initialized_at.calculate(opportunity),
      reject_date: reject_date.calculate(opportunity),
      offer_lost_date: offer_lost_date.calculate(
        opportunity,
        originalOpportunity
      ),
      offer_cancelled_date: offer_cancelled_date.calculate(
        opportunity,
        originalOpportunity
      ),
      offer_price_at_acceptance:
        offer_price_at_acceptance.calculate(opportunity),
      original_close_of_escrow_date: original_close_of_escrow_date.calculate(
        opportunity,
        originalOpportunity
      ),
      ...buyer_contract_name_at_offer_sent,
      ...buyer_contract_name_at_diligence_start,
      ...buyer_contract_name_at_closing,
      final_commission: finalCommission,
      final_commission_percentage: finalCommissionPercentage,
      hud_commission: hudCommission,
      ...benefittingNegotiator
    };

    return result;
  }
};
