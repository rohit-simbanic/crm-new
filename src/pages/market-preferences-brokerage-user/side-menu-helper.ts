import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (
      routeName === 'market-preferences-brokerage-users' ||
      routeName === 'market-preferences-brokerage-users-create'
    ) {
      return await menuHelper.getItems(
        'Market_Preferences_Brokerage_User',
        'list'
      );
    }

    if (routeName === 'market-preferences-brokerage-users-view') {
      return await menuHelper.getItems(
        'Market_Preferences_Brokerage_User',
        'view'
      );
    }

    if (routeName === 'market-preferences-brokerage-users-edit') {
      return await menuHelper.getItems(
        'Market_Preferences_Brokerage_User',
        'edit'
      );
    }

    if (routeName === 'market-preferences-brokerage-users-change-log') {
      return await menuHelper.getItems(
        'Market_Preferences_Brokerage_User',
        'view'
      );
    }

    return [];
  }
};

export default sideManuHelper;
