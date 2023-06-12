import FormContainer from 'components/form/container';
import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitDateTime from 'components/form/unit-date-time';
import UnitSwitch from 'components/form/unit-switch';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import UnitAccount from 'components/form/unit-account';
import fieldLabel from 'assets/constants/fieldLabel';
import emptyFunction from 'helpers/empty-function-helper';
import RouteLink from 'components/link/route-link';
import UnitRead from 'components/form/unit-read';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import state from 'assets/constants/state';
import customerReservationStatus from 'assets/constants/customer-reservation-status';
import yesNo from 'assets/constants/yes-no';
import offerSubmitTypes from 'assets/constants/offer-submit-types';
import earnestMoneyDueType from 'assets/constants/earnest-money-due-type';
import requestDescription from 'assets/constants/request-description';
import optionDaysType from 'assets/constants/option-days-type';
import terminationReason from 'assets/constants/termination-reason';
import inspectionPeriod from 'assets/constants/inspection-period';
import terminationSubReason from 'assets/constants/termination-sub-reason';
import retradeReasons from 'assets/constants/retrade-reasons';
import primaryRejectReasons from 'assets/constants/primary-reject-reasons';
import cancelReasons from 'assets/constants/cancel-reasons';
import cancelSubReasons from 'assets/constants/cancel-sub-reasons';
import accountService from 'services/accounts-service';
import sellerOwnershipRepresentation from 'assets/constants/seller-ownership-representation';
import { isEmpty } from 'helpers/misc-helper';
import DateUtility from 'helpers/date-helper';
import variableConfig from 'config/variable';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  onChange?: any;
  changeHandle?: (e: any) => any;
  setField?: any;
  readOnly?: boolean;
}

const PrimaryInformationRecordView = ({
  oppurtunity,
  oldOppurtunity,
  validation,
  onChange,
  changeHandle,
  setField,
  readOnly = false
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let valMessages = validation ?? {};
  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  const [buyerContract, setBuyerContract] = useState<any>([]);

  const loadAccountBuyerName = async () => {
    const result: ObjectType = await accountService.accountBuyerName(
      `?filter[account_buyer_id]=${data.account_buyer_id}&filter[account_id]=${data.account_id_1}&filter[entera_customer_id]=${data.entera_customer_id}&filter[market_id]=${data.msa_id_1}&filter[entera_market_id]=${data.entera_market_id}`
    );

    if (result.isSuccess) {
      let data = result.data.data;
      let buyerContractOptions = [];
      for (const key in data) {
        buyerContractOptions.push({
          label: data[key].name,
          value: data[key].id
        });
      }

      if (!isEmpty(data?.account_buyer_id)) {
        const accountName = buyerContract.find(
          (x: ObjectType) => x.value === data?.account_buyer_id
        );

        handleChange({
          account_buyer_name: accountName?.label || ''
        });
      }
      setBuyerContract(buyerContractOptions);
    }
  };

  useEffect(() => {
    loadAccountBuyerName();
  }, []);
  return (
    <>
      <FormContainer>
        {readOnly === true ? (
          <UnitRead
            label={fieldLabel.account}
            value={
              <>
                <RouteLink
                  url={`/accounts/${data?.account?.id}/view`}
                  name={data?.account?.name || '-'}
                  target={true}
                />
              </>
            }
          />
        ) : (
          <UnitAccount
            value={{
              label: data?.account?.name || '',
              value: data?.account?.id || ''
            }}
            multiple={false}
            onChange={(val: any) => {
              handleChange({
                account: {
                  id: val?.value || '',
                  name: val?.label || ''
                },
                account_id_1: val?.value || ''
              });
            }}
            readOnly={readOnly}
            error={valMessages['account_id_1']}
          />
        )}

        <UnitDateTime
          label={fieldLabel.dateModified}
          name="date_modified"
          value={data?.date_modified || null}
          onChange={(value: any) =>
            handleChange({
              target: {
                name: 'date_modified',
                value: value
              }
            })
          }
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />

        <UnitSelect
          label={fieldLabel.buyerContractName}
          name="account_buyer_id"
          value={data?.account_buyer_id ?? ''}
          onChange={(e) => {
            const accountName = buyerContract.find(
              (x: ObjectType) => x.value === e.target.value
            );

            handleChange({
              account_buyer_id: e.target.value,
              account_buyer_name: accountName?.label || ''
            });
          }}
          records={buyerContract}
          readOnly={readOnly}
          required
          error={valMessages['account_buyer_id'] ?? []}
        />

        <UnitEmpty />

        <UnitSelect
          label={fieldLabel.buyerNameHud}
          name="buyer_name_prelim_hud_id"
          value={data?.buyer_name_prelim_hud_id ?? ''}
          onChange={handleChange}
          records={buyerContract}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.buyerContractNameAtOfferSent}
          name="buyer_contract_name_at_offer_sent_name"
          value={data?.buyer_contract_name_at_offer_sent_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />
        <UnitText
          label={fieldLabel.buyerContractNameAtDiligenceStart}
          name="buyer_contract_name_at_diligence_start_name"
          value={data?.buyer_contract_name_at_diligence_start_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />
        <UnitText
          label={fieldLabel.buyerContractNameAtClosing}
          name="buyer_contract_name_at_closing_name"
          value={data?.buyer_contract_name_at_closing_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />
        <UnitText
          label={fieldLabel.address}
          name="property_address_c"
          value={data?.property_address_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.city}
          name="property_address_city_c"
          value={data?.property_address_city_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.streetName}
          name="street_name"
          value={data?.street_name ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitSelect
          name="property_address_state_c"
          label={fieldLabel.state}
          records={getObjectEntriesAsArray(state)}
          value={data?.property_address_state_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.zip}
          name="property_address_postalcode_c"
          value={data?.property_address_postalcode_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.country}
          name="county_c"
          value={data?.county_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="customer_reservation_status"
          label={fieldLabel.customerReservationStatus}
          records={getObjectEntriesAsArray(customerReservationStatus)}
          value={data?.customer_reservation_status ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.schoolDistrict}
          name="school_district"
          value={data?.school_district ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="customer_accepted_status_verified"
          label={fieldLabel.customerAcceptedStatusVerified}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.customer_accepted_status_verified ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.fullAddress}
          name="full_address"
          value={data?.full_address ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={2}
          sx={{ padding: 0 }}
        />
        <UnitSelect
          name="offer_submit_type"
          label={fieldLabel.offerSubmitType}
          records={getObjectEntriesAsArray(offerSubmitTypes)}
          value={data?.offer_submit_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.offerDate}
          name="offer_date_c"
          value={data?.offer_date_c ? data?.offer_date_c : null}
          error={valMessages['offer_date_c'] ?? ''}
          onChange={(value: any) =>
            handleChange({
              target: {
                name: 'offer_date_c',
                value: value
              }
            })
          }
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.offerSubmitByDate}
          name="offer_submit_by_date"
          value={data?.offer_submit_by_date || null}
          error={valMessages['offer_submit_by_date'] ?? ''}
          onChange={(value: any) =>
            onChange({
              target: {
                name: 'offer_submit_by_date',
                value: value
              }
            })
          }
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.offerExpiration}
          name="offer_expiration_date_c"
          value={
            data?.offer_expiration_date_c ? data?.offer_expiration_date_c : null
          }
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'offer_expiration_date_c',
                value: value
              }
            });

            setField('offer_expiration_date_c');
          }}
          readOnly={readOnly}
        />
        <UnitSelect
          name="seller_ownership_representation"
          label={fieldLabel.sellerOwnershipRepresentation}
          records={getObjectEntriesAsArray(sellerOwnershipRepresentation)}
          value={data?.seller_ownership_representation ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.contractExecutionDate}
          name="contract_execution_date_c"
          value={data?.contract_execution_date_c || null}
          error={valMessages['contract_execution_date_c'] ?? ''}
          onChange={(value: any) => {
            onChange({
              target: {
                name: 'contract_execution_date_c',
                value: value
              }
            });
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.contractReceivedDate}
          name="contract_received_date"
          value={data?.contract_received_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'contract_received_date',
                value: value
              }
            });
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.earnestMoneyDueDate}
          name="earnest_money_due_date_c"
          value={data?.earnest_money_due_date_c || null}
          error={valMessages['earnest_money_due_date_c'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'earnest_money_due_date_c',
                value: value
              }
            });
            setField('earnest_money_due_date_c');
          }}
          readOnly={readOnly}
        />
        <UnitSelect
          name="earnest_money_due_c"
          label={fieldLabel.earnestMoneyDueType}
          records={getObjectEntriesAsArray(earnestMoneyDueType)}
          value={data?.earnest_money_due_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitDateTime
          label={fieldLabel.dueDiligenceStartDate}
          name="due_diligence_start_c"
          value={data?.due_diligence_start_c || null}
          error={valMessages['due_diligence_start_c'] ?? ''}
          onChange={(e: any) => {
            handleChange({
              target: { name: 'due_diligence_start_c', value: e }
            });
            setField('due_diligence_start_c');
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDateTime
          label={fieldLabel.initialDueDiligenceEnd}
          name="initial_due_diligence_end"
          value={data?.initial_due_diligence_end ?? null}
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly === true ? false : true}
        />
        <UnitSwitch
          value={data?.no_diligence_period ?? 0}
          onChange={handleChange}
          name="no_diligence_period"
          label={fieldLabel.noDueDiligencePeriod}
          disabled={readOnly}
        />
        <UnitDateTime
          label={fieldLabel.dueDiligenceEndDate}
          name="due_diligence_end_c"
          value={data?.due_diligence_end_c || null}
          error={valMessages['due_diligence_end_c'] ?? ''}
          onChange={(e: any) => {
            handleChange({
              target: {
                name: 'due_diligence_end_c',
                value: DateUtility.addHours(
                  e,
                  variableConfig.DUE_DILIGENCE_END_START_TIME
                )
              }
            });
            setField('due_diligence_end_c');
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.forecastedDdEndDate}
          name="forecasted_dd_end_date"
          value={data?.forecasted_dd_end_date || null}
          error={valMessages['forecasted_dd_end_date'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'forecasted_dd_end_date',
                value: value
              }
            });
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.closeDate}
          name="close_date_c"
          value={data?.close_date_c || null}
          error={valMessages['close_date_c'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'close_date_c',
                value: value
              }
            });
            setField('close_date_c');
          }}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.shortSaleSellerAcceptDate}
          name="short_sale_seller_accept_date"
          value={data?.short_sale_seller_accept_date || null}
          error={valMessages['short_sale_seller_accept_date'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'short_sale_seller_accept_date',
                value: value
              }
            });
            setField('short_sale_seller_accept_date');
          }}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.forecastedCloseDate}
          name="forecasted_close_date"
          value={data?.forecasted_close_date || null}
          error={valMessages['forecasted_close_date'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'forecasted_close_date',
                value: value
              }
            });
          }}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.originalCloseOfEscrowDate}
          name="original_close_of_escrow_date"
          value={data?.original_close_of_escrow_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'original_close_of_escrow_date',
                value: value
              }
            });
          }}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitSelect
          name="reason_description"
          label={fieldLabel.reasonDescription}
          records={getObjectEntriesAsArray(requestDescription)}
          value={data?.reason_description ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitText
          label={fieldLabel.optionPeriodDays}
          name="option_period_days_c"
          value={data?.option_period_days_c ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['option_period_days_c'] ?? ''}
        />
        <UnitSelect
          name="option_days_type_c"
          label={fieldLabel.optionDaysType}
          records={getObjectEntriesAsArray(optionDaysType)}
          value={data?.option_days_type_c ?? ''}
          onChange={onChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="contract_termination_reasons"
          label={fieldLabel.terminationReasons}
          records={getObjectEntriesAsArray(terminationReason)}
          value={data?.contract_termination_reasons ?? ''}
          onChange={(e) => {
            handleChange({
              contract_termination_reasons: e.target.value,
              termination_reason_subcategory: ''
            });

            setField('contract_termination_reasons');
          }}
          readOnly={readOnly}
          error={valMessages['contract_termination_reasons'] ?? ''}
        />
        <UnitSelect
          name="option_inspection_period_c"
          label={fieldLabel.optionInspectionPeriod}
          records={getObjectEntriesAsArray(inspectionPeriod)}
          value={data?.option_inspection_period_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="termination_reason_subcategory"
          label={fieldLabel.terminationReasonSubcategory}
          records={terminationSubReason[data?.contract_termination_reasons]}
          value={data?.termination_reason_subcategory ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['termination_reason_subcategory'] ?? ''}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.contractTerminatedDate}
          name="contract_terminated_date"
          value={data?.contract_terminated_date || null}
          error={valMessages['contract_terminated_date'] ?? ''}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'contract_terminated_date',
                value: value
              }
            });
            setField('contract_terminated_date');
          }}
          disabled={readOnly}
          readOnly={readOnly}
        />
        <UnitSelect
          name="retrade_reason"
          label={fieldLabel.retradeReason}
          records={getObjectEntriesAsArray(retradeReasons)}
          value={data?.retrade_reason ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="reject_reason"
          label={fieldLabel.rejectReason}
          records={getObjectEntriesAsArray(primaryRejectReasons)}
          value={data?.reject_reason ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['reject_reason'] ?? ''}
        />
        <UnitSelect
          name="cancel_reason"
          label={fieldLabel.cancelReason}
          records={getObjectEntriesAsArray(cancelReasons)}
          value={data?.cancel_reason ?? ''}
          onChange={(e) => {
            handleChange({
              cancel_reason: e.target.value,
              cancellation_reason_subcategory: ''
            });
          }}
          readOnly={readOnly}
          error={valMessages['cancel_reason'] ?? ''}
        />
        <UnitEmpty />
        <UnitSelect
          name="cancellation_reason_subcategory"
          label={fieldLabel.cancelSubReason}
          records={cancelSubReasons[data?.cancel_reason]}
          value={data?.cancellation_reason_subcategory ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['cancellation_reason_subcategory'] ?? ''}
        />
        <UnitText
          label={fieldLabel.rejectNote}
          name="reject_note"
          value={data?.reject_note ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
        <UnitText
          label={fieldLabel.otherCancellationReason}
          name="additional_cancellation_reason"
          value={data?.additional_cancellation_reason ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
        <UnitDate
          label={fieldLabel.rejectDate}
          name="reject_date"
          value={data?.reject_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'reject_date',
                value: value
              }
            });
            setField('reject_date');
          }}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.offerLostDate}
          name="offer_lost_date"
          value={data?.offer_lost_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'offer_lost_date',
                value: value
              }
            });
          }}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.howManyCompetingOffers}
          name="competing_offer_count"
          value={data?.competing_offer_count ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitDate
          label={fieldLabel.offerCancelledDate}
          name="offer_cancelled_date"
          value={data?.offer_cancelled_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'offer_cancelled_date',
                value: value
              }
            });
          }}
          disabled={readOnly === true ? false : true}
          readOnly={readOnly}
        />
        <UnitPriceFormatter
          name="competing_offer_highest_price"
          value={data?.competing_offer_highest_price}
          onChange={handleChange}
          label={fieldLabel.highestCompetingOfferPrice}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.cancelNote}
          name="cancel_note"
          value={data?.cancel_note ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
        <UnitEmpty />
        <UnitDate
          label={fieldLabel.cancelRequestReceivedDate}
          name="cancel_request_received_date"
          value={data?.cancel_request_received_date || null}
          onChange={(value: any) => {
            handleChange({
              target: {
                name: 'cancel_request_received_date',
                value: value
              }
            });
          }}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.bidId}
          name="bid_id"
          value={data?.bid_id ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.bidUrl}
          name="bid_url"
          value={data?.bid_url ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.emailUniqueId}
          name="simba_unique_id"
          value={data?.simba_unique_id ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.productType}
          name="product_type"
          value={data?.product_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="lease_back_allowed_c"
          label={fieldLabel.leaseBackAllowed}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.lease_back_allowed_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="homeowner_association_c"
          label={fieldLabel.homeOwnerAssociation}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.homeowner_association_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="survey_requested_c"
          label={fieldLabel.surveyRequested}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.survey_requested_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitSelect
          name="warranty_required_c"
          label={fieldLabel.warrantyRequired}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.warranty_required_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitEmpty />
        <UnitSelect
          name="has_leasing_restrictions"
          label={fieldLabel.leasingRestrictions}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.has_leasing_restrictions ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['has_leasing_restrictions'] ?? ''}
        />
        <UnitText
          label={fieldLabel.internalTerminationFeedback}
          name="internal_termination_feedback"
          value={data?.internal_termination_feedback ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
        />
        <UnitText
          label={fieldLabel.restrictionsNotes}
          name="restrictions_notes"
          value={data?.restrictions_notes ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          multiline={true}
          rows={4}
          error={valMessages['restrictions_notes'] ?? ''}
        />
        <UnitSelect
          name="disable_inspection_emails_for_waived_inspections"
          label={fieldLabel.disableInspectionEmailsWithWaived}
          records={getObjectEntriesAsArray(yesNo)}
          value={data?.disable_inspection_emails_for_waived_inspections ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
        <UnitText
          label={fieldLabel.buyerOfferKey}
          name="buyer_offer_key"
          value={data?.buyer_offer_key ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default PrimaryInformationRecordView;
