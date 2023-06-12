export type ModelType = 'account' | 'msa' | string;
export type PermissionType =
  | 'access'
  | 'list'
  | 'edit'
  | 'view'
  | 'delete'
  | string;
export type PageType = 'view' | 'list' | 'edit' | string;

export default interface SideMenuItemType {
  label: string;
  url: (model: any) => {};
  labelIcon: any;
  model: ModelType;
  permission: PermissionType;
}

export interface SideMenuItemListType {
  [key: PageType]: SideMenuItemType[];
}
