import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'services' || routeName === 'services-create') {
      return await menuHelper.getItems('SERVICE', 'list');
    }

    if (routeName === 'services-view') {
      return await menuHelper.getItems('SERVICE', 'view');
    }

    if (routeName === 'services-edit') {
      return await menuHelper.getItems('SERVICE', 'edit');
    }

    if (routeName === 'services-change-log') {
      return await menuHelper.getItems('SERVICE', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
