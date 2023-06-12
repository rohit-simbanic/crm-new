import { FormControl, Grid } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import accountService from 'services/accounts-service';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface AccountUnitInterface {
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
}

const UnitAccount = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  multiple
}: AccountUnitInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      const result: ObjectType = await accountService.getList(
        `?sort[field]=name&sort[direction]=asc&filter[name]=${value}`
      );

      if (result.isSuccess) {
        let accounts = result.data.data;
        setOptions(
          accounts.map((account: any) => ({
            label: account.name,
            value: account.id
          }))
        );
      }
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.account}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="account_id"
            label=""
            name="account_id"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            readOnly={readOnly}
          />
        </FormControl>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.account}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="account_id"
            label=""
            name="account_id"
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
export default UnitAccount;
