import fieldLabel from 'assets/constants/fieldLabel';
import AutoCompleteUnit from 'components/form/auto-complete-unit';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import { useEffect, useState } from 'react';
import FieldsService from 'services/fields-service';
import initialViewChangeLogListFilter from 'state/view-changelog/initial-view-change-log-list-filter';
import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';

interface FilterProps {
  filter: {
    field_name: string;
  };
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
  fieldAction: string;
}

const Filters = ({
  filter,
  updateFilter,
  setIsFilterChanged,
  setFilter,
  fieldAction
}: FilterProps) => {
  const [fieldOptions, setFieldOptions] = useState<OptionType[]>([]);

  const loadFields = async () => {
    const result: ObjectType = await FieldsService.getFields(fieldAction);

    if (result.isSuccess) {
      let data = result.data.data;
      let options = [];
      for (const key in data) {
        options.push({ label: data[key].label, value: key });
      }
      setFieldOptions(options);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <AutoCompleteUnit
            label={fieldLabel.auditFields}
            id="field_name"
            options={fieldOptions}
            multiple={fieldAction === 'opportunities' ? true : false}
            values={filter.field_name}
            grid={{ xs: 12, sm: 3 }}
            onChange={(e: any) => {
              updateFilter({
                target: {
                  name: 'field_name',
                  value: e.target.value
                }
              });
            }}
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
                  setFilter(
                    fieldAction === 'opportunities'
                      ? initialViewChangeLogListFilter
                      : { field_name: '' }
                  );
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
