import { FormControl, Grid } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import msaService from 'services/msa-service';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface MasUnitInterface {
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
  multiple?: boolean;
}

const UnitMsa = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  readOnly = false,
  disabled = false,
  multiple
}: MasUnitInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    const result = await msaService.getList(`?filter[name]=${value}`);

    if (result.isSuccess) {
      const msas = result.data.data;
      setOptions(msas.map((msa: any) => ({ label: msa.name, value: msa.id })));
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.msa}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="msa_id"
            label=""
            name="msa_id"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            readOnly={readOnly}
          />
        </FormControl>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.msa}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="msa_id"
            label=""
            name="msa_id"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
          />
        </FormControl>
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitMsa;
