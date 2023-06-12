import { Grid } from '@mui/material';

const Container = ({ children }: { children: any }) => {
  return (
    <Grid container p={0}>
      {children}
    </Grid>
  );
};

export default Container;
