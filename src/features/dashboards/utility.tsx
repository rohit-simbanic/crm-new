import DASHBOARDS from 'assets/constants/dashboards';

export const dashboardContextValue = {
  filter: {},
  setIsFilterChanged: (value: boolean) => {},
  updateFilter: (value: any) => {},
  setFilter: (value: any) => {},
  updatePagiantion: (value: any) => {},
  currentTab: DASHBOARDS.NEGOTIATOR_DASHBOARD_OFFER_MAKE_OFFER
};
