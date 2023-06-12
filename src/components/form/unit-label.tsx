import { Box, FormLabel, Grid, Typography, useTheme } from '@mui/material';
import { tokens } from 'theme';

interface UnitReadInterface {
  label: string;
  grid?: {
    xs: number;
    sm: number;
  };
  fontWeight?: string;
}

const UnitLabel = ({
  label,
  grid = { xs: 12, sm: 6 },
  fontWeight = 'normal'
}: UnitReadInterface) => {
  return (
    <Grid item xs={grid.xs} sm={grid.sm}>
      <Typography
        component={'span'}
        variant="body1"
        sx={{ fontWeight: fontWeight }}
      >
        {label}
      </Typography>
    </Grid>
  );
};

export default UnitLabel;
