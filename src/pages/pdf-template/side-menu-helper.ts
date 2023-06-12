import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'pdf-templates')
      return await menuHelper.getItems('AOS_PDF_Templates', 'list');

    if (routeName === 'pdf-templates-view')
      return await menuHelper.getItems('AOS_PDF_Templates', 'view');

    if (
      routeName === 'pdf-templates-edit' ||
      routeName === 'pdf-templates-pdf-view'
    )
      return await menuHelper.getItems('AOS_PDF_Templates', 'edit');

    if (routeName === 'pdf-templates-create')
      return await menuHelper.getItems('AOS_PDF_Templates', 'create');

    return [];
  }
};

export default sideManuHelper;
