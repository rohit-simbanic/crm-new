import { DashboardFilterEntity } from './dashboard-type';
import { ObjectType } from './index';

/** @todo apply types */
export type DashboardContext2 = {
  filter: ObjectType;
  setIsFilterChanged: (value: boolean) => void;
  updateFilter: (value: any) => void;
  setFilter: (value: any) => void;
  updatePagiantion?: (value: any) => void;
  currentTab?: string;
};
