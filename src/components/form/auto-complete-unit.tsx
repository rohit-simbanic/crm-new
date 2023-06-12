import { Grid } from '@mui/material';
import MuiAutocomplete from '@mui/material/Autocomplete';
import ValidationError from 'components/errors/validation-error';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';
import FieldText from './field-text';

interface AutoCompleteType {
  id: string;
  multiple: boolean;
  options: {
    value: string;
    label: string;
  }[];
  filterSelectedOptions?: boolean;
  onChange?: (e: any) => void;
  label: string;
  placeholder?: string;
  values: any;
  readOnly?: boolean;
  grid?: { xs: number; sm: number };
  error?: [];
}

const AutoCompleteUnit = (props: AutoCompleteType) => {
  let {
    id,
    multiple = false,
    options,
    filterSelectedOptions = true,
    onChange,
    label,
    placeholder,
    values,
    readOnly,
    grid = { xs: 12, sm: 6 },
    error = []
  } = props;

  values = !values
    ? multiple
      ? [{ label: '', value: '' }]
      : { label: '', value: '' }
    : values;
  const getOptions = () => {
    let selected: string[] = [];
    if (multiple) {
      selected = values?.reduce((acc: any, x: any) => [...acc, x.value], []);
    } else {
      selected = values?.value ? [values.value] : [];
    }

    return options.filter(
      (option: OptionType) => !selected.includes(option.value)
    );
  };
  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <MuiAutocomplete
          multiple={multiple}
          id={id}
          size="small"
          options={getOptions()}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterSelectedOptions={filterSelectedOptions}
          value={values}
          readOnly={readOnly}
          onChange={(e, options) => {
            if (onChange) {
              let event = {
                target: {
                  name: id,
                  value: options
                }
              };
              onChange(event);
            }
          }}
          renderInput={(params) => (
            <FieldText {...params} placeholder={placeholder} variant="filled" />
          )}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label}</FieldLabel>
        <MuiAutocomplete
          multiple={multiple}
          id={id}
          size="small"
          options={getOptions()}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          filterSelectedOptions={filterSelectedOptions}
          value={values}
          disableClearable={getOptions().length == options.length}
          onChange={(e, options) => {
            if (onChange) {
              let event = {
                target: {
                  name: id,
                  value: options
                }
              };
              onChange(event);
            }
          }}
          readOnly={readOnly}
          renderInput={(params) => (
            <FieldText
              variant="outlined"
              {...params}
              placeholder={placeholder}
            />
          )}
        />
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};

export default AutoCompleteUnit;
