import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitOpportunitySelect from 'components/form/unit-opportunity-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { useParams } from 'react-router-dom';
import initialInboxFilter from 'state/email/initial-inbox-filter';
import { ObjectType } from 'types';

interface FilterProps {
  filter: ObjectType;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
  isLoading?: boolean;
}

const Filter = (props: FilterProps) => {
  let { opportunity_id } = useParams<ObjectType>();

  const { filter, updateFilter, setIsFilterChanged, setFilter, isLoading } =
    props;

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          {!opportunity_id && (
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
          )}
          <UnitText
            name="name"
            value={filter.name}
            onChange={updateFilter}
            label={fieldLabel.subject}
            grid={{ xs: 12, sm: 4 }}
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
                  setFilter(initialInboxFilter);
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

export default Filter;
