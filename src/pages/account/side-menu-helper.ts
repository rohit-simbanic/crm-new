import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'accounts') {
      return await menuHelper.getItems('Accounts', 'list');
    }

    if (routeName === 'accounts-view') {
      return await menuHelper.getItems('Accounts', 'view');
    }

    if (routeName === 'accounts-edit') {
      return await menuHelper.getItems('Accounts', 'edit');
    }

    if (routeName === 'accounts-create') {
      return await menuHelper.getItems('Accounts', 'create');
    }

    if (routeName === 'accounts-msa') {
      return await menuHelper.getItems('Accounts', 'view');
    }

    if (routeName === 'accounts-msa-selection') {
      return await menuHelper.getItems('Accounts', 'view');
    }

    if (routeName === 'accounts-change-log') {
      return await menuHelper.getItems('Accounts', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
