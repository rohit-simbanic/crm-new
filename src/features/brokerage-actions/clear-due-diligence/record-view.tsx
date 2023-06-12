import enteraContribution from 'assets/constants/entera-contribution';
import fieldLabel from 'assets/constants/fieldLabel';
import initialCommissionList from 'assets/constants/initial-commission-list';
import reductionType from 'assets/constants/reduction-type';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitDateTime from 'components/form/unit-date-time';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import { actionPerform } from 'event/action-event';
import eventBus from 'helpers/event-bus-helper';
import { convertNumber, isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import opportunityHelper from 'helpers/opportunity-helper';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { initial_commission_amount } from 'services/validation/initial_commission_amount';
import { total_commission_reductions } from 'services/validation/total-commission-reductions';
import { ObjectType } from 'types';

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
  const [validation, setValidation] = useState<ObjectType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    ...oppurtunity,
    opportunity_status_c: 'closing_diligence_period',
    buyer_contract_name_c: oppurtunity.buyer_contract_name_c,
    contract_price_c: oppurtunity.contract_price_c,
    due_diligence_end_c: oppurtunity.due_diligence_end_c,
    close_date_c: oppurtunity.close_date_c,
    actual_rehab_c: oppurtunity.actual_rehab_c,
    purchase_price_c: oppurtunity.purchase_price_c,
    entera_contribution: oppurtunity.entera_contribution || '',
    entera_contribution_amount: oppurtunity.entera_contribution_amount || '',
    reduction_type: oppurtunity.reduction_type || '',
    commission_reduction_type2: oppurtunity.commission_reduction_type2 || '',
    commision_reduction: oppurtunity.commision_reduction || '',
    commision_reduction2: oppurtunity.commision_reduction2 || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    let fieldToCheck = [
      'entera_contribution',
      'entera_contribution_amount',
      'reduction_type',
      'commission_reduction_type2'
    ];

    const { status, ...errors } = ValidationService.validate(
      data,
      fieldToCheck,
      'action'
    );
    setValidation(errors);

    const totalCommisionReduction = total_commission_reductions.calculate(
      data,
      {}
    );

    let temp = {
      ...data,
      total_commission_reductions: totalCommisionReduction
    };

    if (
      isEmpty(data?.initial_commission_percentage) ||
      convertNumber(data?.initial_commission_percentage) == 0
    ) {
      temp = {
        ...temp,
        initial_commission_percentage: initialCommissionList[data?.market.name]
      };
      const initialComissioAmount = initial_commission_amount.calculate(
        temp,
        {}
      );
      temp = {
        ...temp,
        initial_commission_amount: initialComissioAmount
      };
    }

    const commissions = opportunityHelper.calculateCommission(temp);

    if (!status && oppurtunity.id) {
      const reqBody = {
        entera_contribution: data.entera_contribution,
        entera_contribution_amount: data.entera_contribution_amount,
        reduction_type: data.reduction_type,
        commission_reduction_type2: data.commission_reduction_type2,
        commision_reduction: data.commision_reduction,
        commision_reduction2: data.commision_reduction2,
        initial_commission_percentage: temp.initial_commission_percentage,
        initial_commission_amount: temp.initial_commission_amount,
        commision_pending: commissions.commision_pending,
        buyer_commission_c: commissions.buyer_commission_c,
        total_commission_reductions: totalCommisionReduction
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'clear_due_diligence'
      );
      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.clear_due_diligence();
        } else {
          navigate(`/opportunities/${oppurtunity.id}/view`);
          eventBus.dispatch('refresh_opportunity', {});
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
            <UnitText
              label={fieldLabel.buyerContractName}
              name="buyer_contract_name_c"
              value={data.buyer_contract_name_c ?? ''}
              onChange={handleChange}
              error={validation['buyer_contract_name_c'] ?? ''}
              disabled={true}
            />

            <UnitPriceFormatter
              label={fieldLabel.contractPrice}
              name="contract_price_c"
              value={data.contract_price_c ?? ''}
              onChange={handleChange}
              error={validation['contract_price_c'] ?? ''}
              disabled={true}
            />

            <UnitDateTime
              label={fieldLabel.ddEndDate}
              name="due_diligence_end_c"
              value={data.due_diligence_end_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'due_diligence_end_c', value: e }
                })
              }
              error={validation['due_diligence_end_c'] ?? ''}
              disabled={true}
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
              disabled={true}
            />

            <UnitPriceFormatter
              label={fieldLabel.rehabAmount}
              name="actual_rehab_c"
              value={data.actual_rehab_c ?? ''}
              onChange={handleChange}
              error={validation['actual_rehab_c'] ?? ''}
              disabled={true}
            />

            <UnitPriceFormatter
              label={fieldLabel.purchasePrice}
              name="purchase_price_c"
              value={data.purchase_price_c ?? ''}
              onChange={handleChange}
              error={validation['purchase_price_c'] ?? ''}
              disabled={true}
            />

            <UnitSelect
              name="entera_contribution"
              label={fieldLabel.enteraContribution}
              records={getObjectEntriesAsArray(enteraContribution)}
              value={data.entera_contribution ?? ''}
              onChange={handleChange}
              error={validation['entera_contribution'] ?? ''}
            />

            <UnitPriceFormatter
              label={fieldLabel.enteraContributionAmount}
              name="entera_contribution_amount"
              value={data.entera_contribution_amount ?? ''}
              onChange={handleChange}
              error={validation['entera_contribution_amount'] ?? ''}
            />

            <UnitSelect
              name="reduction_type"
              label={fieldLabel.reductionType}
              records={getObjectEntriesAsArray(reductionType)}
              value={data.reduction_type ?? ''}
              onChange={handleChange}
              error={validation['reduction_type'] ?? ''}
            />

            <UnitSelect
              name="commission_reduction_type2"
              label={fieldLabel.reductionType2}
              records={getObjectEntriesAsArray(reductionType)}
              value={data.commission_reduction_type2 ?? ''}
              onChange={handleChange}
              error={validation['commission_reduction_type2'] ?? ''}
            />

            <UnitPriceFormatter
              label={fieldLabel.commisionReduction}
              name="commision_reduction"
              value={data.commision_reduction ?? ''}
              onChange={handleChange}
              error={validation['commision_reduction'] ?? ''}
            />

            <UnitPriceFormatter
              label={fieldLabel.commisionReduction2}
              name="commision_reduction2"
              value={data.commision_reduction2 ?? ''}
              onChange={handleChange}
              error={validation['commision_reduction2'] ?? ''}
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
