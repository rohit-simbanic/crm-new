import { useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { tokens } from 'theme';

import TD from '../td';
import { getTableRow, getDashboardTableRow } from '../table-component';
import { TableContext } from '../table-context';
import { v4 as uuid4 } from 'uuid';
import { ObjectType } from 'types';

const TR = ({
  data,
  columns,
  index
}: {
  data: ObjectType;
  columns: ObjectType;
  index: any;
}) => {
  const { freeze } = useContext(TableContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Row = freeze ? getDashboardTableRow(colors) : getTableRow(colors);

  return (
    <Row role={'row'}>
      {columns.map((col: any, index: number) => {
        return (
          <TD
            key={uuid4()}
            content={
              col.Cell !== undefined ? col.Cell(data) : data[col.accessor]
            }
          />
        );
      })}
    </Row>
  );
};

export default TR;
