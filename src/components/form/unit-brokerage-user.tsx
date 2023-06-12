import { FormControl, Grid, List, ListItem, ListItemText } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import userType from 'assets/constants/user-type';
import { AsyncSelect } from 'components/async-select/async-select';
import ValidationError from 'components/errors/validation-error';
import React, { useState } from 'react';
import userService from 'services/user-service';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

import FieldLabel from './field-label';

interface BrokerageUserInterface {
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
  label?: string;
}

const UnitBrokerageUser = ({
  value,
  onChange,
  grid = { xs: 12, sm: 6 },
  fullWidth = true,
  error = [],
  disabled = false,
  readOnly = false,
  multiple,
  label
}: BrokerageUserInterface) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const onChangeHandle = async (value: any) => {
    if (value && value.length > 2) {
      const result = await userService.getUsersByName(value);
      if (result.isSuccess) {
        let brokerageUsers = result.data.data;
        setOptions(
          brokerageUsers.map((brokerageUser: any) => ({
            label: `${brokerageUser.first_name} ${brokerageUser.last_name}`,
            value: brokerageUser.id,
            user_name: brokerageUser.user_name,
            email:
              brokerageUser.user_email_address_rel.email_address.email_address,
            crm_user_type: brokerageUser.crm_user_type
          }))
        );
      }
    }
  };

  if (readOnly) {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label ?? fieldLabel.brokerageUser}</FieldLabel>
        <FormControl fullWidth={fullWidth}>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="brokerage_user_name"
            label={''}
            name="brokerage_user_name"
            setOptions={setOptions}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            readOnly={readOnly}
            disabled={disabled}
          />
        </FormControl>
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  } else {
    return (
      <Grid item xs={grid.xs} sm={grid.sm}>
        <FieldLabel>{label ?? fieldLabel.brokerageUser}</FieldLabel>
        <FormControl fullWidth>
          <AsyncSelect
            multiple={multiple || false}
            options={options}
            value={value || null}
            id="brokerage_user_name"
            label={''}
            name="brokerage_user_name"
            setOptions={setOptions}
            renderOption={(props: any, option: ObjectType) => (
              <List {...props}>
                <ListItem>
                  <ListItemText
                    primary={option.label}
                    secondary={`${option.user_name ?? ''} ${
                      option.email ? '|' : ''
                    } ${option.email ?? ''} ${
                      option.crm_user_type ? '|' : ''
                    } ${
                      option.crm_user_type
                        ? userType[option.crm_user_type]
                        : option.crm_user_type ?? ''
                    }`}
                  />
                </ListItem>
              </List>
            )}
            onChange={(val: any) => {
              onChange(val);
            }}
            onChangeHandle={onChangeHandle}
            disabled={disabled}
          />
        </FormControl>
        {error.length > 0 && <ValidationError data={error} />}
      </Grid>
    );
  }
};
export default UnitBrokerageUser;
