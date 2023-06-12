import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'calls' || routeName === 'calls-create') {
      return await menuHelper.getItems('Calls', 'list');
    }

    return [];
  }
};

export default sideManuHelper;
