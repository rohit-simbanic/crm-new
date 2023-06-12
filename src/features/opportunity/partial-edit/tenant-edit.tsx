import { CardHeader, IconButton, CardContent, Card } from '@mui/material';
import React, { useState } from 'react';
import { ObjectType } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import partiesService from 'services/parties-service';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitText from 'components/form/unit-text';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import SaveButton from 'components/form/button-save';
import CancelButton from 'components/form/button-cancel';
import { EditContainer } from '../record-view/container';
import UnitItem from 'components/form/unit-item';
import eventBus from 'helpers/event-bus-helper';
import EVENTS from 'assets/constants/events';

const TenantEdit = ({
  oppurtunity,
  // handleChange,
  updateOpportunity,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const [data, setData] = useState({ ...oppurtunity });

  const [validation, setValidtion] = useState<ObjectType>({});

  const handleChange = (e: any) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const save = async () => {
    const reqBody = {
      name: data?.parties_tenant_name,
      mobile: data?.parties_tenant_phone,
      email: data?.parties_tenant_email,
      type: 'tenant',
      opportunity_id: oppurtunity?.id
    };

    let result: ObjectType;

    if (!oppurtunity?.parties_tenant_id) {
      result = await partiesService.createParties(reqBody);
    } else {
      result = await partiesService.update(
        oppurtunity?.parties_tenant_id,
        reqBody
      );
    }

    if (result.isError) {
      setValidtion(result.errorMessage);
      return;
    }

    setValidtion({});

    const tenant: ObjectType = partiesService.getTenant([result.data], {
      ...oppurtunity,
      parties_tenant_id: result.data.id
    });

    updateOpportunity({ ...oppurtunity, ...tenant });

    eventBus.dispatch(EVENTS.SHOW_TOAST, {
      isError: false,
      message: 'Party Saved'
    });
    setEdit(!edit);
  };

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton aria-label="" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </IconButton>
          }
          title={fieldLabel.tenant}
        />
        <CardContent>
          <EditContainer>
            <FormContainer>
              <UnitText
                label={fieldLabel.tenantName}
                name="parties_tenant_name"
                value={data?.parties_tenant_name ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
                error={validation['name']}
              />

              <UnitText
                label={fieldLabel.tenantPhoneNumber}
                name="parties_tenant_phone"
                value={data?.parties_tenant_phone ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
                error={validation['mobile']}
              />

              <UnitText
                label={fieldLabel.tenantEmailAddress}
                name="parties_tenant_email"
                value={data?.parties_tenant_email ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
                error={validation['email']}
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
    </>
  );
};

export default TenantEdit;
