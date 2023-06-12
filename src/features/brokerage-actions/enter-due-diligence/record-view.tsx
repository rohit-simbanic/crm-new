import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import accessType from 'assets/constants/access-type';
import dueDiligenceDaysConfirm from 'assets/constants/due-diligence-days-confirm';
import fieldLabel from 'assets/constants/fieldLabel';
import hasPostOccupancy from 'assets/constants/has-post-occupancy';
import hoaAddendumReceived from 'assets/constants/hoa-addendum-received';
import leaseType from 'assets/constants/lease-type';
import optionDaysType from 'assets/constants/option-days-type';
import optionFeeVerified from 'assets/constants/option-fee-verified';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitDateTimePicker from 'components/form/unit-date-time';
import UnitEmpty from 'components/form/unit-empty';
import UnitHeading from 'components/form/unit-heading';
import UnitItem from 'components/form/unit-item';
import UnitParty from 'components/form/unit-party';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch, { isChecked } from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import { actionPerform } from 'event/action-event';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
import variableConfig from 'config/variable';
import UnitPriceFormatter from 'components/form/unit-price-formatter';

const RecordView = ({
  onClose,
  currentTab,
  oppurtunity
}: {
  oppurtunity: ObjectType;
  onClose?: any;
  currentTab?: string;
}) => {
  const navigate = useNavigate();
  let { action } = useParams<ObjectType>();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunityStatusList.closing_diligence_period || '',
    contract_execution_date_c: oppurtunity?.contract_execution_date_c || '',
    contract_price_c: oppurtunity?.contract_price_c || '',
    offer_price_c: oppurtunity?.offer_price_c || '',
    balance_to_close_c: oppurtunity?.balance_to_close_c || '',
    escalation_clause_amount: oppurtunity?.escalation_clause_amount || '',
    due_diligence_days_confirm: oppurtunity?.due_diligence_days_confirm || '',
    due_diligence_start_c: oppurtunity?.due_diligence_start_c || '',
    due_diligence_end_c: oppurtunity?.due_diligence_end_c || '',
    close_date_c: oppurtunity?.close_date_c || '',
    option_period_days_c: oppurtunity?.option_period_days_c || '',
    option_days_type_c: oppurtunity?.option_days_type_c || '',
    earnest_money_due_date_c: oppurtunity?.earnest_money_due_date_c || '',
    earnest_amount_verified: oppurtunity?.earnest_amount_verified || '',
    option_fee_verified: oppurtunity?.option_fee_verified || '',
    earnest_amount_c: oppurtunity?.earnest_amount_c || '',
    hoa_addendum_received: oppurtunity?.hoa_addendum_received || '',
    list_agent_broker_name_c: oppurtunity?.list_agent_broker_name_c || '',
    list_agent_name_c: oppurtunity?.list_agent_name_c || '',
    list_agent_email_c: oppurtunity?.list_agent_email_c || '',
    list_agent_phone_c: oppurtunity?.list_agent_phone_c || '',
    list_broker_address_c: oppurtunity?.list_broker_address_c || '',
    escrow_company_email_c: oppurtunity?.escrow_company_email_c || '',
    escrow_company_name_c: oppurtunity?.escrow_company_name_c || '',
    escrow_company_contact_c: oppurtunity?.escrow_company_contact_c || '',
    escrow_company_phone_c: oppurtunity?.escrow_company_phone_c || '',
    escrow_company_address_c: oppurtunity?.escrow_company_address_c || '',
    additional_access_information_c:
      oppurtunity?.additional_access_information_c || '',
    has_post_occupancy: oppurtunity?.has_post_occupancy || '',
    lease_type: oppurtunity?.lease_type || '',
    lease_end_date: oppurtunity?.lease_end_date || '',
    deposit_amount: oppurtunity?.deposit_amount || '',
    rental_amount: oppurtunity?.rental_amount || '',
    hvac_age: oppurtunity?.hvac_age || '',
    lockbox_code: oppurtunity?.lockbox_code || '',
    access_type: oppurtunity?.access_type || '',
    seller_name_c: oppurtunity?.seller_name_c || '',
    hoa_management_company_name: oppurtunity?.hoa_management_company_name || '',
    hoa_management_company_company_phone:
      oppurtunity?.hoa_management_company_phone || '',
    hoa_management_company_contact_name:
      oppurtunity?.hoa_management_company_contact_name || '',
    hoa_management_company_is_self_managed:
      oppurtunity?.hoa_management_company_is_self_managed || '',
    hoa_management_company_contact_email:
      oppurtunity?.hoa_management_company_contact_email || '',
    hoa_management_company_contact_phone:
      oppurtunity?.hoa_management_company_contact_phone || '',
    hoa_management_company_contact_address:
      oppurtunity?.hoa_management_company_contact_address || '',
    hoa_url: oppurtunity?.hoa_url || '',
    electric_provider: oppurtunity?.electric_provider || '',
    water_well_provider: oppurtunity?.water_well_provider || '',
    sewer_provider: oppurtunity?.sewer_provider || '',
    gas_provider: oppurtunity?.gas_provider || '',
    trash_provider: oppurtunity?.trash_provider || '',
    is_septic: oppurtunity?.is_septic || '',
    is_well: oppurtunity?.is_well || '',
    is_electric: oppurtunity?.is_electric || '',
    mo_photos_required: oppurtunity?.mo_photos_required || '',
    sellers_disclosure_received: oppurtunity?.sellers_disclosure_received || '',
    agree_switch: oppurtunity?.agree_switch || 0
  });

  const handleChange = (e: any) => {
    if (e.target) {
      setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
    } else {
      setData(Object.assign({}, data, e));
    }
  };

  const handleSubmit = async () => {
    let fieldToCheck = [
      'contract_execution_date_c',
      'contract_price_c',
      'offer_price_c',
      'due_diligence_start_c',
      'due_diligence_end_c',
      'earnest_money_due_date_c',
      'option_period_days_c',
      'option_days_type_c',
      'earnest_amount_c',
      'lease_end_date',
      'deposit_amount',
      'rental_amount',
      'seller_name_c',
      'hoa_addendum_received'
    ];
    let { status, ...errors } = ValidationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    if (!isChecked(data.agree_switch)) {
      errors = { ...errors, agree_switch: ['Required Field'] };
    }

    setValidation(errors);
    if (status || !isChecked(data.agree_switch)) return;

    const reqBody = {
      contract_execution_date_c: data.contract_execution_date_c,
      contract_price_c: data.contract_price_c,
      offer_price_c: data.offer_price_c,
      balance_to_close_c: data.balance_to_close_c,
      escalation_clause_amount: data.escalation_clause_amount,
      due_diligence_days_confirm: data.due_diligence_days_confirm,
      due_diligence_start_c: DateUtility.convertTimeZoneToUTC(
        data.due_diligence_start_c
      ),
      due_diligence_end_c: DateUtility.convertTimeZoneToUTC(
        data.due_diligence_end_c
      ),
      close_date_c: data.close_date_c,
      option_period_days_c: data.option_period_days_c,
      option_days_type_c: data.option_days_type_c,
      earnest_money_due_date_c: data.earnest_money_due_date_c,
      earnest_amount_verified: data.earnest_amount_verified,
      option_fee_verified: data.option_fee_verified,
      earnest_amount_c: data.earnest_amount_c,
      hoa_addendum_received: data.hoa_addendum_received,
      list_agent_broker_name_c: data.list_agent_broker_name_c,
      list_agent_name_c: data.list_agent_name_c,
      list_agent_email_c: data.list_agent_email_c,
      list_agent_phone_c: data.list_agent_phone_c,
      list_broker_address_c: data.list_broker_address_c,
      escrow_company_email_c: data.escrow_company_email_c,
      escrow_company_name_c: data.escrow_company_name_c,
      escrow_company_contact_c: data.escrow_company_contact_c,
      escrow_company_phone_c: data.escrow_company_phone_c,
      escrow_company_address_c: data.escrow_company_address_c,
      electric_provider: data.electric_provider,
      water_well_provider: data.water_well_provider,
      sewer_provider: data.sewer_provider,
      gas_provider: data.gas_provider,
      trash_provider: data.trash_provider,
      additional_access_information_c: data.additional_access_information_c,
      has_post_occupancy: data.has_post_occupancy,
      lease_type: data.lease_type,
      lease_end_date: data.lease_end_date,
      deposit_amount: data.deposit_amount,
      rental_amount: data.rental_amount,
      hvac_age: data.hvac_age,
      lockbox_code: data.lockbox_code,
      access_type: data.access_type,
      seller_name_c: data.seller_name_c,
      hoa_management_company_name: data.hoa_management_company_name,
      hoa_management_company_company_phone:
        data.hoa_management_company_company_phone,
      hoa_management_company_contact_name:
        data.hoa_management_company_contact_name,
      hoa_management_company_is_self_managed:
        data.hoa_management_company_is_self_managed,
      hoa_management_company_contact_email:
        data.hoa_management_company_contact_email,
      hoa_management_company_contact_phone:
        data.hoa_management_company_contact_phone,
      hoa_management_company_contact_address:
        data.hoa_management_company_contact_address,
      hoa_url: data.hoa_url,
      is_septic: data.is_septic,
      is_well: data.is_well,
      is_electric: data.is_electric,
      mo_photos_required: data.mo_photos_required,
      sellers_disclosure_received: data.sellers_disclosure_received
    };

    setIsLoading(true);

    const result: ObjectType = await oppurtunityService.performAction(
      oppurtunity.id,
      reqBody,
      'enter_due_diligence'
    );

    setIsLoading(false);

    if (result.isError) {
      setValidation(result.errorMessage);
    }

    if (result.isSuccess) {
      if (action) {
        onClose();
        actionPerform.due_diligence_opportunity();
      } else {
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${oppurtunity.id}/view`);
      }
    }
  };
  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxContent
          sx={{
            height: 'calc(100vh - 48vh)',
            overflowY: 'auto',
            p: 2
          }}
        >
          <FormContainer>
            <UnitHeading title="Contract" />

            <UnitDate
              label={fieldLabel.contractExecutionDate}
              name="contract_execution_date_c"
              value={data.contract_execution_date_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'contract_execution_date_c', value: e }
                })
              }
              error={validation['contract_execution_date_c'] ?? ''}
              required
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={`${fieldLabel.contractPrice}`}
              name="contract_price_c"
              value={data.contract_price_c ?? ''}
              onChange={handleChange}
              error={validation['contract_price_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={`${fieldLabel.offerPrice}`}
              name="offer_price_c"
              value={data.offer_price_c ?? ''}
              onChange={handleChange}
              error={validation['offer_price_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.closeBalance}
              name="balance_to_close_c"
              value={data.balance_to_close_c ?? ''}
              onChange={handleChange}
              error={validation['balance_to_close_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={fieldLabel.escalationClauseAmount}
              name="escalation_clause_amount"
              value={data.escalation_clause_amount ?? ''}
              onChange={handleChange}
              error={validation['escalation_clause_amount'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitHeading title="Due Diligence" />

            <UnitSelect
              name="due_diligence_days_confirm"
              label={fieldLabel.dueDiligenceDaysConfirm}
              records={getObjectEntriesAsArray(dueDiligenceDaysConfirm)}
              value={data.due_diligence_days_confirm ?? ''}
              onChange={handleChange}
              error={validation['due_diligence_days_confirm'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitDateTimePicker
              label={fieldLabel.dueDiligenceStartDate}
              name="due_diligence_start_c"
              value={data.due_diligence_start_c || null}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'due_diligence_start_c', value: e }
                })
              }
              error={validation['due_diligence_start_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitDateTimePicker
              label={fieldLabel.dueDiligenceEndDate}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c || null}
              onChange={(e: any) =>
                handleChange({
                  target: {
                    name: 'due_diligence_end_c',
                    value: DateUtility.addHours(
                      e,
                      variableConfig.DUE_DILIGENCE_END_START_TIME
                    )
                  }
                })
              }
              error={validation['due_diligence_end_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

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

            <UnitText
              label={fieldLabel.optionPeriod}
              name="option_period_days_c"
              value={data.option_period_days_c ?? ''}
              onChange={handleChange}
              error={validation['option_period_days_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitSelect
              name="option_days_type_c"
              label={fieldLabel.optionDaysType}
              records={getObjectEntriesAsArray(optionDaysType)}
              value={data.option_days_type_c ?? ''}
              onChange={handleChange}
              error={validation['option_days_type_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitHeading title="Earnest Amount" />

            <UnitDate
              label={fieldLabel.earnestMoneyDueDate}
              name="earnest_money_due_date_c"
              value={data.earnest_money_due_date_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'earnest_money_due_date_c', value: e }
                })
              }
              error={validation['earnest_money_due_date_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitSelect
              name="earnest_amount_verified"
              label={fieldLabel.earnestAmountVerified}
              records={getObjectEntriesAsArray(optionFeeVerified)}
              value={data.earnest_amount_verified ?? ''}
              onChange={handleChange}
              error={validation['earnest_amount_verified'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="option_fee_verified"
              label={fieldLabel.optionFeeVerified}
              records={getObjectEntriesAsArray(optionFeeVerified)}
              value={data.option_fee_verified ?? ''}
              onChange={handleChange}
              error={validation['option_fee_verified'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={fieldLabel.earnestAmount}
              name="earnest_amount_c"
              value={data.earnest_amount_c ?? ''}
              onChange={handleChange}
              error={validation['earnest_amount_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="hoa_addendum_received"
              label={fieldLabel.hoaAddendumReceived}
              records={getObjectEntriesAsArray(hoaAddendumReceived)}
              value={data.hoa_addendum_received ?? ''}
              onChange={handleChange}
              error={validation['hoa_addendum_received'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitHeading title="Listing Agent Details" />

            <UnitText
              label={fieldLabel.listingAgentCompany}
              name="list_agent_broker_name_c"
              value={data.list_agent_broker_name_c ?? ''}
              onChange={handleChange}
              error={validation['list_agent_broker_name_c'] ?? ''}
              readOnly={true}
              disabled={true}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.listingAgentName}
              name="list_agent_name_c"
              value={data.list_agent_name_c ?? ''}
              onChange={handleChange}
              error={validation['list_agent_name_c'] ?? ''}
              readOnly={true}
              disabled={true}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.listingAgentEmail}
              name="list_agent_email_c"
              value={data.list_agent_email_c ?? ''}
              onChange={handleChange}
              error={validation['list_agent_email_c'] ?? ''}
              readOnly={true}
              disabled={true}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.listingAgentPhone}
              name="list_agent_phone_c"
              value={data.list_agent_phone_c ?? ''}
              onChange={handleChange}
              error={validation['list_agent_phone_c'] ?? ''}
              readOnly={true}
              disabled={true}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.listingAgentAddress}
              name="list_broker_address_c"
              value={data.list_broker_address_c ?? ''}
              multiline
              rows={2}
              onChange={handleChange}
              error={validation['list_broker_address_c'] ?? ''}
              readOnly={true}
              disabled={true}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitHeading title="Escrow Details" />

            <UnitParty
              label={fieldLabel.escrowContact}
              value={{
                label: data.escrow_company_contact_c || '',
                value: data.parties_escrow_company_id || ''
              }}
              multiple={false}
              type="escrow"
              subType=""
              onChange={(val: any) => {
                handleChange({
                  parties_escrow_company_id: val?.id || '',
                  escrow_company_contact_c: val?.name || '',
                  escrow_company_name_c: val?.company || '',
                  escrow_company_email_c: val?.email || '',
                  escrow_company_phone_c: val?.mobile || '',
                  escrow_company_address_c: val?.address || ''
                });
              }}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.escrowCompany}
              name="escrow_company_name_c"
              value={data.escrow_company_name_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_name_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.escrowEmail}
              name="escrow_company_email_c"
              value={data.escrow_company_email_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_email_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.escrowPhone}
              name="escrow_company_phone_c"
              value={data.escrow_company_phone_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_phone_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.escrowAddress}
              name="escrow_company_address_c"
              value={data.escrow_company_address_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_address_c'] ?? ''}
              multiline
              rows={2}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitHeading title="Utility Providers" />

            <UnitText
              label={fieldLabel.electricProvider}
              name="electric_provider"
              value={data.electric_provider ?? ''}
              onChange={handleChange}
              error={validation['electric_provider'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.waterProvider}
              name="water_well_provider"
              value={data.water_well_provider ?? ''}
              onChange={handleChange}
              error={validation['water_well_provider'] ?? ''}
              grid={{ xs: 8, sm: 2.5 }}
            />

            <UnitSwitch
              value={data.is_well ?? 0}
              onChange={handleChange}
              name="is_well"
              label={fieldLabel.isWell}
              grid={{ xs: 4, sm: 1.5 }}
            />

            <UnitText
              label={fieldLabel.sewerProvider}
              name="sewer_provider"
              value={data.sewer_provider ?? ''}
              onChange={handleChange}
              error={validation['sewer_provider'] ?? ''}
              grid={{ xs: 8, sm: 2.5 }}
            />

            <UnitSwitch
              value={data.is_septic ?? 0}
              onChange={handleChange}
              name="is_septic"
              label={fieldLabel.isSeptic}
              grid={{ xs: 4, sm: 1.5 }}
            />

            <UnitText
              label={fieldLabel.gasProvider}
              name="gas_provider"
              value={data.gas_provider ?? ''}
              onChange={handleChange}
              error={validation['gas_provider'] ?? ''}
              grid={{ xs: 8, sm: 2.5 }}
            />

            <UnitSwitch
              value={data.is_electric ?? 0}
              onChange={handleChange}
              name="is_electric"
              label={fieldLabel.isElectric}
              grid={{ xs: 4, sm: 1.5 }}
            />

            <UnitText
              label={fieldLabel.trashProvider}
              name="trash_provider"
              value={data.trash_provider ?? ''}
              onChange={handleChange}
              error={validation['trash_provider'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.additionalAccessInformation}
              name="additional_access_information_c"
              value={data.additional_access_information_c ?? ''}
              onChange={handleChange}
              error={validation['additional_access_information_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitHeading title="HOA MANAGEMENT COMPANY" />

            <UnitText
              label={fieldLabel.hoaManagementCompanyName}
              name="hoa_management_company_name"
              value={data.hoa_management_company_name ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_name'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.hoaManagementCompanyPhone}
              name="hoa_management_company_company_phone"
              value={data.hoa_management_company_company_phone ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_company_phone'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.hoaManagementContactName}
              name="hoa_management_company_contact_name"
              value={data.hoa_management_company_contact_name ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_contact_name'] ?? ''}
              grid={{ xs: 8, sm: 2.5 }}
            />

            <UnitSwitch
              value={data.hoa_management_company_is_self_managed ?? 0}
              onChange={handleChange}
              name="hoa_management_company_is_self_managed"
              label={fieldLabel.isSelfManaged}
              grid={{ xs: 4, sm: 1.5 }}
            />

            <UnitText
              label={fieldLabel.hoaManagementContactEmail}
              name="hoa_management_company_contact_email"
              value={data.hoa_management_company_contact_email ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_contact_email'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.hoaManagementContactPhone}
              name="hoa_management_company_contact_phone"
              value={data.hoa_management_company_contact_phone ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_contact_phone'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.hoaManagementContactAddress}
              name="hoa_management_company_contact_address"
              value={data.hoa_management_company_contact_address ?? ''}
              onChange={handleChange}
              error={validation['hoa_management_company_contact_address'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.hoaUrl}
              name="hoa_url"
              value={data.hoa_url ?? ''}
              onChange={handleChange}
              error={validation['hoa_url'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="has_post_occupancy"
              label={fieldLabel.hasPostOccupancy}
              records={getObjectEntriesAsArray(hasPostOccupancy)}
              value={data.has_post_occupancy ?? ''}
              onChange={handleChange}
              disabled={true}
              error={validation['has_post_occupancy'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="lease_type"
              label={fieldLabel.leaseType}
              records={getObjectEntriesAsArray(leaseType)}
              value={data.lease_type ?? ''}
              onChange={handleChange}
              disabled={true}
              error={validation['lease_type'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

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
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitPriceFormatter
              label={`${fieldLabel.depositAmount} *`}
              name="deposit_amount"
              value={data.deposit_amount ?? ''}
              onChange={handleChange}
              error={validation['deposit_amount'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitPriceFormatter
              label={`${fieldLabel.rentalAmount} *`}
              name="rental_amount"
              value={data.rental_amount ?? ''}
              onChange={handleChange}
              error={validation['rental_amount'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitEmpty grid={{ xs: 12, sm: 4 }} />

            <UnitText
              label={fieldLabel.hvacAge}
              name="hvac_age"
              value={data.hvac_age ?? ''}
              onChange={handleChange}
              error={validation['hvac_age'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.lockboxCode}
              name="lockbox_code"
              value={data.lockbox_code ?? ''}
              onChange={handleChange}
              error={validation['lockbox_code'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="access_type"
              label={fieldLabel.accessType}
              records={getObjectEntriesAsArray(accessType)}
              value={data.access_type ?? ''}
              onChange={handleChange}
              error={validation['access_type'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.sellerName}
              name="seller_name_c"
              value={data.seller_name_c ?? ''}
              onChange={handleChange}
              error={validation['seller_name_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitSwitch
              value={data.mo_photos_required ?? 0}
              onChange={handleChange}
              name="mo_photos_required"
              label={fieldLabel.moPhotosRequired}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSwitch
              value={data.sellers_disclosure_received ?? 0}
              onChange={handleChange}
              name="sellers_disclosure_received"
              label={fieldLabel.sellerDisclosureReceived}
              grid={{ xs: 12, sm: 4 }}
            />
          </FormContainer>
        </PaperBoxContent>
        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <UnitItem grid={{ xs: 12, sm: 2 }}>
              <SaveButton onClick={handleSubmit} disabled={isLoading} />
            </UnitItem>
            <UnitItem grid={{ xs: 12, sm: 10 }}>
              <UnitSwitch
                value={data.agree_switch ?? 0}
                onChange={handleChange}
                name="agree_switch"
                label="By agreeing to proceed you have verified Purchase Amounts, Parties (HOA, Escrow, Agent) and all Commissions information is accurate"
                grid={{ xs: 12, sm: 10 }}
                error={validation['agree_switch'] ?? ''}
              />
            </UnitItem>
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};

export default RecordView;
