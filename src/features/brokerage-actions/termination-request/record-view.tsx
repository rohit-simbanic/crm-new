import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import fieldLabel from 'assets/constants/fieldLabel';
import terminationReason from 'assets/constants/termination-reason';
import terminationSubReason from 'assets/constants/termination-sub-reason';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';
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
  const [terminationSubReasonOptions, setTerminationSubReasonOptions] =
    useState([]);

  const [data, setData] = useState<ObjectType>({
    opportunity_status_c:
      oppurtunityStatusList.closing_termination_pending || '',
    buyer_contract_name_c: oppurtunity?.buyer_contract_name_c || '',
    contract_price_c: oppurtunity?.contract_price_c || '',
    due_diligence_end_c: oppurtunity?.due_diligence_end_c || '',
    contract_terminated_date:
      oppurtunity?.contract_terminated_date || DateUtility.getTodayDateString(),
    contract_termination_reasons:
      oppurtunity?.contract_termination_reasons || '',
    earnest_amount_c: oppurtunity?.earnest_amount_c || '',
    termination_reason_subcategory:
      oppurtunity?.termination_reason_subcategory || '',

    internal_termination_feedback:
      oppurtunity?.internal_termination_feedback || ''
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
      'contract_termination_reasons',
      'internal_termination_feedback',
      'termination_reason_subcategory'
    ];

    const { status, ...errors } = ValidationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    setValidation(errors);

    if (!status && oppurtunity.id) {
      const reqBody = {
        contract_termination_reasons: data.contract_termination_reasons,
        termination_reason_subcategory: data.termination_reason_subcategory,
        contract_terminated_date: data.contract_terminated_date,
        internal_termination_feedback: data.internal_termination_feedback
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'termination_request'
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
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  useEffect(() => {
    setTerminationSubReasonOptions(
      terminationSubReason[data?.contract_termination_reasons || []]
    );
  }, [data.contract_termination_reasons]);

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
            <UnitText
              label={fieldLabel.requestingNameBuyer}
              name={'buyer_contract_name_c'}
              value={data.buyer_contract_name_c ?? ''}
              onChange={handleChange}
              error={validation['buyer_contract_name_c'] ?? ''}
              disabled
            />

            <UnitPriceFormatter
              label={fieldLabel.contractPrice}
              name={'contract_price_c'}
              value={data.contract_price_c ?? ''}
              onChange={handleChange}
              error={validation['contract_price_c'] ?? ''}
              disabled
            />

            <UnitDate
              label={fieldLabel.ddEndDate}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'due_diligence_end_c', value: e }
                })
              }
              error={validation['due_diligence_end_c'] ?? ''}
              required
              disabled
            />

            <UnitDate
              label={fieldLabel.contractTerminatedDate}
              name="contract_terminated_date"
              value={data.contract_terminated_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'contract_terminated_date', value: e }
                })
              }
              error={validation['contract_terminated_date'] ?? ''}
            />

            <UnitSelect
              name="contract_termination_reasons"
              label={fieldLabel.contractTerminatedReasons}
              records={getObjectEntriesAsArray(terminationReason)}
              value={data.contract_termination_reasons ?? ''}
              onChange={(e) => {
                handleChange({
                  contract_termination_reasons: e.target.value,
                  termination_reason_subcategory: ''
                });
              }}
              error={validation['contract_termination_reasons'] ?? ''}
              required
            />

            <UnitPriceFormatter
              label={fieldLabel.earnestAmount}
              name={'earnest_amount_c'}
              value={data.earnest_amount_c ?? ''}
              onChange={handleChange}
              error={validation['earnest_amount_c'] ?? ''}
              disabled
            />

            <UnitSelect
              label={fieldLabel.terminationReasonSubcategory}
              name="termination_reason_subcategory"
              records={terminationSubReasonOptions}
              value={data?.termination_reason_subcategory ?? ''}
              onChange={handleChange}
              error={validation['termination_reason_subcategory'] ?? ''}
              required
            />

            <UnitEmpty />

            <UnitText
              label={fieldLabel.internalTerminationFeedback}
              name={'internal_termination_feedback'}
              value={data.internal_termination_feedback ?? ''}
              onChange={handleChange}
              error={validation['internal_termination_feedback'] ?? ''}
              multiline
              rows={3}
              required
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
