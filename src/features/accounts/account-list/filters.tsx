import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import TextUnit from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import initialAccountListFilter from 'state/account/initial-account-list-filter';
import { AccountFilterEntity } from 'types/account-types';

interface FilterProps {
  filter: AccountFilterEntity;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
  isLoading?: boolean;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter, isLoading } =
    props;

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <TextUnit
            label={fieldLabel.companyName}
            name="company_name"
            value={filter.company_name}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 3 }}
          />
          <TextUnit
            label={fieldLabel.accountName}
            name="name"
            value={filter.name}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 3 }}
          />
          <UnitItem grid={{ xs: 12, sm: 6, md: 4 }}>
            <StackRow isUnitItem>
              <SearchButton
                onClick={() => {
                  setIsFilterChanged(true);
                }}
                disabled={isLoading}
              />
              <ClearButton
                onClick={() => {
                  setFilter(initialAccountListFilter);
                  setIsFilterChanged(true);
                }}
              />
            </StackRow>
          </UnitItem>
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default Filters;
