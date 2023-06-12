import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (
      routeName === 'transaction-histories' ||
      routeName === 'transaction-histories-create'
    ) {
      return await menuHelper.getItems('TRANSACTION_HISTORY', 'list');
    }

    if (routeName === 'transaction-histories-view') {
      return await menuHelper.getItems('TRANSACTION_HISTORY', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
