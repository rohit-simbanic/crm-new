import earnestMoneyStatus from 'assets/constants/earnest-money-status';
import fieldLabel from 'assets/constants/fieldLabel';
import optionFeeStatus from 'assets/constants/option-fee-status';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitItem from 'components/form/unit-item';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { actionPerform } from 'event/action-event';
import FieldChooser from 'features/dashboards/field-chooser/field-chooser';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import { ObjectType } from 'types';
import { fieldOptions } from './field-chooser/fields';
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
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: 'closing_diligence_period',
    option_fee_status_c: oppurtunity?.option_fee_status_c,
    option_fee_delivery_date_c: oppurtunity?.option_fee_delivery_date_c,
    option_amount_c: oppurtunity?.option_amount_c,
    earnest_money_status_c: oppurtunity?.earnest_money_status_c,
    emd_requested_confirmed:
      oppurtunity?.emd_requested_confirmed ?? DateUtility.getTodayDateString(),
    earnest_amount_c: oppurtunity?.earnest_amount_c,
    em_delivery_date_c:
      oppurtunity?.em_delivery_date_c ?? DateUtility.getTodayDateString(),
    escrow_company_name_c: oppurtunity?.escrow_company_name_c,
    escrow_company_address_c: oppurtunity?.escrow_company_address_c,
    escrow_company_email_c: oppurtunity?.escrow_company_email_c,
    escrow_company_phone_c: oppurtunity?.escrow_company_phone_c
  });
  const [fields, setFields] = useState(fieldOptions);

  const handleChange = (e: any) => {
    if (e.target) {
      setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
    } else {
      setData(Object.assign({}, data, e));
    }
  };

  const handleSubmit = async () => {
    let reqBody: ObjectType = {};

    if (fields.option_fee_status_c.checked) {
      reqBody['option_fee_status_c'] = data.option_fee_status_c;
      reqBody['option_fee_delivery_date_c'] = data.option_fee_delivery_date_c;
    }
    if (fields.earnest_money_status_c.checked) {
      reqBody['earnest_money_status_c'] = data.earnest_money_status_c;
      reqBody['emd_requested_confirmed'] = data.emd_requested_confirmed;
      reqBody['em_delivery_date_c'] = data.em_delivery_date_c;
    }

    setIsLoading(true);

    const result: ObjectType = await oppurtunityService.performAction(
      oppurtunity.id,
      reqBody,
      'option_earnest_fee_status'
    );

    setIsLoading(false);

    if (result.isError) {
      setValidation(result.errorMessage);
    }

    if (result.isSuccess) {
      if (action) {
        onClose();
        actionPerform.option_earnest_fee_status();
      } else {
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${oppurtunity.id}/view`);
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

  useEffect(() => {
    handleChange({
      escrow_company_name_c: oppurtunity?.escrow_company_name_c,
      escrow_company_address_c: oppurtunity?.escrow_company_address_c,
      escrow_company_email_c: oppurtunity?.escrow_company_email_c,
      escrow_company_phone_c: oppurtunity?.escrow_company_phone_c
    });
  }, [oppurtunity]);
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
            <UnitItem grid={{ xs: 12, sm: 3 }}>
              <FieldChooser data={fields} setFields={handleCheck} />
            </UnitItem>

            <UnitItem grid={{ xs: 12, sm: 12 }}>
              <StackRowWithDivider />
            </UnitItem>

            {fields.option_fee_status_c &&
              fields.option_fee_status_c.checked && (
                <>
                  <UnitSelect
                    name="option_fee_status_c"
                    label={fieldLabel.optionStatus}
                    records={getObjectEntriesAsArray(optionFeeStatus)}
                    value={data.option_fee_status_c ?? ''}
                    onChange={handleChange}
                    error={validation['option_fee_status_c'] ?? ''}
                  />

                  <UnitDate
                    label={fieldLabel.optionFeeDeliveryDate}
                    name="option_fee_delivery_date_c"
                    value={data.option_fee_delivery_date_c ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: {
                          name: 'option_fee_delivery_date_c',
                          value: e
                        }
                      })
                    }
                    error={validation['option_fee_delivery_date_c'] ?? ''}
                  />

                  <UnitPriceFormatter
                    label={fieldLabel.optionFee}
                    name="option_amount_c"
                    value={data.option_amount_c ?? ''}
                    onChange={handleChange}
                    error={validation['option_amount_c'] ?? ''}
                    disabled={true}
                  />

                  <UnitEmpty />
                </>
              )}

            {fields.earnest_money_status_c &&
              fields.earnest_money_status_c.checked && (
                <>
                  <UnitSelect
                    name="earnest_money_status_c"
                    label={fieldLabel.earnestStatus}
                    records={getObjectEntriesAsArray(earnestMoneyStatus)}
                    value={data.earnest_money_status_c ?? ''}
                    onChange={handleChange}
                    error={validation['earnest_money_status_c'] ?? ''}
                  />

                  <UnitDate
                    label={fieldLabel.emdRequestedConfirmed}
                    name="emd_requested_confirmed"
                    value={data.emd_requested_confirmed ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: {
                          name: 'emd_requested_confirmed',
                          value: e
                        }
                      })
                    }
                    error={validation['emd_requested_confirmed'] ?? ''}
                  />

                  <UnitPriceFormatter
                    label={fieldLabel.earnestFee}
                    name="earnest_amount_c"
                    value={data.earnest_amount_c ?? ''}
                    onChange={handleChange}
                    error={validation['earnest_amount_c'] ?? ''}
                    disabled={true}
                  />

                  <UnitDate
                    label={fieldLabel.emdDeliveryData}
                    name="em_delivery_date_c"
                    value={data.em_delivery_date_c ?? ''}
                    onChange={(e: any) =>
                      handleChange({
                        target: { name: 'em_delivery_date_c', value: e }
                      })
                    }
                    error={validation['em_delivery_date_c'] ?? ''}
                  />
                </>
              )}

            <UnitText
              label={fieldLabel.escrowCompanyName}
              name="escrow_company_name_c"
              value={data.escrow_company_name_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_name_c'] ?? ''}
              disabled={true}
            />

            <UnitText
              label={fieldLabel.escrowCompanyAddress}
              name="escrow_company_address_c"
              value={data.escrow_company_address_c ?? ''}
              multiline
              rows={2}
              onChange={handleChange}
              error={validation['escrow_company_address_c'] ?? ''}
              disabled={true}
            />

            <UnitText
              label={fieldLabel.escrowCompanyEmail}
              name="escrow_company_email_c"
              value={data.escrow_company_email_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_email_c'] ?? ''}
              disabled={true}
            />

            <UnitText
              label={fieldLabel.escrowCompanyPhone}
              name="escrow_company_phone_c"
              value={data.escrow_company_phone_c ?? ''}
              onChange={handleChange}
              error={validation['escrow_company_phone_c'] ?? ''}
              disabled={true}
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
