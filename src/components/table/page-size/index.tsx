import React, { useContext } from 'react';
import { TableContext } from '../table-context';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControl } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import FieldText from 'components/form/field-text';

const PagiSize = ({ float }: { float: string }) => {
  const { paginaionData, updatePagiantion } = useContext(TableContext);

  const pageSizesOptions = ['', 5, 10, 15, 20];

  const changeSize = (value: number) => {
    updatePagiantion({ name: 'size', value: value });
  };

  return (
    <Box p={2} className={`float-${float ? float : 'start'} `}>
      <FormControl sx={{ width: '80px' }}>
        <FieldText
          fullWidth
          select
          size="small"
          id="size"
          name="size"
          data-testid="size-input"
          value={paginaionData.size}
          label="Page Size"
          onChange={(e: any) => changeSize(+e.target.value)}
        >
          {pageSizesOptions.map((page, index) => (
            <MenuItem key={uuid4()} value={page}>
              {page}
            </MenuItem>
          ))}
        </FieldText>
      </FormControl>
    </Box>
  );
};

export default PagiSize;
