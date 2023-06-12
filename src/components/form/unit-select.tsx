import { Grid, MenuItem } from '@mui/material';
import ValidationError from 'components/errors/validation-error';
import { ObjectType } from 'types';

import FieldLabel from './field-label';
import TextField from './field-text';

interface SelectProps {
  name: string;
  value: string;
  label?: string;
  onChange: (val: any) => void;
  records?: {
    label: any;
    value: any;
  }[];
  disabled?: boolean;
  required?: boolean;
  grid?: { xs: number; sm: number };
  readOnly?: boolean;
  error?: [];
  hasBlankOption?: boolean;
  fullWidth?: boolean;
  sx?: ObjectType;
}

const UnitSelect = (props: SelectProps) => {
  let {
    name,
    value,
    label,
    onChange,
    records,
    disabled,
    required,
    readOnly = false,
    error = [],
    grid = { xs: 12, sm: 6 },
    hasBlankOption = true,
    fullWidth = true,
    sx = {}
  } = props;
  value = records?.find((record) => record.value == value)?.value || '';

  const getOptions = () => {
    let result: any = [];
    if (records != undefined) {
      result = records.map((x: any) => (
        <MenuItem key={x.value} value={x.value}>
          {x.label}
        </MenuItem>
      ));
    }

    if (hasBlankOption) {
      return [
        <MenuItem key={'empty'} value={''}>
          &nbsp;
        </MenuItem>,
        ...result
      ];
    } else {
      return result;
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          required={required ? required : false}
          fullWidth={fullWidth}
          select
          size="small"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled ? disabled : false}
          data-testid={name + '_test_id'}
          InputProps={{
            readOnly: readOnly,
            disableUnderline: true
          }}
          variant="filled"
          SelectProps={{ IconComponent: () => null }}
          children={getOptions()}
          sx={{ ...sx }}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <TextField
          required={required ? required : false}
          fullWidth={fullWidth}
          select
          size="small"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled ? disabled : false}
          data-testid={name + '_test_id'}
          children={getOptions()}
          sx={{ ...sx }}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default UnitSelect;
