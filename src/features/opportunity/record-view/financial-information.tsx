import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitText from 'components/form/unit-text';
import React from 'react';
import { ObjectType } from 'types';
import UnitSelect from 'components/form/unit-select';
import UnitEmpty from 'components/form/unit-empty';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitDate from 'components/form/unit-date';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import yesNo from 'assets/constants/yes-no';
import typeOfFinanacing from 'assets/constants/type-of-finanacing';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  changeHandle?: (e: any) => any;
  effectHandle?: (e: any) => any;
  setField?: (e: any) => any;
  readOnly?: boolean;
}

const FinancialInformationRecordView = ({
  oppurtunity,
  oldOppurtunity,
  readOnly = false,
  changeHandle,
  setField,
  effectHandle,
  validation
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let onChange = effectHandle ?? emptyFunction;
  let valMessages = validation ?? {};

  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitPriceFormatter
          name="list_price_c"
          value={data.list_price_c}
          onChange={handleChange}
          label={fieldLabel.listPrice}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="sold_price"
          value={data.sold_price}
          onChange={handleChange}
          label={fieldLabel.soldPrice}
          error={valMessages['sold_price'] ?? ''}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.counterOffer}
          name="counter_offer"
          value={data.counter_offer ?? ''}
          onChange={handleChange}
          error={valMessages['counter_offer'] ?? ''}
          multiline
          rows={4}
          readOnly={readOnly}
        />

        <UnitEmpty />
        <UnitEmpty />

        <UnitDate
          label={fieldLabel.saleDate}
          name="sale_date"
          value={data.sale_date ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'sale_date', value: e }
            })
          }
          error={valMessages['sale_date'] ?? ''}
          required
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="earnest_amount_c"
          value={data.earnest_amount_c}
          onChange={onChange}
          label={fieldLabel.earnestAmount}
          error={valMessages['earnest_amount_c'] ?? ''}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="option_amount_c"
          value={data.option_amount_c}
          onChange={onChange}
          label={fieldLabel.optionAmount}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="additional_earnest_money_c"
          value={data.additional_earnest_money_c}
          onChange={handleChange}
          label={fieldLabel.additionalEarnestMoney}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="hoa_fees_monthly_c"
          value={data.hoa_fees_monthly_c}
          onChange={handleChange}
          label={fieldLabel.monthlyHOAFees}
          readOnly={readOnly}
        />

        <UnitSelect
          name="seller_closing_costs_c"
          label={fieldLabel.sellerClosingCosts}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.seller_closing_costs_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="seller_closing_support_c"
          value={data.seller_closing_support_c}
          onChange={handleChange}
          label={fieldLabel.sellerClosingSupport}
          readOnly={readOnly}
        />

        <UnitSelect
          name="financing_c"
          label={fieldLabel.financing}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.financing_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="financing_amount_c"
          value={data.financing_amount_c}
          onChange={onChange}
          label={fieldLabel.financingAmount}
          readOnly={readOnly}
        />

        <UnitSelect
          name="type_of_financing_c"
          label={fieldLabel.typeOfFinancing}
          records={getObjectEntriesAsArray(typeOfFinanacing)}
          value={data.type_of_financing_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="initial_interest_rate_c"
          label={fieldLabel.initialInterestRate}
          value={oppurtunity.initial_interest_rate_c}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitPercentageFormatter
          name="loan_percent_c"
          label={fieldLabel.loanPercentage}
          value={oppurtunity.loan_percent_c}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="appraisal_required_c"
          label={fieldLabel.appraisalRequired}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.appraisal_required_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.initialFinancialTermYears}
          name="initial_financing_term_years_c"
          value={data.initial_financing_term_years_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitPriceFormatter
          name="rent_avm_c"
          value={data.rent_avm_c}
          onChange={handleChange}
          label={fieldLabel.rentAVM}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="sale_avm_c"
          value={data.sale_avm_c}
          onChange={onChange}
          label={fieldLabel.saleAVM}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="rent_avm_actual"
          value={data.rent_avm_actual}
          onChange={handleChange}
          label={fieldLabel.rentAVMActual}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="sale_avm_actual"
          value={data.sale_avm_actual}
          onChange={handleChange}
          label={fieldLabel.saleAVMActual}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="opportunity_rehab_c"
          value={data.opportunity_rehab_c}
          onChange={handleChange}
          label={fieldLabel.opportunityRehab}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="actual_rehab_c"
          value={data.actual_rehab_c}
          onChange={handleChange}
          label={fieldLabel.actualRehab}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="calculated_tax_c"
          value={data.calculated_tax_c}
          onChange={handleChange}
          label={fieldLabel.calculatedTax}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitSelect
          name="earnest_recovered_by_buyer"
          label={fieldLabel.emRecoveredByBuyer}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.earnest_recovered_by_buyer ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['earnest_recovered_by_buyer'] ?? ''}
        />

        <UnitPriceFormatter
          name="earnest_recovery_amount"
          value={data.earnest_recovery_amount}
          onChange={handleChange}
          label={fieldLabel.emRecoveryAmount}
          readOnly={readOnly}
          error={valMessages['em_recovery_amount'] ?? ''}
        />

        <UnitSelect
          name="earnest_paid_by_entera"
          label={fieldLabel.emPaidByEntera}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.earnest_paid_by_entera ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={valMessages['earnest_paid_by_entera'] ?? ''}
        />

        <UnitPriceFormatter
          name="earnest_paid_by_entera_amount"
          value={data.earnest_paid_by_entera_amount}
          onChange={handleChange}
          label={fieldLabel.emPaidByEnteraAmount}
          readOnly={readOnly}
          error={valMessages['em_paid_by_enatera_amount'] ?? ''}
        />

        <UnitPriceFormatter
          name="negotiator_sent_retrade_amount"
          value={data.negotiator_sent_retrade_amount}
          onChange={handleChange}
          label={fieldLabel.negotiatorSentRetradeAmount}
          readOnly={readOnly}
        />

        <UnitPriceFormatter
          name="buyer_requested_retrade_amount"
          value={data.buyer_requested_retrade_amount}
          onChange={handleChange}
          label={fieldLabel.buyerSentRetradeAmount}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default FinancialInformationRecordView;
