import ClosingDashboard from 'pages/dashboard/closing-dashboard';
import NegotiatorDashboard from 'pages/dashboard/negotiator-dashboard';
import TransactionDashboard from 'pages/dashboard/transaction-dashboard';
import Actions from 'pages/opportunity/actions';
import Dashboard from 'pages/dashboard';

const dashboardRoutes = {
  path: 'dashboard',
  element: <Dashboard />,
  children: [
    {
      path: 'negotiator',
      element: <NegotiatorDashboard />,
      children: [
        {
          path: 'opportunities/:opportunity_id/brokerage-action/:action',
          element: <Actions />
        }
      ]
    },
    {
      path: 'closing',
      element: <ClosingDashboard />,
      children: [
        {
          path: 'opportunities/:opportunity_id/brokerage-action/:action',
          element: <Actions />
        }
      ]
    },
    {
      path: 'transaction',
      element: <TransactionDashboard />,
      children: [
        {
          path: 'opportunities/:opportunity_id/brokerage-action/:action',
          element: <Actions />
        }
      ]
    }
  ]
};

export default dashboardRoutes;
