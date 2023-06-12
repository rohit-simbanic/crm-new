import { Box, Grid, Typography } from '@mui/material';
import useColorToken from 'hooks/useColorToken';
import { ReactNode } from 'react';
import { ObjectType } from 'types';

import FieldLabel from './field-label';

interface UnitReadInterface {
  label: string;
  value: string | ReactNode;
  grid?: {
    xs: number;
    sm: number;
  };
  labelsx?: ObjectType;
  sx?: ObjectType;
  boxsx?: ObjectType;
}

const UnitRead = ({
  label,
  value,
  grid = { xs: 12, sm: 6 },
  labelsx,
  sx,
  boxsx
}: UnitReadInterface) => {
  const colors = useColorToken();
  return (
    <Grid item xs={grid.xs} sm={grid.sm} sx={sx}>
      <FieldLabel>{label}</FieldLabel>
      <Box
        sx={{
          background: colors.white.input,
          minHeight: '47px',
          maxHeight: '200px',
          overflow: 'auto',
          borderRadius: '3px 3px 0 0',
          display: 'flex',
          alignItems: 'center',
          pl: 1.5,
          ...boxsx,
          ':hover': {
            background: colors.white.hover
          }
        }}
      >
        <Typography>{value}</Typography>
      </Box>
    </Grid>
  );
};

export default UnitRead;
