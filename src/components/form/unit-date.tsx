import Grid from '@mui/material/Grid';
import { DatePicker as MuiDatePickers } from '@mui/x-date-pickers';
import ValidationError from 'components/errors/validation-error';
import { isEmpty } from 'helpers/misc-helper';
import React from 'react';

import FieldLabel from './field-label';
import FieldText from './field-text';

interface UnitDatePicker {
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
  minDate?: any;
  required?: boolean;
}

const UnitDate = ({
  name,
  label,
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  minDate,
  required = false
}: UnitDatePicker) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <MuiDatePickers
          value={value ? value : null}
          inputFormat={isEmpty(value) ? ' ' : 'MM/DD/YYYY'}
          onChange={(date: any) => {
            if (date) {
              onChange(date.format('YYYY-MM-DD'));
            } else {
              onChange('');
            }
          }}
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          renderInput={(params) => (
            <FieldText
              size="small"
              id={name}
              name={name}
              required={required}
              data-testid={`${name}-input`}
              {...params}
              fullWidth={fullWidth}
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
        <MuiDatePickers
          value={value ? value : null}
          onChange={(date: any) => {
            if (date) {
              onChange(date.format('YYYY-MM-DD'));
            } else {
              onChange('');
            }
          }}
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          renderInput={(params) => (
            <FieldText
              size="small"
              id={name}
              name={name}
              required={required}
              data-testid={`${name}-input`}
              {...params}
              fullWidth={fullWidth}
              autoComplete="off"
            />
          )}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default UnitDate;
