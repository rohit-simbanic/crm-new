import Grid from '@mui/material/Grid';
import H5 from 'components/typography/h5';

interface UnitHeadingProps {
  title: string;
}

const UnitHeading = ({ title }: UnitHeadingProps) => {
  return (
    <Grid item xs={12} sm={12}>
      <H5 title={title} gutterBottom={true} className="fw-bold" />
    </Grid>
  );
};

export default UnitHeading;
