import { createContext } from 'react';
import { ObjectType } from 'types';

export interface TableContextType {
  rows: any[];
  columns: any[];
  sortingData: ObjectType;
  paginaionData: ObjectType;
  freeze?: boolean;
  isLoading?: boolean;
  updateSorting: (value: any) => void;
  updatePagiantion: (value: any) => void;
  additionalInfo?: ObjectType;
}

export const TableContext = createContext<TableContextType>({
  rows: [],
  columns: [],
  sortingData: {},
  paginaionData: {},
  freeze: false,
  isLoading: false,
  updateSorting: (value: any) => {},
  updatePagiantion: (value: any) => {},
  additionalInfo: {}
});
