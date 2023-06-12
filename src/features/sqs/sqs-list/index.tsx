import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid/models';
import { sqsColumns } from 'assets/list/sqs/column';
import defaultSort from 'assets/list/sqs/default-sort';
import DataGrid from 'components/data-grid';
import eventBus from 'helpers/event-bus-helper';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sqsService from 'services/sqs-service';
import initialSQSList from 'state/sqs/initial-sqs-list';
import initialSQSListFilter from 'state/sqs/initial-sqs-list-filter';
import { ObjectType } from 'types';
import { SQSFilterEntity, SQSListEntity } from 'types/sqs-types';

import Filters from './filters';

const SQSList = ({ routeTag }: { routeTag: string }) => {
  const [sQSs, setSQSs] = useState<SQSListEntity[]>(initialSQSList);
  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<SQSFilterEntity>(initialSQSListFilter);

  const { opportunity_id } = useParams<ObjectType>();

  const [refresh, setRefresh] = useState(0);

  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 25,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const prepareRequest = () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    return queryString;
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  const loadSQSs = async () => {
    let request = prepareRequest();

    setIsLoading(true);

    const result: ObjectType = await sqsService.getList(request);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setSQSs(result.data.data);

    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    loadSQSs();
    setInitialLoad(true);
  }, []);

  //hande change filters effect
  useEffect(() => {
    if (!isFilterChanged) return;

    if (paginationModel.page === 0) {
      loadSQSs();
    }

    setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
  }, [isFilterChanged]);

  //handle pagination page effect
  useEffect(() => {
    if (!initialLoad) return;
    loadSQSs();
  }, [paginationModel.page]);

  //handle pagination size effect
  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      loadSQSs();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [paginationModel.pageSize]);

  //handle Sort & Order effect
  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      loadSQSs();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    eventBus.on('sqs_refresh', () => {
      updateRefresh();
    });
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
        opportunityId={opportunity_id}
      />

      <DataGrid
        rows={sQSs}
        columns={sqsColumns}
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

export default SQSList;
