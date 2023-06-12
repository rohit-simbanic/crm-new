import React from 'react';
import { MarketPreferenceBrokerageUserEntity } from 'types/market-preference-brokerage-user-types';
import { ObjectType } from 'types';
import FormContainer from 'components/form/container';
import UnitText from 'components/form/unit-text';
import UnitSelect from 'components/form/unit-select';
import UnitBrokerageRole from 'components/form/unit-brokerage-role';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import fieldLabel from 'assets/constants/fieldLabel';
import { useLocation } from 'react-router-dom';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import marketPreferenceBrokerageUserStatus from 'assets/constants/market-preference-brokerage-user-status';
import UnitRead from 'components/form/unit-read';
import userFullName from 'helpers/user-name-helper';
import brokerageTransactionRole from 'assets/constants/brokerage-transaction-roles';

interface recordViewType {
  marketPreferenceBrokerageUser: MarketPreferenceBrokerageUserEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  market_preference_brokerage_user_id?: string;
}

const RecordView = ({
  marketPreferenceBrokerageUser,
  validation,
  onChange,
  readOnly = false,
  market_preference_brokerage_user_id
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};
  const location = useLocation();
  const isView = location.pathname.includes('view');

  return (
    <FormContainer>
      {market_preference_brokerage_user_id && (
        <>
          <UnitText
            label={fieldLabel.marketPreferenceName}
            name="market_preference_name"
            value={
              isView
                ? marketPreferenceBrokerageUser?.market_preference?.name
                : marketPreferenceBrokerageUser.market_preference_name ?? ''
            }
            onChange={handleChange}
            error={valMessages['market_preference_name'] ?? ''}
            readOnly={true}
          />
        </>
      )}

      {readOnly === true || market_preference_brokerage_user_id ? (
        <UnitRead
          label={fieldLabel.brokerageRole}
          value={
            isView
              ? brokerageTransactionRole[
                  marketPreferenceBrokerageUser?.brokerage_transaction_role
                    ?.name!
                ] ??
                marketPreferenceBrokerageUser?.brokerage_transaction_role?.name!
              : brokerageTransactionRole[
                  marketPreferenceBrokerageUser.brokerage_transaction_role_name!
                ] ??
                marketPreferenceBrokerageUser.brokerage_transaction_role_name!
          }
        />
      ) : (
        <UnitBrokerageRole
          value={{
            label: isView
              ? marketPreferenceBrokerageUser?.brokerage_transaction_role?.name!
              : marketPreferenceBrokerageUser.brokerage_transaction_role_name!,
            value: isView
              ? marketPreferenceBrokerageUser?.brokerage_transaction_role?.id
              : marketPreferenceBrokerageUser.brokerage_transaction_role_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              brokerage_transaction_role_id: val?.value ?? '',
              brokerage_transaction_role_name: val?.label ?? ''
            });
          }}
          readOnly={market_preference_brokerage_user_id ? true : readOnly}
          error={valMessages['brokerage_transaction_role_id'] ?? ''}
        />
      )}

      {readOnly === true || market_preference_brokerage_user_id ? (
        <UnitRead
          label={fieldLabel.brokerageUser}
          value={
            isView
              ? userFullName(marketPreferenceBrokerageUser?.brokerage_user)
              : marketPreferenceBrokerageUser?.brokerage_user_name!
          }
        />
      ) : (
        <UnitBrokerageUser
          value={{
            label: isView
              ? marketPreferenceBrokerageUser?.brokerage_user?.first_name +
                ' ' +
                marketPreferenceBrokerageUser?.brokerage_user?.last_name
              : marketPreferenceBrokerageUser?.brokerage_user_name!,
            value: isView
              ? marketPreferenceBrokerageUser.brokerage_user_id
              : marketPreferenceBrokerageUser.brokerage_user_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              brokerage_user_id: val?.value ?? '',
              brokerage_user_name: val?.label ?? ''
            });
          }}
          readOnly={market_preference_brokerage_user_id ? true : readOnly}
          error={valMessages['brokerage_user_id'] ?? ''}
        />
      )}

      <UnitSelect
        name="status"
        label={fieldLabel.status}
        records={
          market_preference_brokerage_user_id
            ? getObjectEntriesAsArray(marketPreferenceBrokerageUserStatus)
            : [{ label: 'Active', value: 'active' }]
        }
        value={marketPreferenceBrokerageUser.status ?? ''}
        onChange={handleChange}
        error={valMessages['Status'] ?? ''}
        readOnly={readOnly}
        required
      />

      {market_preference_brokerage_user_id && (
        <UnitBrokerageUser
          label="Replace Brokerage User"
          value={{
            label: marketPreferenceBrokerageUser.replace_brokerage_user_name!,
            value: marketPreferenceBrokerageUser.replace_brokerage_user_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              replace_brokerage_user_id: val?.value ?? '',
              replace_brokerage_user_name: val?.label ?? ''
            });
          }}
          error={valMessages['replace_brokerage_user_id'] ?? ''}
          readOnly={readOnly}
        />
      )}
    </FormContainer>
  );
};

export default RecordView;
