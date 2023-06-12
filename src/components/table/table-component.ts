import * as React from 'react';
import { styled } from '@mui/material';
import TableMUI from '@mui/material/Table';
import TableBodyMUI from '@mui/material/TableBody';
import TableCellMUI from '@mui/material/TableCell';
import TableHeadMUI from '@mui/material/TableHead';
import TableRowMUI from '@mui/material/TableRow';
import { ObjectType } from 'types';

export const Table = styled(TableMUI)(() => ({}));

export const TableHead = styled(TableHeadMUI)(() => ({
  height: '54px'
}));

export const TableHeadRow = styled(TableRowMUI)(({ theme }: any) => ({}));

export const TableBody = styled(TableBodyMUI)(() => ({}));

export const TableBodyRow = styled(TableRowMUI)(({ theme }: any) => ({}));

export const getTableHeadCell = (colors: ObjectType) => {
  return styled(TableCellMUI)(({ theme }: any) => ({
    fontWeight: 'bold',
    backgroundColor: colors.primary[400],
    zIndex: 801
  }));
};

export const getDashboardTableHeadCell = (colors: ObjectType) => {
  return styled(TableCellMUI)(({ theme }: any) => ({
    fontWeight: 'bold',
    backgroundColor: colors.primary[400],
    '&:nth-of-type(1)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 0,
      zIndex: 801
    },
    '&:nth-of-type(2)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 110,
      zIndex: 801,
      [theme.breakpoints.down('769')]: {
        left: 96
      }
    },
    '&:nth-of-type(3)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 210,
      zIndex: 801,
      [theme.breakpoints.down('769')]: {
        left: 167
      }
    },
    '&:nth-of-type(4)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 310,
      zIndex: 801,
      [theme.breakpoints.down('769')]: {
        left: 217
      }
    },
    '&:nth-of-type(5)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 410,
      zIndex: 801,
      [theme.breakpoints.down('769')]: {
        left: 287
      }
    }
  }));
};

export const getDashboardTableRow = (colors: any) => {
  return styled(TableRowMUI)(() => ({
    '&:nth-of-type(odd)': {
      //  backgroundColor: colors.primary[400],
    }
  }));
};

export const getTableRow = (colors: any) => {
  return styled(TableRowMUI)(() => ({
    '&:nth-of-type(even)': {
      //  backgroundColor: colors.primary[400],
    }
  }));
};

export const getDashboardTableBodyCell = (colors: any) => {
  return styled(TableCellMUI)(({ theme }: any) => ({
    padding: '5px',
    '&:nth-of-type(1)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 0,
      zIndex: 800
    },
    '&:nth-of-type(2)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 110,
      zIndex: 800,
      [theme.breakpoints.down('769')]: {
        left: 96
      }
    },
    '&:nth-of-type(3)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 210,
      zIndex: 800,
      [theme.breakpoints.down('769')]: {
        left: 167
      }
    },
    '&:nth-of-type(4)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 310,
      zIndex: 800,
      [theme.breakpoints.down('769')]: {
        left: 217
      }
    },
    '&:nth-of-type(5)': {
      backgroundColor: colors.primary[400],
      position: 'sticky',
      left: 410,
      zIndex: 800,
      [theme.breakpoints.down('769')]: {
        left: 287
      }
    }
  }));
};

export const getTableBodyCell = (colors: any) => {
  return styled(TableCellMUI)(() => ({
    padding: '5px'
  }));
};
