import fieldLabel from 'assets/constants/fieldLabel';
import partyType from 'assets/constants/party-type';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitSelect from 'components/form/unit-select';
import TextUnit from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import initialPartyListFilter from 'state/party/initial-party-list-filter';
import { PartyFilterEntity } from 'types/party-types';

interface FilterProps {
  filter: PartyFilterEntity;
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
            grid={{ xs: 12, sm: 2.4 }}
          />

          <UnitSelect
            name="type"
            label={fieldLabel.type}
            records={getObjectEntriesAsArray(partyType)}
            value={filter.type ?? ''}
            onChange={updateFilter}
            readOnly={false}
            grid={{ xs: 12, sm: 2.4 }}
          />

          <TextUnit
            label={fieldLabel.email}
            name="email"
            value={filter.email}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 2.4 }}
          />

          <TextUnit
            label={fieldLabel.company}
            name="company"
            value={filter.company}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 2.4 }}
          />

          <TextUnit
            label={fieldLabel.license}
            name="license_basic"
            value={filter.license_basic}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 2.4 }}
          />

          <StackRow>
            <SearchButton
              onClick={() => {
                setIsFilterChanged(true);
              }}
            />
            <ClearButton
              onClick={() => {
                setFilter(initialPartyListFilter);
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
