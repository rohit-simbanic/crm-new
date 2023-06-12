import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardContent,
  CardHeader,
  FormLabel,
  IconButton
} from '@mui/material';
import expenseTypes from 'assets/constants/expense-types';
import fieldLabel from 'assets/constants/fieldLabel';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitItem from 'components/form/unit-item';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import ModalComponent from 'components/modal';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import AddVendor from 'features/brokerage-actions/due-diligence-fees/add-vendor';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect, useState } from 'react';
import opportunityServiceProvidersService from 'services/opportunity-service-providers';
import serviceProviders from 'services/service-providers';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import { EditContainer } from '../record-view/container';

const FeeAdvance1 = ({
  oppurtunity,
  handleChange,
  vendors,
  updateOpportunity,
  toggleVendorModal,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const save = async () => {
    let reqBody = {
      name: 'Test Fee Advance',
      service_provider_id: oppurtunity?.fee_advance_service_providers_id_1,
      service_amount: oppurtunity?.fee_advance_amount_1,
      service_type: oppurtunity?.fee_advance_type_1,
      service_date: oppurtunity?.fee_advance_date_1,
      opportunity_id: oppurtunity?.id
    };

    if (oppurtunity?.fee_advance_id_1) {
      await opportunityServiceProvidersService.update(
        oppurtunity?.fee_advance_id_1,
        reqBody
      );
    } else {
      const result_fee_advance_1: ObjectType =
        await opportunityServiceProvidersService.create(reqBody);

      updateOpportunity({
        fee_advance_id_1: result_fee_advance_1.id
      });
    }

    setEdit(!edit);
  };

  return (
    <React.Fragment>
      <FormLabel>{fieldLabel.feeAdvance} 1:</FormLabel>
      <IconButton aria-label="" onClick={() => setEdit(!edit)} color="primary">
        <EditIcon />
      </IconButton>
      <EditContainer>
        <FormContainer>
          <UnitSelect
            name="fee_advance_service_providers_id_1"
            label={fieldLabel.vendor}
            value={oppurtunity?.fee_advance_service_providers_id_1}
            onChange={(val: any) => {
              val = val.target ? val.target.value : val?.value;
              updateOpportunity({
                fee_advance_service_providers_id_1: val,
                fee_advance_service_providers_name_1: vendors.find(
                  (x: any) => x.value == val
                )?.label
              });
            }}
            records={vendors}
            readOnly={edit}
            grid={{ sm: 5, xs: 5 }}
          />

          <UnitItem grid={{ sm: 1, xs: 1 }}>
            {!edit ? (
              <IconButton
                aria-label="add"
                color="success"
                onClick={toggleVendorModal}
              >
                <AddCircleIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </UnitItem>

          <UnitSelect
            name="fee_advance_type_1"
            label={fieldLabel.type}
            records={getObjectEntriesAsArray(expenseTypes)}
            value={oppurtunity?.fee_advance_type_1 ?? ''}
            onChange={handleChange}
            readOnly={edit}
          />

          <UnitPriceFormatter
            label={fieldLabel.amount}
            name="fee_advance_amount_1"
            value={oppurtunity?.fee_advance_amount_1 ?? ''}
            onChange={handleChange}
            readOnly={edit}
          />

          <UnitDate
            label={fieldLabel.date}
            name="fee_advance_date_1"
            value={
              oppurtunity.fee_advance_date_1
                ? oppurtunity.fee_advance_date_1
                : null
            }
            onChange={(e) =>
              handleChange({
                target: { name: 'fee_advance_date_1', value: e }
              })
            }
            readOnly={edit}
          />

          {!edit ? (
            <UnitItem grid={{ sm: 6, xs: 12 }}>
              <StackRowWithDivider>
                <SaveButton onClick={save} />
                <CancelButton onClick={() => setEdit(!edit)} />
              </StackRowWithDivider>
            </UnitItem>
          ) : (
            <></>
          )}
        </FormContainer>
      </EditContainer>
    </React.Fragment>
  );
};

const FeeAdvance2 = ({
  oppurtunity,
  handleChange,
  vendors,
  updateOpportunity,
  toggleVendorModal,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const save = async () => {
    let reqBody = {
      name: 'Test Fee Advance',
      service_provider_id: oppurtunity?.fee_advance_service_providers_id_2,
      service_amount: oppurtunity?.fee_advance_amount_2,
      service_type: oppurtunity?.fee_advance_type_2,
      service_date: oppurtunity?.fee_advance_date_2,
      opportunity_id: oppurtunity?.id
    };

    if (oppurtunity?.fee_advance_id_2) {
      await opportunityServiceProvidersService.update(
        oppurtunity?.fee_advance_id_2,
        reqBody
      );
    } else {
      const result_fee_advance_2: ObjectType =
        await opportunityServiceProvidersService.create(reqBody);
      updateOpportunity({
        fee_advance_id_2: result_fee_advance_2.id
      });
    }

    setEdit(!edit);
  };

  return (
    <React.Fragment>
      <FormLabel>{fieldLabel.feeAdvance} 2:</FormLabel>
      <IconButton aria-label="" onClick={() => setEdit(!edit)} color="primary">
        <EditIcon />
      </IconButton>

      <EditContainer>
        <FormContainer>
          <UnitSelect
            name="fee_advance_service_providers_id_2"
            label={fieldLabel.vendor}
            value={oppurtunity?.fee_advance_service_providers_id_2 ?? ''}
            onChange={(val: any) => {
              val = val.target ? val.target.value : val?.value;
              updateOpportunity({
                fee_advance_service_providers_id_2: val,
                fee_advance_service_providers_name_2: vendors.find(
                  (x: any) => x.value == val
                )?.label
              });
            }}
            records={vendors}
            readOnly={edit}
            grid={{ sm: 5, xs: 5 }}
          />

          <UnitItem grid={{ sm: 1, xs: 1 }}>
            {!edit ? (
              <IconButton
                aria-label="add"
                color="success"
                onClick={toggleVendorModal}
              >
                <AddCircleIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </UnitItem>

          <UnitSelect
            name="fee_advance_type_2"
            label={fieldLabel.type}
            records={getObjectEntriesAsArray(expenseTypes)}
            value={oppurtunity?.fee_advance_type_2 ?? ''}
            onChange={handleChange}
            readOnly={edit}
          />

          <UnitPriceFormatter
            label={fieldLabel.amount}
            name="fee_advance_amount_2"
            value={oppurtunity?.fee_advance_amount_2 ?? ''}
            onChange={handleChange}
            readOnly={edit}
          />

          <UnitDate
            label={fieldLabel.date}
            name="fee_advance_date_2"
            value={
              oppurtunity.fee_advance_date_2
                ? oppurtunity.fee_advance_date_2
                : null
            }
            onChange={(e) =>
              handleChange({
                target: { name: 'fee_advance_date_2', value: e }
              })
            }
            readOnly={edit}
          />

          {!edit ? (
            <UnitItem grid={{ sm: 6, xs: 12 }}>
              <StackRowWithDivider>
                <SaveButton onClick={save} />
                <CancelButton onClick={() => setEdit(!edit)} />
              </StackRowWithDivider>
            </UnitItem>
          ) : (
            <></>
          )}
        </FormContainer>
      </EditContainer>
    </React.Fragment>
  );
};

const FeeAdvance = ({
  oppurtunity,
  handleChange,
  updateOpportunity,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const [vendorForm, showVendorForm] = useState<boolean>(false);
  const [vendors, setVendors] = useState<OptionType[]>([]);

  const toggleVendorModal = () => {
    showVendorForm(!vendorForm);
  };

  const loadVendors = async () => {
    let result = await serviceProviders.getServiceProvides();

    if (result.isSuccess) {
      let data = result.data
        ?.filter((x: ObjectType) => x.type == 'fee_advance')
        .map((x: ObjectType) => ({ value: x.id, label: x.name }));

      setVendors(data);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardHeader title={fieldLabel.feeAdvance} />
        <CardContent>
          <FeeAdvance1
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            vendors={vendors}
            toggleVendorModal={toggleVendorModal}
            readOnly={readOnly}
          />
          <FeeAdvance2
            oppurtunity={oppurtunity}
            handleChange={handleChange}
            updateOpportunity={updateOpportunity}
            vendors={vendors}
            toggleVendorModal={toggleVendorModal}
            readOnly={readOnly}
          />
        </CardContent>
        {vendorForm && (
          <ModalComponent
            title={fieldLabel.createNewServiceProvider}
            Component={AddVendor}
            data={{
              type: 'fee_advance',
              reloadVendor: () => {
                loadVendors();
                showVendorForm(false);
              }
            }}
            onClose={() => {
              showVendorForm(false);
            }}
            size="sm"
            isServiceCreateBox={true}
          ></ModalComponent>
        )}
      </Card>
    </React.Fragment>
  );
};

export default FeeAdvance;
