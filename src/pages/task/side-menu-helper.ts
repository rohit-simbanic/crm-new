import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'tasks' || routeName === 'tasks-create') {
      return await menuHelper.getItems('Tasks', 'list');
    }

    return [];
  }
};

export default sideManuHelper;
