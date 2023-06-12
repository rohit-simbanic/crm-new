import ReportList from 'features/report/report-list';
import ReportView from 'features/report/report-view';
import ReportPage from 'pages/report-page';

const reportRoutes = {
  path: 'reports',
  element: <ReportPage />,
  children: [
    {
      path: '',
      element: <ReportList />
    },
    { path: ':report_id/view', element: <ReportView /> }
  ]
};

export default reportRoutes;
