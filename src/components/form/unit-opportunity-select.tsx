import { FormControl, Grid, List, ListItem, ListItemText } from '@mui/material';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import OppurtunityService from 'services/oppurtunity-service';
import { ObjectType } from 'types';
import { OpportunityListResponseType } from 'types/api-response';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface OpportunityUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: [];
  disabled?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
  label?: string;
}

const UnitOpportunitySelect = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  multiple,
  label = 'Opportunity'
}: OpportunityUnitInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      const result: OpportunityListResponseType = await OppurtunityService.get(
        `?sort[field]=name&sort[direction]=asc&filter[property_address_c]=${value}`
      );

      if (result.isSuccess) {
        let opportunities: any = result.data.data;

        let opportunity = opportunities.map((opportunity: any) => ({
          label: opportunity.name,
          value: opportunity.id,
          account_name: opportunity.account.name,
          msa_name: opportunity.market.name
        }));

        setOptions(opportunity);
      }
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={false}
            options={options}
            value={value}
            id="opportunity"
            label={''}
            name="Opportunity"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            readOnly={readOnly}
            disabled={disabled}
          />
        </FormControl>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={false}
            options={options}
            value={value}
            id="Opportunity"
            label={''}
            name="Opportunity"
            setOptions={setOptions}
            renderOption={(props: any, option: ObjectType) => (
              <List {...props}>
                <ListItem>
                  <ListItemText
                    primary={option.label}
                    secondary={`${option.account_name ?? ''} | ${
                      option.msa_name ?? ''
                    }`}
                  />
                </ListItem>
              </List>
            )}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
          />
        </FormControl>
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitOpportunitySelect;
