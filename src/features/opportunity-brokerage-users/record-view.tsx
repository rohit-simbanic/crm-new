import FormContainer from 'components/form/container';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import { ObjectType } from 'types';
import fieldLabel from 'assets/constants/fieldLabel';
import { OpportunityBrokerageUserEntity } from 'types/opportunity-brokerage-user-types';
import { useParams } from 'react-router-dom';
import UnitBrokerageRole from 'components/form/unit-brokerage-role';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitSwitch from 'components/form/unit-switch';
import UnitDateTimePicker from 'components/form/unit-date-time';
import emptyFunction from 'helpers/empty-function-helper';
import crmStatusType from 'assets/constants/crm-status-type';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import brokerageTransactionRole from 'assets/constants/brokerage-transaction-roles';
import UnitMarketPreference from 'components/form/unit-market-preference';
import UnitRead from 'components/form/unit-read';
import userFullName from 'helpers/user-name-helper';

interface recordViewType {
  opportunityBrokerageUser: OpportunityBrokerageUserEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  isView?: boolean;
}

const RecordView = ({
  opportunityBrokerageUser,
  validation,
  onChange,
  readOnly = false,
  isView = false
}: recordViewType) => {
  const { opportunity_brokerage_user_id } = useParams();

  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      {isView && (
        <UnitText
          label={fieldLabel.name}
          name="name"
          value={opportunityBrokerageUser.name ?? ''}
          onChange={handleChange}
          error={valMessages['name'] ?? ''}
          readOnly={true}
        />
      )}

      {opportunity_brokerage_user_id && (
        <UnitText
          label={fieldLabel.opportunity}
          name="opportunity_name"
          value={
            isView
              ? opportunityBrokerageUser.opportunity.name
              : opportunityBrokerageUser.opportunity_name ?? ''
          }
          onChange={handleChange}
          error={valMessages['opportunity_name'] ?? ''}
          readOnly={true}
        />
      )}

      {readOnly === true || opportunity_brokerage_user_id ? (
        <UnitRead
          label={fieldLabel.brokerageRole}
          value={
            isView
              ? brokerageTransactionRole[
                  opportunityBrokerageUser?.brokerage_transaction_role?.name!
                ] ?? opportunityBrokerageUser?.brokerage_transaction_role?.name!
              : brokerageTransactionRole[
                  opportunityBrokerageUser.brokerage_transaction_role_name!
                ] ?? opportunityBrokerageUser.brokerage_transaction_role_name!
          }
        />
      ) : (
        <UnitBrokerageRole
          value={{
            label: isView
              ? brokerageTransactionRole[
                  opportunityBrokerageUser?.brokerage_transaction_role?.name!
                ] ?? opportunityBrokerageUser?.brokerage_transaction_role?.name!
              : brokerageTransactionRole[
                  opportunityBrokerageUser.brokerage_transaction_role_name!
                ] ?? opportunityBrokerageUser.brokerage_transaction_role_name!,
            value: isView
              ? opportunityBrokerageUser?.brokerage_transaction_role?.id
              : opportunityBrokerageUser.brokerage_transaction_role_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              brokerage_transaction_role_id: val?.value ?? '',
              brokerage_transaction_role_name: val?.label ?? ''
            });
          }}
          readOnly={opportunity_brokerage_user_id ? true : readOnly}
          error={valMessages['brokerage_transaction_role_id'] ?? ''}
        />
      )}

      {readOnly === true || opportunity_brokerage_user_id ? (
        <UnitRead
          label={fieldLabel.brokerageUser}
          value={
            isView
              ? userFullName(opportunityBrokerageUser?.brokerage_user)
              : opportunityBrokerageUser?.brokerage_user_name!
          }
        />
      ) : (
        <UnitBrokerageUser
          value={{
            label: isView
              ? opportunityBrokerageUser?.brokerage_user?.first_name +
                ' ' +
                opportunityBrokerageUser?.brokerage_user?.last_name
              : opportunityBrokerageUser?.brokerage_user_name!,
            value: isView
              ? opportunityBrokerageUser.brokerage_user_id
              : opportunityBrokerageUser.brokerage_user_id
          }}
          multiple={false}
          onChange={(val: any) => {
            handleChange({
              brokerage_user_id: val?.value ?? '',
              brokerage_user_name: val?.label ?? ''
            });
          }}
          readOnly={opportunity_brokerage_user_id ? true : readOnly}
          error={valMessages['brokerage_user_id'] ?? ''}
        />
      )}

      <UnitMarketPreference
        multiple={false}
        value={{
          label: opportunityBrokerageUser.market_preference?.name || '',
          value: opportunityBrokerageUser.market_preference?.id || ''
        }}
        onChange={emptyFunction}
        error={valMessages['market_preference_name'] ?? ''}
        disabled={true}
      />

      <UnitSelect
        name="status"
        label={fieldLabel.status}
        records={
          opportunity_brokerage_user_id
            ? getObjectEntriesAsArray(crmStatusType)
            : [{ label: 'Active', value: 'active' }]
        }
        value={opportunityBrokerageUser.status ?? ''}
        onChange={handleChange}
        error={valMessages['Status'] ?? ''}
        readOnly={readOnly}
      />

      {opportunity_brokerage_user_id && !isView && (
        <UnitSwitch
          value={opportunityBrokerageUser.primary_user ?? 0}
          onChange={handleChange}
          name="primary_user"
          label={fieldLabel.primaryUser}
          disabled={
            opportunityBrokerageUser.brokerage_transaction_role.name ===
            'negotiator'
              ? false
              : true
          }
        />
      )}

      {isView && (
        <>
          <UnitDateTimePicker
            label={fieldLabel.activatedAt}
            name="last_activated_at"
            value={opportunityBrokerageUser.last_activated_at ?? ''}
            onChange={(e: any) =>
              handleChange({
                target: { name: 'last_activated_at', value: e }
              })
            }
            error={valMessages['last_activated_at'] ?? ''}
            readOnly={readOnly}
            disabled={true}
          />

          <UnitDateTimePicker
            label={fieldLabel.deactivatedAt}
            name="last_deactivated_at"
            value={opportunityBrokerageUser.last_deactivated_at ?? ''}
            onChange={(e: any) =>
              handleChange({
                target: { name: 'last_deactivated_at', value: e }
              })
            }
            error={valMessages['last_deactivated_at'] ?? ''}
            readOnly={true}
            disabled={true}
          />

          <UnitDateTimePicker
            label={fieldLabel.dateEntered}
            name="date_entered"
            value={opportunityBrokerageUser.date_entered ?? ''}
            onChange={(e: any) =>
              handleChange({
                target: { name: 'date_entered', value: e }
              })
            }
            error={valMessages['date_entered'] ?? ''}
            readOnly={true}
            disabled={true}
          />

          <UnitDateTimePicker
            label={fieldLabel.dateModified}
            name="date_modified"
            value={opportunityBrokerageUser.date_modified ?? ''}
            onChange={(e: any) =>
              handleChange({
                target: { name: 'date_modified', value: e }
              })
            }
            error={valMessages['date_modified'] ?? ''}
            readOnly={true}
            disabled={true}
          />
        </>
      )}
    </FormContainer>
  );
};

export default RecordView;
