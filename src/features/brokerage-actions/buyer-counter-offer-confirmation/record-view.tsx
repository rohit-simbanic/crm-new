import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import buyerCounterSelectStatus from 'assets/constants/buyer-counter-select-status';
import fieldLabel from 'assets/constants/fieldLabel';
import leaseType from 'assets/constants/lease-type';
import optionDaysType from 'assets/constants/option-days-type';
import solarPanelLeaseOwned from 'assets/constants/solar-panel-lease-owned';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitHeading from 'components/form/unit-heading';
import UnitItem from 'components/form/unit-item';
import UnitLabel from 'components/form/unit-label';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { actionPerform } from 'event/action-event';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import counterOfferService from 'services/counter-offer-service';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import { isEmpty } from 'helpers/misc-helper';

const RecordView = ({
  oppurtunity,
  onClose,
  currentTab
}: {
  oppurtunity: ObjectType;
  onClose?: any;
  currentTab?: string;
}) => {
  function toUSDFormat(value: any) {
    let floatValue = stringToFloat(value);

    return floatValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  function stringToFloat(value: any) {
    if (isNaN(value) || value == '' || value == null) {
      return 0.0;
    }

    return parseFloat(value);
  }

  const navigate = useNavigate();

  let { action } = useParams<ObjectType>();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ObjectType>({
    opportunity_status_c: oppurtunityStatusList.Offer_counter_updated,
    counter_offer_price_status:
      oppurtunity?.opportunity_counter_offer?.counter_offer_price_status || '',
    initial_offer_price_c: oppurtunity?.initial_offer_price_c || '',
    offer_price_c: oppurtunity?.offer_price_c || '',
    max_offer_price_c: oppurtunity?.max_offer_price_c || '',
    counter_offer_price_c:
      oppurtunity?.opportunity_counter_offer?.counter_offer_price_c || '',
    counter_offer_status:
      oppurtunity?.opportunity_counter_offer?.counter_offer_status || '',
    counter_offer: oppurtunity?.opportunity_counter_offer?.counter_offer || '',
    receipt_date: oppurtunity?.receipt_date || '',
    received_from: oppurtunity?.received_from || '',
    response_amount: oppurtunity?.response_amount || '',
    response_terms: oppurtunity?.response_terms || '',
    notes: oppurtunity?.notes || '',
    buyer_notes: oppurtunity?.buyer_notes || '',
    option_period_status:
      oppurtunity?.opportunity_counter_offer?.option_period_status || '',
    option_period_days_c:
      oppurtunity?.opportunity_counter_offer?.option_period_days_c || '',
    option_days_type_status:
      oppurtunity?.opportunity_counter_offer?.option_days_type_status || '',
    option_days_type_c:
      oppurtunity?.opportunity_counter_offer?.option_days_type_c || '',
    option_amount_status:
      oppurtunity?.opportunity_counter_offer?.option_amount_status || '',
    option_amount_c:
      oppurtunity?.opportunity_counter_offer?.option_amount_c || '',
    commission_status:
      oppurtunity?.opportunity_counter_offer?.commission_status || '',
    initial_commission_percentage:
      oppurtunity?.initial_commission_percentage || '',
    due_diligence_fee_status:
      oppurtunity?.opportunity_counter_offer?.due_diligence_fee_status || '',
    due_diligence_fee: oppurtunity?.due_diligence_fee || '',
    preferred_title_status:
      oppurtunity?.opportunity_counter_offer?.preferred_title_status || '',
    preferred_title: oppurtunity?.preferred_title || '',
    exclusion_status:
      oppurtunity?.opportunity_counter_offer?.exclusion_status || '',
    exclusion: oppurtunity?.opportunity_counter_offer?.exclusion || '',
    inclusion_status:
      oppurtunity?.opportunity_counter_offer?.inclusion_status || '',
    inclusion: oppurtunity?.opportunity_counter_offer?.inclusion || '',
    earnest_amount_status:
      oppurtunity?.opportunity_counter_offer?.earnest_amount_status || '',
    earnest_amount_c:
      oppurtunity?.opportunity_counter_offer?.earnest_amount_c || '',
    close_date_status:
      oppurtunity?.opportunity_counter_offer?.close_date_status || '',
    close_date_c: oppurtunity?.opportunity_counter_offer?.close_date_c || '',
    lease_end_date_status:
      oppurtunity?.opportunity_counter_offer?.lease_end_date_status || '',
    lease_end_date:
      oppurtunity?.opportunity_counter_offer?.lease_end_date || '',
    deposit_amount_status:
      oppurtunity?.opportunity_counter_offer?.deposit_amount_status || '',
    deposit_amount:
      oppurtunity?.opportunity_counter_offer?.deposit_amount || '',
    rental_amount_status:
      oppurtunity?.opportunity_counter_offer?.rental_amount_status || '',
    rental_amount: oppurtunity?.opportunity_counter_offer?.rental_amount || '',
    lease_type_status:
      oppurtunity?.opportunity_counter_offer?.lease_type_status || '',
    lease_type: oppurtunity?.opportunity_counter_offer?.lease_type || '',
    additional_terms_comment_status:
      oppurtunity?.opportunity_counter_offer?.additional_terms_comment_status ||
      '',
    additional_terms_comments_c:
      oppurtunity?.opportunity_counter_offer?.additional_terms_comments_c || '',
    leased_or_owned_status:
      oppurtunity?.opportunity_counter_offer?.leased_or_owned_status || '',
    solar_panel_leased_or_owned:
      oppurtunity?.opportunity_counter_offer?.solar_panel_leased_or_owned || '',
    payoff_amount_status:
      oppurtunity?.opportunity_counter_offer?.payoff_amount_status || '',

    solar_panel_payoff_amount:
      oppurtunity?.opportunity_counter_offer?.solar_panel_payoff_amount || '',
    lease_date_expiration_status:
      oppurtunity?.opportunity_counter_offer?.lease_date_expiration_status ||
      '',
    solar_panel_lease_date_expiration:
      oppurtunity?.opportunity_counter_offer
        ?.solar_panel_lease_date_expiration || '',
    other_counter_offer_terms_status:
      oppurtunity?.opportunity_counter_offer
        ?.other_counter_offer_terms_status || '',
    other_counter_offer_terms:
      oppurtunity?.opportunity_counter_offer?.other_counter_offer_terms || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['counter_offer_price_c', 'counter_offer'],
      'action'
    );
    setValidation(errors);

    if (!status && oppurtunity.id) {
      const reqBody = {
        counter_offer_price_status: data.counter_offer_price_status,
        counter_offer_price_c: data.counter_offer_price_c,
        counter_offer_status: data.counter_offer_status,
        counter_offer: data.counter_offer,
        receipt_date: data.receipt_date,
        received_from: data.received_from,
        response_amount: data.response_amount,
        response_terms: data.response_terms,
        notes: data.notes,
        buyer_notes: data.buyer_notes,
        option_period_status: data.option_period_status,
        option_period_days_c: data.option_period_days_c,
        option_days_type_status: data.option_days_type_status,
        option_days_type_c: data.option_days_type_c,
        option_amount_status: data.option_amount_status,
        option_amount_c: data.option_amount_c,
        commission_status: data.commission_status,
        initial_commission_percentage: data.initial_commission_percentage,
        due_diligence_fee_status: data.due_diligence_fee_status,
        due_diligence_fee: data.due_diligence_fee,
        preferred_title_status: data.preferred_title_status,
        preferred_title: data.preferred_title,
        exclusion_status: data.exclusion_status,
        exclusion: data.exclusion,
        inclusion_status: data.inclusion_status,
        inclusion: data.inclusion,
        earnest_amount_status: data.earnest_amount_status,
        earnest_amount_c: data.earnest_amount_c,
        close_date_status: data.close_date_status,
        close_date_c: data.close_date_c,
        lease_end_date_status: data.lease_end_date_status,
        lease_end_date: data.lease_end_date,
        deposit_amount_status: data.deposit_amount_status,
        deposit_amount: data.deposit_amount,
        rental_amount_status: data.rental_amount_status,
        rental_amount: data.rental_amount,
        lease_type_status: data.lease_type_status,
        lease_type: data.lease_type,
        additional_terms_comment_status: data.additional_terms_comment_status,
        additional_terms_comments_c: data.additional_terms_comments_c,
        leased_or_owned_status: data.leased_or_owned_status,
        solar_panel_leased_or_owned: data.solar_panel_leased_or_owned,
        payoff_amount_status: data.payoff_amount_status,
        solar_panel_payoff_amount: data.solar_panel_payoff_amount,
        lease_date_expiration_status: data.lease_date_expiration_status,
        solar_panel_lease_date_expiration:
          data.solar_panel_lease_date_expiration,
        other_counter_offer_terms_status: data.other_counter_offer_terms_status,
        other_counter_offer_terms: data.other_counter_offer_terms
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'buyer_counteroffer_confirmation'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.buyer_counter_offer();
        } else {
          navigate(`/opportunities/${oppurtunity.id}/view`);
          eventBus.dispatch('refresh_opportunity', {});
        }
      }
    }
  };

  const loadData = async () => {
    const responce = await counterOfferService.get(
      oppurtunity.opportunity_counteroffer_id
    );

    let result = {
      ...responce.data,
      selected_categories: responce.data.selected_categories.split(',')
    };

    setData(result);
  };

  useEffect(() => {
    if (!isEmpty(oppurtunity?.opportunity_counteroffer_id)) {
      loadData();
    }
  }, []);

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
            <UnitRead
              label={fieldLabel.initialOfferPrice}
              value={`${toUSDFormat(oppurtunity?.initial_offer_price_c)}`}
              grid={{ xs: 12, sm: 3 }}
              labelsx={{ pr: 1 }}
            />
            <UnitRead
              label={fieldLabel.offerPrice}
              value={`${toUSDFormat(oppurtunity?.offer_price_c)}`}
              grid={{ xs: 12, sm: 3 }}
              labelsx={{ pr: 1 }}
            />
            <UnitRead
              label={fieldLabel.maxOfferPrice}
              value={`${toUSDFormat(oppurtunity?.max_offer_price_c ?? 0)}`}
              grid={{ xs: 12, sm: 3 }}
              labelsx={{ pr: 1 }}
            />
          </FormContainer>

          <StackRowWithDivider />

          <FormContainer>
            <UnitHeading title="Price" />
            <UnitItem>
              <FormContainer>
                <UnitLabel
                  label="Counter Offer Price:"
                  grid={{ xs: 8, sm: 8 }}
                />

                <UnitSelect
                  name="counter_offer_price_status"
                  records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                  value={data?.counter_offer_price_status ?? ''}
                  onChange={handleChange}
                  grid={{ xs: 4, sm: 4 }}
                />
              </FormContainer>

              <UnitPriceFormatter
                name="counter_offer_price_c"
                value={data?.counter_offer_price_c}
                onChange={handleChange}
                grid={{ xs: 12, sm: 12 }}
                error={validation['counter_offer_price_c'] ?? ''}
                label=""
              />
            </UnitItem>

            <UnitItem>
              <FormContainer>
                <UnitLabel
                  label="Actual Counter Content:"
                  grid={{ xs: 8, sm: 8 }}
                />

                <UnitSelect
                  name="counter_offer_status"
                  value={data?.counter_offer_status}
                  onChange={handleChange}
                  records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                  grid={{ xs: 4, sm: 4 }}
                />
              </FormContainer>

              <UnitText
                name="counter_offer"
                value={data?.counter_offer}
                onChange={handleChange}
                grid={{ xs: 12, sm: 12 }}
                error={validation['counter_offer'] ?? ''}
                multiline
                rows={3}
                label=""
              />
            </UnitItem>
          </FormContainer>

          <FormContainer>
            <UnitHeading title="Buyer Counter Offer" />
            <UnitDate
              label={fieldLabel.buyerCounterofferReceiptDate}
              name="receipt_date"
              value={data?.receipt_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'receipt_date', value: e }
                })
              }
              error={validation['receipt_date'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.buyerCounterofferReceivedFrom}
              name="received_from"
              value={data?.received_from}
              onChange={handleChange}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={fieldLabel.buyerCounterofferResponseAmount}
              name="response_amount"
              value={data?.response_amount}
              onChange={handleChange}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.counterofferResponseTerms}
              name="response_terms"
              value={data?.response_terms}
              onChange={handleChange}
              multiline
              rows={3}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.counterofferNotes}
              name="notes"
              value={data?.notes}
              onChange={handleChange}
              multiline
              rows={3}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.buyerNotes}
              name="buyer_notes"
              value={data?.buyer_notes}
              onChange={handleChange}
              multiline
              rows={3}
              grid={{ xs: 12, sm: 4 }}
            />
          </FormContainer>

          {data?.selected_categories &&
          data?.selected_categories.includes('diligence_period') ? (
            <FormContainer>
              <UnitHeading title="Dilligence Period" />

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel label="Option Period:" grid={{ xs: 8, sm: 6 }} />

                  <UnitSelect
                    name="option_period_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.option_period_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['option_period_status'] ?? ''}
                  />
                </FormContainer>

                <UnitText
                  name="option_period_days_c"
                  value={data?.option_period_days_c}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel
                    label="Option Days Type:"
                    grid={{ xs: 8, sm: 6 }}
                  />

                  <UnitSelect
                    name="option_days_type_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.option_days_type_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['option_days_type_status'] ?? ''}
                  />
                </FormContainer>

                <UnitSelect
                  name="option_days_type_c"
                  records={getObjectEntriesAsArray(optionDaysType)}
                  value={data?.option_days_type_c ?? ''}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  error={validation['option_days_type_c'] ?? ''}
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel label="Option Amount:" grid={{ xs: 8, sm: 6 }} />

                  <UnitSelect
                    name="option_amount_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.option_amount_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['option_amount_status'] ?? ''}
                  />
                </FormContainer>

                <UnitPriceFormatter
                  name="option_amount_c"
                  value={data?.option_amount_c}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel label="Commissions:" grid={{ xs: 8, sm: 6 }} />

                  <UnitSelect
                    name="commission_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.commission_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['commission_status'] ?? ''}
                  />
                </FormContainer>

                <UnitPercentageFormatter
                  name="initial_commission_percentage"
                  value={data?.initial_commission_percentage}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel
                    label="Due Diligence Fees:"
                    grid={{ xs: 8, sm: 6 }}
                  />

                  <UnitSelect
                    name="due_diligence_fee_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.due_diligence_fee_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['due_diligence_fee_status'] ?? ''}
                  />
                </FormContainer>

                <UnitPriceFormatter
                  name="due_diligence_fee"
                  value={data?.due_diligence_fee}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }}>
                <FormContainer>
                  <UnitLabel label="Preferred Title:" grid={{ xs: 8, sm: 6 }} />

                  <UnitSelect
                    name="preferred_title_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.preferred_title_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['preferred_title_status'] ?? ''}
                  />
                </FormContainer>

                <UnitText
                  name="preferred_title"
                  value={data?.preferred_title}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>
            </FormContainer>
          ) : (
            <FormContainer>
              <UnitItem grid={{ xs: 12, sm: 4 }} sx={{ marginTop: 1 }}>
                <FormContainer>
                  <UnitLabel
                    label="Due Diligence Fees:"
                    grid={{ xs: 8, sm: 6 }}
                  />

                  <UnitSelect
                    name="due_diligence_fee_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.due_diligence_fee_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['due_diligence_fee_status'] ?? ''}
                  />
                </FormContainer>

                <UnitPriceFormatter
                  name="due_diligence_fee"
                  value={data?.due_diligence_fee}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>

              <UnitItem grid={{ xs: 12, sm: 4 }} sx={{ marginTop: 1 }}>
                <FormContainer>
                  <UnitLabel label="Preferred Title:" grid={{ xs: 8, sm: 6 }} />

                  <UnitSelect
                    name="preferred_title_status"
                    records={getObjectEntriesAsArray(buyerCounterSelectStatus)}
                    value={data?.preferred_title_status ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 4, sm: 6 }}
                    error={validation['preferred_title_status'] ?? ''}
                  />
                </FormContainer>

                <UnitText
                  name="preferred_title"
                  value={data?.preferred_title}
                  onChange={handleChange}
                  grid={{ xs: 12, sm: 12 }}
                  label=""
                />
              </UnitItem>
            </FormContainer>
          )}

          {data?.selected_categories &&
            data?.selected_categories.includes('exclusions_inclusions') && (
              <FormContainer>
                <UnitHeading title="Exclusions/Inclusions" />

                <UnitItem>
                  <FormContainer>
                    <UnitLabel label="Exclusion:" grid={{ xs: 8, sm: 8 }} />

                    <UnitSelect
                      name="exclusion_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.exclusion_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 4 }}
                      error={validation['exclusion_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitText
                    name="exclusion"
                    value={data?.exclusion}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    multiline
                    rows={3}
                    label=""
                  />
                </UnitItem>

                <UnitItem>
                  <FormContainer>
                    <UnitLabel label="Inclusion:" grid={{ xs: 8, sm: 8 }} />

                    <UnitSelect
                      name="inclusion_status"
                      value={data?.inclusion_status}
                      onChange={handleChange}
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      grid={{ xs: 4, sm: 4 }}
                      error={validation['inclusion_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitText
                    name="inclusion"
                    value={data?.inclusion}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('earnest_money') && (
              <FormContainer>
                <UnitHeading title="Earnest Money" />

                <UnitItem>
                  <FormContainer>
                    <UnitLabel
                      label="Earnest Amount:"
                      grid={{ xs: 8, sm: 8 }}
                    />

                    <UnitSelect
                      name="earnest_amount_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.earnest_amount_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 4 }}
                      error={validation['earnest_amount_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitPriceFormatter
                    name="earnest_amount_c"
                    value={data?.earnest_amount_c}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('close_date') && (
              <FormContainer>
                <UnitHeading title="Close Date" />

                <UnitItem>
                  <FormContainer>
                    <UnitLabel label="Close Date:" grid={{ xs: 8, sm: 8 }} />

                    <UnitSelect
                      name="close_date_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.close_date_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 4 }}
                      error={validation['close_date_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitDate
                    label=""
                    name="close_date_c"
                    value={data?.close_date_c ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: { name: 'close_date_c', value: e }
                      })
                    }
                    error={validation['close_date_c'] ?? ''}
                    grid={{ xs: 12, sm: 12 }}
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('post_occupancy') && (
              <FormContainer>
                <UnitHeading title="Post Occupancy" />

                <UnitItem grid={{ xs: 12, sm: 3 }}>
                  <FormContainer>
                    <UnitLabel
                      label="Lease End Date:"
                      grid={{ xs: 8, sm: 6 }}
                    />

                    <UnitSelect
                      name="lease_end_date_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.lease_end_date_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['lease_end_date_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitDate
                    label=""
                    name="lease_end_date"
                    value={data?.lease_end_date ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: { name: 'lease_end_date', value: e }
                      })
                    }
                    error={validation['lease_end_date'] ?? ''}
                    grid={{ xs: 12, sm: 12 }}
                  />
                </UnitItem>

                <UnitItem grid={{ xs: 12, sm: 3 }}>
                  <FormContainer>
                    <UnitLabel
                      label="Deposit Amount:"
                      grid={{ xs: 8, sm: 6 }}
                    />

                    <UnitSelect
                      name="deposit_amount_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.deposit_amount_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['deposit_amount_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitPriceFormatter
                    name="deposit_amount"
                    value={data?.deposit_amount}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                  />
                </UnitItem>

                <UnitItem grid={{ xs: 12, sm: 3 }}>
                  <FormContainer>
                    <UnitLabel label="Rental Amount:" grid={{ xs: 8, sm: 6 }} />

                    <UnitSelect
                      name="rental_amount_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.rental_amount_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['rental_amount_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitPriceFormatter
                    name="rental_amount"
                    value={data?.rental_amount}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                  />
                </UnitItem>

                <UnitItem grid={{ xs: 12, sm: 3 }}>
                  <FormContainer>
                    <UnitLabel label="Lease Type:" grid={{ xs: 8, sm: 6 }} />

                    <UnitSelect
                      name="lease_type_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.lease_type_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['lease_type_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitSelect
                    name="lease_type"
                    records={getObjectEntriesAsArray(leaseType)}
                    value={data?.lease_type ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    error={validation['lease_type'] ?? ''}
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('special_provisions') && (
              <FormContainer>
                <UnitHeading title="Special Provisions" />

                <UnitItem grid={{ xs: 12, sm: 12 }}>
                  <FormContainer>
                    <UnitLabel
                      label="Terms/Comments:"
                      grid={{ xs: 8, sm: 8 }}
                    />

                    <UnitSelect
                      name="additional_terms_comment_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.additional_terms_comment_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 4 }}
                      error={
                        validation['additional_terms_comment_status'] ?? ''
                      }
                    />
                  </FormContainer>

                  <UnitText
                    name="additional_terms_comments_c"
                    value={data?.additional_terms_comments_c}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                    multiline
                    rows={5}
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('solar_panels') && (
              <FormContainer>
                <UnitHeading title="Solar Panels" />

                <UnitItem grid={{ xs: 12, sm: 4 }}>
                  <FormContainer>
                    <UnitLabel label="Leased Owned:" grid={{ xs: 8, sm: 6 }} />

                    <UnitSelect
                      name="leased_or_owned_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.leased_or_owned_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['leased_or_owned_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitSelect
                    name="solar_panel_leased_or_owned"
                    records={getObjectEntriesAsArray(solarPanelLeaseOwned)}
                    value={data?.solar_panel_leased_or_owned ?? ''}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    error={validation['solar_panel_leased_or_owned'] ?? ''}
                  />
                </UnitItem>

                <UnitItem grid={{ xs: 12, sm: 4 }}>
                  <FormContainer>
                    <UnitLabel label="Payoff Amount:" grid={{ xs: 8, sm: 6 }} />

                    <UnitSelect
                      name="payoff_amount_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.payoff_amount_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['payoff_amount_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitPriceFormatter
                    name="solar_panel_payoff_amount"
                    value={data?.solar_panel_payoff_amount}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                  />
                </UnitItem>

                <UnitItem grid={{ xs: 12, sm: 4 }}>
                  <FormContainer>
                    <UnitLabel
                      label="Lease Date Expiration:"
                      grid={{ xs: 8, sm: 6 }}
                    />

                    <UnitSelect
                      name="lease_date_expiration_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.lease_date_expiration_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 6 }}
                      error={validation['lease_date_expiration_status'] ?? ''}
                    />
                  </FormContainer>

                  <UnitDate
                    label=""
                    name="solar_panel_lease_date_expiration"
                    value={data?.solar_panel_lease_date_expiration ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: {
                          name: 'solar_panel_lease_date_expiration',
                          value: e
                        }
                      })
                    }
                    error={
                      validation['solar_panel_lease_date_expiration'] ?? ''
                    }
                    grid={{ xs: 12, sm: 12 }}
                  />
                </UnitItem>
              </FormContainer>
            )}

          {data?.selected_categories &&
            data?.selected_categories.includes('other') && (
              <FormContainer>
                <UnitHeading title="Other Counter Offer Terms" />

                <UnitItem>
                  <FormContainer>
                    <UnitLabel
                      label="Other Counter Offer Terms:"
                      grid={{ xs: 8, sm: 8 }}
                    />

                    <UnitSelect
                      name="other_counter_offer_terms_status"
                      records={getObjectEntriesAsArray(
                        buyerCounterSelectStatus
                      )}
                      value={data?.other_counter_offer_terms_status ?? ''}
                      onChange={handleChange}
                      grid={{ xs: 4, sm: 4 }}
                      error={
                        validation['other_counter_offer_terms_status'] ?? ''
                      }
                    />
                  </FormContainer>

                  <UnitText
                    name="other_counter_offer_terms"
                    value={data?.other_counter_offer_terms}
                    onChange={handleChange}
                    grid={{ xs: 12, sm: 12 }}
                    label=""
                    multiline
                    rows={5}
                  />
                </UnitItem>
              </FormContainer>
            )}
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
