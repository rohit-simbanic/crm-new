import React, { useContext } from 'react';
import {
  getDashboardTableHeadCell,
  getTableHeadCell
} from '../table-component';
import { Box, FormLabel, useTheme, Grid, Typography } from '@mui/material';
import { tokens } from 'theme';

const TH = ({
  accessor,
  Header,
  sortable,
  sortOrder,
  sortField,
  sorting,
  freeze
}: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**@TODO good sorting icons but need to define the icon in place of the special values */
  const Sort = (order: string, sortField: string) => {
    return (
      <>
        {sortField !== accessor ? (
          <span id={`sort-${accessor}`} className="float-end">
            <>&#8597;</>
          </span>
        ) : (
          <span className="float-end">
            {!order ? <>&#8593;</> : <>&#8595;</>}
          </span>
        )}
      </>
    );
  };

  const HeadCell = freeze
    ? getDashboardTableHeadCell(colors)
    : getTableHeadCell(colors);

  return (
    <HeadCell
      className="text-start"
      role={'cell'}
      id={`th-${accessor}`}
      onClick={() => {
        if (sortable) {
          if (sortField !== accessor) {
            sorting({ name: 'field', value: accessor });
          } else {
            sorting({ name: 'order', value: !sortOrder });
          }
        }
      }}
    >
      <FormLabel>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              component={'span'}
              variant="h6"
              sx={{ fontWeight: 600 }}
            >
              {Header}
              <Box component={'span'} sx={{ pl: '5px', fontWeight: 'bolder' }}>
                {sortable && Sort(sortOrder, sortField)}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </FormLabel>
    </HeadCell>
  );
};
export default TH;
