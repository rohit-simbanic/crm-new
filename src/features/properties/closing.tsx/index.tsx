import DASHBOARDS from 'assets/constants/dashboards';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { ObjectType } from 'types';
import { OpportunityListResponseType } from 'types/api-response';
import oppurtuniyColumns from 'assets/list/dashboard/column';
import DataGrid from 'components/data-grid';
import defaultSort from 'assets/list/dashboard/default-sort';
import Filter from './filter';
import filterService from 'services/filter-service';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import oppurtunityService from 'services/oppurtunity-service';
import React, { useCallback, useEffect, useState } from 'react';
import userPreferenceService from 'services/user-preference-service';
import { isEmpty } from 'helpers/misc-helper';
import eventBus from 'helpers/event-bus-helper';
import propertiesClosingStateOfClosing from 'assets/constants/properties-closing-state-of-closing';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import DefaultDashboardFields from 'assets/list/dashboard/default-column';

const ClosingProperties = () => {
  const [refreshColumn, setRefreshColumn] = useState(0);
  const [properties, setProperties] = useState<ObjectType[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    DefaultDashboardFields.TRANSACTION_DASHBOARD_DD_ENDING
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

  const [filter, setFilter] = useState<ObjectType>({});
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [query, setQuery] = useState('');

  const updateFilter = (param: any) => {
    setFilter(Object.assign({}, filter, { [param.name]: param.value }));
  };

  const getColumns = useCallback(() => {
    return oppurtuniyColumns.filter((x: any) =>
      selectedColumns.includes(x.field)
    );
  }, [selectedColumns]);

  const showAll = (queryUrl: string) => {
    setQuery(queryUrl);
    setIsFilterChanged(true);
  };

  const prepareRequest = () => {
    let filterUrl = '';
    if (isEmpty(query)) {
      filterUrl = filterService(filter, 'properties');

      if (!filterUrl.includes('&filter[opportunity_status_c]')) {
        for (const el of getObjectEntriesAsArray(
          propertiesClosingStateOfClosing
        )) {
          filterUrl += `&filter[opportunity_status_c][]=${el.value}`;
        }
      }
    } else {
      filterUrl = query;
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: {}
    });

    return `${queryString}${filterUrl}`;
  };

  const getProperties = async () => {
    setErrorMessage('');
    setIsFilterChanged(false);

    let request = prepareRequest();

    setIsLoading(true);
    const result: OpportunityListResponseType = await oppurtunityService.get(
      request
    );
    setIsLoading(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setProperties(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const getTableColumnsToShow = async () => {
    const response = await userPreferenceService.getItem({
      category: DASHBOARDS.PROPERTIES_CLOSING,
      subcategory: DASHBOARDS.SELECTED_COLUMNS
    });

    if (response.isSuccess && response.data) {
      setSelectedColumns(response.data.contents);
    }
  };

  const udpateRefreshColumn = () =>
    setRefreshColumn((prevRefreshColumn) => prevRefreshColumn + 1);

  useEffect(() => {
    if (!initialLoad) return;

    getProperties();
  }, [paginationModel.page]);

  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      getProperties();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      getProperties();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!isFilterChanged) return;

    if (!initialLoad) {
      getTableColumnsToShow();
    }

    getProperties();
    setInitialLoad(true);
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on(`${DASHBOARDS.PROPERTIES_CLOSING}_refresh_columns`, () => {
      udpateRefreshColumn();
    });
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    getTableColumnsToShow();
  }, [refreshColumn]);

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        showAll={showAll}
        currentTab={DASHBOARDS.PROPERTIES_CLOSING}
      />
      <DataGrid
        rows={properties}
        columns={getColumns()}
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

export default ClosingProperties;
