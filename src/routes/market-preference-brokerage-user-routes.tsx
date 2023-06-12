import MarketPreferenceBrokerageUserViewChangelog from 'features/market-preference-brokerage-users/market-preference-brokerage-user-change-log';
import MarketPreferencesBrokerageUserCreate from 'features/market-preference-brokerage-users/market-preference-brokerage-user-create';
import MarketPreferenceBrokerageUserView from 'features/market-preference-brokerage-users/market-preference-brokerage-user-view';
import MarketPreferencesBrokerageUsersList from 'features/market-preference-brokerage-users/market-preference-brokerage-users-list';
import MarketPreferencesBrokerageUserPage from 'pages/market-preferences-brokerage-user';

const marketPreferenceRoutes = {
  path: 'market-preferences-brokerage-users',
  element: <MarketPreferencesBrokerageUserPage />,
  children: [
    {
      path: '',
      element: (
        <MarketPreferencesBrokerageUsersList routeTag="market-preferences-brokerage-users" />
      )
    },
    {
      path: 'create',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-brokerage-users-create" />
      )
    },
    {
      path: ':market_preference_brokerage_user_id/view',
      element: (
        <MarketPreferenceBrokerageUserView routeTag="market-preferences-brokerage-users-view" />
      )
    },
    {
      path: ':market_preference_brokerage_user_id/view_changelog',
      element: (
        <MarketPreferenceBrokerageUserViewChangelog routeTag="market-preferences-brokerage-users-change-log" />
      )
    },
    {
      path: ':market_preference_brokerage_user_id/edit',
      element: (
        <MarketPreferencesBrokerageUserCreate routeTag="market-preferences-brokerage-users-edit" />
      )
    }
  ]
};

export default marketPreferenceRoutes;
