import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import fieldLabel from 'assets/constants/fieldLabel';
import leaseType from 'assets/constants/lease-type';
import leasedOwned from 'assets/constants/leased-owned';
import optionDaysType from 'assets/constants/option-days-type';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitHeading from 'components/form/unit-heading';
import UnitItem from 'components/form/unit-item';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { actionPerform } from 'event/action-event';
import FieldChooser from 'features/dashboards/field-chooser/field-chooser';
import { fieldOptions } from 'features/dashboards/field-chooser/fields';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import validationService from 'services/validation-service';
import { ObjectType } from 'types';
import UnitPriceFormatter from 'components/form/unit-price-formatter';

function stringToFloat(value: any) {
  if (isNaN(value) || value == '' || value == null) {
    return 0.0;
  }

  return parseFloat(value);
}

function toUSDFormat(value: any) {
  let floatValue = stringToFloat(value);

  return floatValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

const RecordView = ({
  onClose,
  currentTab,
  oppurtunity
}: {
  oppurtunity: ObjectType;
  onClose?: any;
  currentTab?: string;
}) => {
  let { action } = useParams<ObjectType>();
  const navigate = useNavigate();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [fields, setFields] = useState(fieldOptions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunityStatusList.offer_seller_countered,
    initial_offer_price_c: oppurtunity?.initial_offer_price_c || '',
    offer_price_c: oppurtunity?.offer_price_c || '',
    max_offer_price_c: oppurtunity?.max_offer_price_c || '',
    list_price_c: oppurtunity?.list_price_c || '',
    counter_offer_price_c: oppurtunity?.counter_offer_price_c || '',
    counter_offer: oppurtunity?.counter_offer || '',
    option_period_days_c: oppurtunity?.option_period_days_c || '',
    option_days_type_c: oppurtunity?.option_days_type_c || '',
    option_amount_c: oppurtunity?.option_amount_c || '',
    exclusion: oppurtunity?.exclusion || '',
    inclusion: oppurtunity?.inclusion || '',
    earnest_amount_c: oppurtunity?.earnest_amount_c || '',
    close_date_c: oppurtunity?.close_date_c || '',
    lease_end_date: oppurtunity?.lease_end_date || '',
    deposit_amount: oppurtunity?.deposit_amount || '',
    rental_amount: oppurtunity?.rental_amount || '',
    lease_type: oppurtunity?.lease_type || '',
    additional_terms_comments_c: oppurtunity?.additional_terms_comments_c || '',
    solar_panel_leased_or_owned: oppurtunity?.solar_panel_leased_or_owned || '',
    solar_panel_payoff_amount: oppurtunity?.solar_panel_payoff_amount || '',
    solar_panel_lease_date_expiration:
      oppurtunity?.solar_panel_lease_date_expiration || '',
    other_counter_offer_terms: oppurtunity?.other_counter_offer_terms || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    let fieldToCheck = ['counter_offer_price_c', 'counter_offer'];
    const selected_categories = [];
    for (const field of Object.values(fields)) {
      if (field.checked == true) {
        selected_categories.push(field.name);
      }
    }

    const { status, ...errors } = validationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    setValidation(errors);
    if (!status && oppurtunity?.id) {
      const reqBody = {
        counter_offer_price_c: data?.counter_offer_price_c,
        counter_offer: data?.counter_offer,
        option_period_days_c: data?.option_period_days_c,
        option_days_type_c: data?.option_days_type_c,
        option_amount_c: data?.option_amount_c,
        exclusion: data?.exclusion,
        inclusion: data?.inclusion,
        earnest_amount_c: data?.earnest_amount_c,
        close_date_c: data?.close_date_c,
        lease_end_date: data?.lease_end_date,
        deposit_amount: data?.deposit_amount,
        rental_amount: data?.rental_amount,
        lease_type: data?.lease_type,
        additional_terms_comments_c: data?.additional_terms_comments_c,
        solar_panel_leased_or_owned: data?.solar_panel_leased_or_owned,
        solar_panel_payoff_amount: data?.solar_panel_payoff_amount,
        solar_panel_lease_date_expiration:
          data?.solar_panel_lease_date_expiration,
        other_counter_offer_terms: data?.other_counter_offer_terms,
        selected_categories: selected_categories
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity?.id,
        reqBody,
        'counter_offer_receipt'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.counter_offer();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  const handleCheck = (e: any) => {
    setFields(() => {
      for (const field of Object.values(fields)) {
        if (field.name.includes(e.target.id)) {
          field.checked = !field.checked;
        }
      }
      return { ...fields };
    });
  };

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxContent
          sx={{
            height: 'calc(100vh - 45vh)',
            overflowY: 'auto',
            p: 2
          }}
        >
          <FormContainer>
            <UnitItem grid={{ xs: 12, sm: 3 }} p={2}>
              <FieldChooser data={fields} setFields={handleCheck} />
            </UnitItem>

            <UnitRead
              label={fieldLabel.initialOfferPrice}
              value={`${toUSDFormat(oppurtunity?.initial_offer_price_c)}`}
              grid={{ xs: 12, sm: 2 }}
              labelsx={{ pr: 1 }}
            />
            <UnitRead
              label={fieldLabel.offerPrice}
              value={`${toUSDFormat(oppurtunity?.offer_price_c)}`}
              grid={{ xs: 12, sm: 2 }}
              labelsx={{ pr: 1 }}
            />
            <UnitRead
              label={fieldLabel.maxOfferPrice}
              value={`${toUSDFormat(oppurtunity?.max_offer_price_c)}`}
              grid={{ xs: 12, sm: 2 }}
              labelsx={{ pr: 1 }}
            />
            <UnitRead
              label={fieldLabel.listPrice}
              value={`${toUSDFormat(oppurtunity?.list_price_c)}`}
              grid={{ xs: 12, sm: 2 }}
              labelsx={{ pr: 1 }}
            />

            <UnitItem grid={{ xs: 12, sm: 12 }} p={2}>
              <StackRowWithDivider />
            </UnitItem>

            {fields.price && fields.price.checked && (
              <>
                <StackRowWithDivider />
                <UnitHeading title="Price" />

                <UnitPriceFormatter
                  label={`${fieldLabel.counterOfferPrice}*`}
                  name="counter_offer_price_c"
                  value={data.counter_offer_price_c ?? ''}
                  onChange={handleChange}
                  error={validation['counter_offer_price_c'] ?? ''}
                />

                <UnitText
                  label={fieldLabel.counterOffer}
                  name="counter_offer"
                  value={data.counter_offer ?? ''}
                  onChange={handleChange}
                  error={validation['counter_offer'] ?? ''}
                  multiline
                  rows={3}
                  required
                />
              </>
            )}
            {fields.diligence_period && fields.diligence_period.checked && (
              <>
                <UnitHeading title="Dilligence Period" />

                <UnitText
                  label={fieldLabel.optionPeriodDays}
                  name="option_period_days_c"
                  value={data.option_period_days_c ?? ''}
                  onChange={handleChange}
                  error={validation['option_period_days_c'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />

                <UnitSelect
                  name="option_days_type_c"
                  label={fieldLabel.optionDaysType}
                  records={getObjectEntriesAsArray(optionDaysType)}
                  value={data.option_days_type_c ?? ''}
                  onChange={handleChange}
                  error={validation['option_days_type_c'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />

                <UnitPriceFormatter
                  label={fieldLabel.optionAmount}
                  name="option_amount_c"
                  value={data.option_amount_c ?? ''}
                  onChange={handleChange}
                  error={validation['option_amount_c'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />
              </>
            )}
            {fields.exclusions_inclusions &&
              fields.exclusions_inclusions.checked && (
                <>
                  <UnitHeading title="Exclusions/Inclusions" />

                  <UnitText
                    label={fieldLabel.exclusion}
                    name="exclusion"
                    value={data.exclusion ?? ''}
                    onChange={handleChange}
                    error={validation['exclusion'] ?? ''}
                    multiline
                    rows={4}
                  />

                  <UnitText
                    label={fieldLabel.inclusion}
                    name="inclusion"
                    value={data.inclusion ?? ''}
                    onChange={handleChange}
                    error={validation['inclusion'] ?? ''}
                    multiline
                    rows={4}
                  />
                </>
              )}
            {fields.earnest_money && fields.earnest_money.checked && (
              <>
                <UnitHeading title="Earnest Money" />

                <UnitPriceFormatter
                  label={fieldLabel.earnestAmount}
                  name="earnest_amount_c"
                  value={data.earnest_amount_c ?? ''}
                  onChange={handleChange}
                  error={validation['earnest_amount_c'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />
              </>
            )}
            {fields.close_date && fields.close_date.checked && (
              <>
                <UnitHeading title="Close Date" />

                <UnitDate
                  label={fieldLabel.closeDate}
                  name="close_date_c"
                  value={data.close_date_c ?? ''}
                  onChange={(e: any) =>
                    handleChange({
                      target: { name: 'close_date_c', value: e }
                    })
                  }
                  error={validation['close_date_c'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />
              </>
            )}
            {fields.post_occupancy && fields.post_occupancy.checked && (
              <>
                <UnitHeading title="Post Occupancy" />

                <UnitDate
                  label={fieldLabel.leaseEndDate}
                  name="lease_end_date"
                  value={data.lease_end_date ?? ''}
                  onChange={(e: any) =>
                    handleChange({
                      target: { name: 'lease_end_date', value: e }
                    })
                  }
                  error={validation['lease_end_date'] ?? ''}
                  grid={{ xs: 12, sm: 3 }}
                />

                <UnitPriceFormatter
                  label={fieldLabel.depositAmount}
                  name="deposit_amount"
                  value={data.deposit_amount ?? ''}
                  onChange={handleChange}
                  error={validation['deposit_amount'] ?? ''}
                  grid={{ xs: 12, sm: 3 }}
                />

                <UnitPriceFormatter
                  label={fieldLabel.rentalAmount}
                  name="rental_amount"
                  value={data.rental_amount ?? ''}
                  onChange={handleChange}
                  error={validation['rental_amount'] ?? ''}
                  grid={{ xs: 12, sm: 3 }}
                />

                <UnitSelect
                  name="lease_type"
                  label={fieldLabel.leaseType}
                  records={getObjectEntriesAsArray(leaseType)}
                  value={data.lease_type ?? ''}
                  onChange={handleChange}
                  error={validation['lease_type'] ?? ''}
                  grid={{ xs: 12, sm: 3 }}
                />
              </>
            )}
            {fields.special_provisions && fields.special_provisions.checked && (
              <>
                <UnitHeading title="Special Provisions" />

                <UnitText
                  label={fieldLabel.additionalTermsComments}
                  name="additional_terms_comments_c"
                  value={data.additional_terms_comments_c ?? ''}
                  onChange={handleChange}
                  error={validation['additional_terms_comments_c'] ?? ''}
                  multiline
                  rows={10}
                  grid={{ xs: 12, sm: 12 }}
                />
              </>
            )}
            {fields.solar_panels && fields.solar_panels.checked && (
              <>
                <UnitHeading title="Solar Panels" />

                <UnitSelect
                  name="solar_panel_leased_or_owned"
                  label={fieldLabel.leaseOwned}
                  records={getObjectEntriesAsArray(leasedOwned)}
                  value={data.solar_panel_leased_or_owned ?? ''}
                  onChange={handleChange}
                  error={validation['solar_panel_leased_or_owned'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />

                <UnitPriceFormatter
                  label={fieldLabel.payoffAmount}
                  name="solar_panel_payoff_amount"
                  value={data.solar_panel_payoff_amount ?? ''}
                  onChange={handleChange}
                  error={validation['solar_panel_payoff_amount'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />

                <UnitDate
                  label={fieldLabel.leaseDateExpiration}
                  name="solar_panel_lease_date_expiration"
                  value={data.solar_panel_lease_date_expiration ?? ''}
                  onChange={(e: any) =>
                    handleChange({
                      target: {
                        name: 'solar_panel_lease_date_expiration',
                        value: e
                      }
                    })
                  }
                  error={validation['solar_panel_lease_date_expiration'] ?? ''}
                  grid={{ xs: 12, sm: 4 }}
                />
              </>
            )}
            {fields.other && fields.other.checked && (
              <>
                <UnitHeading title="Other Counter Offer Terms" />

                <UnitText
                  label={fieldLabel.otherCounterOfferTerms}
                  name="other_counter_offer_terms"
                  value={data.other_counter_offer_terms ?? ''}
                  onChange={handleChange}
                  error={validation['other_counter_offer_terms'] ?? ''}
                  multiline
                  rows={3}
                  grid={{ xs: 12, sm: 6 }}
                />
              </>
            )}
          </FormContainer>
        </PaperBoxContent>
        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <SaveButton onClick={handleSubmit} disabled={isLoading} />
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};
export default RecordView;
