import Box from '@mui/system/Box';
import UnitSelect from 'components/form/unit-select';
import eventBus from 'helpers/event-bus-helper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import marketPreferenceBrokerageUsersService from 'services/market-preference-brokerage-users-service';
import { ObjectType } from 'types';

const ActionDropdown = ({ data }: any) => {
  const navigate = useNavigate();

  const [marketPreferenceBrokerageUser, setMarketPreferenceBrokerageUser] =
    useState<ObjectType>({ status: data.status });

  const handleChange = async (e: any) => {
    if (e.target && data.brokerage_transaction_role_name !== 'negotiator') {
      setMarketPreferenceBrokerageUser(
        Object.assign({}, marketPreferenceBrokerageUser, {
          [e.target.name]: e.target.value
        })
      );
    } else {
      setMarketPreferenceBrokerageUser(
        Object.assign({}, marketPreferenceBrokerageUser, e)
      );
    }

    const reqBody = {
      brokerage_transaction_role_id: data.brokerage_transaction_role_id,
      brokerage_user_id: data.brokerage_user_id,
      market_preference_id: data.market_preference_id,
      status: e.target.value
    };

    if (
      data.brokerage_transaction_role_name !== 'negotiator' ||
      e.target.value === 'active'
    ) {
      await marketPreferenceBrokerageUsersService.update(data.id, reqBody);
      eventBus.dispatch(`market_preference_brokerage_user_refresh`, {});
    }

    if (
      data.brokerage_transaction_role_name === 'negotiator' &&
      e.target.value !== 'active'
    ) {
      if (e.target.value === 'terminate_user') {
        navigate(
          `/market-preferences/${data.market_preference_id}/market-preferences-brokerage-users/edit/${data.id}/terminate`
        );
      } else if (e.target.value === 'replace_user') {
        navigate(
          `/market-preferences/${data.market_preference_id}/market-preferences-brokerage-users/edit/${data.id}/replace`
        );
      } else {
        navigate(
          `/market-preferences/${data.market_preference_id}/market-preferences-brokerage-users/edit/${data.id}`
        );
      }
    }
  };

  const options =
    data.brokerage_transaction_role_name !== 'negotiator'
      ? [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]
      : data.status === 'inactive'
      ? [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]
      : [
          { value: 'active', label: 'Active' },
          { value: 'terminate_user', label: 'Terminate User' },
          { value: 'replace_user', label: 'Replace User' }
        ];

  return (
    <Box>
      <UnitSelect
        name="status"
        records={options}
        value={marketPreferenceBrokerageUser.status ?? ''}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ActionDropdown;
