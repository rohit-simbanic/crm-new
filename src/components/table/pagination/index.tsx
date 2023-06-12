import React from 'react';
import { TablePagination } from '@mui/material';
import { ObjectType } from 'types';

const Pagination = ({
  paginaionData,
  updatePagiantion
}: {
  paginaionData: ObjectType;
  updatePagiantion: (e: any) => any;
}) => {
  return (
    <TablePagination
      component="div"
      count={paginaionData.totalRecord}
      page={paginaionData.page - 1}
      onPageChange={(
        _: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
      ) => {
        updatePagiantion({
          name: 'page',
          value: newPage + 1
        });
      }}
      rowsPerPage={paginaionData.size}
      onRowsPerPageChange={(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        updatePagiantion({
          name: 'size',
          value: parseInt(event.target.value, 10)
        });
      }}
    />
  );
};

export default Pagination;
