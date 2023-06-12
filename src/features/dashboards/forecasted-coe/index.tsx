import DASHBOARDS from 'assets/constants/dashboards';
import { DashboardContext } from './context';
import { DashboardFilterEntity } from 'types/dashboard-type';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { OpportunityListItem } from 'types/opportunity-list-item';
import { OpportunityListResponseType } from 'types/api-response';
import oppurtuniyColumns from 'assets/list/dashboard/column';
import defaultSort from 'assets/list/dashboard/default-sort';
import DataGrid from 'components/data-grid';
import Filter from './filters';
import filterService from 'services/filter-service';
import initialFilter from 'state/dashboard/forecasted-coe/initial-filter';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import OppurtunityService from 'services/oppurtunity-service';
import React, { useCallback, useEffect, useState } from 'react';
import userPreferenceService from 'services/user-preference-service';
import eventBus from 'helpers/event-bus-helper';
import DefaultDashboardFields from 'assets/list/dashboard/default-column';

const ForecastedCOE = ({
  currentTab,
  updateCount
}: {
  currentTab: number;
  updateCount: (e: any) => any;
}) => {
  const [refreshColumn, setRefreshColumn] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [oppurtunities, setOppurtunities] = useState<OpportunityListItem[]>([]);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    DefaultDashboardFields.TRANSACTION_DASHBOARD_FORCSTED_COE
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

  const [filter, setFilter] = useState<DashboardFilterEntity>(initialFilter);

  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const getColumns = useCallback(() => {
    return oppurtuniyColumns.filter((x: any) =>
      selectedColumns.includes(x.field)
    );
  }, [selectedColumns]);

  const getOpportunities = async () => {
    setErrorMessage('');

    setIsFilterChanged(false);

    const request = prepareRequest();

    setIsLoading(true);
    const result: OpportunityListResponseType = await OppurtunityService.get(
      request
    );
    setIsLoading(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setOppurtunities(result.data.data);
    setRowCountState(result.data.meta.total);
    updateCount({
      forcastedCoe: result.data.meta.total
    });
  };

  const getTableColumnsToShow = async () => {
    const response = await userPreferenceService.getItem({
      category: DASHBOARDS.TRANSACTION_DASHBOARD_FORCSTED_COE,
      subcategory: DASHBOARDS.SELECTED_COLUMNS
    });

    if (response.isSuccess && response.data) {
      setSelectedColumns(response.data.contents);
    }
  };

  const prepareRequest = () => {
    let filterUrl = '';
    if (Object.keys(filter).length > 0) {
      filterUrl = filterService(filter, 'dashboard');
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: {}
    });

    return `${queryString}${filterUrl}`;
  };

  const updatePagiantion = (param: any) => {
    setPaginationModel(Object.assign({}, paginationModel, param));
  };

  const updateSorting = (param: any) => {
    setSortModel(param);
  };
  const updateFilter = (param: any) => {
    setFilter(Object.assign({}, filter, { [param.name]: param.value }));
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  const udpateRefreshColumn = () =>
    setRefreshColumn((prevRefreshColumn) => prevRefreshColumn + 1);

  useEffect(() => {
    if (!initialLoad) return;

    getOpportunities();
  }, [paginationModel.page]);

  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      getOpportunities();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad || sortModel.length == 0) return;

    if (paginationModel.page === 0) {
      getOpportunities();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!isFilterChanged) return;

    if (!initialLoad && currentTab !== 4) return;

    if (!initialLoad) {
      getTableColumnsToShow();
    }

    if (paginationModel.page === 0) {
      getOpportunities();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }

    setInitialLoad(true);
  }, [isFilterChanged]);

  useEffect(() => {
    if (currentTab !== 4 || initialLoad) return;

    if (!initialLoad) {
      getTableColumnsToShow();
    }

    getOpportunities();

    setInitialLoad(true);
  }, [currentTab]);

  useEffect(() => {
    if (!initialLoad) return;
    getOpportunities();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    getTableColumnsToShow();
  }, [refreshColumn]);

  useEffect(() => {
    eventBus.on(
      `${DASHBOARDS.TRANSACTION_DASHBOARD_FORCSTED_COE}_refresh`,
      () => {
        updateRefresh();
      }
    );
    eventBus.on(
      `${DASHBOARDS.TRANSACTION_DASHBOARD_FORCSTED_COE}_refresh_columns`,
      () => {
        udpateRefreshColumn();
      }
    );
  }, []);

  return (
    <React.Fragment>
      <DashboardContext.Provider
        value={{
          filter,
          updateFilter: updateFilter,
          setIsFilterChanged: setIsFilterChanged,
          setFilter: setFilter,
          updatePagiantion: updatePagiantion,
          currentTab: DASHBOARDS.TRANSACTION_DASHBOARD_FORCSTED_COE
        }}
      >
        <Filter page={paginationModel.page} />
        <DataGrid
          rows={oppurtunities}
          columns={getColumns()}
          rowCount={rowCountState}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={updateSorting}
          loading={isLoading}
          error={errorMessage}
        />
      </DashboardContext.Provider>
    </React.Fragment>
  );
};

export default ForecastedCOE;
