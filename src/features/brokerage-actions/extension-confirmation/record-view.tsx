import React, { useState } from 'react';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { useNavigate, useParams } from 'react-router-dom';
import { actionPerform } from 'event/action-event';
import { ObjectType } from 'types';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitDate from 'components/form/unit-date';
import UnitSelect from 'components/form/unit-select';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import extensionRequest from 'assets/constants/extension-request';
import UnitDateTime from 'components/form/unit-date-time';
import PaperBox from 'components/paper-box';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import DateUtility from 'helpers/date-helper';
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
    opportunity_status_c: oppurtunity.opportunity_status_c || '',
    close_date_c: oppurtunity.close_date_c || '',
    forecasted_dd_end_date: oppurtunity.forecasted_dd_end_date || '',
    forecasted_close_date: oppurtunity.forecasted_close_date || '',
    extension_request_reason: oppurtunity.extension_request_reason || '',
    original_close_of_escrow_date:
      oppurtunity.original_close_of_escrow_date || '',
    due_diligence_end_c: oppurtunity.due_diligence_end_c || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['close_date_c', 'due_diligence_end_c'],
      'action'
    );

    setValidation(errors);
    if (!status) {
      const reqBody = {
        due_diligence_end_c: DateUtility.convertTimeZoneToUTC(
          data.due_diligence_end_c
        ),
        close_date_c: data.close_date_c,
        original_close_of_escrow_date: data.original_close_of_escrow_date
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'approve_extension_request'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.extension_confirmation();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
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
            <UnitDateTime
              label={fieldLabel.dueDiligenceEnd}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c ?? ''}
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
              disabled
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
              disabled
            />

            <UnitSelect
              name="extension_request_reason"
              label={fieldLabel.extensionRequestReason}
              records={getObjectEntriesAsArray(extensionRequest)}
              value={data.extension_request_reason ?? ''}
              onChange={handleChange}
              disabled
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
              disabled={data.original_close_of_escrow_date ? true : false}
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
