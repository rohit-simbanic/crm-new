import { Typography } from '@mui/material';
import { ObjectType } from 'types';

interface H6Props {
  value: string;
  gutterBottom?: boolean;
  className?: string;
  sx?: ObjectType;
}

const H6 = (props: H6Props) => {
  const { gutterBottom, className, value, sx } = props;

  return (
    <>
      <Typography
        component={'span'}
        variant="h6"
        gutterBottom={gutterBottom}
        className={className}
        sx={sx}
      >
        {value}
      </Typography>
    </>
  );
};

export default H6;
