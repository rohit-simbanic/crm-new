// @ts-nocheck
import accountMenuItems from 'assets/menus/side-menu/account';
import callMenuItems from 'assets/menus/side-menu/call';
import dashboardMenuItems from 'assets/menus/side-menu/dashboard';
import documentMenuItems from 'assets/menus/side-menu/document';
import emailMenuItems from 'assets/menus/side-menu/email';
import emailTemplateMenuItems from 'assets/menus/side-menu/email-template';
import marketPreferenceBrokerageUserMenuItems from 'assets/menus/side-menu/market-preference-brokerage-user';
import marketPreferenceMenuItems from 'assets/menus/side-menu/market-preferences';
import msaMenuItems from 'assets/menus/side-menu/msa';
import opportunityMenuItems from 'assets/menus/side-menu/opportunity';
import opportunityBrokerageUserMenuItems from 'assets/menus/side-menu/opportunity-brokerage-user';
import partyMenuItems from 'assets/menus/side-menu/party';
import pdfTemplateMenuItems from 'assets/menus/side-menu/pdf-template';
import serviceMenuItems from 'assets/menus/side-menu/service';
import sqsMenuItems from 'assets/menus/side-menu/sqs';
import taskMenuItems from 'assets/menus/side-menu/task';
import transactionHistoryMenuItems from 'assets/menus/side-menu/transaction-history';
import permissionService from 'services/permission-service';
import { ObjectType } from 'types';

const menuHelper = {
  getItems: async (model, page: any) => {
    let allowedMenus = [];

    let modelMenu = menuHelper.getModelMenuItems(model);
    let pageMenu = modelMenu[page];

    let models = pageMenu.map(function (menuItem) {
      if (menuItem.subMenuItems && menuItem.subMenuItems.length > 0) {
        let models = menuItem.subMenuItems.map(function (subMenuItem) {
          return subMenuItem['model'];
        });

        models = [...new Set(models)];

        return models;
      }

      return menuItem['model'];
    });

    models = [...new Set(models)].flat();

    // let modelsQuery = models.map(function (model) {
    //   return `filter[modules][]=${model}`;
    // });

    // let queryString = modelsQuery.join('&');

    // let permissions = await permissionService.list(queryString);
    let permissions = menuHelper.getPermissions(models);
    console.log(permissions);
    pageMenu.map(function (menuItem) {
      if (menuItem.subMenuItems && menuItem.subMenuItems.length > 0) {
        let allowedSubMenuItems = menuItem.subMenuItems.map(function (
          subMenuItem
        ) {
          let modulePermission =
            permissions[subMenuItem.model][subMenuItem.permission];
          if (modulePermission) {
            return subMenuItem;
          }
        });

        if (allowedSubMenuItems && allowedSubMenuItems.length > 0) {
          allowedMenus.push(menuItem);
        }
      } else {
        let modulePermission = permissions[menuItem.model][menuItem.permission];

        if (modulePermission) {
          allowedMenus.push(menuItem);
        }
      }
    });

    return allowedMenus;
  },

  createMenusItems: (menus, params) => {
    let menusToshow = menus.map(function (item) {
      let subMenuItemsWithURL;

      if (item.subMenuItems && item.subMenuItems.length > 0) {
        subMenuItemsWithURL = item.subMenuItems.map(function (
          subMenuItem: ObjectType
        ) {
          return {
            ...subMenuItem,
            url:
              typeof subMenuItem.url === 'function'
                ? subMenuItem.url(params)
                : ''
          };
        });
      }

      return {
        ...item,
        subMenuItems: subMenuItemsWithURL,
        url: typeof item.url === 'function' ? item.url(params) : ''
      };
    });
    return menusToshow;
  },

  getModelMenuItems(model: string): ObjectType {
    switch (model) {
      case 'Accounts':
        return accountMenuItems;
      case 'simba_MSA':
        return msaMenuItems;
      case 'simba_Property':
        return marketPreferenceMenuItems;
      case 'Market_Preferences_Brokerage_User':
        return marketPreferenceBrokerageUserMenuItems;
      case 'AOS_PDF_Templates':
        return pdfTemplateMenuItems;
      case 'dashboard':
        return dashboardMenuItems;
      case 'Opportunities':
        return opportunityMenuItems;
      case 'Documents':
        return documentMenuItems;
      case 'Email_Template':
        return emailTemplateMenuItems;
      case 'parties':
        return partyMenuItems;
      case 'SQS':
        return sqsMenuItems;
      case 'OPPORTUNITY_BROKERAGE_USER':
        return opportunityBrokerageUserMenuItems;
      case 'Tasks':
        return taskMenuItems;
      case 'Calls':
        return callMenuItems;
      case 'SERVICE':
        return serviceMenuItems;
      case 'TRANSACTION_HISTORY':
        return transactionHistoryMenuItems;
      case 'Emails':
        return emailMenuItems;
    }

    return {};
  },

  getAllPermissions: async () => {
    const res = await permissionService.list();
    const data = res.data.data;
    console.log(data);
    localStorage.setItem('permissions', JSON.stringify(data));
    localStorage.setItem('roles', JSON.stringify(data.roles));

    return true;
  },

  getPermissions: (models: string[]) => {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');

    let data: ObjectType = {};
    for (let model of models) {
      data[model] = permissions[model];
    }

    return data;
  }
};

export default menuHelper;
