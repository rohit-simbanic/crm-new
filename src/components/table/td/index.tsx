import { useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { tokens } from 'theme';
import { TableContext } from '../table-context';
import {
  getDashboardTableBodyCell,
  getTableBodyCell
} from '../table-component';
const TD = ({ content }: { content: string }) => {
  const { freeze } = useContext(TableContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Cell = freeze
    ? getDashboardTableBodyCell(colors)
    : getTableBodyCell(colors);

  return <Cell role={'cell'}>{content}</Cell>;
};

export default TD;
