import crmStatusType from 'assets/constants/crm-status-type';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitBrokerageRole from 'components/form/unit-brokerage-role';
import UnitBrokerageUser from 'components/form/unit-brokerage-user';
import UnitEmpty from 'components/form/unit-empty';
import UnitMarketPreference from 'components/form/unit-market-preference';
import UnitOpportunitySelect from 'components/form/unit-opportunity-select';
import UnitSelect from 'components/form/unit-select';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import initialOpportunityBrokerageUserListFilter from 'state/opportunity-brokerage-user/initial-opportunity-brokerage-user-list-filter';
import { ObjectType } from 'types';
import { OpportunityBrokerageUserFilterEntity } from 'types/opportunity-brokerage-user-types';

interface FilterProps {
  filter: OpportunityBrokerageUserFilterEntity;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
  opportunityId: string;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter, opportunityId } =
    props;

  const saveFilterOnEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      if (e.target.value !== undefined && e.target.value.trim().length !== 0) {
        setIsFilterChanged(true);
      }
    }
  };

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitMarketPreference
            multiple={false}
            value={{
              label: filter?.market_preference_name || '',
              value: filter?.market_preference_id || ''
            }}
            onChange={(val: any) => {
              updateFilter({
                market_preference_name: val?.label || '',
                market_preference_id: val?.value || ''
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />

          <UnitBrokerageUser
            label="Brokerage User"
            value={{
              label: filter?.brokerage_user_name!,
              value: filter?.brokerage_user_id
            }}
            multiple={false}
            onChange={(val: any) => {
              updateFilter({
                brokerage_user_id: val?.value ?? '',
                brokerage_user_name: val?.label ?? ''
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />

          <UnitBrokerageRole
            value={{
              label: filter?.brokerage_transaction_role_name,
              value: filter?.brokerage_transaction_role_id
            }}
            multiple={false}
            onChange={(val: any) => {
              updateFilter({
                brokerage_transaction_role_id: val?.value ?? '',
                brokerage_transaction_role_name: val?.label ?? ''
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />

          {!opportunityId ? (
            <UnitOpportunitySelect
              value={{
                label: filter?.opportunity_name || '',
                value: filter?.opportunity_id || ''
              }}
              multiple={false}
              onChange={(val: ObjectType) => {
                updateFilter({
                  opportunity_name: val?.label || '',
                  opportunity_id: val?.value || ''
                });
              }}
              grid={{ xs: 12, sm: 4 }}
            />
          ) : (
            <></>
          )}

          <UnitSelect
            name="status"
            label="Status"
            records={getObjectEntriesAsArray(crmStatusType)}
            value={filter.status ?? ''}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 4 }}
          />

          {opportunityId && <UnitEmpty grid={{ xs: 12, sm: 4 }} />}

          <UnitEmpty grid={{ xs: 12, sm: 4 }} />

          <StackRow sx={{ pb: 0 }}>
            <SearchButton
              onClick={() => {
                setIsFilterChanged(true);
              }}
            />

            <ClearButton
              onClick={() => {
                setFilter(initialOpportunityBrokerageUserListFilter);
                setIsFilterChanged(true);
              }}
            />
          </StackRow>
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default Filters;
