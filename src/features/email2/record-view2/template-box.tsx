import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import fieldLabel from 'assets/constants/fieldLabel';
import defaultSort from 'assets/list/email-template/default-sort';
import templateColumns from 'assets/list/email-template/template-box-column';
import DataGrid from 'components/data-grid';
import FormContainer from 'components/form/container';
import TextUnit from 'components/form/unit-text';
import eventBus from 'helpers/event-bus-helper';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import React, { useContext, useEffect, useState } from 'react';
import mailService from 'services/mail-service';
import initalTemplateList from 'state/email/initial-template-list';
import { ObjectType } from 'types';
import {
  TemplateListItem,
  TemplateListType,
  TemplateType
} from 'types/email-types';

interface PropTypes {
  setContent?: React.Dispatch<React.SetStateAction<ObjectType>>;
  template: string;
  handleChange: (val: any) => void;
  readOnly: boolean;
  mail: ObjectType;
}

const TemplateBox = ({
  setContent,
  template,
  handleChange,
  readOnly,
  mail
}: PropTypes) => {
  const [templates, setTemplate] =
    useState<TemplateListItem[]>(initalTemplateList);
  const { marketPreference } = useContext(OpportunityContext);

  const [filter, setFilter] = useState({ name: '', subject: '' });
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowCountState, setRowCountState] = React.useState(0);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 10,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const saveFilterOnEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      if (e.target.value !== undefined) {
        loadTemplates();
      }
    }
  };

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const loadTemplates = async () => {
    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filter
    });

    const result: TemplateListType = await mailService.getEmailTemplates(
      `${queryString}&filter[market_preference_id]=${marketPreference.id}`
    );

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setTemplate(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const loadTemplateContent = async (id: string) => {
    const result: TemplateType = await mailService.getEmailTemplatesById(id);

    if (setContent)
      setContent({
        html: result.data.body_html,
        text: result.data.body
      });
  };

  const loadTemplatEventHandler = (e: ObjectType) => {
    handleChange(e);

    if (mail?.count > 0 && mail.status === 'send') {
      handleChange({
        template: e.target.value
      });
    } else {
      handleChange({
        template: e.target.value,
        subject: e.target.subject || ''
      });
    }
    loadTemplateContent(e.target.value);
  };

  useEffect(() => {
    loadTemplates();
    eventBus.on('LOAD_TEMPLATE_CONTENT', (data: ObjectType) => {
      loadTemplatEventHandler(data);
    });
  }, []);

  useEffect(() => {
    if (!initialLoad) loadTemplates();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadTemplates();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadTemplates();
  }, [JSON.stringify(sortModel)]);

  return (
    <React.Fragment>
      <FormContainer>
        <TextUnit
          label={fieldLabel.name}
          name="name"
          value={filter.name}
          onChange={updateFilter}
          onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
          grid={{ xs: 12, sm: 12 }}
        />
        <TextUnit
          label={fieldLabel.subject}
          name="subject"
          value={filter.subject}
          onChange={updateFilter}
          onKeyDown={(e: any) => saveFilterOnEnterPress(e)}
          grid={{ xs: 12, sm: 12 }}
        />
      </FormContainer>
      <DataGrid
        rows={templates}
        columns={templateColumns}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={isLoading}
        error={errorMessage}
        pagitionOptions={[10]}
      />
    </React.Fragment>
  );
};

export default TemplateBox;
