import { FormControl, Grid } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import marketPreferencesService from 'services/market-preferences';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface MarketPreferenceUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: [];
  disabled?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
}

const UnitMarketPreference = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  readOnly = false,
  disabled = false,
  multiple
}: MarketPreferenceUnitInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      const result: ObjectType =
        await marketPreferencesService.getMarketPreferences(
          `?sort[field]=name&sort[direction]=asc&filter[name]=${value}`
        );
      let marketPreferences = result.data.data;
      setOptions(
        marketPreferences.map((marketPreference: any) => ({
          label: marketPreference.name,
          value: marketPreference.id
        }))
      );
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.marketPreferences}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="market_preference_name"
            label=""
            name="market_preference_name"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            disabled={disabled}
            readOnly={readOnly}
          />
        </FormControl>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.marketPreferences}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="market_preference_name"
            label=""
            name="market_preference_name"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            disabled={disabled}
          />
        </FormControl>
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitMarketPreference;
