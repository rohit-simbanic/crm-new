import ServiceViewChangelog from 'features/services/service-change-log';
import ServiceCreate from 'features/services/service-create';
import ServiceList from 'features/services/service-list';
import ServiceView from 'features/services/service-view';
import ServicePage from 'pages/service';

const servicesRoutes = {
  path: 'services',
  element: <ServicePage />,
  children: [
    {
      path: '',
      element: <ServiceList routeTag="services" />
    },
    {
      path: 'create',
      element: <ServiceCreate routeTag="services-create" />
    },
    {
      path: ':service_id/edit',
      element: <ServiceCreate routeTag="services-edit" />
    },
    {
      path: ':service_id/view',
      element: <ServiceView routeTag="services-view" />
    },
    {
      path: ':service_id/view_changelog',
      element: <ServiceViewChangelog routeTag="services-change-log" />
    }
  ]
};

export default servicesRoutes;
