import menuHelper from 'helpers/menu-helper';
import { ObjectType } from 'types';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'email-templates')
      return await menuHelper.getItems('Email_Template', 'list');

    if (routeName === 'email-templates-view')
      return await menuHelper.getItems('Email_Template', 'view');

    if (routeName === 'email-templates-edit')
      return await menuHelper.getItems('Email_Template', 'edit');

    if (routeName === 'email-templates-create')
      return await menuHelper.getItems('Email_Template', 'create');

    if (routeName === 'email-templates-duplicate')
      return await menuHelper.getItems('Email_Template', 'create');

    if (routeName === 'email-templates-market-preferences')
      return await menuHelper.getItems('Email_Template', 'view');
    return [];
  }
};

export default sideManuHelper;
