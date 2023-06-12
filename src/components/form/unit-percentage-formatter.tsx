import { Grid } from '@mui/material';
import ValidationError from 'components/errors/validation-error';
import { NumericFormat } from 'react-number-format';

import FieldLabel from './field-label';
import FieldText from './field-text';

interface PercentageFormatterUnitInterface {
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
  name: string;
  label: string;
  onBlur?: () => void;
}

const UnitPercentageFormatter = ({
  grid = { xs: 12, sm: 6 },
  value,
  fullWidth = true,
  onChange,
  error = [],
  disabled,
  readOnly,
  name,
  label,
  onBlur
}: PercentageFormatterUnitInterface) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <NumericFormat
          customInput={FieldText}
          value={value ? value : 0}
          variant="filled"
          valueIsNumericString={true}
          fixedDecimalScale={true}
          decimalScale={2}
          id={name}
          name={name}
          data-testid={name + '_test_id'}
          fullWidth={fullWidth}
          suffix="%"
          size="small"
          onChange={(e) => {
            onChange({
              target: { name, value: e.target.value.replaceAll(',', '') }
            });
          }}
          type="text"
          disabled={disabled}
          InputProps={{
            readOnly,
            disableUnderline: true
          }}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <NumericFormat
          customInput={FieldText}
          value={value}
          variant="outlined"
          valueIsNumericString={true}
          decimalScale={2}
          id={name}
          name={name}
          data-testid={name + '_test_id'}
          fullWidth={fullWidth}
          size="small"
          onChange={(e) => {
            onChange({
              target: { name, value: e.target.value.replaceAll(',', '') }
            });
          }}
          onBlur={() => {
            if (onBlur) {
              onBlur();
            }
          }}
          type="text"
          disabled={disabled}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default UnitPercentageFormatter;
