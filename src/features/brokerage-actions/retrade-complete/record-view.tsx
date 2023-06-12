import fieldLabel from 'assets/constants/fieldLabel';
import retradeReasons from 'assets/constants/retrade-reasons';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
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
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import validationService from 'services/validation-service';
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
    opportunity_status_c: 'closing_diligence_period',
    retrade_reason: 'other',
    contract_price_c: oppurtunity?.contract_price_c || '',
    due_diligence_end_c: oppurtunity?.due_diligence_end_c || '',
    close_date_c: oppurtunity?.close_date_c,
    actual_rehab_c: oppurtunity?.actual_rehab_c,
    negotiator_sent_retrade_amount: oppurtunity?.negotiator_sent_retrade_amount,
    actual_retrade_amount: oppurtunity?.actual_retrade_amount || '',
    purchase_price_c:
      Number(oppurtunity?.contract_price_c) -
      Number(oppurtunity?.actual_retrade_amount || '0')
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = validationService.validate(
      data,
      ['actual_retrade_amount'],
      'action'
    );

    setValidation(errors);

    if (status) return;

    const reqBody = {
      retrade_reason: data.retrade_reason,
      contract_price_c: data.contract_price_c,
      due_diligence_end_c: data.due_diligence_end_c,
      close_date_c: data.close_date_c,
      actual_rehab_c: data.actual_rehab_c,
      negotiator_sent_retrade_amount: data.negotiator_sent_retrade_amount,
      actual_retrade_amount: data.actual_retrade_amount,
      purchase_price_c: data.purchase_price_c
    };

    setIsLoading(true);

    const result: ObjectType = await oppurtunityService.performAction(
      oppurtunity.id,
      reqBody,
      'retrade_complete'
    );

    setIsLoading(false);

    if (result.isError) {
      setValidation(result.errorMessage);
    }

    if (result.isSuccess) {
      if (action) {
        onClose();
        actionPerform.retrade_approval();
      } else {
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${oppurtunity.id}/view`);
      }
    }
  };

  useEffect(() => {
    handleChange({
      target: {
        name: 'purchase_price_c',
        value:
          Number(data.contract_price_c) - Number(data.actual_retrade_amount)
      }
    });
  }, [data.actual_retrade_amount]);

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
              records={getObjectEntriesAsArray(retradeReasons)}
              value={data.retrade_reason ?? ''}
              onChange={handleChange}
              disabled
            />

            <UnitPriceFormatter
              name={'contract_price_c'}
              label={fieldLabel.contractPrice}
              value={data.contract_price_c ?? ''}
              onChange={handleChange}
              disabled
            />

            <UnitDate
              label={fieldLabel.dueDiligenceEnd}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'due_diligence_end_c', value: e }
                })
              }
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
              disabled
            />

            <UnitPriceFormatter
              name={'actual_rehab_c'}
              label={fieldLabel.rehabAmount}
              value={data.actual_rehab_c ?? ''}
              onChange={handleChange}
              disabled
            />

            <UnitPriceFormatter
              name={'negotiator_sent_retrade_amount'}
              label={fieldLabel.negotiatorRequestedRetradeAmount}
              value={data.negotiator_sent_retrade_amount ?? ''}
              onChange={handleChange}
            />

            <UnitPriceFormatter
              name={'actual_retrade_amount'}
              label={`${fieldLabel.actualRetradeAmount} *`}
              value={data.actual_retrade_amount ?? ''}
              error={validation['actual_retrade_amount'] ?? ''}
              onChange={handleChange}
            />

            <UnitPriceFormatter
              name={'purchase_price_c'}
              label={fieldLabel.purchasePrice}
              value={data.purchase_price_c ?? ''}
              onChange={handleChange}
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
