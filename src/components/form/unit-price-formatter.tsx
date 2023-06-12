import { Grid } from '@mui/material';
import ValidationError from 'components/errors/validation-error';
import { NumericFormat } from 'react-number-format';

import FieldLabel from './field-label';
import FieldText from './field-text';

interface PriceFormatterUnitInterface {
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

const UnitPriceFormatter = ({
  grid = { xs: 12, sm: 6 },
  value,
  fullWidth = true,
  onChange,
  error = [],
  disabled,
  readOnly = false,
  name,
  label,
  onBlur
}: PriceFormatterUnitInterface) => {
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <NumericFormat
          customInput={FieldText}
          value={value}
          variant="filled"
          valueIsNumericString={true}
          thousandsGroupStyle="thousand"
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={true}
          id={name}
          name={name}
          fullWidth={fullWidth}
          size="small"
          onChange={(e) => {
            onChange({
              target: { name, value: e.target.value.replaceAll(',', '') }
            });
          }}
          data-testid={name + '_test_id'}
          thousandSeparator=","
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
          thousandsGroupStyle="thousand"
          decimalScale={2}
          allowNegative={true}
          id={name}
          name={name}
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
          data-testid={name + '_test_id'}
          thousandSeparator=","
          type="text"
          disabled={disabled}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default UnitPriceFormatter;
