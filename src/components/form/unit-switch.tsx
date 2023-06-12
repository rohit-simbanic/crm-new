import { FormControlLabel, FormGroup, Grid } from '@mui/material';
import MUISwitch from '@mui/material/Switch';
import ValidationError from 'components/errors/validation-error';

import FieldLabel from './field-label';

interface SwitchType {
  name: string;
  value: number;
  onChange?: (e: any) => void;
  disabled?: boolean;
  label?: String;
  grid?: { xs: number; sm: number };
  error?: [];
  isInlineLabel?: boolean;
}

export const isChecked = (value: any): boolean => {
  let checked: boolean = false;

  if (['yes', true, 'on', 1, '1'].includes(value)) {
    checked = true;
  }
  return checked;
};

const UnitSwitch = (props: SwitchType) => {
  let {
    name,
    value,
    onChange,
    disabled,
    label,
    error = [],
    grid = { xs: 12, sm: 6 },
    isInlineLabel = false
  } = props;

  return (
    <Grid item xs={grid.xs} sm={grid.sm}>
      {!isInlineLabel && <FieldLabel>{label}</FieldLabel>}
      <FormGroup>
        <FormControlLabel
          control={
            <MUISwitch
              color="info"
              checked={isChecked(value)}
              disabled={disabled ? true : false}
              onChange={(e) => {
                let event = {
                  target: {
                    name: name,
                    value: e.target.checked ? 1 : 0
                  }
                };
                if (onChange) {
                  onChange(event);
                }
              }}
              name={name}
            />
          }
          label={isInlineLabel ? label : ''}
        />
      </FormGroup>
      {error.length > 0 && <ValidationError data={error} />}
    </Grid>
  );
};

export default UnitSwitch;
