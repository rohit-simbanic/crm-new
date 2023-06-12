import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import initialTasksListFilter from 'state/task/initial-tasks-list-filter';
import { TasksFilterEntity } from 'types/tasks-types';

interface FilterProps {
  filter: TasksFilterEntity;
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
          <UnitText
            label={fieldLabel.subject}
            name="subject_name"
            value={filter.subject_name}
            onChange={updateFilter}
            multiline
            rows={1}
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
                  setFilter(initialTasksListFilter);
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
