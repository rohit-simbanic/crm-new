import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import buttonText from 'assets/constants/button';
import { column as columnOptions } from 'assets/constants/column-options';
import SecondaryButton from 'components/button/button-secondary';
import CircularLoader from 'components/dog-loader/dog-lodar';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitSwitch from 'components/form/unit-switch';
import ModalComponent from 'components/modal';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import StackRow from 'components/stack/stack-row';
import eventBus from 'helpers/event-bus-helper';
import useColorToken from 'hooks/useColorToken';
import React, { useContext, useEffect, useState } from 'react';
import userPreferenceService from 'services/user-preference-service';
import { ColumnOptionsEntity } from 'types/column-options-type';
import { UserPreferenceEntityResponse } from 'types/user-preference-type';
import { v4 as uuid4 } from 'uuid';

const ColumnChooserComponent = ({
  title,
  category,
  subcategory,
  dashboard,
  toggleModal,
  showModal,
  currentTab,
  defaultColumns = [],
  setIsLoading,
  isLoading
}: {
  title: string;
  category: string;
  subcategory: string;
  dashboard: string;
  toggleModal: (e: any) => any;
  showModal: boolean;
  currentTab: string | undefined;
  defaultColumns?: string[];
  setIsLoading: any;
  isLoading: boolean;
}) => {
  defaultColumns = defaultColumns.concat([
    'action',
    'name',
    'property_address_c',
    'account',
    'market'
  ]);
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(defaultColumns);

  const isSelected = (name: string) => {
    return [...selectedColumns].includes(name);
  };

  const invertSelection = (name: string) => {
    if (!isSelected(name)) {
      let columns = [...selectedColumns, name];
      setSelectedColumns(columns);
    } else {
      let columns = [...selectedColumns].filter(
        (column: string) => column !== name
      );
      setSelectedColumns(columns);
    }
  };

  const saveColumns = async () => {
    let data = {
      category: category,
      subcategory: subcategory,
      contents: selectedColumns
    };

    let result: UserPreferenceEntityResponse = await userPreferenceService.save(
      data
    );

    if (result.isSuccess) {
      eventBus.dispatch(`${currentTab}_refresh_columns`, {});
      toggleModal(false);
    }
  };

  const getTableColumnsToShow = async () => {
    setIsLoading(true);
    const response = await userPreferenceService.getItem({
      category: category,
      subcategory: subcategory
    });

    setIsLoading(false);
    if (response.isSuccess && response.data) {
      setSelectedColumns((cols: string[]) => [
        // ...cols,
        ...(response.data?.contents || [])
      ]);
    }
  };

  useEffect(() => {
    if (!showModal) return;
    getTableColumnsToShow();
  }, [showModal]);

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxHeader
          value={
            <>
              <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
                <ModalHeader title={title} onClose={() => toggleModal(false)} />
              </UnitItem>
            </>
          }
          sx={{ border: 'none' }}
        />

        <PaperBoxContent
          sx={{
            height: 'calc(100vh - 35vh)',
            overflowY: 'auto',
            p: 2
          }}
        >
          <FormContainer spacing={1}>
            {isLoading ? (
              <CircularLoader />
            ) : (
              columnOptions.map(
                (column: ColumnOptionsEntity, index: number) => (
                  <UnitSwitch
                    key={uuid4()}
                    value={isSelected(column.name) ? 1 : 0}
                    onChange={() => {
                      invertSelection(column.name);
                    }}
                    name={column.name}
                    label={column.title}
                    disabled={column.disable || false}
                    isInlineLabel={true}
                    grid={{ xs: 6, sm: 4 }}
                  />
                )
              )
            )}
          </FormContainer>
        </PaperBoxContent>
        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <SaveButton onClick={() => saveColumns()} />
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};

const ColumnChooser = ({
  title,
  category,
  subcategory,
  dashboard,
  currentTab,
  defaultColumns
}: {
  title: string;
  category: string;
  subcategory: string;
  dashboard: string;
  currentTab: string | undefined;
  defaultColumns?: string[];
}) => {
  const [showModal, toggleModal] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const colors = useColorToken();
  return (
    <React.Fragment>
      <SecondaryButton
        variant="contained"
        size="medium"
        name="btn-columns"
        onClick={() => toggleModal(!showModal)}
        startIcon={<ToggleOnIcon fontSize={'small'} />}
      >
        {buttonText.columnChooser}
      </SecondaryButton>

      {showModal && (
        <ModalComponent
          title={title}
          Component={ColumnChooserComponent}
          data={{
            title,
            category,
            subcategory,
            dashboard,
            showModal,
            toggleModal,
            currentTab,
            defaultColumns,
            setIsLoading,
            isLoading
          }}
          onClose={() => {
            toggleModal(false);
          }}
          loading={false}
          size="lg"
        />
      )}
    </React.Fragment>
  );
};

export default ColumnChooser;
