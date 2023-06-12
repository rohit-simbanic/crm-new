import accessType from 'assets/constants/access-type';
import earnestStatus from 'assets/constants/earnest-status';
import extensionRequestReason from 'assets/constants/extension-request-reason';
import fieldLabel from 'assets/constants/fieldLabel';
import municipalInspectionTypes from 'assets/constants/municipal-inspection-types';
import occupancyStatus from 'assets/constants/occupancy-status';
import optionStatus from 'assets/constants/option-status';
import yesNo from 'assets/constants/yes-no';
import AutoCompleteUnit from 'components/form/auto-complete-unit';
import FormContainer from 'components/form/container';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitLabel from 'components/form/unit-label';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React from 'react';
import { ObjectType } from 'types';

import HOAManagement from '../partial-edit/hoa-management';
import UtilityProviders from '../partial-edit/utility-providers';

interface recordViewType {
  oppurtunity: ObjectType;
  oldOppurtunity: ObjectType;
  validation?: ObjectType;
  changeHandle?: (e: any) => any;
  effectHandle?: (e: any) => any;
  setField?: (e: any) => any;
  readOnly?: boolean;
  updateOpportunity?: (val: ObjectType) => void;
}

const DiligencePeriodRecordView = ({
  oppurtunity,
  oldOppurtunity,
  readOnly = false,
  changeHandle,
  setField,
  effectHandle,
  validation,
  updateOpportunity
}: recordViewType) => {
  let handleChange = changeHandle ?? emptyFunction;
  let onChange = effectHandle ?? emptyFunction;
  let valMessages = validation ?? {};

  const data: ObjectType = readOnly ? oldOppurtunity : oppurtunity;

  return (
    <>
      <FormContainer>
        <UnitSelect
          name="occupancy_status_c"
          label={fieldLabel.occupancyStatus}
          records={getObjectEntriesAsArray(occupancyStatus)}
          value={data.occupancy_status_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.showingInstructions}
          name="showing_information_instruct_c"
          value={data.showing_information_instruct_c ?? ''}
          onChange={handleChange}
          multiline
          rows={4}
          readOnly={readOnly}
        />

        <UnitSelect
          name="access_type"
          label={fieldLabel.accessType}
          records={getObjectEntriesAsArray(accessType)}
          value={data.access_type ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.accessNotes}
          name="access_notes"
          value={data.access_notes ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.lockboxCode}
          name="lockbox_code"
          value={data.lockbox_code ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="extension_request_reason"
          label={fieldLabel.extensionRequestReason}
          records={getObjectEntriesAsArray(extensionRequestReason)}
          value={data.extension_request_reason ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="pending_extension"
          label={fieldLabel.pendingExtension}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.pending_extension ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="pending_retrade"
          label={fieldLabel.pendingRetrade}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.pending_retrade ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.additionalAccessInformation}
          name="additional_access_information_c"
          value={data.additional_access_information_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.ddFeePaymentTrackingNumber}
          name="dd_fee_payment_tracking_number"
          value={data.dd_fee_payment_tracking_number ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.accessRequestedDate}
          name="access_requested_date"
          value={data.access_requested_date ?? ''}
          onChange={(e: any) =>
            onChange({
              target: { name: 'access_requested_date', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.accessRequestedBy}
            value={data?.access_requested_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.accessRequestedBy}
            value={{
              label: data.access_requested_name || '',
              value: data.access_requested_by || ''
            }}
            onChange={(val: any) => {
              handleChange({
                access_requested_name: val?.label,
                access_requested_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitDate
          label={fieldLabel.documentDelivered}
          name="documentation_delivered"
          value={data.documentation_delivered ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'documentation_delivered', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.keyLocation}
          name="key_location"
          value={data.key_location ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitSelect
          name="earnest_money_status_c"
          label={fieldLabel.emStatus}
          records={getObjectEntriesAsArray(earnestStatus)}
          value={data.earnest_money_status_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.mailboxLocation}
          name="mailbox_location"
          value={data.mailbox_location ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitEmpty />

        <UnitText
          label={fieldLabel.gateCode}
          name="gate_code"
          value={data.gate_code ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.emdRequestedConfirmed}
          name="emd_requested_confirmed"
          value={data.emd_requested_confirmed ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'emd_requested_confirmed', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitSelect
          name="option_fee_status_c"
          label={fieldLabel.optionFeeStatus}
          records={getObjectEntriesAsArray(optionStatus)}
          value={data.option_fee_status_c ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.emdDeliveryDate}
          name="em_delivery_date_c"
          value={data.em_delivery_date_c ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'em_delivery_date_c', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.optionFeeDeliveryDate}
          name="option_fee_delivery_date_c"
          value={data.option_fee_delivery_date_c ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'option_fee_delivery_date_c', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.congratsLetterSentDate}
          name="congrats_letter_sent_date"
          value={data.congrats_letter_sent_date ?? ''}
          onChange={(e: any) =>
            onChange({
              target: { name: 'congrats_letter_sent_date', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitSwitch
          value={data.mo_photos_required ?? 0}
          onChange={handleChange}
          name="mo_photos_required"
          label={fieldLabel.moPhotosRequired}
          disabled={readOnly}
        />

        {readOnly == true ? (
          <UnitRead
            label={fieldLabel.congratsLetterSentBy}
            value={data?.congrats_letter_sent_name}
          />
        ) : (
          <UnitBrokerageUser
            label={fieldLabel.congratsLetterSentBy}
            value={{
              label: data?.congrats_letter_sent_name || '',
              value: data?.congrats_letter_sent_by || ''
            }}
            onChange={(val: any) => {
              handleChange({
                congrats_letter_sent_name: val?.label,
                congrats_letter_sent_by: val?.value
              });
            }}
            readOnly={readOnly}
          />
        )}

        <UnitText
          label={fieldLabel.moPhotosSource}
          name="mo_photos_source"
          value={data.mo_photos_source ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitDate
          label={fieldLabel.moPhotosDate}
          name="mo_photos_date"
          value={data.mo_photos_date ?? ''}
          onChange={(e: any) =>
            handleChange({
              target: { name: 'mo_photos_date', value: e }
            })
          }
          required
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.moPhotosLink}
          name="mo_photos_link"
          value={data.mo_photos_link ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitItem>
          <UtilityProviders
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            readOnly={true}
          />
        </UnitItem>

        <UnitItem>
          <HOAManagement
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            readOnly={true}
          />
        </UnitItem>

        <UnitText
          label={fieldLabel.hvacAge}
          name="hvac_age"
          value={data.hvac_age ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.roofAge}
          name="roof_age"
          value={data.roof_age ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        <UnitText
          label={fieldLabel.hoaUrl}
          name="hoa_url"
          value={data.hoa_url ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />

        {readOnly ? (
          <>
            <UnitRead
              label={fieldLabel.municipalInspectionTypes}
              value={data.municipal_inspection_types_text_disply}
            />
          </>
        ) : (
          <AutoCompleteUnit
            label={fieldLabel.municipalInspectionTypes}
            id="municipal_inspection_types"
            options={getObjectEntriesAsArray(municipalInspectionTypes)}
            multiple={true}
            values={data.municipal_inspection_types}
            onChange={(e: any) => {
              onChange({
                target: {
                  name: 'municipal_inspection_types',
                  value: e.target.value
                }
              });
            }}
            error={valMessages['municipal_inspection_types']}
            readOnly={readOnly}
          />
        )}

        <UnitEmpty />

        <UnitText
          label={fieldLabel.municipalInspectionNotes}
          name="municipal_inspection_notes"
          value={data.municipal_inspection_notes ?? ''}
          onChange={onChange}
          readOnly={readOnly}
          error={valMessages['municipal_inspection_notes']}
        />

        <UnitSelect
          name="approved_to_close"
          label={fieldLabel.approvedToClose}
          records={getObjectEntriesAsArray(yesNo)}
          value={data.approved_to_close ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </FormContainer>
    </>
  );
};

export default DiligencePeriodRecordView;
