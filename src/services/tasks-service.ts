import { TasksListTypeResponse } from 'types/tasks-types';
import { list } from './client-service';
import envConfig from 'config/env';

const tasksService = {
  url: `/${envConfig.REACT_APP_API_VERSION_1}/tasks`,

  getList: async (query: string): Promise<TasksListTypeResponse> => {
    const result: TasksListTypeResponse = await list(
      `${tasksService.url}${query}`
    );
    return result;
  }
};

export default tasksService;
