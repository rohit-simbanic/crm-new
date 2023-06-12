import fieldLabel from 'assets/constants/fieldLabel';
import state from 'assets/constants/state';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitSelect from 'components/form/unit-select';
import TextUnit from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import initialAccountListFilter from 'state/account/initial-account-list-filter';
import { PdfTemplateFilterEntity } from 'types/pdf-template-type';

interface FilterProps {
  filter: PdfTemplateFilterEntity;
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

          <UnitSelect
            name="state_c"
            label={fieldLabel.state}
            records={getObjectEntriesAsArray(state)}
            value={filter.state_c ?? ''}
            onChange={updateFilter}
            readOnly={false}
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
