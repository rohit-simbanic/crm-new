import PartiesList from 'features/parties/party-list';
import CreateParties from '../features/parties/party-create';
import PartyPage from '../pages/party';
import PartyView from 'features/parties/party-view';
import PartyViewChangelog from 'features/parties/party-change-log';

const partyRoutes = {
  path: 'parties',
  element: <PartyPage />,
  children: [
    {
      path: '',
      element: <PartiesList routeTag="parties-list" />
    },
    {
      path: 'create',
      element: <CreateParties routeTag="parties-create" />
    },
    {
      path: ':party_id/view',
      element: <PartyView routeTag="parties-view" />
    },
    {
      path: ':party_id/edit',
      element: <CreateParties routeTag="parties-edit" />
    },
    {
      path: ':party_id/view_changelog',
      element: <PartyViewChangelog routeTag="parties-change-log" />
    }
  ]
};

export default partyRoutes;
