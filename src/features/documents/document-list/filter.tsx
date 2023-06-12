import documentType from 'assets/constants/document-type';
import fieldLabel from 'assets/constants/fieldLabel';
import ClearButton from 'components/form/button-clear';
import SearchButton from 'components/form/button-search';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRow from 'components/stack/stack-row';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { useParams } from 'react-router-dom';
import initialListFilter from 'state/document/initial-document-list-filter';
import { DocumentFilterEntity } from 'types/documents-types';

interface FilterProps {
  filter: DocumentFilterEntity;
  updateFilter: (val: any) => void;
  setIsFilterChanged: (val: any) => void;
  setFilter: (val: any) => void;
}

const Filters = (props: FilterProps) => {
  const { filter, updateFilter, setIsFilterChanged, setFilter } = props;
  const { opportunity_id } = useParams();

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitText
            label={fieldLabel.documentName}
            name="document_name"
            value={filter.document_name ?? ''}
            onChange={updateFilter}
            grid={{ xs: 12, sm: 4 }}
          />

          {opportunity_id && (
            <UnitSelect
              name="document_type"
              label={fieldLabel.documentType}
              records={getObjectEntriesAsArray(documentType)}
              value={filter.document_type ?? ''}
              grid={{ xs: 12, sm: 4 }}
              onChange={updateFilter}
            />
          )}
          <UnitItem grid={{ xs: 12, sm: 6, md: 4 }}>
            <StackRow isUnitItem>
              <SearchButton
                onClick={() => {
                  setIsFilterChanged(true);
                }}
              />
              <ClearButton
                onClick={() => {
                  setFilter(initialListFilter);
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
