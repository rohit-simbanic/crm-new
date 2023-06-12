import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import UnitMsa from 'components/form/unit-msa';
import UnitAccount from 'components/form/unit-account';
import AutoCompleteUnit from 'components/form/auto-complete-unit';
import { ObjectType } from 'types';
import fieldLabel from 'assets/constants/fieldLabel';
import { MarketPreferenceEntity } from 'types/market-preferences';
import emptyFunction from 'helpers/empty-function-helper';
import crmStatusType from 'assets/constants/crm-status-type';
import opportunityStatus from 'assets/constants/opportunity-status';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import UnitRead from 'components/form/unit-read';
import RouteLink from 'components/link/route-link';
import { useParams } from 'react-router-dom';

interface recordViewType {
  marketPreferences: MarketPreferenceEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
}

const RecordView = ({
  marketPreferences,
  validation,
  onChange,
  readOnly = false
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  const { market_preference_id } = useParams();

  return (
    <FormContainer>
      <UnitText
        label={fieldLabel.name}
        name="name"
        value={marketPreferences.name ?? ''}
        onChange={handleChange}
        error={valMessages['name'] ?? ''}
        required
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.brokerRepFirm}
        name="broker_rep_firm"
        value={marketPreferences.broker_rep_firm ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      {readOnly === true ? (
        <UnitRead label={fieldLabel.msa} value={marketPreferences?.msa_name} />
      ) : (
        <UnitMsa
          value={{
            value: marketPreferences.msa_id,
            label: marketPreferences.msa_name!
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              msa_id: val?.value ?? '',
              msa_name: val?.label ?? ''
            });
          }}
          error={valMessages['msa_id'] ?? ''}
          readOnly={readOnly}
        />
      )}

      <UnitText
        label={fieldLabel.brokerRepFirmLicenseNumber}
        name="broker_rep_firm_license_number"
        value={marketPreferences.broker_rep_firm_license_number ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      {readOnly === true ? (
        <UnitRead
          label={fieldLabel.account}
          value={marketPreferences?.account_name}
        />
      ) : (
        <UnitAccount
          value={{
            label: marketPreferences.account_name!,
            value: marketPreferences.account_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              account_id: val?.value ?? '',
              account_name: val?.label ?? ''
            });
          }}
          error={valMessages['account_name'] ?? ''}
          readOnly={readOnly}
        />
      )}

      <UnitText
        label={fieldLabel.brokerRepMlsId}
        name="broker_rep_mlsid"
        value={marketPreferences.broker_rep_mlsid ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <AutoCompleteUnit
        options={getObjectEntriesAsArray(opportunityStatus)}
        values={marketPreferences?.sqs_status_trigger || []}
        multiple={true}
        label="SQS Status Trigger"
        id="sqs_status_trigger"
        filterSelectedOptions={true}
        readOnly={readOnly}
        onChange={(val: any) => {
          handleChange({
            sqs_status_trigger: val?.target?.value
          });
        }}
      />

      <UnitText
        label={fieldLabel.brokerRepAgentLicenseNumber}
        name="broker_rep_agent_license_number"
        value={marketPreferences.broker_rep_agent_license_number ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitEmpty />

      <UnitText
        label={fieldLabel.brokerRepAgentEmail}
        name="broker_rep_agent_email"
        value={marketPreferences.broker_rep_agent_email ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.preCloseNotificationDays}
        name="pre_close_notification_days"
        value={marketPreferences.pre_close_notification_days ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.preCloseNotificationToRecipient}
        name="pre_close_notification_to_recipient"
        value={marketPreferences.pre_close_notification_to_recipient ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitText
        label={fieldLabel.preCloseNotificationCcRecipient}
        name="pre_close_notification_cc_recipient"
        value={marketPreferences.pre_close_notification_cc_recipient ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      <UnitSelect
        label={fieldLabel.crmStatus}
        name="crm_status"
        records={getObjectEntriesAsArray(crmStatusType)}
        value={marketPreferences.crm_status ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
      />

      {readOnly && (
        <UnitRead
          label={fieldLabel.viewMarketOfferDefaults}
          value={
            <>
              <RouteLink
                url={`/market-preferences/${market_preference_id}/view-market-offer-defaults`}
                name={marketPreferences?.name!}
                target={true}
              />
            </>
          }
        />
      )}

      <UnitSwitch
        value={marketPreferences.enable_mp_wise_contract ?? 0}
        onChange={handleChange}
        name="enable_mp_wise_contract"
        label={fieldLabel.enableMpWiseContract}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.enable_generate_cgm_contract ?? 0}
        onChange={handleChange}
        name="enable_generate_cgm_contract"
        label={fieldLabel.enableGenerateCgmContract}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.enable_cgm_preview_contract ?? 0}
        onChange={handleChange}
        name="enable_cgm_preview_contract"
        label={fieldLabel.enableCgmPreviewContract}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.enable_cgm_multiple_generate_contract ?? 0}
        onChange={handleChange}
        name="enable_cgm_multiple_generate_contract"
        label={fieldLabel.enableCgmMultipleGenerateContract}
        disabled={readOnly}
      />

      <UnitEmpty />

      <UnitSwitch
        value={marketPreferences.enable_call_from_cts ?? 0}
        onChange={handleChange}
        name="enable_call_from_cts"
        label={fieldLabel.enableCallFromCts}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.enable_inbound_email ?? 0}
        onChange={handleChange}
        name="enable_inbound_email"
        label={fieldLabel.enableInboundEmail}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.pre_close_notification ?? 0}
        onChange={handleChange}
        name="pre_close_notification"
        label={fieldLabel.preCloseNotification}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.generate_loi_email ?? 0}
        onChange={handleChange}
        name="generate_loi_email"
        label={fieldLabel.generateLoiEmail}
        disabled={readOnly}
      />

      <UnitSwitch
        value={marketPreferences.enable_to_upload_document_revision ?? 0}
        onChange={handleChange}
        name="enable_to_upload_document_revision"
        label={fieldLabel.enableToUploadDocumentRevision}
        disabled={readOnly}
      />
    </FormContainer>
  );
};

export default RecordView;
