import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tasksService from 'services/tasks-service';
import { ObjectType } from 'types';
import { TasksFilterEntity, TasksListEntity } from 'types/tasks-types';
import initialTasksList from 'state/task/initial-tasks-list';
import initialTasksListFilter from 'state/task/initial-tasks-list-filter';
import Filters from './filters';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/task/default-sort';
import DataGrid from 'components/data-grid';
import taskColumn from 'assets/list/task/column';
import useRouteName from 'pages/route-outlet-context';

const TasksList = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id } = useParams<ObjectType>();

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksListEntity[]>(initialTasksList);

  const { routeName, setRouteName } = useRouteName();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<TasksFilterEntity>(
    initialTasksListFilter
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

  const loadTasks = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await tasksService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setTasks(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadTasks();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadTasks();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadTasks();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadTasks();
  }, [isFilterChanged]);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <React.Fragment>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={tasks}
        columns={taskColumn}
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

export default TasksList;
