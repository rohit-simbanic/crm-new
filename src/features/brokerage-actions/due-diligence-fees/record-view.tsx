import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import expenseTypes from 'assets/constants/expense-types';
import fieldLabel from 'assets/constants/fieldLabel';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitItem from 'components/form/unit-item';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import ModalComponent from 'components/modal';
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
import serviceProvides from 'services/service-providers';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';

import AddVendor from './add-vendor';

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
  const [vendorForm, showVendorForm] = useState<boolean>(false);
  const [vendors, setVendors] = useState<any>([]);
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    opportunity_status_c: oppurtunity?.opportunity_status_c,
    service_provider_id:
      oppurtunity?.opportunity_service_provider?.service_provider_id || '',
    service_type: oppurtunity?.opportunity_service_provider?.service_type || '',
    service_amount:
      oppurtunity?.opportunity_service_provider?.service_amount ||
      oppurtunity?.option_amount_c,
    service_date:
      oppurtunity?.opportunity_service_provider?.service_date ||
      DateUtility.getTodayDateString(),
    dd_fee_payment_tracking_number:
      oppurtunity?.dd_fee_payment_tracking_number || ''
  });

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const loadServiceProvider = async () => {
    const result = await serviceProvides.getServiceProvides();

    if (result.isSuccess) {
      setVendors(
        result.data
          ?.filter((x: ObjectType) => x.type == 'expense')
          .map((item: any) => {
            return {
              value: item.id,
              label: item.name
            };
          })
      );
    }
  };

  useEffect(() => {
    loadServiceProvider();
  }, []);

  const handleSubmit = async () => {
    const { status, ...errors } = ValidationService.validate(
      data,
      [],
      'action'
    );
    setValidation(errors);

    if (!status && oppurtunity.id) {
      const reqBody = {
        service_provider_id: data.service_provider_id,
        service_type: data.service_type,
        option_amount_c: data.service_amount,
        service_date: data.service_date,
        dd_fee_payment_tracking_number: data.dd_fee_payment_tracking_number
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'due_diligence_fees'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.due_diligence_fees();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  const handleAddVendor = () => {
    showVendorForm(true);
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
            <UnitSelect
              name="service_provider_id"
              label={fieldLabel.vendor}
              records={vendors}
              value={data.service_provider_id ?? ''}
              onChange={handleChange}
              error={validation['service_provider_id'] ?? ''}
              grid={{ xs: 12, sm: 5 }}
            />

            <UnitItem grid={{ xs: 12, sm: 1 }} p={1}>
              <IconButton size="large" color="info">
                <AddIcon onClick={handleAddVendor} />
              </IconButton>
            </UnitItem>

            <UnitSelect
              name="service_type"
              label={fieldLabel.type}
              records={getObjectEntriesAsArray(expenseTypes)}
              value={data.service_type ?? ''}
              onChange={handleChange}
              error={validation['service_type'] ?? ''}
            />

            <UnitPriceFormatter
              name="service_amount"
              value={data?.service_amount}
              onChange={handleChange}
              label={fieldLabel.amount}
              error={validation['service_amount'] ?? ''}
            />

            <UnitDate
              label={fieldLabel.date}
              name="service_date"
              value={data.service_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'service_date', value: e }
                })
              }
              readOnly={false}
              error={validation['service_date'] ?? ''}
            />

            <UnitText
              label={fieldLabel.ddFeePaymentTrackingNumber}
              name="dd_fee_payment_tracking_number"
              value={data.dd_fee_payment_tracking_number ?? ''}
              onChange={handleChange}
              error={validation['dd_fee_payment_tracking_number'] ?? ''}
            />
          </FormContainer>
          {vendorForm && (
            <ModalComponent
              title="Create new service provider"
              Component={AddVendor}
              data={{
                reloadVendor: (vendor_id: string) => {
                  loadServiceProvider();
                  showVendorForm(false);
                  handleChange({
                    target: {
                      name: 'service_provider_id',
                      value: vendor_id
                    }
                  });
                }
              }}
              onClose={() => {
                showVendorForm(false);
              }}
              isServiceCreateBox={true}
            ></ModalComponent>
          )}
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
