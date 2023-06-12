import { FormControl, Grid, List, ListItem, ListItemText } from '@mui/material';
import { allPartySubtypeOptions } from 'assets/constants/party-subtype';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import partyService from 'services/parties-service';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface PartyUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: ObjectType;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: [];
  disabled?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
  label: string;
  type?: string;
  subType?: string;
}

const UnitParty = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  readOnly = false,
  disabled = false,
  multiple = false,
  label,
  type,
  subType
}: PartyUnitInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      let queryParty = '';
      if (type && type != '') {
        if (type.includes(',')) {
          for (const t of type.split(',')) {
            queryParty += `&filter[type][]=${t}`;
          }
        } else {
          queryParty += `&filter[type]=${type}`;
        }
      }
      if (subType && subType != '') {
        queryParty += `&filter[sub_type]=${subType}`;
      }
      const result = await partyService.getParties(
        `?filter[name]=${value}${queryParty}`
      );

      if (result.isSuccess) {
        const parties = result.data.data;
        setOptions(
          parties.map((party: any) => ({
            label: `${party.name} ${party.email}`,
            value: party.id,
            ...party
          }))
        );
      }
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple}
            options={options}
            value={value || null}
            id="party_id"
            label={''}
            name="party_id"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            renderOption={(props: any, option: ObjectType) => (
              <List {...props}>
                <ListItem>
                  <ListItemText
                    primary={option.name}
                    secondary={`${option.email ?? 'N/A'} (${
                      option.company ?? 'N/A'
                    })`}
                  />
                </ListItem>
              </List>
            )}
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
            value={value || null}
            id="party_id"
            label={''}
            name="party_id"
            renderOption={(props: any, option: ObjectType) => (
              <List {...props}>
                <ListItem>
                  <ListItemText
                    primary={option.name}
                    secondary={`${option.email ?? 'N/A'} ${
                      option.company ? '(' : ''
                    }${
                      allPartySubtypeOptions[option.company] ??
                      option.company ??
                      'N/A'
                    }${option.company ? ')' : ''}`}
                  />
                </ListItem>
              </List>
            )}
            setOptions={setOptions}
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
export default UnitParty;
