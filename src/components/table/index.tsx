import './table.css';
import React, { useContext } from 'react';
import Pagination from './pagination/index';
import { TableContext } from './table-context';
import TH from './th';
import TR from './tr';
import { Table, TableBody, TableHead, TableHeadRow } from './table-component';
import { Box, FormLabel, useTheme } from '@mui/material';
import { tokens } from 'theme';
import { v4 as uuid4 } from 'uuid';
import CircularLoader from 'components/dog-loader/dog-lodar';

const TableComponent = () => {
  const {
    columns,
    rows,
    sortingData,
    updateSorting,
    freeze,
    isLoading,
    paginaionData,
    updatePagiantion
  } = useContext(TableContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <React.Fragment>
      <Pagination
        paginaionData={paginaionData}
        updatePagiantion={updatePagiantion}
      />

      <Table width={'100%'}>
        <TableHead>
          <TableHeadRow sx={{ backgroundColor: colors.primary[400] }}>
            {columns.map((col: any, index: number) => (
              <TH
                {...col}
                key={uuid4()}
                sortField={sortingData.field}
                sortOrder={sortingData.order}
                sorting={updateSorting}
                freeze={freeze}
              />
            ))}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center' }}>
                <CircularLoader />
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows.map((row: any, index: number) => (
              <TR key={uuid4()} columns={columns} data={row} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                <FormLabel
                  sx={{
                    color: 'error'
                  }}
                  className="fw-bold"
                >
                  No Record Found
                </FormLabel>
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      <Pagination
        paginaionData={paginaionData}
        updatePagiantion={updatePagiantion}
      />
    </React.Fragment>
  );
};

export default TableComponent;
