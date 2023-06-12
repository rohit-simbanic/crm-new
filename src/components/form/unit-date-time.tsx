import { Grid } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';
import ValidationError from 'components/errors/validation-error';
import { isEmpty } from 'helpers/misc-helper';
import React, { ChangeEvent } from 'react';

import FieldLabel from './field-label';
import TextField from './field-text';

interface UnitDateTimePicker {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  label: string;
  name: string;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: [];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  minDate?: any;
}

const UnitDateTime = ({
  name,
  label,
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  required = false
}: UnitDateTimePicker) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <MuiDateTimePicker
          value={value}
          inputFormat={isEmpty(value) ? ' ' : 'MM/DD/YYYY hh:mm a'}
          onChange={(value: any, keyboardInputValue: string | undefined) => {
            if (value) {
              onChange(value);
            } else {
              onChange('');
            }
          }}
          disabled={disabled}
          readOnly={readOnly}
          renderInput={(params) => (
            <TextField
              size="small"
              id={name}
              name={name}
              data-testid={`${name}-input`}
              {...params}
              fullWidth={fullWidth}
              required={required}
              InputProps={{
                readOnly,
                disableUnderline: true
              }}
              variant="filled"
            />
          )}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <MuiDateTimePicker
          views={['year', 'day']}
          value={value}
          onChange={(value: any, keyboardInputValue: string | undefined) => {
            if (value) {
              onChange(value);
            } else {
              onChange('');
            }
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              size="small"
              id={name}
              name={name}
              data-testid={`${name}-input`}
              {...params}
              fullWidth={fullWidth}
              required={required}
              autoComplete="off"
            />
          )}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default UnitDateTime;
