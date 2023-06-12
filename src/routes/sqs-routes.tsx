import SQSCreate from 'features/sqs/sqs-create';
import SQSView from 'features/sqs/sqs-view';
import SQSList from 'features/sqs/sqs-list';
import SQSPage from 'pages/sqs';
import SqsViewChangelog from 'features/sqs/sqs-change-log';

const sqsRoutes = {
  path: 'sqs',
  element: <SQSPage />,
  children: [
    {
      path: '',
      element: <SQSList routeTag="sqs" />
    },
    {
      path: 'create',
      element: <SQSCreate routeTag="sqs-create" />
    },
    {
      path: ':sqs_id/view',
      element: <SQSView routeTag="sqs-view" />
    },
    {
      path: ':sqs_id/edit',
      element: <SQSCreate routeTag="sqs-edit" />
    },
    {
      path: ':sqs_id/view_changelog',
      element: <SqsViewChangelog routeTag="sqs-change-log" />
    }
  ]
};

export default sqsRoutes;
