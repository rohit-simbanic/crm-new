import commissionPayType from 'assets/constants/commission-pay-type';
import enteraContribution from 'assets/constants/entera-contribution';
import fieldLabel from 'assets/constants/fieldLabel';
import leaseType from 'assets/constants/lease-type';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import reductionType from 'assets/constants/reduction-type';
import reductionTypeOnetwo from 'assets/constants/reduction-type-one-two';
import solarPanelLeaseOwned from 'assets/constants/solar-panel-lease-owned';
import specialInstructions from 'assets/constants/special-instructions';
import titlePayor from 'assets/constants/title-pay-options';
import wireStatus from 'assets/constants/wire-status';
import yesNo from 'assets/constants/yes-no';
import FormContainer from 'components/form/container';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React from 'react';
import { ObjectType } from 'types';

import Expense from '../partial-edit/expense';
import FeeAdvance from '../partial-edit/fee-advance';
import UnitRead from 'components/form/unit-read';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  updateOpportunity: ObjectType;
  validation?: ObjectType;
  onChange?: any;
  changeHandle?: (e: any) => any;
  field: string;
  setField?: any;
  readOnly?: boolean;
  calculate: (val: string) => any;
}

const SettlementRecordView = ({
  oppurtunity,
  oldOppurtunity,
  updateOpportunity,
  validation,
  onChange,
  changeHandle,
  field,
  setField,
  readOnly = false,
  calculate
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let valMessages = validation ?? {};
  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitPriceFormatter
          name="contract_price_c"
          value={data?.contract_price_c}
          onChange={handleChange}
          label={fieldLabel.contractPrice}
          readOnly={readOnly}
          error={valMessages['contract_price_c'] ?? ''}
          onBlur={() => {
            setField('contract_price_c');
          }}
        />

        <UnitPriceFormatter
          name="purchase_price_c"
          value={!isEmpty(data?.purchase_price_c) ? data?.purchase_price_c : ''}
          onChange={handleChange}
          label={fieldLabel.purchasePrice}
          readOnly={readOnly}
          error={valMessages['purchase_price_c'] ?? ''}
          onBlur={() => {
            setField('purchase_price_c');
          }}
        />

        <UnitPriceFormatter
          name="actual_retrade_amount"
          value={data?.actual_retrade_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.actualRetradeAmount}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="balance_to_close_c"
          value={data?.balance_to_close_c ?? ''}
          onChange={onChange}
          label={fieldLabel.closeBalance}
          readOnly={readOnly}
        />

        <UnitSelect
          name="wire_status_c"
          label={fieldLabel.wireStatus}
          records={getObjectEntriesAsArray(wireStatus)}
          value={data?.wire_status_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="entera_contribution"
          label={fieldLabel.enteraContribution}
          records={getObjectEntriesAsArray(enteraContribution)}
          value={data?.entera_contribution ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="wire_fee_amount"
          value={data?.wire_fee_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.wireFeeAmount}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="entera_contribution_amount"
          value={data?.entera_contribution_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.enteraContributionAmount}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.earnestInstructions}
          name="earnest_delivery_instruction_c"
          value={data?.earnest_delivery_instruction_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />

        <UnitText
          label={fieldLabel.customerName}
          name="customer_name_c"
          value={data?.customer_name_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.optionDelivery}
          name="option_delivery_instructions_c"
          value={data?.option_delivery_instructions_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />

        <UnitSelect
          name="title_payor_c"
          label={fieldLabel.titlePayor}
          records={getObjectEntriesAsArray(titlePayor)}
          value={data?.title_payor_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          name="settlement_date"
          label={fieldLabel.settlementDate}
          value={data?.settlement_date ? data?.settlement_date : null}
          onChange={(e) =>
            handleChange({
              target: { name: 'settlement_date', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitSwitch
          value={data?.sellers_disclosure_received ?? 0}
          onChange={handleChange}
          name="sellers_disclosure_received"
          label={fieldLabel.sellerDisclosureReceived}
          disabled={readOnly}
        />

        <UnitPriceFormatter
          name="initial_offer_price_c"
          value={data?.initial_offer_price_c ?? ''}
          onChange={handleChange}
          onBlur={() => {
            setField('initial_offer_price_c');
          }}
          label={fieldLabel.initialOfferPrice}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="probability"
          label={`${fieldLabel.probability} (%)`}
          value={data?.probability}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="initial_commission_percentage"
          label={`${fieldLabel.initialCommission} %`}
          value={data?.initial_commission_percentage}
          onChange={(e: any) => {
            handleChange({
              initial_commission_percentage: e.target.value,
              initial_commission_percentage_changed: true
            });
          }}
          onBlur={() => {
            setField('initial_commission_percentage');
          }}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="initial_commission_amount"
          value={data?.initial_commission_amount}
          onChange={(e: any) => {
            handleChange({
              initial_commission_amount: e.target.value,
              initial_commission_amount_changed: true
            });
          }}
          onBlur={() => {
            setField('initial_commission_amount');
          }}
          label={`${fieldLabel.initialCommission} $`}
          readOnly={readOnly}
          error={valMessages['initial_commission_amount'] ?? ''}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="buyer_bonus_c"
          value={data?.buyer_bonus_c ?? ''}
          onChange={handleChange}
          onBlur={() => {
            setField('buyer_bonus_c');
          }}
          label={fieldLabel.buyerBonus}
          readOnly={readOnly}
        />

        <UnitSelect
          name="commission_pay_type"
          label={fieldLabel.commissionPayType}
          records={getObjectEntriesAsArray(commissionPayType)}
          value={data?.commission_pay_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="offer_price_at_acceptance"
          value={data?.offer_price_at_acceptance ?? ''}
          onChange={onChange}
          label={fieldLabel.offerPriceAtAcceptance}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          label={fieldLabel.commissionContributionAtOfferAcceptance}
          name="commission_contribution_at_offer_accept"
          value={data?.commission_contribution_at_offer_accept ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSwitch
          value={data?.contract_review_complete ?? 0}
          onChange={handleChange}
          name="contract_review_complete"
          label={fieldLabel.contractReviewComplete}
          disabled={readOnly}
        />

        <UnitPriceFormatter
          label={fieldLabel.commissionPending}
          name="commision_pending"
          value={data?.commision_pending}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['commision_pending'] ?? ''}
        />

        <UnitText
          label={`${fieldLabel.pendingCommission} %`}
          name="buyer_commission_c"
          value={data?.buyer_commission_c}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['buyer_commission_c'] ?? ''}
        />

        <UnitPriceFormatter
          name="commision_reduction"
          value={data?.commision_reduction}
          onChange={handleChange}
          onBlur={() => {
            setField('commision_reduction');
          }}
          label={fieldLabel.commissionReduction}
          readOnly={readOnly}
        />

        {data?.reduction_type_display ? (
          <UnitSelect
            name="reduction_type"
            label={fieldLabel.reductionType}
            records={getObjectEntriesAsArray(reductionType)}
            value={data?.reduction_type ?? ''}
            onChange={onChange}
            readOnly={readOnly}
            error={valMessages['reduction_type'] ?? ''}
          />
        ) : (
          <UnitEmpty />
        )}

        <UnitPriceFormatter
          name="commision_reduction2"
          value={data?.commision_reduction2}
          onChange={handleChange}
          onBlur={() => {
            setField('commision_reduction2');
          }}
          label={`${fieldLabel.commissionReduction}-2`}
          readOnly={readOnly}
        />

        {data?.commission_reduction_type2_display ? (
          <UnitSelect
            name="commission_reduction_type2"
            label={`${fieldLabel.reductionType}-2`}
            records={getObjectEntriesAsArray(reductionTypeOnetwo)}
            value={data?.commission_reduction_type2 ?? ''}
            onChange={onChange}
            readOnly={readOnly}
            error={valMessages['commission_reduction_type2'] ?? ''}
          />
        ) : (
          <UnitEmpty />
        )}

        <UnitPriceFormatter
          label={`${fieldLabel.commissionReduction}-3`}
          name="commision_reduction3"
          value={data?.commision_reduction3 ?? ''}
          onChange={handleChange}
          onBlur={() => {
            setField('commision_reduction3');
          }}
          readOnly={readOnly}
        />

        {data?.commission_reduction_type3_display ? (
          <UnitSelect
            name="commission_reduction_type3"
            label={`${fieldLabel.reductionType}-3`}
            records={getObjectEntriesAsArray(reductionTypeOnetwo)}
            value={data?.commission_reduction_type3 ?? ''}
            onChange={onChange}
            readOnly={readOnly}
            error={valMessages['commission_reduction_type3'] ?? ''}
          />
        ) : (
          <UnitEmpty />
        )}

        <UnitPriceFormatter
          name="total_commission_reductions"
          value={data?.total_commission_reductions}
          onChange={handleChange}
          label={fieldLabel.totalReductions}
          readOnly={readOnly}
        />

        <UnitSelect
          name="special_instructions"
          label={fieldLabel.specialInstructions}
          records={getObjectEntriesAsArray(specialInstructions)}
          value={data?.special_instructions ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="commission_received"
          label={fieldLabel.commissionReceived}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.commission_received ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        {[
          oppurtunityStatusList.closing_sale_pending,
          oppurtunityStatusList.closing_sale_pending_amended,
          oppurtunityStatusList.closing_clear_to_close,
          oppurtunityStatusList.closed_purchased,
          oppurtunityStatusList.closing_termination_pending
        ].includes(data?.opportunity_status_c) && (
          <>
            <UnitEmpty />
            <UnitPriceFormatter
              name="final_commission"
              value={data?.final_commission}
              onChange={(e: any) => {
                handleChange({
                  final_commission: e.target.value,
                  final_commission_changed: true
                });
              }}
              onBlur={() => {
                handleChange({
                  final_commission_percentage: calculate(
                    'final_commission_percentage'
                  )
                });
                setField('final_commission');
              }}
              label={`${fieldLabel.actualCommission} $`}
              readOnly={readOnly}
              error={valMessages['final_commission'] ?? ''}
            />

            <UnitPercentageFormatter
              name="final_commission_percentage"
              value={data?.final_commission_percentage}
              label={`${fieldLabel.actualCommissionPercentage} %`}
              onChange={handleChange}
              error={valMessages['final_commission_percentage'] ?? ''}
              readOnly={true}
            />

            <UnitPriceFormatter
              name="hud_commission"
              value={data?.hud_commission}
              onChange={(e) => {
                handleChange({
                  hud_commission: e.target.value,
                  hud_commission_changed: true
                });
              }}
              label={`${fieldLabel.hudCommission} $`}
              readOnly={readOnly}
              error={valMessages['hud_commission'] ?? ''}
            />
            <UnitEmpty />
          </>
        )}

        <UnitSelect
          name="has_post_occupancy"
          label={fieldLabel.hasPostOccupancy}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.has_post_occupancy ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['has_post_occupancy'] ?? ''}
        />

        <UnitItem>
          <FeeAdvance
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            readOnly={true}
          />
        </UnitItem>

        <UnitItem>
          <Expense
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            readOnly={true}
          />
        </UnitItem>

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.leaseback3DayReminderSentBy}
            value={data?.leaseback_3_sent_by_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.leaseback3DayReminderSentBy}
            value={{
              label: data?.leaseback_3_sent_by_name,
              value: data?.leaseback_3_sent_by
            }}
            onChange={(val: any) => {
              handleChange({
                leaseback_3_sent_by_name: val?.label,
                leaseback_3_sent_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitSelect
          name="lease_type"
          label={fieldLabel.leaseType}
          records={getObjectEntriesAsArray(leaseType)}
          value={data?.lease_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['lease_type'] ?? ''}
        />

        <UnitDate
          name="leaseback_3_sent_at"
          label={fieldLabel.leaseback3DayReminderSentAt}
          value={data?.leaseback_3_sent_at ? data?.leaseback_3_sent_at : null}
          onChange={(e) =>
            handleChange({
              target: { name: 'leaseback_3_sent_at', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitDate
          name="lease_end_date"
          label={fieldLabel.leaseEndDate}
          value={data?.lease_end_date ? data?.lease_end_date : null}
          onChange={(e) =>
            handleChange({
              target: { name: 'lease_end_date', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitSwitch
          value={data?.lease_agreement_received ?? 0}
          onChange={handleChange}
          name="lease_agreement_received"
          label={fieldLabel.leaseArgumentReceived}
          disabled={readOnly}
        />

        <UnitPriceFormatter
          name="deposit_amount"
          value={data?.deposit_amount}
          onChange={onChange}
          label={fieldLabel.depositAmount}
          readOnly={readOnly}
          error={valMessages['deposit_amount'] ?? ''}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.leaseback1DayReminderSentBy}
            value={data?.leaseback_1_sent_by_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.leaseback1DayReminderSentBy}
            value={{
              label: data?.leaseback_1_sent_by_name,
              value: data?.leaseback_1_sent_by
            }}
            onChange={(val: any) => {
              handleChange({
                leaseback_1_sent_by_name: val?.label,
                leaseback_1_sent_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitPriceFormatter
          name="rental_amount"
          value={data?.rental_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.rentalAmount}
          readOnly={readOnly}
          error={valMessages['rental_amount'] ?? ''}
        />

        <UnitDate
          name="leaseback_1_sent_at"
          label={fieldLabel.leaseback1DayReminderSentAt}
          value={data?.leaseback_1_sent_at ? data?.leaseback_1_sent_at : null}
          onChange={(e) =>
            handleChange({
              target: { name: 'leaseback_1_sent_at', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitSelect
          name="solar_panel_leased_or_owned"
          label={fieldLabel.leaseOwned}
          records={getObjectEntriesAsArray(solarPanelLeaseOwned)}
          value={data?.solar_panel_leased_or_owned ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="solar_panel_payoff_amount"
          value={data?.solar_panel_payoff_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.payoffAmount}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitDate
          name="solar_panel_lease_date_expiration"
          label={fieldLabel.solarPanelLeaseDateExpiration}
          value={
            data?.solar_panel_lease_date_expiration
              ? data?.solar_panel_lease_date_expiration
              : null
          }
          onChange={(e) =>
            handleChange({
              target: {
                name: 'solar_panel_lease_date_expiration',
                value: e
              }
            })
          }
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="cda_amount_2"
          value={data?.cda_amount_2 ?? ''}
          onChange={handleChange}
          label={fieldLabel.CsaAmount2}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.CdaPayTo2}
          name="cda_pay_to_2"
          value={data?.cda_pay_to_2 ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="cda_amount_3"
          value={data?.cda_amount_3 ?? ''}
          onChange={handleChange}
          label={fieldLabel.CsaAmount3}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.CdaPayTo3}
          name="cda_pay_to_3"
          value={data?.cda_pay_to_3 ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.QbInvoiceNumber}
          name="qb_invoice_no"
          value={data?.qb_invoice_no ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          name="contract_amendment_date_c"
          label={fieldLabel.contractAmendmentDate}
          value={
            data?.contract_amendment_date_c
              ? data?.contract_amendment_date_c
              : null
          }
          onChange={(e) =>
            handleChange({
              target: { name: 'contract_amendment_date_c', value: e }
            })
          }
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="escalation_clause_amount"
          value={data?.escalation_clause_amount ?? ''}
          onChange={handleChange}
          label={fieldLabel.escalationClauseAmount}
          readOnly={readOnly}
        />

        <UnitSelect
          name="due_diligence_days_confirm"
          label={fieldLabel.dueDiligenceDaysConfirm}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.due_diligence_days_confirm ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="hoa_addendum_received"
          label={fieldLabel.hoaAddendumReceived}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.hoa_addendum_received ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="earnest_amount_verified"
          label={fieldLabel.earnestAmountVerified}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.earnest_amount_verified ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="option_fee_verified"
          label={fieldLabel.optionFeeVerified}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.option_fee_verified ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default SettlementRecordView;
