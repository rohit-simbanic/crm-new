import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import ValidationError from 'components/errors/validation-error';

import FieldLabel from './field-label';
import TextField from './field-text';

interface PasswordUnitInterface {
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
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  showPassword?: any;
  setShowPassword?: any;
}

const UnitPassword = ({
  name,
  label,
  value,
  onChange,
  placeholder = '',
  size = 'small',
  required = false,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  showPassword,
  setShowPassword
}: PasswordUnitInterface) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          fullWidth={fullWidth}
          size="small"
          id={name}
          type={showPassword ? 'text' : 'password'}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          data-testid={name + '_test_id'}
          placeholder={placeholder}
          disabled={disabled}
          InputProps={{
            endadornment: (
              <InputAdornment position="end">
                <IconButton onClick={setShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
            readOnly,
            disableUnderline: true
          }}
          variant="standard"
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          fullWidth={fullWidth}
          size="small"
          id={name}
          type={showPassword ? 'text' : 'password'}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          data-testid={name + '_test_id'}
          placeholder={placeholder}
          disabled={disabled}
          InputProps={{
            endadornment: (
              <InputAdornment position="end">
                <IconButton onClick={setShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />

        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitPassword;
