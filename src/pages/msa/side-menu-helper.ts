import menuHelper from 'helpers/menu-helper';
import { ObjectType } from 'types';

const sideManuHelper = {
  getMenuItems: async (routeName: string, params: ObjectType) => {
    if (routeName === 'msa') {
      return await menuHelper.getItems('simba_MSA', 'list');
    }

    if (routeName === 'msa-view') {
      return await menuHelper.getItems('simba_MSA', 'view');
    }

    if (routeName === 'msa-create') {
      return await menuHelper.getItems('simba_MSA', 'list');
    }

    if (routeName === 'msa-edit') {
      return await menuHelper.getItems('simba_MSA', 'edit');
    }

    if (routeName === 'msa-accounts') {
      return await menuHelper.getItems('simba_MSA', 'view');
    }

    if (routeName === 'msa-account-selection') {
      return await menuHelper.getItems('simba_MSA', 'view');
    }

    if (routeName === 'msa-change-log') {
      return await menuHelper.getItems('simba_MSA', 'view');
    }

    if (routeName === 'msa-accounts-view') {
      return await menuHelper.getItems('simba_MSA', 'view');
    }

    return [];
  }
};

export default sideManuHelper;
