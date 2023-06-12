import Grid from '@mui/material/Grid';

interface childrentType {
  children: React.ReactNode;
  spacing?: number;
}

const FormContainer = ({ children, spacing = 2 }: childrentType) => {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
};

export default FormContainer;
