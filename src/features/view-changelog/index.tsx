import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import ViewChangeLogService from 'services/view-change-log-service';
import changelogColumn from 'assets/list/view-changlog/column';
import DataGrid from 'components/data-grid';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/view-changlog/default-sort';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import Filters from './filter';
import { isEmpty } from 'helpers/misc-helper';

interface ViewChangeLogProps {
  filter: any;
  action: string;
  fieldAction: string;
  setFilter: (val: any) => void;
}

const ViewChangelog = ({
  setFilter,
  filter,
  action,
  fieldAction
}: ViewChangeLogProps) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
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
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };

  const loadLogs = async () => {
    let { field_name, ...filterInfo } = filter;

    let filterString = '';
    if (!isEmpty(field_name)) {
      if (!isEmpty(field_name) && Array.isArray(field_name)) {
        for (const field of field_name) {
          filterString += `&filter[field_name][]=${field.value}`;
        }
      } else {
        filterString += `&filter[field_name]=${field_name?.value}`;
      }
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    queryString = `${queryString}${filterString}`;

    setLoading(true);
    const result: ObjectType = await ViewChangeLogService.get(
      action,
      queryString
    );
    setLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    if (result.isSuccess) {
      setLogs(result.data.data);
      setRowCountState(result.data.meta.total);
    }
  };

  useEffect(() => {
    if (!initialLoad) loadLogs();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadLogs();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadLogs();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadLogs();
  }, [isFilterChanged]);
  return (
    <>
      {fieldAction ? (
        <Filters
          filter={filter}
          updateFilter={updateFilter}
          setIsFilterChanged={setIsFilterChanged}
          setFilter={setFilter}
          fieldAction={fieldAction}
        />
      ) : (
        <></>
      )}

      <DataGrid
        rows={logs}
        columns={changelogColumn}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={loading}
        error={errorMessage}
      />
    </>
  );
};

export default ViewChangelog;
