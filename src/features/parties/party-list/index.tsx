import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import { PartyFilterEntity, PartyListEntity } from 'types/party-types';
import partyService from 'services/parties-service';
import Filters from './filters';
import partyColumns from 'assets/list/party/column';
import defaultSort from 'assets/list/party/default-sort';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import { GridSortModel } from '@mui/x-data-grid';
import initialPartyList from 'state/party/initial-party-list';
import initialPartyListFilter from 'state/party/initial-party-list-filter';
import DataGrid from 'components/data-grid';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty } from 'helpers/misc-helper';

const PartiesList = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();

  const [parties, setParties] = useState<PartyListEntity[]>(initialPartyList);
  const { routeName, setRouteName } = useRouteName();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<PartyFilterEntity>(
    initialPartyListFilter
  );
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

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

  const loadParties = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await partyService.getParties(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setParties(result.data.data);

    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    loadParties();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadParties();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadParties();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadParties();
  }, [isFilterChanged]);

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <React.Fragment>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={parties}
        columns={partyColumns}
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

export default PartiesList;
