import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { getEmailTemplateColumns } from 'assets/list/email-template/column';
import defaultSort from 'assets/list/email-template/default-sort';
import DataGrid from 'components/data-grid';
import eventBus from 'helpers/event-bus-helper';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import emailTemplatesService from 'services/email-template-service';
import initialEmailTemplateListFilter from 'state/email-template/initial-email-template-list-filter';
import { ObjectType } from 'types';
import {
  EmailTemplateFilterEntity,
  EmailTemplateListEntity
} from 'types/email-template';

import Filters from './filters';

const emailTemplatesList = ({ routeTag }: { routeTag: string }) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [emailTemplates, setEmailTemplates] = useState<
    EmailTemplateListEntity[]
  >([]);
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<EmailTemplateFilterEntity>(
    initialEmailTemplateListFilter
  );
  const { market_preference_id } = useParams<ObjectType>();

  const { routeName, setRouteName } = useRouteName();

  const [rowCountState, setRowCountState] = React.useState(0);
  const [refresh, setRefresh] = useState<number>(0);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 25,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const loadEmailTemplates = async () => {
    let filterInfo;
    if (location.pathname.includes('selection-list')) {
      filterInfo = filter;
    } else {
      filterInfo =
        market_preference_id === undefined
          ? filter
          : { ...filter, market_preference_id };
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await emailTemplatesService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setEmailTemplates(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  useEffect(() => {
    if (!initialLoad) loadEmailTemplates();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadEmailTemplates();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadEmailTemplates();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadEmailTemplates();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadEmailTemplates();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('email_template_refresh', () => updateRefresh());
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={emailTemplates}
        columns={getEmailTemplateColumns(
          !location.pathname.includes('selection-list') && market_preference_id
        )}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={isLoading}
        error={errorMessage}
      />
    </>
  );
};

export default emailTemplatesList;
