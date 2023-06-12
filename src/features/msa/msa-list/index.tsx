import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import msaService from 'services/msa-service';
import { ObjectType } from 'types';
import { MsaFilterEntity } from 'types/msa-types';
import Filters from './filters';
import initialMsaList from 'state/msa/initial-msa-list';
import initialMsaListFilter from 'state/msa/initial-msa-list-filter';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import defaultSort from 'assets/list/msa/default-sort';
import { GridSortModel } from '@mui/x-data-grid';
import msaColumn from 'assets/list/msa/column';
import DataGrid from 'components/data-grid';
import useRouteName from 'pages/route-outlet-context';
import eventBus from 'helpers/event-bus-helper';

const MSAList = ({ routeTag }: { routeTag: string }) => {
  const { account_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();
  const [msaList, setMsaList] = useState<any>(initialMsaList);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<MsaFilterEntity>(initialMsaListFilter);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [refresh, setRefresh] = useState(0);

  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0
  });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const updateFilter = (e: any) => {
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  const loadMsaList = async () => {
    let filterInfo = filter;

    if (routeTag === 'accounts-msa') {
      filterInfo = { ...filter, account_id };
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await msaService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setMsaList(result.data.data);

    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) {
      loadMsaList();
    }
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadMsaList();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMsaList();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMsaList();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadMsaList();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('msa_refresh', () => {
      updateRefresh();
    });
  });

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
        rows={msaList}
        columns={msaColumn}
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

export default MSAList;
