import { Grid } from '@mui/material';
import ValidationError from 'components/errors/validation-error';
import { ReactNode } from 'react';
import { ObjectType } from 'types';

import FieldLabel from './field-label';
import TextField from './field-text';

interface TextUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  label: string;
  name: string;
  size?: 'small' | 'medium' | string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  onKeyDown?: (e: any) => any;
  error?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  border?: string;
  autoFocus?: boolean;
  endadornment?: ReactNode;
  autoComplete?: 'off' | 'on';
  sx?: ObjectType;
}

const UnitText = ({
  name,
  label,
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  size = 'small',
  required = false,
  multiline = false,
  rows = 1,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  variant = 'outlined',
  border,
  endadornment,
  autoFocus = false,
  autoComplete = 'off',
  sx = {}
}: TextUnitInterface) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          fullWidth={fullWidth}
          size={size}
          type="text"
          id={name}
          name={name}
          onChange={onChange}
          value={value || ''}
          required={required}
          data-testid={name + '_test_id'}
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          InputProps={{
            readOnly,
            disableUnderline: true
          }}
          variant="filled"
          sx={{ ...sx }}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          fullWidth={fullWidth}
          size={size}
          type="text"
          id={name}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value || ''}
          required={required}
          data-testid={name + '_test_id'}
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          disabled={disabled}
          InputProps={{
            readOnly: readOnly
          }}
          autoComplete={autoComplete}
          variant={variant}
          border={border}
          endadornment={endadornment}
          autoFocus={autoFocus}
          sx={{ ...sx }}
        />

        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitText;
