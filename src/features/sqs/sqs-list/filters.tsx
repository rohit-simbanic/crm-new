import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitMarketPreference from 'components/form/unit-market-preference';
import UnitOpportunitySelect from 'components/form/unit-opportunity-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import initialSQSListFilter from 'state/sqs/initial-sqs-list-filter';
import { ObjectType } from 'types';
import { SQSFilterEntity } from 'types/sqs-types';

interface FilterProps {
  filter: SQSFilterEntity;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
  opportunityId: string;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter, opportunityId } =
    props;

  const filterButtons = (
    <>
      <SearchButton
        onClick={() => {
          setIsFilterChanged(true);
        }}
      />

      <ClearButton
        onClick={() => {
          setFilter(initialSQSListFilter);
          setIsFilterChanged(true);
        }}
      />
    </>
  );

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitText
            label="Event"
            name="event"
            value={filter.event}
            onChange={updateFilter}
            multiline
            rows={1}
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

          {opportunityId ? (
            <UnitItem grid={{ xs: 12, sm: 6, md: 4 }}>
              <StackRow isUnitItem>{filterButtons}</StackRow>
            </UnitItem>
          ) : (
            <StackRow isUnitItem sx={{ pl: 2, pt: 2 }}>
              {filterButtons}
            </StackRow>
          )}
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default Filters;
