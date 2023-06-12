import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import OpportunityViewService from 'services/opportunity-view-service';
import { ServiceFilterEntity, ServiceListEntity } from 'types/service-types';
import initialServiceList from 'state/service/initial-service-list';
import initialServiceListFilter from 'state/service/initial-service-list-filter';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/service/default-sort';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import DataGrid from 'components/data-grid';
import serviceColumn from 'assets/list/service/column';
import useRouteName from 'pages/route-outlet-context';
import eventBus from 'helpers/event-bus-helper';

const ServiceList = ({ routeTag }: { routeTag: string }) => {
  const { service_id, opportunity_id } = useParams<ObjectType>();

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [services, setServices] =
    useState<ServiceListEntity[]>(initialServiceList);

  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<ServiceFilterEntity>(
    initialServiceListFilter
  );

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
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };

  const loadServices = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await OpportunityViewService.getServices(
      queryString
    );

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setServices(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  useEffect(() => {
    if (!initialLoad) loadServices();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadServices();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadServices();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadServices();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadServices();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('service_refresh', () => updateRefresh());
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      <DataGrid
        rows={services}
        columns={serviceColumn}
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

export default ServiceList;
