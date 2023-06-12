import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'inbox-emails')
      return await menuHelper.getItems('Emails', 'list');

    if (routeName === 'compose-emails')
      return await menuHelper.getItems('Emails', 'list');

    if (routeName === 'draft-emails')
      return await menuHelper.getItems('Emails', 'list');

    if (routeName === 'inbox-thread-emails')
      return await menuHelper.getItems('Emails', 'list');

    return [];
  }
};

export default sideManuHelper;
