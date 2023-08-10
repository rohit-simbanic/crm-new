import { Box, styled } from '@mui/material';
import {
  DataGrid as MuiDatagrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel
} from '@mui/x-data-grid';
import CircularLoader from 'components/dog-loader/dog-lodar';
import ErrorComponent from 'components/errors/error-component';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useColorToken from 'hooks/useColorToken';
import React from 'react';
import { ObjectType } from 'types';

const PAGINATIONOPTIONS = [10, 25, 50, 100];

const StyledDataGrid = styled(MuiDatagrid)(({ theme }) => {
  const colors = useColorToken();

  return {
    '& .MuiDataGrid-virtualScroller': {
      // height: 'calc(100vh - 560px)!important',
      overflow: 'auto !important'
    },
    '& .MuiDataGrid-virtualScrollerContent': {
      // height: 'calc(100vh - 62vh)!important'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 700,
      color: colors.grey[900]
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none'
    },
    border: 'none',
    //borderLeft: 'none',
    //borderRight: 'none',
    backgroundColor: colors.white[900]
    //boxShadow: `${colors.white.shadow} 0px 2px 4px`
  };
});

interface DataGridProp {
  rows: ObjectType[];
  columns: GridColDef[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: React.Dispatch<
    React.SetStateAction<GridPaginationModel>
  >;
  sortModel: GridSortModel;
  onSortModelChange: React.Dispatch<React.SetStateAction<GridSortModel>>;
  loading: boolean;
  error?: string | undefined;
  pagitionOptions?: number[];
}

const DataGrid = ({
  rows = [],
  columns = [],
  rowCount = 0,
  paginationModel = { pageSize: 25, page: 0 },
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  loading = false,
  error,
  pagitionOptions
}: DataGridProp) => {
  if (loading) return <CircularLoader />;

  return (
    <>
      <PaperBox sx={{ mt: 1 }}>
        <PaperBoxContent data-testid="data-grid">
          {error ? (
            <ErrorComponent message={error} />
          ) : (
            <>
              <StyledDataGrid
                autoHeight
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                paginationModel={paginationModel}
                paginationMode="server"
                sortingMode="server"
                onPaginationModelChange={onPaginationModelChange}
                disableRowSelectionOnClick={true}
                rowHeight={56}
                pageSizeOptions={
                  pagitionOptions ? pagitionOptions : PAGINATIONOPTIONS
                }
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                columnThreshold={0}
                sortingOrder={['asc', 'desc']}
                disableColumnMenu={true}
                loading={loading}
                disableColumnFilter={true}
                isRowSelectable={() => false}
              />
            </>
          )}
        </PaperBoxContent>
      </PaperBox>
    </>
  );
};

export default DataGrid;
