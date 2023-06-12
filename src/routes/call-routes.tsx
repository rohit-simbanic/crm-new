import CallList from 'features/calls/calls-list';
import CallPage from 'pages/call';

const taskRoutes = {
  path: 'calls',
  element: <CallPage />,
  children: [
    {
      path: '',
      element: <CallList routeTag="calls" />
    }
  ]
};

export default taskRoutes;
