import menuHelper from 'helpers/menu-helper';

const viewRouteNames = [
  'market-preferences-view',
  'market-preferences-2-brokerage-users',
  'market-preferences-2-brokerage-users-create',
  'market-preferences-contracts',
  'market-preferences-contracts-selection',
  'market-preferences-email-templates',
  'market-preferences-email-templates-selection',
  'market-preferences-documents',
  'market-preferences-documents-edit',
  'market-preferences-documents-create',
  'market-preferences-documents-view',
  'market-preferences-change-log',
  'market-preferences-2-brokerage-users-terminate',
  'market-preferences-2-brokerage-users-replace',
  'market-preferences-2-brokerage-users-view',
  'market-preferences-view-market-offer-defaults',
  'market-preferences-email-templates-edit',
  'market-preferences-contracts-edit'
];

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (
      routeName === 'market-preferences' ||
      routeName === 'market-preferences-create'
    ) {
      return await menuHelper.getItems('simba_Property', 'list');
    }

    if (viewRouteNames.includes(routeName)) {
      return await menuHelper.getItems('simba_Property', 'view');
    }

    if (routeName === 'market-preferences-edit') {
      return await menuHelper.getItems('simba_Property', 'edit');
    }

    return [];
  }
};

export default sideManuHelper;
