import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import FieldText from 'components/form/field-text';
import { OptionType } from 'types/option-type';

interface SelectPropTypes {
  options: OptionType[];
  value: any;
  multiple: boolean;
  label: string;
  id: string;
  name: string;
  onChange: (val: any) => void;
  disabled?: boolean;
  readOnly?: boolean;
  renderOption?: any;
}

interface AsyncSelectPropTypes extends SelectPropTypes {
  setOptions: (val: OptionType[]) => void;
  onChangeHandle: (val: string) => void;
}

export const AsyncSelect = ({
  options,
  value,
  id,
  name,
  label,
  multiple,
  onChange,
  setOptions,
  onChangeHandle,
  disabled,
  readOnly,
  renderOption
}: AsyncSelectPropTypes) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;

  value = !value ? (multiple ? [] : {}) : value;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  if (readOnly) {
    return (
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        multiple={multiple}
        size="small"
        id={id}
        disableClearable={inputValue.length === 0 ? true : false}
        open={open}
        disabled={disabled}
        readOnly={readOnly}
        renderOption={renderOption}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={(e, val) => {
          onChange(val);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        getOptionLabel={(option) => option.label || ''}
        options={inputValue.length > 2 ? options : []}
        loading={loading}
        filterSelectedOptions
        loadingText={
          inputValue.length < 3
            ? `Please enter ${
                inputValue.length === 0 ? 3 : inputValue.length === 1 ? 2 : 1
              } or more characters`
            : 'No options'
        }
        noOptionsText={`Please enter ${
          inputValue.length === 0 ? 3 : inputValue.length === 1 ? 2 : 1
        } or more characters`}
        renderInput={(params) => (
          <FieldText
            {...params}
            InputProps={{
              readOnly,
              disableUnderline: true
            }}
            variant="filled"
            onChange={(ev: any) => {
              onChangeHandle(ev.target.value);
            }}
          />
        )}
        freeSolo
      />
    );
  } else {
    return (
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        multiple={multiple}
        disableClearable={inputValue.length === 0 ? true : false}
        size="small"
        id={id}
        open={open}
        disabled={disabled}
        readOnly={readOnly}
        renderOption={renderOption}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={(e, val) => {
          onChange(val);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        getOptionLabel={(option) => option.label || ''}
        options={inputValue.length > 2 ? options : []}
        loading={loading}
        filterSelectedOptions
        loadingText={
          inputValue.length < 3
            ? `Please enter ${
                inputValue.length === 0 ? 3 : inputValue.length === 1 ? 2 : 1
              } or more characters`
            : 'No options'
        }
        noOptionsText={`Please enter ${
          inputValue.length === 0 ? 3 : inputValue.length === 1 ? 2 : 1
        } or more characters`}
        renderInput={(params) => (
          <FieldText
            {...params}
            label={label}
            variant="outlined"
            onChange={(ev: any) => {
              // dont fire API if the user delete or not entered anything
              // if (ev.target.value !== '' || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
              // }
            }}
          />
        )}
        freeSolo
      />
    );
  }
};
