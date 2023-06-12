import MSAList from 'features/msa/msa-list';
import MsaCreate from 'features/msa/msa-create';
import MsaView from 'features/msa/msa-view';
import MsaPage from 'pages/msa/index';
import AccountsList from 'features/accounts/account-list';
import AccountsView from 'features/accounts/account-view';
import MarketViewChangelog from 'features/msa/mas-change-log';

const msaRoutes = {
  path: 'msa',
  element: <MsaPage />,
  children: [
    { path: '', element: <MSAList routeTag="msa" /> },
    { path: 'create', element: <MsaCreate routeTag="msa-create" /> },
    { path: ':msa_id/view', element: <MsaView routeTag="msa-view" /> },
    {
      path: ':msa_id/view_changelog',
      element: <MarketViewChangelog routeTag="msa-change-log" />
    },
    { path: ':msa_id/edit', element: <MsaCreate routeTag="msa-edit" /> },
    {
      path: ':msa_id/accounts/list',
      element: <AccountsList routeTag="msa-accounts" />
    },
    {
      path: ':msa_id/accounts/:account_id/view',
      element: <AccountsView routeTag="msa-accounts-view" />
    }
  ]
};

export default msaRoutes;
