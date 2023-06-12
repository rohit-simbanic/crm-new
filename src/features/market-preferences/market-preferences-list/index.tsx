import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import marketPreferenceColumn from 'assets/list/market-preference/column';
import defaultSort from 'assets/list/market-preference/default-sort';
import DataGrid from 'components/data-grid';
import eventBus from 'helpers/event-bus-helper';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferencesService from 'services/market-preferences';
import initialMarketPreferenceListFilter from 'state/market-preference/initial-market-preference-list-filter';
import { ObjectType } from 'types';
import {
  MarketPreferencesFilterEntity,
  MarketPreferencesListEntity
} from 'types/market-preferences';

import Filters from './filters';

const MarketPreferencesList = ({ routeTag }: { routeTag: string }) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [marketPreferences, setMarketPreferences] = useState<
    MarketPreferencesListEntity[]
  >([]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<MarketPreferencesFilterEntity>(
    initialMarketPreferenceListFilter
  );

  const { email_template_id } = useParams<ObjectType>();

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

  const loadMarketPreferences = async () => {
    let filterInfo =
      email_template_id === undefined
        ? filter
        : { ...filter, email_template_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType =
      await marketPreferencesService.getMarketPreferences(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setMarketPreferences(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  useEffect(() => {
    if (!initialLoad) loadMarketPreferences();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferences();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferences();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadMarketPreferences();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadMarketPreferences();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('market_preference_refresh', () => updateRefresh());
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
        rows={marketPreferences}
        columns={marketPreferenceColumn}
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

export default MarketPreferencesList;
