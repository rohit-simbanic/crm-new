import { actionPerform } from 'event/action-event';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
import SaveButton from 'components/form/button-save';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitEmpty from 'components/form/unit-empty';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import yesNo from 'assets/constants/yes-no';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import UnitPriceFormatter from 'components/form/unit-price-formatter';

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
    opportunity_status_c: 'closing_termination_pending',
    earnest_amount_c: oppurtunity?.earnest_amount_c || '',
    earnest_recovered_by_buyer: oppurtunity?.earnest_recovered_by_buyer || '',
    earnest_recovery_amount: oppurtunity?.earnest_recovery_amount || '',
    earnest_paid_by_entera: oppurtunity?.earnest_paid_by_entera || '',
    earnest_paid_by_entera_amount:
      oppurtunity?.earnest_paid_by_entera_amount || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      ['earnest_recovery_amount', 'earnest_paid_by_entera_amount'],
      'action'
    );
    setValidation(errors);
    if (!status) {
      const reqBody = {
        earnest_recovered_by_buyer: data.earnest_recovered_by_buyer,
        earnest_recovery_amount: data.earnest_recovery_amount,
        earnest_paid_by_entera: data.earnest_paid_by_entera,
        earnest_paid_by_entera_amount: data.earnest_paid_by_entera_amount
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'termination_complete'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.termination_approval();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  const updateData = () => {
    setData({
      opportunity_status_c: 'termination_complete',
      earnest_recovered_by_buyer: oppurtunity?.earnest_recovered_by_buyer || '',
      earnest_recovery_amount: oppurtunity?.earnest_recovery_amount || '',
      earnest_paid_by_entera: oppurtunity?.earnest_paid_by_entera || '',
      earnest_paid_by_entera_amount:
        oppurtunity?.earnest_paid_by_entera_amount || ''
    });
  };

  useEffect(() => {
    updateData();
  }, []);

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
            <UnitPriceFormatter
              label={fieldLabel.earnestAmount}
              name={'earnest_amount_c'}
              value={data.earnest_amount_c ?? ''}
              onChange={handleChange}
              disabled
            />

            <UnitEmpty />

            <UnitSelect
              name="earnest_recovered_by_buyer"
              label={fieldLabel.emRecoveredByBuyer}
              records={getObjectEntriesAsArray(yesNo)}
              value={data.earnest_recovered_by_buyer ?? ''}
              onChange={handleChange}
            />

            <UnitPriceFormatter
              label={fieldLabel.emRecoveryAmount}
              name={'earnest_recovery_amount'}
              value={data.earnest_recovery_amount ?? ''}
              onChange={handleChange}
              error={validation['earnest_recovery_amount'] ?? ''}
            />

            <UnitSelect
              name="earnest_paid_by_entera"
              label={fieldLabel.emPaidByEntera}
              records={getObjectEntriesAsArray(yesNo)}
              value={data.earnest_paid_by_entera ?? ''}
              onChange={handleChange}
            />

            <UnitPriceFormatter
              label={fieldLabel.emPaidByEnteraAmount}
              name={'earnest_paid_by_entera_amount'}
              value={data.earnest_paid_by_entera_amount ?? ''}
              onChange={handleChange}
              error={validation['earnest_paid_by_entera_amount'] ?? ''}
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
