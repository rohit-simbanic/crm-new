import { createContext } from 'react';

export interface TableContextType2 {
  rows: any[];
  columns: any[];
  sortingData: { [key: string]: any };
  paginaionData: { [key: string]: number };
  freeze?: boolean;
  itemCount: number;
  updateSorting: (value: any) => void;
  updatePagiantion: (value: any) => void;
}

export const TableContext2 = createContext<TableContextType2>({
  rows: [],
  columns: [],
  sortingData: {},
  itemCount: 10,
  paginaionData: {},
  freeze: false,
  updateSorting: (value: any) => {},
  updatePagiantion: (value: any) => {}
});
