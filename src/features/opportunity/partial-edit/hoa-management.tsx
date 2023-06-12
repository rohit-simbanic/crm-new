import { CardHeader, IconButton, CardContent, Card } from '@mui/material';
import React, { useState } from 'react';
import { ObjectType } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import HOAService from 'services/hoa-service';
import { EditContainer } from '../record-view/container';
import FormContainer from 'components/form/container';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitText from 'components/form/unit-text';
import UnitSwitch from 'components/form/unit-switch';
import UnitItem from 'components/form/unit-item';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import SaveButton from 'components/form/button-save';
import CancelButton from 'components/form/button-cancel';

const HOAManagement = ({
  oppurtunity,
  handleChange,
  updateOpportunity,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const save = async () => {
    let reqBody = {
      is_self_managed: oppurtunity?.hoa_management_company_is_self_managed,
      contact_name: oppurtunity?.hoa_management_company_contact_name,
      contact_email: oppurtunity?.hoa_management_company_contact_email,
      contact_phone: oppurtunity?.hoa_management_company_contact_phone,
      contact_address: oppurtunity?.hoa_management_company_contact_address,
      company_phone: oppurtunity?.hoa_management_company_phone,
      name: oppurtunity?.hoa_management_company_name,
      opportunity_id: oppurtunity?.id
    };

    if (oppurtunity?.hoa_management_company_id) {
      const result: ObjectType = await HOAService.update(
        oppurtunity?.hoa_management_company_id,
        reqBody
      );
    } else {
      const result: ObjectType = await HOAService.create(reqBody);

      updateOpportunity({
        hoa_management_company_id: result.id
      });
    }

    setEdit(!edit);
  };

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton aria-label="" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </IconButton>
          }
          title={fieldLabel.hoaManagementCompany}
        />
        <CardContent>
          <EditContainer>
            <FormContainer>
              <UnitText
                label={fieldLabel.hoaName}
                name="hoa_management_company_name"
                value={oppurtunity?.hoa_management_company_name ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              <UnitText
                label={fieldLabel.hoaManagementContactName}
                name="hoa_management_company_contact_name"
                value={oppurtunity?.hoa_management_company_contact_name ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 8, xs: 8 }}
              />

              <UnitSwitch
                value={oppurtunity?.hoa_management_company_is_self_managed ?? 0}
                onChange={handleChange}
                name="hoa_management_company_is_self_managed"
                label={fieldLabel.isSelfManaged}
                disabled={edit}
                grid={{ sm: 4, xs: 4 }}
              />

              <UnitText
                label={fieldLabel.phone}
                name="hoa_management_company_phone"
                value={oppurtunity?.hoa_management_company_phone ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              <UnitText
                label={fieldLabel.hoaManagementContactEmail}
                name="hoa_management_company_contact_email"
                value={oppurtunity?.hoa_management_company_contact_email ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              <UnitText
                label={fieldLabel.hoaManagementContactPhone}
                name="hoa_management_company_contact_phone"
                value={oppurtunity?.hoa_management_company_contact_phone ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              <UnitText
                label={fieldLabel.hoaManagementContactAddress}
                name="hoa_management_company_contact_address"
                value={
                  oppurtunity?.hoa_management_company_contact_address ?? ''
                }
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              {!edit ? (
                <UnitItem grid={{ sm: 12, xs: 12 }}>
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
      </Card>
    </React.Fragment>
  );
};

export default HOAManagement;
