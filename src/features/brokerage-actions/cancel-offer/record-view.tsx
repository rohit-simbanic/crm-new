import cancelReasons from 'assets/constants/cancel-reasons';
import fieldLabel from 'assets/constants/fieldLabel';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import { actionPerform } from 'event/action-event';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';
import cancelSubReasons from 'assets/constants/cancel-sub-reasons';
import DateUtility from 'helpers/date-helper';

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
  const [data, setData] = useState<any>({
    offer_cancelled_date: DateUtility.getTodayDateString(),
    cancel_request_received_date: '',
    cancel_reason: '',
    cancellation_reason_subcategory: '',
    cancel_note: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cancelReasonSubOption, setCancelReasonSubOption] = useState<
    OptionType[]
  >([]);

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    let fieldToCheck = ['cancel_request_received_date', 'cancel_reason'];

    if (cancelReasonSubOption.length > 0) {
      fieldToCheck.push('cancellation_reason_subcategory');
    }

    const { status, ...errors } = ValidationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    setValidation(errors);

    if (!status && oppurtunity.id) {
      const reqBody = {
        offer_cancelled_date: data.offer_cancelled_date,
        cancel_request_received_date: data.cancel_request_received_date,
        cancel_reason: data.cancel_reason,
        cancellation_reason_subcategory: data.cancellation_reason_subcategory,
        cancel_note: data.cancel_note
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'cancel_offer'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.cancel_offer();
        } else {
          navigate(`/opportunities/${oppurtunity.id}/view`);
          eventBus.dispatch('refresh_opportunity', {});
        }
      }
    }
  };

  useEffect(() => {
    setCancelReasonSubOption(cancelSubReasons[data.cancel_reason] || []);
  }, [data.cancel_reason]);

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
            <UnitDate
              label={fieldLabel.cancelDate}
              name="offer_cancelled_date"
              value={data.offer_cancelled_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'offer_cancelled_date', value: e }
                })
              }
              disabled
            />

            <UnitDate
              label={fieldLabel.cancelRequestReceivedDate}
              name="cancel_request_received_date"
              value={data.cancel_request_received_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'cancel_request_received_date', value: e }
                })
              }
              error={validation['cancel_request_received_date'] ?? ''}
              required
            />

            <UnitSelect
              name="cancel_reason"
              label={fieldLabel.cancelReason}
              records={getObjectEntriesAsArray(cancelReasons)}
              value={data.cancel_reason ?? ''}
              onChange={handleChange}
              error={validation['cancel_reason'] ?? ''}
              required
            />

            <UnitSelect
              name="cancellation_reason_subcategory"
              label={fieldLabel.cancelSubReason}
              records={cancelReasonSubOption}
              value={data.cancellation_reason_subcategory ?? ''}
              onChange={handleChange}
              error={validation['cancellation_reason_subcategory'] ?? ''}
            />

            <UnitText
              name={'cancel_note'}
              label={fieldLabel.cancelNote}
              value={data.cancel_note ?? ''}
              onChange={handleChange}
              multiline
              rows={4}
              grid={{ xs: 12, sm: 12 }}
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
