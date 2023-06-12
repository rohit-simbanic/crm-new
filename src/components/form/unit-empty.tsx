import { Grid } from '@mui/material';

interface EmptyUnitInterface {
  grid?: { xs: number; sm: number };
}
const UnitEmpty = ({ grid = { xs: 12, sm: 6 } }: EmptyUnitInterface) => {
  return <Grid item xs={grid.xs} sm={grid.sm}></Grid>;
};

export default UnitEmpty;
