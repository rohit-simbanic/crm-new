import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import opportunityBrokerageUsersService from 'services/opportunity-brokerage-user-service';
import { ObjectType } from 'types';
import {
  OpportunityBrokerageUserFilterEntity,
  OpportunityBrokerageUserListEntity
} from 'types/opportunity-brokerage-user-types';
import initialOpportunityBrokerageUserListFilter from 'state/opportunity-brokerage-user/initial-opportunity-brokerage-user-list-filter';
import Filters from './filters';
import defaultSort from 'assets/list/opportunity-brokerage-user/default-sort';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import DataGrid from 'components/data-grid';
import opportunityBrokerageUsersColumn from 'assets/list/opportunity-brokerage-user/column';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import OpportunityBrokerageUserRefresh from '../opportunity-brokerage-user-refresh';
import useRouteName from 'pages/route-outlet-context';

const OpportunityBrokerageUsersList = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [opportunityBrokerageUsers, setOpportunityBrokerageUsers] = useState<
    OpportunityBrokerageUserListEntity[]
  >([]);

  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<OpportunityBrokerageUserFilterEntity>(
    initialOpportunityBrokerageUserListFilter
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
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const loadOpportunityBrokerageUsers = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await opportunityBrokerageUsersService.getList(
      queryString
    );

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setOpportunityBrokerageUsers(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadOpportunityBrokerageUsers();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadOpportunityBrokerageUsers();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadOpportunityBrokerageUsers();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadOpportunityBrokerageUsers();
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
        opportunityId={opportunity_id}
      />

      {opportunity_id && (
        <OpportunityBrokerageUserRefresh
          opportunityID={opportunity_id}
          setIsFilterChanged={setIsFilterChanged}
        />
      )}

      <DataGrid
        rows={opportunityBrokerageUsers}
        columns={opportunityBrokerageUsersColumn}
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

export default OpportunityBrokerageUsersList;
