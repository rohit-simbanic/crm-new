import { CardHeader, IconButton, CardContent, Card } from '@mui/material';
import React, { useState } from 'react';
import { ObjectType } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import UtilityProviderService from 'services/utility-provider-service';
import { EditContainer } from '../record-view/container';
import FormContainer from 'components/form/container';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitText from 'components/form/unit-text';
import UnitSwitch from 'components/form/unit-switch';
import UnitItem from 'components/form/unit-item';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import SaveButton from 'components/form/button-save';
import CancelButton from 'components/form/button-cancel';

const UtilityProviders = ({
  oppurtunity,
  handleChange,
  updateOpportunity,
  readOnly
}: ObjectType) => {
  const [edit, setEdit] = useState(readOnly);

  const save = async () => {
    let reqBody = {
      name: 'Test',
      electric_provider: oppurtunity?.electric_provider,
      gas_provider: oppurtunity?.gas_provider,
      is_electric: oppurtunity?.is_electric,
      water_well_provider: oppurtunity?.water_well_provider,
      is_well: oppurtunity?.is_well,
      sewer_provider: oppurtunity?.sewer_provider,
      is_septic: oppurtunity?.is_septic,
      trash_provider: oppurtunity?.trash_provider,
      opportunity_id: oppurtunity?.id
    };

    if (oppurtunity?.utility_provider_id) {
      const result: ObjectType = await UtilityProviderService.update(
        oppurtunity?.utility_provider_id,
        reqBody
      );
    } else {
      const result: ObjectType = await UtilityProviderService.create(reqBody);

      updateOpportunity({
        utility_provider_id: result.id
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
          title={fieldLabel.utilityProvider}
        />
        <CardContent>
          <EditContainer>
            <FormContainer>
              <UnitText
                label={fieldLabel.electricProvider}
                name="electric_provider"
                value={oppurtunity?.electric_provider ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 12, xs: 12 }}
              />

              <UnitText
                label={fieldLabel.waterProvider}
                name="water_well_provider"
                value={oppurtunity?.water_well_provider ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 8, xs: 8 }}
              />

              <UnitSwitch
                value={oppurtunity?.is_well ?? 0}
                onChange={handleChange}
                name="is_well"
                label={fieldLabel.isWell}
                disabled={edit}
                grid={{ sm: 4, xs: 4 }}
              />

              <UnitText
                label={fieldLabel.sewerProvider}
                name="sewer_provider"
                value={oppurtunity?.sewer_provider ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 8, xs: 8 }}
              />

              <UnitSwitch
                value={oppurtunity?.is_septic ?? 0}
                onChange={handleChange}
                name="is_septic"
                label={fieldLabel.isSeptic}
                disabled={edit}
                grid={{ sm: 4, xs: 4 }}
              />

              <UnitText
                label={fieldLabel.gasProvider}
                name="gas_provider"
                value={oppurtunity?.gas_provider ?? ''}
                onChange={handleChange}
                readOnly={edit}
                grid={{ sm: 8, xs: 8 }}
              />

              <UnitSwitch
                value={oppurtunity?.is_electric ?? 0}
                onChange={handleChange}
                name="is_electric"
                label={fieldLabel.isElectric}
                disabled={edit}
                grid={{ sm: 4, xs: 4 }}
              />

              <UnitText
                label={fieldLabel.trashProvider}
                name="trash_provider"
                value={oppurtunity?.trash_provider ?? ''}
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

export default UtilityProviders;
