import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitItem from 'components/form/unit-item';
import UnitPriceFormatter from 'components/form/unit-price-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import ModalComponent from 'components/modal';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import AddVendor from 'features/brokerage-actions/due-diligence-fees/add-vendor';
import React, { useEffect, useState } from 'react';
import opportunityServiceProvidersService from 'services/opportunity-service-providers';
import serviceProviders from 'services/service-providers';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import { EditContainer } from '../record-view/container';

const Expence = ({
  oppurtunity,
  handleChange,
  updateOpportunity,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const [vendorForm, showVendorForm] = useState<boolean>(false);
  const [vendors, setVendors] = useState<OptionType[]>([]);

  const save = async () => {
    let reqBody = {
      name: 'Test Expense',
      service_provider_id: oppurtunity?.expense_service_providers_id,
      service_amount: oppurtunity?.expense_amount,
      service_type: oppurtunity?.expense_type,
      service_date: oppurtunity?.expense_date,
      opportunity_id: oppurtunity?.id
    };

    if (oppurtunity?.expanse_id) {
      await opportunityServiceProvidersService.update(
        oppurtunity?.expanse_id,
        reqBody
      );
    } else {
      const result: ObjectType =
        await opportunityServiceProvidersService.create(reqBody);

      updateOpportunity({
        expanse_id: result.id
      });
    }

    setEdit(!edit);
  };

  const loadVendors = async () => {
    let result = await serviceProviders.getServiceProvides();

    if (result.isSuccess) {
      let data = result.data
        ?.filter((x: ObjectType) => x.type == 'expense')
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
        <CardHeader
          action={
            <IconButton
              aria-label=""
              onClick={() => setEdit(!edit)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          }
          title={fieldLabel.expense}
        />
        <CardContent>
          <EditContainer>
            <FormContainer>
              <UnitSelect
                name="expense_service_providers_id"
                label={fieldLabel.vendor}
                value={oppurtunity?.expense_service_providers_id}
                onChange={(val: any) => {
                  val = val.target ? val.target.value : val?.value;
                  updateOpportunity({
                    expense_service_providers_id: val,
                    expense_service_providers_name: vendors.find(
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
                    onClick={() => showVendorForm(true)}
                  >
                    <AddCircleIcon />
                  </IconButton>
                ) : (
                  <></>
                )}
              </UnitItem>

              <UnitText
                label={fieldLabel.type}
                name="expense_type"
                onChange={handleChange}
                value={oppurtunity?.expense_type ?? ''}
                readOnly={edit}
              />

              <UnitPriceFormatter
                label={fieldLabel.amount}
                name="expense_amount"
                onChange={handleChange}
                value={oppurtunity?.expense_amount ?? ''}
                readOnly={edit}
              />

              <UnitDate
                label={fieldLabel.date}
                name="expense_date"
                value={
                  oppurtunity?.expense_date ? oppurtunity?.expense_date : null
                }
                onChange={(e) =>
                  handleChange({
                    target: { name: 'expense_date', value: e }
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
        </CardContent>
        {vendorForm && (
          <ModalComponent
            title={fieldLabel.createNewServiceProvider}
            Component={AddVendor}
            data={{
              type: 'expense',
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

export default Expence;
