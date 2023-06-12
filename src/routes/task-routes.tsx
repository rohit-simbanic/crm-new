import TaskList from 'features/tasks/tasks-list';
import TaskPage from 'pages/task';

const taskRoutes = {
  path: 'tasks',
  element: <TaskPage />,
  children: [
    {
      path: '',
      element: <TaskList routeTag="tasks" />
    }
  ]
};

export default taskRoutes;
