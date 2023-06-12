import AccountPage from 'pages/account';
import AccountsList from 'features/accounts/account-list';
import AccountsView from 'features/accounts/account-view';
import AccountCreate from 'features/accounts/account-create';
import MSAList from 'features/msa/msa-list';
import ReactRouterErrorEle from 'components/errors/router-error';
import MSASelectionList from 'features/msa/msa-list/selection-list';
import AccountViewChangelog from 'features/accounts/account-change-log';

const accountRoutes = {
  path: 'accounts',
  element: <AccountPage />,
  errorElement: <ReactRouterErrorEle />,
  children: [
    { path: '', element: <AccountsList routeTag="accounts" /> },
    { path: 'create', element: <AccountCreate routeTag="accounts-create" /> },
    {
      path: ':account_id/view',
      element: <AccountsView routeTag="accounts-view" />
    },
    {
      path: ':account_id/view_changelog',
      element: <AccountViewChangelog routeTag="accounts-change-log" />
    },
    {
      path: ':account_id/edit',
      element: <AccountCreate routeTag="accounts-edit" />
    },
    {
      path: ':account_id/msa/list',
      element: <MSAList routeTag="accounts-msa" />
    },
    {
      path: ':account_id/msa/selection-list',
      element: <MSASelectionList routeTag="accounts-msa-selection" />
    }
  ]
};

export default accountRoutes;
