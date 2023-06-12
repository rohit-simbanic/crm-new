import HomePage from 'pages/home-page';
import ReportList from 'features/report/report-list';

const homeRoutes = {
  path: 'home',
  element: <HomePage />,
  children: [{ path: '', element: <ReportList /> }]
};

export default homeRoutes;
