import menuHelper from 'helpers/menu-helper';

const sideManuHelper = {
  getMenuItems: async (routeName: string) => {
    if (routeName === 'sqs' || routeName === 'sqs-create') {
      return await menuHelper.getItems('SQS', 'list');
    }

    if (routeName === 'sqs-view' || routeName === 'sqs-change-log') {
      return await menuHelper.getItems('SQS', 'view');
    }

    if (routeName === 'sqs-edit') {
      return await menuHelper.getItems('SQS', 'edit');
    }

    return [];
  }
};

export default sideManuHelper;
