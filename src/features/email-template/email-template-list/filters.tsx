import fieldLabel from 'assets/constants/fieldLabel';
import relatedEvent from 'assets/constants/related-event';
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
import { EmailTemplateFilterEntity } from 'types/email-template';

interface FilterProps {
  filter: EmailTemplateFilterEntity;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter } = props;

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
          <TextUnit
            label={fieldLabel.querySearch}
            name="query_search"
            value={filter.query_search}
            onChange={updateFilter}
            onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
            grid={{ xs: 12, sm: 3 }}
          />

          <UnitSelect
            name="related_event"
            label={fieldLabel.relatedEvent}
            records={getObjectEntriesAsArray(relatedEvent)}
            value={filter.related_event ?? ''}
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
