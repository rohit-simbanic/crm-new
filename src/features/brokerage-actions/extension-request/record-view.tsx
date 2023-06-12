import React, { useState } from 'react';
import FieldChooser from 'features/dashboards/field-chooser/field-chooser';
import { fieldOptions } from './field-chooser/fields';
import validationService from 'services/validation-service';
import oppurtunityService from 'services/oppurtunity-service';
import { useNavigate, useParams } from 'react-router-dom';
import { actionPerform } from 'event/action-event';
import { ObjectType } from 'types';
import SaveButton from 'components/form/button-save';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitDateTimePicker from 'components/form/unit-date-time';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import UnitItem from 'components/form/unit-item';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import extensionRequest from 'assets/constants/extension-request';
import PaperBox from 'components/paper-box';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import moment from 'moment';
import variableConfig from 'config/variable';

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
    opportunity_status_c: oppurtunity?.opportunity_status_c || '',
    due_diligence_end_c:
      oppurtunity.due_diligence_end_c ||
      DateUtility.addHours(
        moment(DateUtility.getTodayDateTimeString()),
        variableConfig.DUE_DILIGENCE_END_START_TIME
      ),
    close_date_c: oppurtunity?.close_date_c || '',
    forecasted_dd_end_date: oppurtunity.forecasted_dd_end_date || '',
    forecasted_close_date: oppurtunity.forecasted_close_date || '',
    extension_request_reason: oppurtunity.extension_request_reason || '',
    addendum_no: oppurtunity.addendum_no || '',
    addendum_notes: oppurtunity.addendum_notes || '',
    original_close_of_escrow_date: DateUtility.getTodayDateString()
  });

  const [fields, setFields] = useState(fieldOptions);

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    let fieldToCheck = ['extension_request_reason'];

    if (fields.forecasted_dd_end_date.checked) {
      fieldToCheck.push('forecasted_dd_end_date');
    }
    if (fields.forecasted_close_date.checked) {
      fieldToCheck.push('forecasted_close_date');
    }

    const { status, ...errors } = validationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    setValidation(errors);

    if (!status) {
      let reqBody;
      reqBody = {
        addendum_notes: data.addendum_notes,
        addendum_no: data.addendum_no,
        extension_request_reason: data.extension_request_reason
      };

      if (fields.forecasted_dd_end_date.checked) {
        reqBody = {
          ...reqBody,
          forecasted_dd_end_date: data.forecasted_dd_end_date
        };
      }

      if (fields.forecasted_close_date.checked) {
        reqBody = {
          ...reqBody,
          forecasted_close_date: data.forecasted_close_date
        };
      }

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'extension_request'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.extension_request();
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
          field.checked = e.target.checked;
        }
      }
      return { ...fields };
    });
  };

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxContent
          sx={{ height: 'calc(100vh - 45vh)', overflowY: 'auto', p: 2, pt: 3 }}
        >
          <FormContainer>
            <UnitItem grid={{ xs: 12, sm: 12 }} p={3}>
              <FieldChooser data={fields} setFields={handleCheck} />
            </UnitItem>
          </FormContainer>

          <FormContainer>
            <UnitDateTimePicker
              label={fieldLabel.ddEndDate}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'due_diligence_end_c', value: e }
                })
              }
              error={validation['due_diligence_end_c'] ?? ''}
              disabled
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
              disabled
            />

            <UnitDate
              label={fieldLabel.forecastedDDEndDate}
              name="forecasted_dd_end_date"
              value={data.forecasted_dd_end_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'forecasted_dd_end_date', value: e }
                })
              }
              error={validation['forecasted_dd_end_date'] ?? ''}
              disabled={!fields.forecasted_dd_end_date.checked}
              required
            />

            <UnitDate
              label={fieldLabel.forecastedCloseDate}
              name="forecasted_close_date"
              value={data.forecasted_close_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'forecasted_close_date', value: e }
                })
              }
              error={validation['forecasted_close_date'] ?? ''}
              disabled={!fields.forecasted_close_date.checked}
              required
            />

            <UnitSelect
              name="extension_request_reason"
              label={fieldLabel.extensionRequestReason}
              records={getObjectEntriesAsArray(extensionRequest)}
              value={data.extension_request_reason ?? ''}
              onChange={handleChange}
              error={validation['extension_request_reason'] ?? ''}
              required
            />

            <UnitText
              name={'addendum_no'}
              label={fieldLabel.addendumNumber}
              value={data.addendum_no ?? ''}
              onChange={handleChange}
            />

            <UnitText
              name={'addendum_notes'}
              label={fieldLabel.addendumNotes}
              value={data.addendum_notes ?? ''}
              onChange={handleChange}
            />

            <UnitDate
              label={fieldLabel.originalCloseOfEscrow}
              name="original_close_of_escrow_date"
              value={data.original_close_of_escrow_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: {
                    name: 'original_close_of_escrow_date',
                    value: e
                  }
                })
              }
              error={validation['original_close_of_escrow_date'] ?? ''}
              disabled
            />
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
