import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import callsService from 'services/calls-service';
import { ObjectType } from 'types';
import { CallsFilterEntity, CallsListEntity } from 'types/calls-types';
import Filters from './filters';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import DataGrid from 'components/data-grid';
import callColumn from 'assets/list/call/column';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/call/default-sort';
import initialCallsList from 'state/call/initial-calls-list';
import initialCallListFilter from 'state/call/initial-calls-list-filter';
import useRouteName from 'pages/route-outlet-context';

const CallsList = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [calls, setCalls] = useState<CallsListEntity[]>(initialCallsList);

  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<CallsFilterEntity>(
    initialCallListFilter
  );

  const [rowCountState, setRowCountState] = React.useState(0);

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
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };

  const loadCalls = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });
    setIsLoading(true);

    const result: ObjectType = await callsService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setCalls(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadCalls();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadCalls();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadCalls();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadCalls();
  }, [isFilterChanged]);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={calls}
        columns={callColumn}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={isLoading}
        error={errorMessage}
      />
    </React.Fragment>
  );
};

export default CallsList;
