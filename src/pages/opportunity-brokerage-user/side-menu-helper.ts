import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (
      routeName === 'opportunity-brokerage-users' ||
      routeName === 'opportunity-brokerage-users-create'
    ) {
      return await menuHelper.getItems('OPPORTUNITY_BROKERAGE_USER', 'list');
    }

    if (routeName === 'opportunity-brokerage-users-view') {
      return await menuHelper.getItems('OPPORTUNITY_BROKERAGE_USER', 'view');
    }

    if (routeName === 'opportunity-brokerage-users-edit') {
      return await menuHelper.getItems('OPPORTUNITY_BROKERAGE_USER', 'edit');
    }

    if (routeName === 'opportunity-brokerage-users-change-log') {
      return await menuHelper.getItems('OPPORTUNITY_BROKERAGE_USER', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
