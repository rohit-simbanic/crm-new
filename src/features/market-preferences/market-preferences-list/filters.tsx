import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitAccount from 'components/form/unit-account';
import UnitMsa from 'components/form/unit-msa';
import TextUnit from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import initialMarketPreferenceListFilter from 'state/market-preference/initial-market-preference-list-filter';
import { ObjectType } from 'types';

interface FilterProps {
  filter: ObjectType;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter } = props;

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <TextUnit
            label={fieldLabel.name}
            name="name"
            value={filter.name ?? ''}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 4 }}
          />

          <UnitAccount
            value={{
              label: filter.account_name,
              value: filter.account_id ?? ''
            }}
            multiple={false}
            onChange={(val: any) => {
              updateFilter({
                account_id: val?.value ?? '',
                account_name: val?.label ?? ''
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />

          <UnitMsa
            value={{
              label: filter.msa_name,
              value: filter.msa_id ?? ''
            }}
            multiple={false}
            onChange={(val: any) => {
              updateFilter({
                msa_id: val?.value ?? '',
                msa_name: val?.label ?? ''
              });
            }}
            grid={{ xs: 12, sm: 4 }}
          />

          <StackRow>
            <SearchButton
              onClick={() => {
                setIsFilterChanged(true);
              }}
            />
            <ClearButton
              onClick={() => {
                setFilter(initialMarketPreferenceListFilter);
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
