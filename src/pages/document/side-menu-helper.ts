import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'documents') {
      return await menuHelper.getItems('Documents', 'list');
    }

    if (
      routeName === 'documents-view' ||
      routeName === 'documents-revisions' ||
      routeName === 'documents-revisions-view'
    ) {
      return await menuHelper.getItems('Documents', 'view');
    }

    if (routeName === 'documents-edit') {
      return await menuHelper.getItems('Documents', 'edit');
    }

    if (routeName === 'documents-create') {
      return await menuHelper.getItems('Documents', 'create');
    }

    return [];
  }
};

export default sideManuHelper;
