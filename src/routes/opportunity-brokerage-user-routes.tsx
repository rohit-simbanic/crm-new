import OpportunityBrokerageUserViewChangelog from 'features/opportunity-brokerage-users/opportunity-brokerage-user-change-log';
import OpportunityBrokerageUserCreate from 'features/opportunity-brokerage-users/opportunity-brokerage-user-create';
import OpportunityBrokerageUserView from 'features/opportunity-brokerage-users/opportunity-brokerage-user-view';
import OpportunityBrokerageUserList from 'features/opportunity-brokerage-users/opportunity-brokerage-users-list';
import OpportunityBrokerageUserPage from 'pages/opportunity-brokerage-user';

const opportunityBrokerageUserRoutes = {
  path: 'opportunity-brokerage-users',
  element: <OpportunityBrokerageUserPage />,
  children: [
    {
      path: '',
      element: (
        <OpportunityBrokerageUserList routeTag="opportunity-brokerage-users" />
      )
    },
    {
      path: 'create',
      element: (
        <OpportunityBrokerageUserCreate routeTag="opportunity-brokerage-users-create" />
      )
    },
    {
      path: ':opportunity_brokerage_user_id/view',
      element: (
        <OpportunityBrokerageUserView routeTag="opportunity-brokerage-users-view" />
      )
    },
    {
      path: ':opportunity_brokerage_user_id/edit',
      element: (
        <OpportunityBrokerageUserCreate routeTag="opportunity-brokerage-users-edit" />
      )
    },
    {
      path: ':opportunity_brokerage_user_id/view_changelog',
      element: (
        <OpportunityBrokerageUserViewChangelog routeTag="opportunity-brokerage-users-change-log" />
      )
    }
  ]
};

export default opportunityBrokerageUserRoutes;
