import { Grid } from '@mui/material';

const ContentArea = ({ children }: { children: any }) => {
  return (
    <Grid item xs={12} sm={12} md={10} pt={8}>
      {children}
    </Grid>
  );
};

export default ContentArea;
