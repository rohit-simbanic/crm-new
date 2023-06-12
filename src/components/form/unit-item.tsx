import { Box, FormLabel, Grid, Typography, useTheme } from '@mui/material';
import { tokens } from 'theme';

interface UnitReadInterface {
  children: any;
  grid?: {
    xs: number;
    sm: number;
    md?: number;
    lg?: number;
  };
  p?: number;
  sx?: any;
  style?: object;
}

const UnitItem = ({
  children,
  grid = { xs: 12, sm: 6, md: 6, lg: 6 },
  p = 1,
  sx,
  style
}: UnitReadInterface) => {
  return (
    <Grid
      item
      xs={grid.xs}
      sm={grid.sm}
      p={p}
      sx={sx}
      md={grid.md}
      lg={grid.lg}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default UnitItem;
