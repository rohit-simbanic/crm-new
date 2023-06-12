import { FormControl, Grid } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import brokerageTransactionRoleService from 'services/brokerage-transaction-role-service';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface BrokerageRoleInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  fullWidth?: boolean;
  onChange: (e: any) => any;
  error?: [];
  disabled?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
}

const UnitBrokerageRole = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  multiple
}: BrokerageRoleInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      const result =
        await brokerageTransactionRoleService.getTransactionRolesByName(value);

      if (result.isSuccess) {
        let brokerageTransactionRoles = result.data.data;
        setOptions(
          brokerageTransactionRoles.map((brokerageTransactionRole: any) => ({
            label: brokerageTransactionRole.name,
            value: brokerageTransactionRole.id
          }))
        );
      }
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.brokerageRole}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="brokerage_transaction_role_name"
            label=""
            name="brokerage_transaction_role_name"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            readOnly={readOnly}
            disabled={disabled}
          />
        </FormControl>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{fieldLabel.brokerageRole}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="brokerage_transaction_role_name"
            label=""
            name="brokerage_transaction_role_name"
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
export default UnitBrokerageRole;
