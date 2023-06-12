import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import marketPreferenceBrokerageUserColumn from 'assets/list/market-preference-brokerage-user/column';
import defaultSort from 'assets/list/market-preference-brokerage-user/default-sort';
import DataGrid from 'components/data-grid';
import eventBus from 'helpers/event-bus-helper';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceBrokerageUsersService from 'services/market-preference-brokerage-users-service';
import initialMarketPreferenceBrokerageUserListFilter from 'state/market-preference-brokerage-user/initial-market-preference-brokerage-user-list-filter';
import { ObjectType } from 'types';
import {
  MarketPreferenceBrokerageUserFilterEntity,
  MarketPreferenceBrokerageUserListEntity
} from 'types/market-preference-brokerage-user-types';
import Filters from './filters';

const MarketPreferenceBrokerageUsersList = ({
  routeTag
}: {
  routeTag: string;
}) => {
  const { market_preference_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [marketPreferenceBrokerageUsers, setMarketPreferenceBrokerageUsers] =
    useState<MarketPreferenceBrokerageUserListEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] =
    useState<MarketPreferenceBrokerageUserFilterEntity>(
      initialMarketPreferenceBrokerageUserListFilter
    );

  const [rowCountState, setRowCountState] = React.useState(0);
  const { routeName, setRouteName } = useRouteName();

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

  const loadMarketPreferenceBrokerageUsers = async () => {
    let filterInfo =
      market_preference_id === undefined
        ? filter
        : { ...filter, market_preference_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType =
      await marketPreferenceBrokerageUsersService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setMarketPreferenceBrokerageUsers(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  useEffect(() => {
    if (!initialLoad) loadMarketPreferenceBrokerageUsers();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferenceBrokerageUsers();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferenceBrokerageUsers();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferenceBrokerageUsers();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadMarketPreferenceBrokerageUsers();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('market_preference_brokerage_user_refresh', () =>
      updateRefresh()
    );
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
        marketPreferenceId={market_preference_id}
      />

      <DataGrid
        rows={marketPreferenceBrokerageUsers}
        columns={marketPreferenceBrokerageUserColumn}
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

export default MarketPreferenceBrokerageUsersList;
