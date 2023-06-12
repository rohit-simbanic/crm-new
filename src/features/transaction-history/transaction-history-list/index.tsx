import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import transactionHistoryService from 'services/transaction-history-service';
import { ObjectType } from 'types';
import {
  TransactionHistoryFilterEntity,
  TransactionHistoryListEntity
} from 'types/transaction-history-types';
import initialTransactionHistoryList from 'state/transaction-history/initial-transaction-history-list-filter';
import Filters from './filters';
import defaultSort from 'assets/list/transaction-history/default-sort';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import DataGrid from 'components/data-grid';
import transactionHistoryColumn from 'assets/list/transaction-history/column';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';

const TransactionHistoriesList = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [transactionHistories, setTransactionHistories] = useState<
    TransactionHistoryListEntity[]
  >([]);

  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<TransactionHistoryFilterEntity>(
    initialTransactionHistoryList
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

  const loadTransactionHistories = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await transactionHistoryService.getList(
      queryString
    );

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setTransactionHistories(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadTransactionHistories();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadTransactionHistories();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadTransactionHistories();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadTransactionHistories();
  }, [isFilterChanged]);

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
        rows={transactionHistories}
        columns={transactionHistoryColumn}
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

export default TransactionHistoriesList;
