import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import fieldLabel from 'assets/constants/fieldLabel';
import offerRejectReasons from 'assets/constants/offer-reject-reasons';
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
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
import useRouteName from 'pages/route-outlet-context';
import UnitPriceFormatter from 'components/form/unit-price-formatter';

const RecordView = ({
  oppurtunity,
  onClose,
  currentTab
}: {
  oppurtunity: ObjectType;
  onClose?: any;
  currentTab?: string;
}) => {
  const navigate = useNavigate();
  let { action } = useParams<ObjectType>();
  const outletContext = useRouteName();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunityStatusList.offer_rejected,
    reject_reason: oppurtunity?.reject_reason || '',
    reject_date: DateUtility.getTodayDateString(),
    competing_offer_count: oppurtunity?.competing_offer_count || '',
    competing_offer_highest_price:
      oppurtunity?.competing_offer_highest_price || '',
    reject_note: oppurtunity?.reject_note || '',
    offer_date_c: oppurtunity?.offer_date_c || ''
  });
  const [saveDisable, setSaveDisable] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['reject_reason', 'reject_date', 'offer_date_c'],
      'action'
    );
    setSaveDisable(true);
    setValidation(errors);

    setIsLoading(true);
    if (status) setSaveDisable(false);
    if (!status) {
      const result = await oppurtunityService.performAction(
        oppurtunity.id,
        data,
        'reject_offer'
      );

      setIsLoading(false);

      if (result.isValidationError) {
        setValidation(result.errorMessage);
      }

      if (action) {
        onClose();
        actionPerform.reject_offer();
      } else {
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${oppurtunity.id}/view`);
      }

      setSaveDisable(false);
    }
  };

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxContent
          sx={{ height: 'calc(100vh - 45vh)', overflowY: 'auto', p: 2 }}
        >
          <FormContainer>
            <UnitSelect
              name="reject_reason"
              label={fieldLabel.rejectReason}
              records={getObjectEntriesAsArray(offerRejectReasons)}
              value={data?.reject_reason ? data?.reject_reason : ''}
              onChange={handleChange}
              error={validation['reject_reason'] ?? ''}
              required
            />

            <UnitDate
              label={fieldLabel.rejectDate}
              name="reject_date"
              value={data.reject_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'reject_date', value: e }
                })
              }
              error={validation['reject_date'] ?? ''}
              required
            />

            <UnitText
              name={'competing_offer_count'}
              label={fieldLabel.howManyCompetingOffers}
              value={data.competing_offer_count ?? ''}
              onChange={handleChange}
            />

            <UnitPriceFormatter
              label={fieldLabel.highestCompetingOfferPrice}
              name="competing_offer_highest_price"
              value={data.competing_offer_highest_price ?? ''}
              onChange={handleChange}
            />

            <UnitDate
              label={fieldLabel.offerDate}
              name="offer_date_c"
              value={data.offer_date_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'offer_date_c', value: e }
                })
              }
              error={validation['offer_date_c'] ?? ''}
              required
            />

            <UnitText
              name={'reject_note'}
              label={fieldLabel.rejectNote}
              value={data.reject_note ?? ''}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </FormContainer>
        </PaperBoxContent>

        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <SaveButton onClick={handleSubmit} disabled={saveDisable} />
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};

export default RecordView;
