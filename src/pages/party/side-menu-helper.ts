import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'parties-list') {
      return await menuHelper.getItems('parties', 'list');
    }

    if (routeName === 'parties-create') {
      return await menuHelper.getItems('parties', 'create');
    }

    if (routeName === 'parties-view') {
      return await menuHelper.getItems('parties', 'view');
    }

    if (routeName === 'parties-edit') {
      return await menuHelper.getItems('parties', 'edit');
    }

    if (routeName === 'parties-change-log') {
      return await menuHelper.getItems('parties', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
