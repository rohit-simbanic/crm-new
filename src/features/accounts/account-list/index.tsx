import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accountsService from 'services/accounts-service';
import { ObjectType } from 'types';
import { AccountFilterEntity, AccountListEntity } from 'types/account-types';
import initialAccountListFilter from 'state/account/initial-account-list-filter';
import Filters from './filters';
import defaultSort from 'assets/list/account/default-sort';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import DataGrid from 'components/data-grid';
import accountColumn from 'assets/list/account/column';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';

const AccountsList = ({ routeTag }: { routeTag: string }) => {
  const { msa_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const { routeName, setRouteName } = useRouteName();
  const [accounts, setAccounts] = useState<AccountListEntity[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<AccountFilterEntity>(
    initialAccountListFilter
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

  const loadAccounts = async () => {
    let filterInfo = msa_id === undefined ? filter : { ...filter, msa_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await accountsService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setAccounts(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  useEffect(() => {
    if (!initialLoad) loadAccounts();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadAccounts();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadAccounts();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadAccounts();
  }, [isFilterChanged]);

  return (
    <>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
        isLoading={isLoading}
      />

      <DataGrid
        rows={accounts}
        columns={accountColumn}
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

export default AccountsList;
