import fieldLabel from 'assets/constants/fieldLabel';
import retradeRequest from 'assets/constants/retrade-request';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitDateTimePicker from 'components/form/unit-date-time';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
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

const RecordView = ({
  onClose,
  currentTab,
  oppurtunity
}: {
  onClose?: any;
  currentTab?: string;
  oppurtunity: ObjectType;
}) => {
  const navigate = useNavigate();
  let { action } = useParams<ObjectType>();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunity?.opportunity_status_c || '',
    retrade_reason: oppurtunity?.retrade_reason || '',
    contract_price_c: oppurtunity?.contract_price_c || '',
    due_diligence_end_c: oppurtunity?.due_diligence_end_c,
    close_date_c: oppurtunity?.close_date_c || '',
    forecasted_dd_end_date: oppurtunity?.forecasted_dd_end_date || '',
    forecasted_close_date: oppurtunity?.forecasted_close_date || '',
    negotiator_sent_retrade_amount:
      oppurtunity?.negotiator_sent_retrade_amount || '',
    purchase_price_c: oppurtunity?.purchase_price_c || '',
    buyer_requested_retrade_amount:
      oppurtunity?.buyer_requested_retrade_amount || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['negotiator_sent_retrade_amount', 'retrade_reason'],
      'action'
    );

    setValidation(errors);

    if (!status) {
      const reqBody = {
        retrade_reason: data.retrade_reason,
        negotiator_sent_retrade_amount: data.negotiator_sent_retrade_amount,
        buyer_requested_retrade_amount: data.buyer_requested_retrade_amount
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'retrade_request'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.request_price_adjustment();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  const updatePurchasePrice = () => {
    let contractPrice = data.contract_price_c;
    let negotiatorSentRetradeAmount = data.negotiator_sent_retrade_amount;
    let purchasePrice = contractPrice - negotiatorSentRetradeAmount;

    setData((preData: ObjectType) => ({
      ...preData,
      purchase_price_c: purchasePrice
    }));
  };

  useEffect(() => {
    updatePurchasePrice();
  }, [data.negotiator_sent_retrade_amount]);
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
            <UnitSelect
              name="retrade_reason"
              label={fieldLabel.retradeReason}
              records={getObjectEntriesAsArray(retradeRequest)}
              value={data.retrade_reason ?? ''}
              onChange={handleChange}
              error={validation['retrade_reason'] ?? ''}
              required
            />

            <UnitPriceFormatter
              name={'contract_price_c'}
              label={fieldLabel.contractPrice}
              value={data.contract_price_c ?? ''}
              onChange={handleChange}
              disabled
            />

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
              error={validation['forecasted_close_date'] ?? ''}
              disabled
            />

            <UnitPriceFormatter
              name={'negotiator_sent_retrade_amount'}
              label={`${fieldLabel.negotiatorSentRetradeAmount} *`}
              value={data.negotiator_sent_retrade_amount ?? ''}
              onChange={handleChange}
              error={validation['negotiator_sent_retrade_amount'] ?? ''}
            />

            <UnitPriceFormatter
              name={'purchase_price_c'}
              label={fieldLabel.proposedPurchasePrice}
              value={data.purchase_price_c ?? ''}
              onChange={handleChange}
              disabled
            />

            <UnitPriceFormatter
              name={'buyer_requested_retrade_amount'}
              label={fieldLabel.buyerRequestedRetradeAmount}
              value={data.buyer_requested_retrade_amount ?? ''}
              onChange={handleChange}
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
