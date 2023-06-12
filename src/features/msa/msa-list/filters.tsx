import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import TextUnit from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import initialMsaListFilter from 'state/msa/initial-msa-list-filter';
import { MsaFilterEntity } from 'types/msa-types';

interface FilterProps {
  filter: MsaFilterEntity;
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
              />
              <ClearButton
                onClick={() => {
                  setFilter(initialMsaListFilter);
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
